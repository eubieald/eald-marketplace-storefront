'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { cn } from '@/lib/utils';
import { CommonProps } from '@/lib/types';

export const Test = ({ className }: CommonProps) => {
  const trpc = useTRPC();
  const categories = useQuery(
    trpc.categories.getTopLevelWithChildren.queryOptions()
  );
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className={cn('test-component', className)}>
      <p>is loading: {categories.isLoading}</p>
      {/* <div>{JSON.stringify(categories.data, null, 2)}</div> */}
      <div>{JSON.stringify(session.data?.user, null, 2)}</div>
    </div>
  );
};
