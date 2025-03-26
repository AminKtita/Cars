import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../../assets/assets';

export const PriceRangeFilter = ({ minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  const [showMinOptions, setShowMinOptions] = useState(false);
  const [showMaxOptions, setShowMaxOptions] = useState(false);

  const commonPriceOptions = [2000, 5000, 10000, 15000, 20000, 25000, 30000, 50000, 100000, 150000];

  const minDropdownRef = useRef(null);
  const maxDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (minDropdownRef.current && !minDropdownRef.current.contains(event.target)) {
        setShowMinOptions(false);
      }
      if (maxDropdownRef.current && !maxDropdownRef.current.contains(event.target)) {
        setShowMaxOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMinDropdown = () => {
    setShowMinOptions(!showMinOptions);
    setShowMaxOptions(false);
  };

  const toggleMaxDropdown = () => {
    setShowMaxOptions(!showMaxOptions);
    setShowMinOptions(false);
  };

  return (
    <div className='border border-gray-300 px-2 py-3 mt-6'>
      <p className='mb-3 text-sm font-medium text-center'>PRICE RANGE</p>
      <div className='flex gap-2'>
        {/* Min Price Input */}
        <div className='w-1/2 flex items-center relative' ref={minDropdownRef}>
          <input
            type='number'
            placeholder='Min'
            className='w-full p-2 border border-gray-300 rounded text-sm pr-14'
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min='0'
            step='100'
          />
          
          {/* Clear Icon */}
          {minPrice && (
            <img
              src={assets.cross_icon}
              alt='Clear'
              className='absolute right-8 top-1/2 transform -translate-y-1/2 h-3 w-3 cursor-pointer hover:opacity-70'
              onClick={() => {
                setMinPrice('');
                setShowMinOptions(false);
              }}
            />
          )}
          
          {/* Dropdown Icon */}
          <img
            src={assets.dropdown_icon}
            alt='Dropdown'
            className='absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 rotate-90 cursor-pointer'
            onClick={toggleMinDropdown}
          />
          
          {showMinOptions && (
            <div className='absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 z-10 max-h-40 overflow-y-auto'>
              {commonPriceOptions.map((price) => (
                <div
                  key={price}
                  className='p-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => {
                    setMinPrice(price);
                    setShowMinOptions(false);
                  }}
                >
                  {price}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Max Price Input */}
        <div className='w-1/2 flex items-center relative' ref={maxDropdownRef}>
          <input
            type='number'
            placeholder='Max'
            className='w-full p-2 border border-gray-300 rounded text-sm pr-14'
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min='0'
            step='100'
          />
          
          {/* Clear Icon */}
          {maxPrice && (
            <img
              src={assets.cross_icon}
              alt='Clear'
              className='absolute right-8 top-1/2 transform -translate-y-1/2 h-3 w-3 cursor-pointer hover:opacity-70'
              onClick={() => {
                setMaxPrice('');
                setShowMaxOptions(false);
              }}
            />
          )}
          
          {/* Dropdown Icon */}
          <img
            src={assets.dropdown_icon}
            alt='Dropdown'
            className='absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 rotate-90 cursor-pointer'
            onClick={toggleMaxDropdown}
          />
          
          {showMaxOptions && (
            <div className='absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 z-10 max-h-40 overflow-y-auto'>
              {commonPriceOptions.map((price) => (
                <div
                  key={price}
                  className='p-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => {
                    setMaxPrice(price);
                    setShowMaxOptions(false);
                  }}
                >
                  {price}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};