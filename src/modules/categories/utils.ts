import { collectionSlugs } from '@/collections';
import { Category } from '@/payload-types';
import { BasePayload, CollectionSlug } from 'payload';

/**
 * Format a category and its subcategories to remove subcategory nesting.
 *
 * This takes a category and its subcategories, and returns a new object with the
 * same properties as the original category, plus a `subcategories` property with
 * the same subcategories as the original, but with their own `subcategories`
 * property removed.
 *
 * @param category - The category to format
 * @param subcategories - The subcategories to format
 * @returns The formatted category
 */
export const formatCategory = (
  category: Category,
  subcategories: Category[]
): Category & { subcategories: Category[] } => ({
  ...category,
  subcategories: subcategories.map((subcategory) => ({
    ...(subcategory as Category),
    subcategories: undefined,
  })),
});

export const getCategoryWithSubSlugs = async (
  ctx: { db: BasePayload },
  categorySlug: string
): Promise<string[]> => {
  const result = (await ctx.db.find({
    collection: collectionSlugs.categories as CollectionSlug,
    limit: 1,
    depth: 1,
    pagination: false,
    where: { slug: { equals: categorySlug } },
  })) as { docs: Category[] };

  if (result.docs.length === 0) return [];

  const categoryDoc = result.docs[0];
  const subcategories = (categoryDoc.subcategories?.docs ?? []) as Category[];
  const formattedCategory = formatCategory(categoryDoc, subcategories);

  return [
    formattedCategory.slug,
    ...formattedCategory.subcategories.map((sub) => sub.slug),
  ];
};
