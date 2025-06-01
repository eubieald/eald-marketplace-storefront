import type { CollectionConfig, CollectionSlug } from 'payload';
import { collectionSlugs } from './collections.utils';

export const Categories: CollectionConfig = {
  slug: collectionSlugs.categories,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'color',
      type: 'text',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: collectionSlugs.categories as CollectionSlug,
      hasMany: false,
    },
    {
      name: 'subcategories',
      type: 'join',
      collection: collectionSlugs.categories as CollectionSlug,
      on: 'parent',
    },
  ],
};
