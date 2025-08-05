'use client';

import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Product } from '@/payload-types';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProductListItem } from './product-list.component';

export const ProductList = ({
  className,
  category,
}: CommonProps & {
  category?: string;
}) => {
  const trpc = useTRPC();
  const { data: productData } = useSuspenseQuery(
    trpc.products.getAll.queryOptions({
      category,
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
