'use client';

import { ChangeEvent } from 'react';
import { PriceFilterOptionType } from './product-filter.types';

export const usePriceFilterOption = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceFilterOptionType) => {
  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    // NOTE: Remove non-numeric characters
    const numericValue = event?.target?.value?.replace(/[^0-9]/g, '');
    onMinPriceChange(numericValue);
  };

  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    // NOTE: Remove non-numeric characters
    const numericValue = event?.target?.value?.replace(/[^0-9]/g, '');
    onMaxPriceChange(numericValue);
  };

  return {
    minPrice,
    maxPrice,
    handleMinPriceChange,
    handleMaxPriceChange,
  };
};
