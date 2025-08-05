'use client';

import { Category } from '@/payload-types';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { cn, getUniqueId } from '@/lib/utils';
import { TopCategoriesViewAll } from './top-categories.component';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CommonProps } from '@/lib/types';
import { TopCategoriesDocType } from '@/modules/categories';

export const TopCategoriesBlock = ({ className = '' }: CommonProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc?.categories?.getTopLevelWithChildren?.queryOptions()
  );

  const topCategoriesData = data?.docs as TopCategoriesDocType[];

  return (
    <div className={cn('relative px-5 flex flex-col gap-4', className)}>
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="flex flex-wrap gap-2 lg:gap-4">
          {topCategoriesData?.map((category) => (
            <NavigationMenuItem key={getUniqueId(category?.id)}>
              <NavigationMenuTrigger
                className="w-[9.375rem] lg:w-[18.75rem] px-2 py-2"
                style={{
                  backgroundColor: category?.bgColor || 'transparent',
                }}
                onMouseDown={(e) => {
                  if (window?.innerWidth >= 1024) {
                    e.preventDefault();
                  }
                }}
                onClick={(e) => {
                  if (window?.innerWidth >= 1024) {
                    e.preventDefault();
                  }
                }}
              >
                <div className="w-full text-center truncate">
                  {category?.name}
                </div>
              </NavigationMenuTrigger>
              {Array.isArray(category?.subcategories) &&
                category?.subcategories?.length > 0 && (
                  <NavigationMenuContent className="absolute top-full z-50 w-[12.5rem] max-w-[90vw] lg:w-[18.75rem] lg:left-0 left-1/2 -translate-x-1/2 lg:translate-x-0 rounded-lg border bg-popover p-4 shadow-md">
                    <ul className="grid gap-2">
                      <NavigationMenuLink className="hover:bg-blue-300" asChild>
                        <Link
                          href={`/categories/${category?.slug}`}
                          className="px-2 font-semibold text-lg "
                        >
                          {category?.name}
                        </Link>
                      </NavigationMenuLink>
                      {category?.subcategories?.map((subCategory: Category) => (
                        <li
                          key={getUniqueId(subCategory?.id)}
                          className="rounded-lg"
                          style={{
                            backgroundColor:
                              subCategory?.bgColor || 'transparent',
                          }}
                          onClick={(e) => e.stopPropagation()} // Note: Prevents closing the menu when clicking on a subcategory
                        >
                          <NavigationMenuLink
                            className="hover:bg-blue-300"
                            asChild
                          >
                            <Link
                              href={`/categories/${category?.slug}/${subCategory?.slug}`}
                            >
                              <div className="font-medium line-clamp-1">
                                {subCategory?.name}
                              </div>
                              {subCategory?.description && (
                                <div className="text-xs text-muted-foreground line-clamp-2">
                                  {subCategory?.description}
                                </div>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                )}
            </NavigationMenuItem>
          ))}
          <TopCategoriesViewAll className="text-center">
            <Link href="/categories">View All</Link>
          </TopCategoriesViewAll>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
