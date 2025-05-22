import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const WrapperDesktopBlock = ({ className, children }: CommonProps) => {
  return <div className={cn('hidden lg:block', className)}>{children}</div>;
};
export const WrapperMobileBlock = ({ className, children }: CommonProps) => {
  return <div className={cn('lg:hidden', className)}>{children}</div>;
};
