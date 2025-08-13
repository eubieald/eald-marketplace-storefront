'use client';

import { useProductsFiltersConfig } from '@/modules/products/hooks/use-products-filters.config';
import { usePriceFilterOption } from './use-price-option';
import { useTagsOption } from './use-tags-option';

export const useProductFilters = () => {
  const [filters, setFilters] = useProductsFiltersConfig();

  const onFiltersChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const priceOption = usePriceFilterOption({
    minPrice: filters?.minPrice,
    maxPrice: filters?.maxPrice,
    onMinPriceChange: (value) => onFiltersChange('minPrice', value),
    onMaxPriceChange: (value) => onFiltersChange('maxPrice', value),
  });

  const tagsOption = useTagsOption({
    value: filters?.tags,
    onTagsOptionChange: (value) => onFiltersChange('tags', value),
  });

  const resetFilters = () =>
    setFilters({ minPrice: '', maxPrice: '', tags: [] });

  return {
    filters,
    onFiltersChange,
    resetFilters,
    priceOption,
    tagsOption,
  };
};
