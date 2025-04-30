import React from 'react';

export const SortSection = ({ sortBy, setSortBy }) => {
  return (
    <div className="relative">
      <select
        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-md text-sm 
                 focus:ring-2 focus:ring-red-200 focus:border-red-600
                 appearance-none bg-no-repeat bg-[center_right_1rem]"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="" className="text-gray-400">Sort by</option>
        <option value="price-low-high" className="text-gray-700">Price: Low to High</option>
        <option value="price-high-low" className="text-gray-700">Price: High to Low</option>
        <option value="name-a-z" className="text-gray-700">Name: A-Z</option>
        <option value="name-z-a" className="text-gray-700">Name: Z-A</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-red-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};