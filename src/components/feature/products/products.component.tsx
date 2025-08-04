'use client';

import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export const ProductList = ({
  className,
  category,
}: CommonProps & {
  category?: string;
}) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getAll.queryOptions({
      category,
    })
  );

  return (
    <pre className={cn('product-list', className)}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};
