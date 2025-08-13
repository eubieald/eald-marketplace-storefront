'use client';

import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Product } from '@/payload-types';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProductListItem } from './product-list.component';
import { useProductsFiltersConfig } from '@/modules/products/hooks/use-products-filters.config';

export const ProductList = ({
  className,
  category,
}: CommonProps & {
  category?: string;
}) => {
  const trpc = useTRPC();
  const [filters] = useProductsFiltersConfig();
  const { data: productData } = useSuspenseQuery(
    trpc.products.getAll.queryOptions({
      category,
      ...filters,
    })
  );
  const products = productData?.docs as Product[];

  return (
    <div className={cn('grid grid-cols-3 gap-4', className)}>
      {products.map((product) => (
        <ProductListItem key={product?.id} product={product} />
      ))}
    </div>
  );
};
