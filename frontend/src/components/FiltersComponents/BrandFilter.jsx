import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../../assets/assets';

export const BrandFilter = ({ brands, selectedBrands, setSelectedBrands }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const brandLogos = JSON.parse(localStorage.getItem('brandLogos')) || {};
  const fallbackLogo = 'https://placehold.co/30x30';

  const handleBrandSelect = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="border border-gray-200 rounded-lg p-4 mt-6 bg-white shadow-sm relative" ref={dropdownRef}>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">BRAND</h3>
      
      <button
        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-md text-sm text-left 
                   hover:border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200
                   flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selectedBrands.length > 0 
            ? `${selectedBrands.length} selected` 
            : 'Select brands'}
        </span>
        <svg 
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg
                       max-h-96 overflow-y-auto">
          <div className="flex flex-col space-y-2 p-2">
            {brands.map((brand) => (
              <button
                key={brand}
                className={`w-full px-4 py-2 flex items-center space-x-3 rounded-md
                          text-sm text-left transition-colors duration-200
                          ${
                            selectedBrands.includes(brand)
                              ? 'bg-red-50 border-red-600'
                              : 'hover:bg-gray-50 border-transparent'
                          }`}
                onClick={() => handleBrandSelect(brand)}
              >
                <img
                  src={brandLogos[brand] || fallbackLogo}
                  alt={brand}
                  className="w-8 h-8 object-contain"
                />
                <span className="flex-1 text-gray-700 font-medium">{brand}</span>
                {selectedBrands.includes(brand) && (
                  <svg 
                    className="w-4 h-4 text-red-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};