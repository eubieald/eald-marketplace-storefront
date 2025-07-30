import { AUTH_COOKIE } from '@/modules/auth/constants';
import { TRPCError } from '@trpc/server';
import { cookies as getCookies } from 'next/headers';
import { BasePayload } from 'payload';

export async function setAuthCookie(ctx: { db: BasePayload }, token: string) {
  const cookies = await getCookies();
  cookies.set({
    name: `${ctx.db.config.cookiePrefix}-token`,
    value: token,
    httpOnly: true,
    path: '/',
  });
}

export async function deleteAuthCookie() {
  const cookies = await getCookies();
  cookies.delete(AUTH_COOKIE);
}

export async function ensureUniqueField(
  ctx: { db: BasePayload },
  field: 'email' | 'username',
  value: string
) {
  const result = await ctx.db.find({
    collection: 'users',
    where: { [field]: { equals: value } },
  });

  if (result?.docs?.length) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: `${field[0].toUpperCase() + field.slice(1)} already in use`,
    });
  }
}
