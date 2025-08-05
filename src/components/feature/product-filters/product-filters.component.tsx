import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const ProductFiltersOptions = ({ className, children }: CommonProps) => {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
};

export const ProductFiltersPriceOption = ({
  className,
  children,
}: CommonProps) => {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
};

ProductFiltersOptions.Price = ProductFiltersPriceOption;
