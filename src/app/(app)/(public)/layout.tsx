// Force dynamic rendering since we're using headers() in auth.session()
// export const dynamic = 'force-dynamic';

import {
  Header,
  HeaderLogo,
} from '@/components/feature/header/header.component';
// import { Navigation } from '@/components/feature/navigation';
import { QuickSearch } from '@/components/feature/quicksearch/quicksearch.component';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { TopCategoriesBlock } from '@/components/feature/top-categories';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Spinner } from '@/components/feature/spinner';
import { NavigationBoundaryClient } from '@/components/feature/navigation';
import { headers } from 'next/headers';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  // NOTE: This is a server component, so we can prefetch data here
  const queryclient = getQueryClient();
  await queryclient.prefetchQuery(
    trpc.categories.getTopLevelWithChildren.queryOptions()
  );
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '';

  return (
    <>
      <Header className="h-20 px-4 flex flex-wrap border-b justify-between font-medium bg-blue-300">
        <Link href="/" className=" flex items-center">
          <HeaderLogo className={cn('font-normal font-poppins text-2xl')}>
            EALD EC
          </HeaderLogo>
        </Link>
        {/* <Suspense fallback={<Spinner />}>
          <Navigation className="flex-1" session={session} />
        </Suspense> */}
        <Suspense>
          <NavigationBoundaryClient pathname={pathname || ''} />
        </Suspense>
      </Header>
      <QuickSearch />
      <HydrationBoundary state={dehydrate(queryclient)}>
        <Suspense fallback={<Spinner />}>
          <TopCategoriesBlock />
        </Suspense>
      </HydrationBoundary>

      <main className="flex-grow">{children}</main>
    </>
  );
};

export default PublicLayout;
