import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../../assets/assets';

export const YearFilter = ({ minYear, setMinYear, maxYear, setMaxYear }) => {
  const [showMinOptions, setShowMinOptions] = useState(false);
  const [showMaxOptions, setShowMaxOptions] = useState(false);

  // Generate year options from 2000 to 2024
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({length: currentYear - 1999}, (_, i) => 2000 + i).reverse();

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
      <p className='mb-3 text-sm font-medium text-center'>YEAR RANGE</p>
      <div className='flex gap-2'>
        {/* Min Year Input */}
        <div className='w-1/2 flex items-center relative' ref={minDropdownRef}>
          <input
            type='number'
            placeholder='Min'
            className='w-full p-2 border border-gray-300 rounded text-sm pr-14'
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
            min='1900'
            max={currentYear}
          />
          
          {/* Clear Icon */}
          {minYear && (
            <img
              src={assets.cross_icon}
              alt='Clear'
              className='absolute right-8 top-1/2 transform -translate-y-1/2 h-3 w-3 cursor-pointer hover:opacity-70'
              onClick={() => {
                setMinYear('');
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
              {yearOptions.map((year) => (
                <div
                  key={year}
                  className='p-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => {
                    setMinYear(year);
                    setShowMinOptions(false);
                  }}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Max Year Input */}
        <div className='w-1/2 flex items-center relative' ref={maxDropdownRef}>
          <input
            type='number'
            placeholder='Max'
            className='w-full p-2 border border-gray-300 rounded text-sm pr-14'
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
            min='1900'
            max={currentYear}
          />
          
          {/* Clear Icon */}
          {maxYear && (
            <img
              src={assets.cross_icon}
              alt='Clear'
              className='absolute right-8 top-1/2 transform -translate-y-1/2 h-3 w-3 cursor-pointer hover:opacity-70'
              onClick={() => {
                setMaxYear('');
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
              {yearOptions.map((year) => (
                <div
                  key={year}
                  className='p-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => {
                    setMaxYear(year);
                    setShowMaxOptions(false);
                  }}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};