import { Category } from '@/payload-types';
import { CategoriesProps } from './categories.types';
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

export const CategoriesBlock = ({
  data,
}: CategoriesProps & {
  className?: string;
}) => {
  console.log('CategoriesBlock data:', data);
  return (
    <div className="px-5 flex flex-col gap-4">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {data.map((category: Category) => (
            <NavigationMenuItem key={getUniqueId(category?.id)}>
              <NavigationMenuTrigger>
                <Link href={`/categories/${category?.slug}`}>
                  {category?.name}
                </Link>
              </NavigationMenuTrigger>
              {Array.isArray(category?.subcategories) &&
                category.subcategories.length > 0 && (
                  <NavigationMenuContent className={`bg-[${category?.color}]`}>
                    <ul className="grid w-[300px] gap-4">
                      {category.subcategories.map((subCategory: Category) => (
                        <li key={subCategory.id}>
                          <NavigationMenuLink asChild>
                            <Link href="#">
                              <div className="font-medium">
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
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
