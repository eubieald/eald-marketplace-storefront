import { Column, ColumnRowItem } from '@/components/feature/common/column';
import { Categories, getAllCategories } from './_components';

type PageProps = {
  searchParams: Promise<Record<string, string>>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 10;
  const categoriesData = await getAllCategories({ page, limit: pageSize });
  return (
    <Categories className="p-6">
      <Column className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesData?.docs?.map((category) => (
          <ColumnRowItem
            key={category.id}
            className="p-4 h-full border rounded shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold">{category.name}</h2>
            {category.parent && (
              <p className="text-sm text-gray-500">
                {typeof category.parent === 'object'
                  ? category.parent.name
                  : category.parent}
              </p>
            )}
          </ColumnRowItem>
        ))}
      </Column>
    </Categories>
  );
}
