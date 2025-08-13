import { Column, ColumnItem } from '@/components/feature/common/column';
import { ProductFilters } from '@/components/feature/product-filters';
import { ProductList } from '@/components/feature/product-list';
import { Spinner } from '@/components/feature/spinner';
import { loadProductFilters } from '@/modules/products';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

type PageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    minPrice: string;
    maxPrice: string;
  }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const filters = await loadProductFilters(searchParams);
  const { category } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.products.getAll.queryOptions({
      category,
      ...filters,
    })
  );

  return (
    <>
      <h1 className="text-2xl font-bold">Category: {category}</h1>
      <br />
      <Column className="flex flex-col gap-4">
        <ColumnItem className="flex flex-row gap-10 w-full p-4 items-start">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductFilters className="border p-2 w-full max-w-65 h-full self-start" />
            <Suspense fallback={<Spinner />}>
              <ProductList category={category} />
            </Suspense>
          </HydrationBoundary>
        </ColumnItem>
      </Column>
    </>
  );
}
