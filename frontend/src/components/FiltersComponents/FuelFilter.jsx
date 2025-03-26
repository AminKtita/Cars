import React from 'react';

export const FuelFilter = ({ selectedFuelTypes, handleFuelSelect }) => {
  return (
    <div className='border border-gray-300 px-2 py-3 mt-6'>
      <p className='mb-3 text-sm font-medium text-center'>FUEL TYPE</p>
      <div className='grid grid-cols-2 gap-2'>
        {['Diesel', 'Petrol', 'Hybrid', 'Electric'].map((fuel) => (
          <button
            key={fuel}
            className={`p-2 border ${
              selectedFuelTypes.includes(fuel) 
                ? 'border-blue-500' 
                : 'border-gray-300'
            } rounded w-full`} // Changed to w-full
            onClick={() => handleFuelSelect(fuel)}
          >
            {fuel}
          </button>
        ))}
      </div>
    </div>
  );
};