'use client';

import { Category } from '@/payload-types';
import { TopCategoriesBlockProps } from './top-categories.types';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { getUniqueId } from '@/lib/utils';
import { TopCategoriesViewAll } from './top-categories.component';

export const TopCategoriesBlock = ({
  data,
}: TopCategoriesBlockProps & {
  className?: string;
}) => {
  return (
    <div className="relative px-5 flex flex-col gap-4">
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="flex flex-wrap gap-2 lg:gap-4">
          {data.map((category: Category) => (
            <NavigationMenuItem key={getUniqueId(category?.id)}>
              <NavigationMenuTrigger
                className="w-[9.375rem] lg:w-[18.75rem] px-2 py-2"
                style={{
                  backgroundColor: category?.bgColor || 'transparent',
                }}
              >
                <div className="w-full text-center truncate">
                  {category?.name}
                </div>
              </NavigationMenuTrigger>
              {Array.isArray(category?.subcategories) &&
                category.subcategories.length > 0 && (
                  <NavigationMenuContent className="absolute left-0 top-full z-50 lg:w-[18.75rem] w-[9.375rem] rounded-lg border bg-popover p-4 shadow-md">
                    <ul className="grid gap-2">
                      {category.subcategories.map((subCategory: Category) => (
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
                              <div className="text-muted-foreground">
                                {subCategory?.description}
                              </div>
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
