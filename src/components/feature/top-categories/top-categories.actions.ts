// app/actions/getTopCategories.ts

'use server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { CollectionSlug, collectionSlugs } from '@/collections';

export const getTopCategories = async () => {
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: collectionSlugs.categories as CollectionSlug,
    depth: 1,
    where: {
      parent: { exists: false },
    },
    sort: 'name',
  });
  return data;
};
