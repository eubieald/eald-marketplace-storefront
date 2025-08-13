export type PriceFilterOptionType = {
  minPrice: string | null;
  maxPrice: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
};

export type TagsFilterOptionType = {
  value: (string | null)[] | null;
  onTagsOptionChange: (value: (string | null)[]) => void;
};
