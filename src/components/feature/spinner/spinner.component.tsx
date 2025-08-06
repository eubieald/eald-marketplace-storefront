'use client';

import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const Spinner = ({ className }: CommonProps) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-white/50', // bg-white/50 is optional overlay
        className
      )}
    >
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
};
