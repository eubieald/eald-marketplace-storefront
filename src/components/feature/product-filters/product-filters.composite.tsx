'use client';

import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ProductFiltersOptions } from './product-filters.component';
import { Column, ColumnItem } from '../common/column';
import { Input } from '@/components/ui/input';
import { formatAsCurrency } from './product-filters.utils';
import { useProductsFilters } from '@/modules/products/hooks/use-products-filters';
import { usePriceFilterOption } from './use-price-option';

export const ProductFilters = ({ className }: CommonProps) => {
  const [filters, setFilters] = useProductsFilters();
  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const { minPrice, maxPrice, handleMinPriceChange, handleMaxPriceChange } =
    usePriceFilterOption({
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      onMinPriceChange: (value) => onChange('minPrice', value),
      onMaxPriceChange: (value) => onChange('maxPrice', value),
    });

  return (
    <div className={cn('', className)}>
      <h2 className="text-2xl font-bold">Product Filters</h2>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Product Information</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <ProductFiltersOptions.Price>
              <Column className="flex items-start flex-col gap-2">
                <h3>Price</h3>
                <ColumnItem className="flex flex-col gap-2">
                  <h3>Minimum Price:</h3>
                  <Input
                    type="text"
                    placeholder="₱0"
                    value={minPrice ? formatAsCurrency(minPrice) : ''}
                    onChange={handleMinPriceChange}
                  />
                </ColumnItem>
                <ColumnItem className="flex flex-col gap-2">
                  <h3>Maximum Price:</h3>
                  <Input
                    type="text"
                    placeholder="∞"
                    value={maxPrice ? formatAsCurrency(maxPrice) : ''}
                    onChange={handleMaxPriceChange}
                  />
                </ColumnItem>
              </Column>
            </ProductFiltersOptions.Price>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
