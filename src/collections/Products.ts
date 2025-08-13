import type { CollectionConfig, CollectionSlug } from 'payload';
import { collectionSlugs } from './collections.utils';

export const Products: CollectionConfig = {
  slug: collectionSlugs.products,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'in PHP',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: collectionSlugs.categories as CollectionSlug,
      hasMany: false,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: collectionSlugs.tags as CollectionSlug,
      hasMany: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: collectionSlugs.media as CollectionSlug,
    },
    {
      name: 'refundPolicy',
      type: 'select',
      options: ['7-day', '14-day', '30-day', '60-day', 'no-refunds'],
      defaultValue: '30-day',
    },
  ],
};
