import React, { useState, useEffect } from 'react';
import { RangeSlider } from '../RangeSlider';

export const MileageFilter = ({ minMileage, setMinMileage, maxMileage, setMaxMileage }) => {
  const [mileageRange, setMileageRange] = useState([0, 200000]);

  useEffect(() => {
    if (minMileage && maxMileage) {
      setMileageRange([Number(minMileage), Number(maxMileage)]);
    }
  }, [minMileage, maxMileage]);

  const handleMileageChange = (event, newValues) => {
    setMileageRange(newValues);
    setMinMileage(newValues[0]);
    setMaxMileage(newValues[1]);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-white shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Mileage Range (km)</h3>
      <RangeSlider
        min={0}
        max={200000}
        value={mileageRange}
        onChange={handleMileageChange}
      />
      <div className="flex justify-between mt-4 text-sm font-medium text-red-700">
      <span>Selected Range: </span>
        <span>
          {mileageRange[0].toLocaleString()} km - {mileageRange[1].toLocaleString()} KM
        </span>
      </div>
    </div>
  );
};
