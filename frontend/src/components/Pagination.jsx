import React from 'react';

export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Number of visible page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className='flex justify-between items-center mt-6'>
      {/* Items per page dropdown */}
      <div className='flex items-center gap-2'>
        <span>Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className='p-2 border border-gray-300 rounded'
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Page indicator */}
      <div className='flex items-center gap-2'>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Pagination buttons */}
      <div className='flex gap-2'>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='p-2 border border-gray-300 rounded disabled:opacity-50'
        >
          Previous
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`p-2 border border-gray-300 rounded ${
              currentPage === page ? 'bg-gray-200' : ''
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='p-2 border border-gray-300 rounded disabled:opacity-50'
        >
          Next
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className='p-2 border border-gray-300 rounded disabled:opacity-50'
        >
          Last
        </button>
      </div>
    </div>
  );
};