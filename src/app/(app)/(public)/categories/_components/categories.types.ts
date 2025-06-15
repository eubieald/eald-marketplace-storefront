import { Category } from '@/payload-types';

export type PaginatedCategories = {
  docs: Category[];
  page: number;
  totalPages: number;
  totalDocs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
