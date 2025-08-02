import { collectionSlugs } from '@/collections';
import { Category } from '@/payload-types';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { CollectionSlug } from 'payload';
import { z } from 'zod';
import { formatCategory } from '../utils';

export const categoriesRouter = createTRPCRouter({
  /**
   * Fetch top-level categories and their immediate children.
   */
  getTopLevelWithChildren: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx?.db?.find({
      collection: collectionSlugs?.categories as CollectionSlug,
      depth: 1,
      where: {
        parent: { exists: false },
      },
      sort: 'name',
    });

    const formattedData = (data?.docs ?? []).map((doc) => {
      const category = doc as Category;
      const subcategories = (category?.subcategories?.docs ?? []) as Category[];
      return formatCategory(category, subcategories);
    });

    return {
      docs: formattedData,
    };
  }),

  /**
   * Paginated fetch for categories (e.g., list view).
   * Optimized for performance: no children loaded by default.
   */
  getPaginated: baseProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
        includeChildren: z.boolean().optional().default(false), // optional
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, limit, includeChildren } = input;

      const data = await ctx.db.find({
        collection: collectionSlugs?.categories as CollectionSlug,
        depth: includeChildren ? 1 : 0,
        pagination: true,
        sort: 'name',
        page,
        limit,
      });

      const formattedData = (data?.docs ?? []).map((doc) => {
        const category = doc as Category;
        if (includeChildren) {
          const subcategories = (category?.subcategories?.docs ??
            []) as Category[];
          const formatted = formatCategory(category, subcategories);
          return {
            ...formatted,
            subcategories: { docs: formatted?.subcategories },
          };
        } else {
          return category;
        }
      });

      return {
        docs: formattedData,
        page: data?.page ?? 1,
        totalPages: data?.totalPages ?? 1,
        totalDocs: data?.totalDocs ?? 0,
        hasNextPage: data?.hasNextPage ?? false,
        hasPrevPage: data?.hasPrevPage ?? false,
      };
    }),
});
