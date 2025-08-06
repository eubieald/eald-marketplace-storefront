// export const dynamic = 'force-dynamic';

import { Column, ColumnRowItem } from '@/components/feature/common/column';
import { Categories } from './_components';
import { Pagination } from '@/components/feature/pagination';
import { getQueryClient, trpc } from '@/trpc/server';
import { TopCategoriesPaginatedOutputType } from '@/modules/categories/types';
import Link from 'next/link';

type PageProps = {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params?.page ? parseInt(params?.page, 10) : 1;
  const pageSize = params?.pageSize ? parseInt(params?.pageSize, 10) : 10;

  // Fetch categories data using tRPC
  // Note: This is a server component, so we can fetch data here
  // Note: To use prefetchQuery we need to use React Query hydration (<Hydrate>)
  const queryclient = getQueryClient();
  const categoriesData: TopCategoriesPaginatedOutputType =
    await queryclient?.fetchQuery(
      trpc.categories?.getPaginated?.queryOptions({
        page,
        limit: pageSize,
        includeChildren: false,
      })
    );

  return (
    <Categories className="p-6">
      <Column className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categoriesData?.docs?.map((category) => (
          <ColumnRowItem
            key={category?.id}
            className="p-4 h-full border rounded shadow-sm bg-white"
          >
            <Link href={`/categories/${category?.slug}`}>
              <h2 className="text-lg font-semibold hover:underline cursor-pointer">
                {category?.name}
              </h2>
            </Link>
            {category?.parent && (
              <p className="text-sm text-gray-500">
                {typeof category?.parent === 'object'
                  ? category?.parent?.name
                  : ''}
              </p>
            )}
          </ColumnRowItem>
        ))}
      </Column>
      <Pagination totalPages={categoriesData?.totalPages} />
    </Categories>
  );
}
