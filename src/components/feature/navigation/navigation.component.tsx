import Link from 'next/link';
import { NavigationItemProps } from './navigation.types';
import { cn } from '@/lib/utils';
import { CommonProps } from '@/lib/types';

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
