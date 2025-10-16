import {
  Header,
  HeaderLogo,
} from '@/components/feature/header/header.component';
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
  const queryclient = getQueryClient();
  await queryclient.prefetchQuery(
    trpc.categories.getTopLevelWithChildren.queryOptions()
  );
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '';

  return (
    <>
      <Header className={cn('backdrop-blur-md bg-blue-300 border-b shadow-sm')}>
        <div className="flex items-center justify-between h-16 px-6">
          <Link href="/" className="flex items-center">
            <HeaderLogo className="font-bold text-xl tracking-tight">
              EALD EC
            </HeaderLogo>
          </Link>

          {/* Inline Search in Header */}
          <div className="hidden md:block flex-1 px-6">
            <QuickSearch />
          </div>

          <NavigationBoundaryClient pathname={pathname || ''} />
        </div>
      </Header>

      {/* Categories Bar (non-sticky) */}
      <div className="bg-gray-50 border-b">
        <HydrationBoundary state={dehydrate(queryclient)}>
          <Suspense fallback={<Spinner />}>
            <TopCategoriesBlock className="flex  gap-3 px-4 py-2 " />
          </Suspense>
        </HydrationBoundary>
      </div>

      {/* Content */}
      <main className="flex-grow px-4 py-6">{children}</main>
    </>
  );
};

export default PublicLayout;
