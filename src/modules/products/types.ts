import { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@/trpc/routers/_app';

export type GetProductsOutputType =
  inferRouterOutputs<AppRouter>['products']['getAll'];
