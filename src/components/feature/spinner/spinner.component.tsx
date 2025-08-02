'use client';

import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const Spinner = ({ className }: CommonProps) => {
  return (
    <div className={cn('flex items-center justify-center h-screen', className)}>
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
};
