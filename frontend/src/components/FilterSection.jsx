import React, { useState, useEffect } from 'react';
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
  const [brandLogos, setBrandLogos] = useState({});
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const fallbackLogo = 'https://placehold.co/30x30'; // A working placeholder URL

  // Fetch and cache logos
  useEffect(() => {
    const fetchAndCacheLogos = async () => {
      const cachedLogos = JSON.parse(localStorage.getItem('brandLogos')) || {};

      // Check if logos are already cached
      if (Object.keys(cachedLogos).length > 0) {
        setBrandLogos(cachedLogos);
        return;
      }

      // Fetch logos from the backend API
      try {
        const response = await fetch('http://localhost:8001/brand-logos');
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const logos = data.reduce((acc, brand) => {
          acc[brand.brand_name] = brand.logo_url;
          return acc;
        }, {});

        // Cache logos in localStorage
        localStorage.setItem('brandLogos', JSON.stringify(logos));
        setBrandLogos(logos);
      } catch (error) {
        console.error('Error fetching brand logos:', error);
      }
    };

    fetchAndCacheLogos();
  }, [brands]);

  // Handle brand selection
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setIsBrandModalOpen(false); // Close the modal after selection
  };

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

      {/* Select Brand Button */}
      <div className={`border border-gray-300 px-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>BRAND</p>
        <button
          className='w-full p-2 border border-gray-300 rounded text-left'
          onClick={() => setIsBrandModalOpen(true)}
        >
          {selectedBrand || 'Select Brand'}
        </button>
      </div>

      {/* Brand Selection Modal */}
      {isBrandModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Select Brand</h2>
              <button
                onClick={() => setIsBrandModalOpen(false)}
                className='p-2 hover:bg-gray-100 rounded-full'
              >
                <img src={assets.cross_icon} alt='Close' className='w-4 h-4' />
              </button>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4'>
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className={`p-4 border ${
                    selectedBrand === brand ? 'border-blue-500' : 'border-gray-300'
                  } rounded-lg cursor-pointer hover:bg-gray-100`}
                  onClick={() => handleBrandSelect(brand)}
                >
                  <img
                    src={brandLogos[brand] || fallbackLogo} // Use the fallback logo if not available
                    alt={brand}
                    className='w-16 h-16 mx-auto mb-2'
                  />
                  <p className='text-center text-sm'>{brand}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other Filters (Model, Price Range, Power CV Range) */}
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