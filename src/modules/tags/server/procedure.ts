import { collectionSlugs } from '@/collections';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { CollectionSlug } from 'payload';
import z from 'zod';
import { TAGS_DEFAULT_LIMIT } from '../constants';

export const tagsRouter = createTRPCRouter({
  getAll: baseProcedure
    .input(
      z.object({
        cursor: z.number().optional().default(1),
        limit: z.number().optional().default(TAGS_DEFAULT_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: collectionSlugs?.tags as CollectionSlug,
        page: input?.cursor,
        limit: input?.limit,
      });

      return data;
    }),
});
