import React from 'react';


export const SortSection = ({ sortBy, setSortBy }) => {
  return (
    <select
      className='border-2 border-gray-300 text-sm px-2'
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value=''>Sort by</option>
      <option value='price-low-high'>Price: Low to High</option>
      <option value='price-high-low'>Price: High to Low</option>
      <option value='name-a-z'>Name: A-Z</option>
      <option value='name-z-a'>Name: Z-A</option>
    </select>
  );
};