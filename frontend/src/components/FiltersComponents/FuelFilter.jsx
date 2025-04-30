import React from 'react';

export const FuelFilter = ({ selectedFuelTypes, handleFuelSelect }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mt-6 bg-white shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">FUEL TYPE</h3>
      <div className="grid grid-cols-2 gap-3">
        {['Diesel', 'Petrol', 'Hybrid', 'Electric'].map((fuel) => (
          <button
            key={fuel}
            className={`px-4 py-2 border-2 rounded-md text-sm font-medium transition-colors duration-200
              ${
                selectedFuelTypes.includes(fuel)
                  ? 'border-red-600 bg-red-50 text-red-900'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-red-500'
              }`}
            onClick={() => handleFuelSelect(fuel)}
          >
            {fuel}
          </button>
        ))}
      </div>
    </div>
  );
};