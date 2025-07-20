import { collectionSlugs } from '@/collections';
import { Category } from '@/payload-types';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { CollectionSlug } from 'payload';
import { z } from 'zod';

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
  getTopLevelWithChildren: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: collectionSlugs.categories as CollectionSlug,
      depth: 1, // Include 1 level of children
      where: {
        parent: { exists: false }, // Top-level categories only
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
            subcategories: undefined,
          })
        ),
      };
    });

    return {
      docs: formattedData,
    };
  }),

  getPaginated: baseProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, limit } = input;
      const data = await ctx.db.find({
        collection: collectionSlugs.categories as CollectionSlug,
        depth: 1,
        pagination: true,
        sort: 'name',
        page,
        limit,
      });

      const formattedData = (data.docs ?? []).map((doc) =>
        formatCategory(doc as Category)
      );

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
