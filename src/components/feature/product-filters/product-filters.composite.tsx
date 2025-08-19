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
    <aside
      className={cn(
        'sticky top-0 w-64 shrink-0 rounded-2xl bg-white p-4 shadow-sm border border-gray-200',
        'dark:bg-gray-900 dark:border-gray-800',
        className
      )}
    >
      {/* inner scroll area */}
      <div className="max-h-[calc(100vh-5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent pr-2">
        {/* Filters Header */}
        <Column className="flex flex-row justify-between items-center gap-2 mb-4 bg-gray-100 px-3 py-2 rounded-xl">
          <h2 className="text-sm font-bold text-black">Filters</h2>
          <Button
            variant="ghost"
            className="text-xs border-0 bg-transparent text-black hover:text-red-600"
            onClick={resetFilters}
          >
            <Column className="flex flex-row gap-1 items-center">
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
            <AccordionTrigger className="rounded-md  text-black px-3 py-2">
              Price
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-2">
              <ProductFiltersOptions.Price>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="₱0"
                    value={minPrice ? formatAsCurrency(minPrice) : ''}
                    onChange={handleMinPriceChange}
                    className="bg-white dark:bg-gray-800 max-h-[2.125rem]"
                  />
                  <span className="text-gray-500 dark:text-gray-400">~</span>
                  <Input
                    type="text"
                    placeholder="∞"
                    value={maxPrice ? formatAsCurrency(maxPrice) : ''}
                    onChange={handleMaxPriceChange}
                    className="bg-white dark:bg-gray-800 max-h-[2.125rem]"
                  />
                </div>
              </ProductFiltersOptions.Price>
            </AccordionContent>
          </AccordionItem>

          {/* Tags Filter */}
          <AccordionItem value="item-tags">
            <AccordionTrigger className="rounded-md  text-black px-3 py-2">
              Tags
            </AccordionTrigger>
            <AccordionContent className="mt-2">
              <ProductFiltersOptions.Tags>
                <Column className="flex flex-col gap-3">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <LoaderIcon className="animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap gap-2">
                        {data?.pages?.map((page) =>
                          page?.docs?.map((tagData) => {
                            const tag = tagData as Tag;
                            const isChecked = filters.tags?.includes(tag?.name);
                            return (
                              <button
                                key={tag.id}
                                type="button"
                                onClick={() => onTagsOptionClick(tag?.name)}
                                className={cn(
                                  'px-3 py-1 rounded-full border text-sm transition-all',
                                  isChecked
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-blue-100 text-black border-blue-200 hover:bg-blue-200'
                                )}
                              >
                                {tag.name}
                              </button>
                            );
                          })
                        )}
                      </div>

                      {hasNextPage && (
                        <Button
                          className="w-full cursor-pointer mt-3 bg-blue-300 text-black hover:bg-blue-400"
                          onClick={() => fetchNextPage()}
                          disabled={!hasNextPage || isFetchingNextPage}
                        >
                          {isFetchingNextPage ? 'Loading...' : 'Load More'}
                        </Button>
                      )}
                    </>
                  )}
                </Column>
              </ProductFiltersOptions.Tags>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};
