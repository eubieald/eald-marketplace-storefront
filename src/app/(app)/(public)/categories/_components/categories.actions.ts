import { collectionSlugs } from '@/collections';
import { Category } from '@/payload-types';
import { CollectionSlug, getPayload } from 'payload';
import configPromise from '@payload-config';
import { PaginatedCategories } from './categories.types';

export const getAllCategories = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<PaginatedCategories> => {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: collectionSlugs.categories as CollectionSlug,
    sort: 'name',
    depth: 1,
    pagination: true,
    page,
    limit,
  });

  return {
    docs: result.docs as Category[],
    page: result.page ?? 1,
    totalPages: result.totalPages,
    totalDocs: result.totalDocs,
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
  };
};
