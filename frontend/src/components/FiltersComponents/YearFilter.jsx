import React, { useState, useEffect } from 'react';
import { RangeSlider } from '../RangeSlider';

export const YearFilter = ({ minYear, setMinYear, maxYear, setMaxYear }) => {
  const [YearRange, setYearRange] = useState([2000, 2025]);

  useEffect(() => {
    if (minYear && maxYear) {
      setYearRange([Number(minYear), Number(maxYear)]);
    }
  }, [minYear, maxYear]);

  const handleYearChange = (event, newValues) => {
    setYearRange(newValues);
    setMinYear(newValues[0]);
    setMaxYear(newValues[1]);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-white shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Year Range</h3>
      <RangeSlider
        min={2000}
        max={2025}
        value={YearRange}
        onChange={handleYearChange}
      />
      <div className="flex justify-between mt-4 text-sm font-medium text-red-700">
      <span>Selected Range: </span>
        <span>
          {YearRange[0]} - {YearRange[1]} 
        </span>
      </div>
    </div>
  );
};
