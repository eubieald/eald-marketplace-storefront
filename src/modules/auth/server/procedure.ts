import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { TRPCError } from '@trpc/server';
import { headers as getHeaders } from 'next/headers';
import { memberRegisterFormSchema } from '@/app/(app)/(auth)/register/_components';
import { memberLoginFormSchema } from '@/app/(app)/(auth)/login/_components';
import {
  deleteAuthCookie,
  ensureUniqueField,
  setAuthCookie,
} from '@/lib/auth/utils';

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    return await ctx.db.auth({ headers });
  }),

  register: baseProcedure
    .input(memberRegisterFormSchema)
    .mutation(async function registerUser({ ctx, input }) {
      const { email, password, username } = input;

      await ensureUniqueField(ctx, 'email', email);
      await ensureUniqueField(ctx, 'username', username);

      try {
        await ctx.db.create({
          collection: 'users',
          data: { email, password, username },
        });

        const data = await ctx.db.login({
          collection: 'users',
          data: { email, password },
        });

        if (!data.token) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Login after registration failed',
          });
        }

        await setAuthCookie(ctx, data.token);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error?.data?.errors?.[0]?.message || 'Registration failed',
        });
      }
    }),

  login: baseProcedure
    .input(memberLoginFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      if (!email || typeof email !== 'string') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'A valid email is required.',
        });
      }

      const userResult = await ctx.db.find({
        collection: 'users',
        where: {
          email: { equals: email },
        },
      });

      const user = userResult?.docs?.[0];

      if (!user || !user.email) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password.',
        });
      }

      const loginResponse = await ctx.db.login({
        collection: 'users',
        data: {
          email: user.email,
          password,
        },
      });

      if (!loginResponse.token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password.',
        });
      }

      await setAuthCookie(ctx, loginResponse.token);
      return loginResponse;
    }),

  logout: baseProcedure.mutation(async function logoutUser() {
    await deleteAuthCookie();
  }),
});
