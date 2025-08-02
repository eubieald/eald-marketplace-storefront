// app/actions/getTopCategories.ts

'use server';
import { CollectionSlug, getPayload } from 'payload';
import configPromise from '@payload-config';
import { collectionSlugs } from '@/collections';

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
