export const collectionSlugs = {
  categories: 'categories',
  media: 'media',
  users: 'users',
} as const;

export type CollectionSlug =
  (typeof collectionSlugs)[keyof typeof collectionSlugs];
