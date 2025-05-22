import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const columnVariants = cva('flex items-center', {
  variants: {
    variant: {
      default: '',
      'filter-form':
        'flex w-full flex-row flex-wrap lg:flex-nowrap items-end gap-5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const Column = ({
  className,
  children,
  variant = 'default',
}: CommonProps & {
  variant?: 'default' | 'filter-form';
}) => {
  return (
    <div className={cn(columnVariants({ variant }), className)}>{children}</div>
  );
};

// If you do not want to explicitly Left or Right, you can use ColumnItem instead of Column and ColumnItem will be the default ColumnLeft and ColumnRight wrapper
export const ColumnItem = ({ className, children }: CommonProps) => {
  return (
    <div className={cn('flex min-w-0 flex-col', className)}>{children}</div>
  );
};

export const ColumnLeft = ({ className, children }: CommonProps) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const ColumnRight = ({ className, children }: CommonProps) => {
  return <div className={cn('', className)}>{children}</div>;
};

type ColumnRowItemProps = {
  children: React.ReactNode;
  className?: string;
};

export const ColumnRowItem = ({ children, className }: ColumnRowItemProps) => {
  return (
    <div
      className={cn(
        'flex w-full max-w-[28.125rem] flex-col gap-y-5',
        className
      )}
    >
      {children}
    </div>
  );
};

type ColumnTwoRowProps = {
  children: React.ReactNode;
  className?: string;
};

export const ColumnTwoRow = ({ children, className }: ColumnTwoRowProps) => {
  return (
    <div className={cn('mb-10 flex justify-between gap-4', className)}>
      {children}
    </div>
  );
};
