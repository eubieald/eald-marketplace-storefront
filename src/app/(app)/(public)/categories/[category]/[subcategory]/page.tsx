import { ProductList } from '@/components/feature/product-list';
import { Spinner } from '@/components/feature/spinner';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { SearchParams } from 'nuqs/server';

type PageProps = {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<SearchParams>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { category, subcategory } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.products.getAll.queryOptions({
      category: subcategory,
    })
  );
  return (
    <>
      <h1 className="text-2xl font-bold">Category: {category}</h1>
      <h1 className="text-2xl font-bold">Subcategory: {subcategory}</h1>
      <br />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<Spinner />}>
          <ProductList category={subcategory} />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
