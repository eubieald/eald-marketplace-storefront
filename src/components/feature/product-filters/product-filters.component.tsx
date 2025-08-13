import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Column, ColumnItem } from '../common/column';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@radix-ui/react-checkbox';

export const ProductFiltersOptions = ({ className, children }: CommonProps) => {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
};

export const ProductFiltersPriceOption = ({
  className,
  children,
}: CommonProps) => {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
};

export const ProductFiltersTagsOption = ({
  className,
  children,
}: CommonProps) => {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
};

ProductFiltersOptions.Price = ProductFiltersPriceOption;
ProductFiltersOptions.Tags = ProductFiltersTagsOption;
