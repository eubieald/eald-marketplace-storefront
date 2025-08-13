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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tag } from '@/payload-types';
import { LoaderIcon, RefreshCcw } from 'lucide-react';
import { useProductFilters } from './use-product-filters';

export const ProductFilters = ({ className }: CommonProps) => {
  const {
    filters,
    resetFilters,
    priceOption: {
      minPrice,
      maxPrice,
      handleMinPriceChange,
      handleMaxPriceChange,
    },
    tagsOption: {
      data,
      isLoading,
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
      onTagsOptionClick,
    },
  } = useProductFilters();

  return (
    <div className={cn('', className)}>
      {/* Filters Header */}
      <Column className="flex flex-row justify-between gap-2">
        <h2 className="text-sm font-bold text-black">Filters</h2>
        <Button
          variant="ghost"
          className="text-xs border-0 bg-transparent text-black"
          onClick={resetFilters}
        >
          <Column className="flex flex-row gap-2">
            <span>Reset</span>
            <RefreshCcw className="size-4" />
          </Column>
        </Button>
      </Column>

      {/* Accordion */}
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-tags"
      >
        {/* Price Filter */}
        <AccordionItem value="item-price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <ProductFiltersOptions.Price>
              <Column className="flex items-start flex-col gap-2">
                <ColumnItem className="flex flex-col gap-2 w-full">
                  <h3>Minimum Price:</h3>
                  <Input
                    type="text"
                    placeholder="₱0"
                    value={minPrice ? formatAsCurrency(minPrice) : ''}
                    onChange={handleMinPriceChange}
                  />
                </ColumnItem>
                <ColumnItem className="flex flex-col gap-2 w-full">
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

        {/* Tags Filter */}
        <AccordionItem value="item-tags">
          <AccordionTrigger>Tags</AccordionTrigger>
          <AccordionContent>
            <ProductFiltersOptions.Tags>
              <Column className="flex items-start flex-col gap-2">
                <ColumnItem className="flex flex-col gap-2 w-full">
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <LoaderIcon className="animate-spin" />
                    </div>
                  ) : (
                    <>
                      {data?.pages?.map((page) =>
                        page?.docs?.map((tagData) => {
                          const tag = tagData as Tag;
                          return (
                            <Column
                              key={tag.id}
                              className="flex flex-row items-center gap-5"
                            >
                              <p>{tag.name}</p>
                              <Checkbox
                                checked={filters.tags?.includes(tag?.name)}
                                onCheckedChange={() =>
                                  onTagsOptionClick(tag?.name)
                                }
                                className="ml-auto"
                              />
                            </Column>
                          );
                        })
                      )}

                      {hasNextPage && (
                        <Button
                          className="w-full cursor-pointer"
                          onClick={() => fetchNextPage()}
                          disabled={!hasNextPage || isFetchingNextPage}
                        >
                          {isFetchingNextPage ? 'Loading...' : 'Load More'}
                        </Button>
                      )}
                    </>
                  )}
                </ColumnItem>
              </Column>
            </ProductFiltersOptions.Tags>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
