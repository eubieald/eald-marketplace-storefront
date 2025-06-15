import { Category } from '@/payload-types';

export type CustomCategory = Category & {
  subcategories: Category[];
};

export type TopCategoriesBlockProps = {
  data: CustomCategory[];
};
