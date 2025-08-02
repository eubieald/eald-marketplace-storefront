import { collectionSlugs } from '@/collections';
import { getCategoryWithSubSlugs } from '@/modules/categories/utils';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { CollectionSlug, Where } from 'payload';
import z from 'zod';

export const productsRouter = createTRPCRouter({
  getAll: baseProcedure
    .input(z.object({ category: z.string().nullable().optional() }))
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      if (input?.category) {
        const slugs = await getCategoryWithSubSlugs(ctx, input.category);
        if (slugs.length > 0) {
          where['category.slug'] = { in: slugs };
        }
      }

      const data = await ctx.db.find({
        collection: collectionSlugs.products as CollectionSlug,
        depth: 1,
        where,
      });

      return data;
    }),
});
