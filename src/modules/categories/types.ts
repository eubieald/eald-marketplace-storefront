import { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@/trpc/routers/_app';

export type CategoriesOutputType = inferRouterOutputs<AppRouter>['categories'];

export type TopCategoriesOutputType =
  inferRouterOutputs<AppRouter>['categories']['getTopLevelWithChildren'];

export type TopCategoriesDocType = TopCategoriesOutputType['docs'][number];

export type TopCategoriesPaginatedOutputType =
  CategoriesOutputType['getPaginated'];
