import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const Categories = ({ className, children }: CommonProps) => {
  return <div className={cn('', className)}>{children}</div>;
};
