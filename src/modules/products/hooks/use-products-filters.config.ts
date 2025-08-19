import { useQueryStates } from 'nuqs';
import {
  parseAsString,
  createLoader,
  parseAsArrayOf,
  parseAsStringLiteral,
} from 'nuqs/server';

export const sortValues = ['relevance', 'price', 'name'] as const;

export const params = {
  sort: parseAsStringLiteral(sortValues).withDefault('relevance'),

  minPrice: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(''),

  maxPrice: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(''),

  tags: parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault([]),
};

export const useProductsFiltersConfig = () => {
  return useQueryStates(params);
};

export const loadProductFilters = createLoader(params);
