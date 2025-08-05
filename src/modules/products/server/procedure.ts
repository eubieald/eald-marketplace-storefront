import { collectionSlugs } from '@/collections';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { CollectionSlug } from 'payload';
import z from 'zod';
import { productsQueryFilter } from './query-filter';

export const productsRouter = createTRPCRouter({
  getAll: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where = await productsQueryFilter(ctx, input);

      const data = await ctx.db.find({
        collection: collectionSlugs.products as CollectionSlug,
        depth: 1,
        where,
      });

      return data;
    }),
});
