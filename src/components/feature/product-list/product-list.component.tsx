import { cn } from '@/lib/utils';
import { CommonProps } from '@/lib/types';
import { Product } from '@/payload-types';
import { formatAsCurrency } from '../product-filters';

export const ProductListItem = ({
  className,
  product,
}: CommonProps & {
  product: Product;
}) => {
  return (
    <div
      className={cn(
        'border rounded-xl p-4 flex flex-col hover:shadow-md transition-shadow',
        className
      )}
    >
      <h2 className="text-lg font-semibold line-clamp-2">{product?.name}</h2>
      <p className="text-base font-medium mt-auto">
        {formatAsCurrency(String(product?.price))}
      </p>
    </div>
  );
};
