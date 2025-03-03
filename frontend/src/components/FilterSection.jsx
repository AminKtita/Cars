import React from 'react';
import { assets } from '../assets/assets';

export const FilterSection = ({
  showFilter,
  setShowFilter,
  brands,
  models,
  selectedBrand,
  setSelectedBrand,
  selectedModel,
  setSelectedModel,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minPowerCV,
  setMinPowerCV,
  maxPowerCV,
  setMaxPowerCV,
  resetFilters,
}) => {
  return (
    <div className='min-w-60 md:w-48 lg:w-60'>
      {/* Filter Toggle and Reset Button */}
      <div className='flex justify-between items-center'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-x1 flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=''
          />
        </p>
        {/* RESET BUTTON (CROSS ICON) */}
        <button
          className='p-2 hover:bg-gray-100 rounded-full transition-all duration-300'
          onClick={resetFilters}
        >
          <img src={assets.cross_icon} alt='Reset Filters' className='w-4 h-4' />
        </button>
      </div>

      {/* Filters */}
      <div className={`border border-gray-300 px-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>BRAND</p>
        <select
          className='w-full p-2 border border-gray-300 rounded'
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value=''>All Brands</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={`border border-gray-300 px-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>MODEL</p>
        <select
          className='w-full p-2 border border-gray-300 rounded'
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value=''>All Models</option>
          {models.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div className={`border border-gray-300 px-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>PRICE RANGE</p>
        <div className='flex gap-2'>
          <input
            type='number'
            placeholder='Min Price'
            className='w-1/2 p-2 border border-gray-300 rounded'
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type='number'
            placeholder='Max Price'
            className='w-1/2 p-2 border border-gray-300 rounded'
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className={`border border-gray-300 px-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>POWER CV RANGE</p>
        <div className='flex gap-2'>
          <input
            type='number'
            placeholder='Min Power CV'
            className='w-1/2 p-2 border border-gray-300 rounded'
            value={minPowerCV}
            onChange={(e) => setMinPowerCV(e.target.value)}
          />
          <input
            type='number'
            placeholder='Max Power CV'
            className='w-1/2 p-2 border border-gray-300 rounded'
            value={maxPowerCV}
            onChange={(e) => setMaxPowerCV(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};