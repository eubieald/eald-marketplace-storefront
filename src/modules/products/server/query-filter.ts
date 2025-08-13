import { BasePayload, Where } from 'payload';
import { ProductsQueryFilterType } from '../types';
import { getCategoryWithSubSlugs } from '@/modules/categories';

export async function productsQueryFilter(
  ctx: { db: BasePayload },
  input: ProductsQueryFilterType
): Promise<Where> {
  const where: Where = {};

  if (input?.minPrice) {
    where['price'] = { greater_than_equal: input?.minPrice };
  }

  if (input?.maxPrice) {
    where['price'] = {
      ...where['price'],
      less_than_equal: input?.maxPrice,
    };
  }

  if (input?.category) {
    const slugs = await getCategoryWithSubSlugs(ctx, input?.category);
    if (slugs?.length > 0) {
      where['category.slug'] = { in: slugs };
    }
  }

  if (input?.tags && input?.tags?.length > 0) {
    where['tags.name'] = { in: input?.tags };
  }

  return where;
}
