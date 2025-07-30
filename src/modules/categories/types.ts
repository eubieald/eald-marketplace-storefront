import { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@/trpc/routers/_app';

export type TopLevelWithChildrenOutputType =
  inferRouterOutputs<AppRouter>['categories'];
export type GetPaginatedOutputType =
  TopLevelWithChildrenOutputType['getPaginated'];

