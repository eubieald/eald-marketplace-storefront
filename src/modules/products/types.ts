import { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@/trpc/routers/_app';

export type GetProductsOutputType =
  inferRouterOutputs<AppRouter>['products']['getAll'];
export type ProductDocsType = GetProductsOutputType['docs'];
export type ProductType = ProductDocsType[number];

export type ProductsQueryFilterType = {
  category?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  tags?: string[] | null;
};
