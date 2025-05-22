import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const Header = ({ children, className }: CommonProps) => {
  return <header className={cn('', className)}>{children}</header>;
};

export const HeaderLogo = ({ children, className }: CommonProps) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const HeaderTitle = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        'rounded-lg bg-orange-100 px-5 py-2 text-lg leading-[1.5rem] font-bold text-white',
        className
      )}
    >
      {children}
    </div>
  );
};
