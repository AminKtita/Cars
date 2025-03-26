import React from 'react';

export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
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
    <div className='flex flex-col md:flex-row gap-4 justify-between items-center mt-6'>
      {/* Left Section - Items per page */}
      <div className='flex items-center gap-2'>
        <span className='text-sm md:text-base'>Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className='p-1 md:p-2 text-sm md:text-base border border-gray-300 rounded'
        >
          {[10, 20, 30, 50].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Center Section - Page Info */}
      <div className='text-sm md:text-base whitespace-nowrap'>
        Page {currentPage} of {totalPages}
      </div>

      {/* Right Section - Pagination Controls */}
      <div className='w-full md:w-auto flex items-center gap-1 md:gap-2 overflow-x-auto'>
        <div className='flex items-center gap-1 md:gap-2 flex-nowrap'>
          <NavButton
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            title='First'
          />
          <NavButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title='Previous'
          />

          {/* Page Numbers */}
          <div className='flex gap-1 md:gap-2'>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-[32px] p-1 md:p-2 text-sm md:text-base border border-gray-300 rounded ${
                  currentPage === page ? 'bg-gray-200 font-medium' : ''
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <NavButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title='Next'
          />
          <NavButton
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            title='Last'
          />
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ onClick, disabled, title }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-2 md:px-3 py-1 md:py-2 text-sm md:text-base border border-gray-300 rounded disabled:opacity-50
      whitespace-nowrap min-w-[60px] md:min-w-[80px]`}
  >
    {title}
  </button>
);