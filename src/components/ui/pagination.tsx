import * as React from 'react';
import {Button} from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  windowSize?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                        currentPage,
                                                        totalPages,
                                                        onPageChange,
                                                        windowSize = 2,
                                                      }) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    const start = Math.max(1, currentPage - windowSize);
    const end = Math.min(totalPages, currentPage + windowSize);

    if (start > 1) pages.push(1); // первая страница
    if (start > 2) pages.push('...'); // если есть пропуск

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('...'); // если есть пропуск
    if (end < totalPages) pages.push(totalPages); // последняя страница

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center gap-2 mt-6">
      {currentPage > 1 && (
        <Button className="transition-colors border bg-transparent border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer" onClick={() => onPageChange(currentPage - 1)}>Prev</Button>
      )}

      {pages.map((p, i) =>
        typeof p === 'number' ? (
          <Button
            key={i}
            variant={p === currentPage ? 'default' : 'outline'}
            onClick={() => onPageChange(p)}
            className="transition-colors border border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer"
          >
            {p}
          </Button>
        ) : (
          <span key={i} className="px-2 py-1 text-muted-foreground">
            {p}
          </span>
        )
      )}

      {currentPage < totalPages && (
        <Button className="transition-colors border bg-transparent border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer" onClick={() => onPageChange(currentPage + 1)}>Next</Button>
      )}
    </div>
  );
};
