import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const Categories = ({ className = '', children }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};

export const CategoriesDropdown = ({
  className = '',
  children,
}: CommonProps) => {
  return (
    <div
      className={cn(
        'absolute top-full left-0 z-10 mt-2 w-full rounded-md bg-white shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
};
