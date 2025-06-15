import {
  Header,
  HeaderLogo,
} from '@/components/feature/header/header.component';
import { Navigation } from '@/components/feature/navigation';
import { QuickSearch } from '@/components/feature/quicksearch/quicksearch.component';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  CustomCategory,
  getTopCategories,
  TopCategoriesBlock,
} from '@/components/feature/top-categories';
import { Category } from '@/payload-types';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await getTopCategories();
  const formattedData: CustomCategory[] = data?.docs?.map((doc) => {
    const categoryDoc = doc as Category;
    return {
      ...categoryDoc,
      subcategories: (categoryDoc?.subcategories?.docs ?? [])?.map(
        (subDoc) => ({
          // Note: Because of depth: 1, we can safely assume subcategories are not nested further
          ...(subDoc as Category),
          subcategories: undefined, // Note: Prevent deep nesting
        })
      ),
    };
  });

  return (
    <>
      <Header className="h-20 px-4 flex flex-wrap border-b justify-between font-medium bg-blue-300">
        <Link href="/" className=" flex items-center">
          <HeaderLogo className={cn('font-normal font-poppins text-2xl')}>
            EALD EC
          </HeaderLogo>
        </Link>
        <Navigation />
      </Header>
      <QuickSearch />
      <TopCategoriesBlock data={formattedData} />
      <main className="flex-grow">{children}</main>
    </>
  );
};

export default PublicLayout;
