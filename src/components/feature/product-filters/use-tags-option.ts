import { TAGS_DEFAULT_LIMIT } from '@/modules/tags/constants';
import { useTRPC } from '@/trpc/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TagsFilterOptionType } from './product-filter.types';

export const useTagsOption = ({
  value,
  onTagsOptionChange,
}: TagsFilterOptionType) => {
  const trpc = useTRPC();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc?.tags?.getAll.infiniteQueryOptions(
        {
          limit: TAGS_DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage?.docs?.length > 0 ? lastPage?.nextPage : undefined;
          },
        }
      )
    );

  const onTagsOptionClick = (tag: string) => {
    if (value?.includes(tag)) {
      onTagsOptionChange(value?.filter((item) => item !== tag));
    } else {
      onTagsOptionChange([...(value || []), tag]);
    }
  };

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    onTagsOptionClick,
  };
};
