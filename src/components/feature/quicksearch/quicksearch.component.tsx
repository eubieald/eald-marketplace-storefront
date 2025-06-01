'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { CommonProps } from '@/lib/types';
import { useQuickSearch } from './use-quicksearch';
import { GenericInputSearch } from '../form/generic-input';
import { quickSearchSchema } from './quicksearch.schema';
import { formConfig } from '../form/form.config';

export const QuickSearch = ({ className = '' }: CommonProps) => {
  const form = useForm<z.infer<typeof quickSearchSchema>>({
    mode: formConfig.mode,
    reValidateMode: formConfig.reValidateMode,
    criteriaMode: 'all',
    resolver: zodResolver(quickSearchSchema),
    defaultValues: {
      freeWordSearch: '',
    },
  });

  const { onSubmit } = useQuickSearch();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('p-5 flex h-full flex-wrap gap-5', className)}
      >
        {/* Search */}
        <GenericInputSearch
          formHook={form}
          inputProps={{
            name: 'freeWordSearch',
            placeholder: 'search for keywords...',
            className:
              'text-grey-main tracking-[.0625rem] h-[2.6875rem] text-base font-inter border-orange-100',
          }}
          formItemProps={{
            className: 'gap-0 w-full',
          }}
          label=""
        />
      </form>
    </Form>
  );
};
