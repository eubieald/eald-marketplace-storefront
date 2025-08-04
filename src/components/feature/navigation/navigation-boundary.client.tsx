'use client';

import { Navigation } from './navigation.composite';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { NavigationSkeleton } from './navigation.component';

export const NavigationBoundaryClient = ({
  pathname,
}: {
  pathname: string;
}) => {
  const trpc = useTRPC();
  const sessionQuery = useQuery(trpc.auth.session.queryOptions());

  if (sessionQuery?.isLoading) {
    return <NavigationSkeleton />;
  }

  return (
    <Navigation
      className="flex-1"
      headerProps={{ session: sessionQuery.data!, pathname }}
    />
  );
};
