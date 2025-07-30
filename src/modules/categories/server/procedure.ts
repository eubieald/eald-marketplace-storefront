import { collectionSlugs } from '@/collections';
import { Category } from '@/payload-types';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { CollectionSlug } from 'payload';
import { z } from 'zod';

/**
 * Optional formatter to remove nested sub-subcategories.
 * Used only when depth > 0
 */
function formatCategory(category: Category): Category {
  return {
    ...category,
    subcategories: {
      docs: (category?.subcategories?.docs ?? []).map((sub) => ({
        ...(sub as Category),
        subcategories: undefined,
      })),
    },
  };
}

export const categoriesRouter = createTRPCRouter({
  /**
   * Fetch top-level categories and their immediate children.
   */
  getTopLevelWithChildren: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: collectionSlugs.categories as CollectionSlug,
      depth: 1,
      where: {
        parent: { exists: false },
      },
      sort: 'name',
    });

    const formattedData = data?.docs?.map((doc) => {
      const categoryDoc = doc as Category;

      return {
        ...categoryDoc,
        subcategories: (categoryDoc?.subcategories?.docs ?? []).map(
          (subDoc) => ({
            ...(subDoc as Category),
            subcategories: undefined, // Strip further nesting
          })
        ),
      };
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
        collection: collectionSlugs.categories as CollectionSlug,
        depth: includeChildren ? 1 : 0,
        pagination: true,
        sort: 'name',
        page,
        limit,
      });

      const formattedData = (data.docs ?? []).map((doc) => {
        const category = doc as Category;
        return includeChildren ? formatCategory(category) : category;
      });

      return {
        docs: formattedData,
        page: data.page ?? 1,
        totalPages: data.totalPages ?? 1,
        totalDocs: data.totalDocs ?? 0,
        hasNextPage: data.hasNextPage ?? false,
        hasPrevPage: data.hasPrevPage ?? false,
      };
    }),
});
