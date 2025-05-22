import {
  Header,
  HeaderLogo,
} from '@/components/feature/header/header.component';
import { Navigation } from '@/components/feature/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
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
      <main className="flex-grow">{children}</main>
    </>
  );
};

export default PublicLayout;
