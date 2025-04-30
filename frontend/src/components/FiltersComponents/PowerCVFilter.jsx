import React, { useState, useEffect } from 'react';
import { RangeSlider } from '../RangeSlider';

export const PowerCVFilter = ({ minPowerCV, setMinPowerCV, maxPowerCV, setMaxPowerCV }) => {
  const [PowerCVRange, setPowerCVRange] = useState([0, 500]);

  useEffect(() => {
    if (minPowerCV && maxPowerCV) {
      setPowerCVRange([Number(minPowerCV), Number(maxPowerCV)]);
    }
  }, [minPowerCV, maxPowerCV]);

  const handlePowerCVChange = (event, newValues) => {
    setPowerCVRange(newValues);
    setMinPowerCV(newValues[0]);
    setMaxPowerCV(newValues[1]);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-white shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Power CV Range</h3>
      <RangeSlider
        min={0}
        max={500}
        value={PowerCVRange}
        onChange={handlePowerCVChange}
      />
      <div className="flex justify-between mt-4 text-sm font-medium text-red-700">
      <span>Selected Range: </span>
        <span>
          {PowerCVRange[0]} - {PowerCVRange[1]} 
        </span>
      </div>
    </div>
  );
};
