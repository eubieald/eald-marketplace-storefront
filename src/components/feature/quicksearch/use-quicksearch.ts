'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useQueryState } from 'nuqs';
import { quickSearchSchema } from './quicksearch.schema';

export const useQuickSearch = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Using useQueryState from nuqs to manage the filter[search] param
  const [search, setSearch] = useQueryState('filter[search]', {
    defaultValue: '',
    history: 'push',
    shallow: false,
    parse: (value) => value,
  });

  const onSubmit = async (values: z.infer<typeof quickSearchSchema>) => {
    setIsLoading(true);
    const { freeWordSearch } = values;
    await setSearch(freeWordSearch?.trim() || null);
    setIsLoading(false);
  };

  return {
    onSubmit,
    isLoading,
    search,
  };
};
