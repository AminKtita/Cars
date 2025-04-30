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
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-6">
      {/* Items per page */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Items per page:</span>
        <div className="relative">
          <select
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            className="pl-3 pr-8 py-1.5 text-sm border-2 border-gray-200 rounded-md 
                     focus:ring-2 focus:ring-red-200 focus:border-red-600 appearance-none"
          >
            {[12, 24, 36, 48].map((size) => (
              <option key={size} value={size} className="text-sm">{size}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-red-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Page info */}
      <div className="text-sm text-gray-600 whitespace-nowrap">
        Page {currentPage} of {totalPages}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        <NavButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          title="First"
        />
        <NavButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Previous"
        />

        {/* Page numbers */}
        <div className="flex gap-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[32px] px-2 py-1 text-sm border-2 rounded-md transition-colors
                ${
                  currentPage === page
                    ? 'border-red-600 bg-red-50 text-red-900 font-medium'
                    : 'border-gray-200 text-gray-700 hover:border-red-400'
                }`}
            >
              {page}
            </button>
          ))}
        </div>

        <NavButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Next"
        />
        <NavButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          title="Last"
        />
      </div>
    </div>
  );
};

const NavButton = ({ onClick, disabled, title }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-1 text-sm border-2 border-gray-200 rounded-md transition-colors
      ${disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'text-gray-700 hover:border-red-400 hover:text-red-900'}
      whitespace-nowrap`}
  >
    {title}
  </button>
);