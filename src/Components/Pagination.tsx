"use client"
import React, { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  entryCount: number;
  onPageChange: (page: number) => void;
  totalPages?: number; // Optional prop for handling total pages instead of entryCount
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  entryCount,
  onPageChange,
}) => {
  const totalPages = Math.ceil(entryCount / itemsPerPage);
  const [goToPage, setGoToPage] = useState<number>(currentPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 7; // Maximum visible pages (change as needed)

    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, currentPage + 3);

    if (totalPages <= maxVisiblePages) {
      // Render all pages if total pages are less than max visible
      startPage = 1;
      endPage = totalPages;
    } else {
      // Adjust start and end page based on current page
      if (currentPage <= 4) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 3) {
        startPage = totalPages - maxVisiblePages + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`sm:px-4 sm:py-2 px-2 py-1 mx-1 rounded-lg dark:text-black ${
            currentPage === i
              ? 'bg-blue-500 text-white font-bold'
              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(<span key="ellipsis-end" className="mx-2">...</span>);
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`sm:px-4 sm:py-2 px-2 py-1 mx-1 rounded-lg dark:text-black ${
            currentPage === totalPages
              ? 'bg-blue-500 text-white font-bold'
              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  const handleGoToPage = () => {
    if (goToPage > 0 && goToPage <= totalPages) {
      onPageChange(goToPage);
    }
  };

  return (
    <div className="flex items-center justify-center sm:w-[90%] w-full my-3 mx-auto p-2">
      <button
        className={`sm:px-4 sm:py-2 px-2 py-1 bg-white rounded-lg dark:text-black ${
          currentPage === 1 ? 'cursor-not-allowed text-gray-400' : ''
        }`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <div className="flex flex-wrap items-center justify-center mx-2">
        {renderPageNumbers()}
      </div>

      {/* Go to Page Input */}
      <div className="flex items-center mx-2">
        <input
          type="number"
          value={goToPage}
          onChange={(e) => setGoToPage(Number(e.target.value))}
          className="px-2 py-1 border rounded-lg text-gray-700"
          min={1}
          max={totalPages}
        />
        <button
          onClick={handleGoToPage}
          className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-lg"
        >
          Go
        </button>
      </div>

      <button
        className={`sm:px-4 sm:py-2 px-2 py-1 bg-white rounded-lg dark:text-black ${
          currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : ''
        }`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
