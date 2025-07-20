'use client';

import { useQueryState } from 'nuqs';
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { generatePagination } from './pagination.utils';
import { cn } from '@/lib/utils';
import { PaginationProps } from './pagination.types';

export function Pagination({ totalPages, className = '' }: PaginationProps) {
  const [page, setPage] = useQueryState('page', {
    defaultValue: '1',
    history: 'push',
    shallow: false,
    parse: (value) => value || '1',
  });

  const currentPage = Number(page);
  const { startPage, endPage, pageNumbers, isActivePage } = generatePagination(
    currentPage,
    totalPages
  );

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber.toString());
  };

  return (
    <PaginationRoot className={cn('flex justify-center mt-6', className)}>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            isActive={currentPage === 1}
            className={cn({
              'bg-blue-500 text-primary-foreground': isActivePage(1),
            })}
            onClick={() => {
              handlePageChange(1);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {startPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pageNumbers.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              isActive={pageNum === currentPage}
              className={cn({
                'bg-blue-500 text-primary-foreground': isActivePage(pageNum),
              })}
              onClick={() => {
                handlePageChange(pageNum);
              }}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === totalPages}
              className={cn({
                'bg-blue-500 text-primary-foreground': isActivePage(totalPages),
              })}
              onClick={() => {
                handlePageChange(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationRoot>
  );
}
