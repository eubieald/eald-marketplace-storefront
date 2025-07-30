import { authRouter } from '@/modules/auth/server/procedure';
import { inferRouterOutputs } from '@trpc/server';

type AuthRouterOutput = inferRouterOutputs<typeof authRouter>;
export type AuthResultSessionOutput = AuthRouterOutput['session'];
