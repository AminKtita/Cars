import React, { useState, useEffect } from 'react';
import { RangeSlider } from '../RangeSlider';

export const PriceRangeFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  const [priceRange, setPriceRange] = useState([0, 50000]);

  useEffect(() => {
    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)]);
    }
  }, [minPrice, maxPrice]);

  const handlePriceChange = (event, newValues) => {
    setPriceRange(newValues);
    setMinPrice(newValues[0]);
    setMaxPrice(newValues[1]);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-white shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Price Range</h3>
      <RangeSlider
        min={0}
        max={50000}
        value={priceRange}
        onChange={handlePriceChange}
      />
      <div className="flex justify-between mt-4 text-sm font-medium text-red-700">
        <span>Selected Range: </span>
        <span>
        €{priceRange[0].toLocaleString()} - €{priceRange[1].toLocaleString()}
        </span>
      </div>
    </div>
  );
};
