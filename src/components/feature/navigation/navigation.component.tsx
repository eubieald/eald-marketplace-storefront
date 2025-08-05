import Link from 'next/link';
import { NavigationItemProps } from './navigation.types';
import { cn } from '@/lib/utils';
import { CommonProps } from '@/lib/types';
import { WrapperDesktopBlock, WrapperMobileBlock } from '../common';
import { MenuIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AuthenticationButtonGroup } from '../authentication';

export const NavigationBlock = ({ className, children }: CommonProps) => {
  return <div className={cn('flex', className)}>{children}</div>;
};

export const NavigationItem = ({
  href,
  children,
  isActive,
}: NavigationItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700',
        {
          'bg-black rounded-full hover:bg-gray-100 hover:text-black text-white dark:bg-gray-700':
            isActive,
        }
      )}
    >
      {children}
    </Link>
  );
};

export const NavigationSkeleton = ({ className }: { className?: string }) => {
  return (
    <>
      <WrapperDesktopBlock>
        <nav
          className={cn(
            'h-20 flex border-b justify-between font-medium',
            className
          )}
        >
          <NavigationBlock className="gap-4 items-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <NavigationItem key={index} href="/" isActive={false}>
                <Skeleton className="h-4 w-16 rounded" />
              </NavigationItem>
            ))}
          </NavigationBlock>
          <AuthenticationButtonGroup>
            <AuthenticationButtonGroup.Login className="border-l bg-white border-y-0 px-12 h-full rounded-none">
              <Skeleton className="h-4 w-16 rounded" />
            </AuthenticationButtonGroup.Login>
            <AuthenticationButtonGroup.Register className="border-r border-y-0 px-12 border-l-0 h-full bg-black text-white rounded-none">
              <Skeleton className="h-4 w-16 rounded" />
            </AuthenticationButtonGroup.Register>
          </AuthenticationButtonGroup>
        </nav>
      </WrapperDesktopBlock>

      <WrapperMobileBlock className="flex items-center">
        <Skeleton className="size-12 rounded flex items-center justify-center">
          <MenuIcon className="opacity-50" />
        </Skeleton>
      </WrapperMobileBlock>
    </>
  );
};
