import React, { useRef, useEffect } from 'react';
import { assets } from '../../assets/assets';

export const MileageFilter = ({ minMileage, setMinMileage, maxMileage, setMaxMileage }) => {
  const [showMinOptions, setShowMinOptions] = React.useState(false);
  const [showMaxOptions, setShowMaxOptions] = React.useState(false);

  const mileageOptions = [5000, 10000, 20000, 30000, 50000, 75000, 100000, 150000];
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
      <p className='mb-3 text-sm font-medium text-center'>MILEAGE RANGE (km)</p>
      <div className='flex gap-2'>
        {/* Min Mileage Input */}
        <div className='w-1/2 flex items-center relative' ref={minDropdownRef}>
          <input
            type='number'
            placeholder='Min'
            className='w-full p-2 border border-gray-300 rounded text-sm pr-14'
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
            min='0'
            step='1000'
          />
          {minMileage && (
            <img
              src={assets.cross_icon}
              alt='Clear'
              className='absolute right-8 top-1/2 transform -translate-y-1/2 h-3 w-3 cursor-pointer hover:opacity-70'
              onClick={() => {
                setMinMileage('');
                setShowMinOptions(false);
              }}
            />
          )}
          <img
            src={assets.dropdown_icon}
            alt='Dropdown'
            className='absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 rotate-90 cursor-pointer'
            onClick={toggleMinDropdown}
          />
          {showMinOptions && (
            <div className='absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 z-10 max-h-40 overflow-y-auto'>
              {mileageOptions.map((mileage) => (
                <div
                  key={mileage}
                  className='p-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => {
                    setMinMileage(mileage);
                    setShowMinOptions(false);
                  }}
                >
                  {mileage.toLocaleString()}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Max Mileage Input */}
        <div className='w-1/2 flex items-center relative' ref={maxDropdownRef}>
          <input
            type='number'
            placeholder='Max'
            className='w-full p-2 border border-gray-300 rounded text-sm pr-14'
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
            min='0'
            step='1000'
          />
          {maxMileage && (
            <img
              src={assets.cross_icon}
              alt='Clear'
              className='absolute right-8 top-1/2 transform -translate-y-1/2 h-3 w-3 cursor-pointer hover:opacity-70'
              onClick={() => {
                setMaxMileage('');
                setShowMaxOptions(false);
              }}
            />
          )}
          <img
            src={assets.dropdown_icon}
            alt='Dropdown'
            className='absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 rotate-90 cursor-pointer'
            onClick={toggleMaxDropdown}
          />
          {showMaxOptions && (
            <div className='absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 z-10 max-h-40 overflow-y-auto'>
              {mileageOptions.map((mileage) => (
                <div
                  key={mileage}
                  className='p-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => {
                    setMaxMileage(mileage);
                    setShowMaxOptions(false);
                  }}
                >
                  {mileage.toLocaleString()}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};