export const generatePagination = (currentPage: number, totalPages: number) => {
  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  const isActivePage = (page: number) => page === currentPage;
  return { startPage, endPage, pageNumbers, isActivePage };
};
