import { ProductList } from '@/components/feature/products';
import { Spinner } from '@/components/feature/spinner';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

type PageProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

export default async function Page({ params }: PageProps) {
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
