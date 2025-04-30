import React from 'react';

const filterLabels = {
  selectedBrands: 'Brands',
  selectedModel: 'Model',
  selectedbodyTypes: 'Body Types',
  minPrice: 'Min Price',
  maxPrice: 'Max Price',
  selectedTransmissions: 'Transmissions',
  selectedFuelTypes: 'Fuel Types',
  minYear: 'Min Year',
  maxYear: 'Max Year',
  minMileage: 'Min Mileage',
  maxMileage: 'Max Mileage',
  minPowerCV: 'Min Power (CV)',
  maxPowerCV: 'Max Power (CV)'
};

export const SavedFilterCard = ({ filter }) => {
  const activeFilters = Object.entries(filter.filters)
    .filter(([_, value]) => 
      value !== null && 
      (Array.isArray(value) ? value.length > 0 : value !== '')
    );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{filter.name}</h3>
        <span className="text-sm text-gray-500">
          {new Date(filter.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      {activeFilters.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {activeFilters.map(([key, value]) => (
            <div key={key} className="text-sm">
              <span className="text-gray-600 font-medium">
                {filterLabels[key]}:
              </span>
              <span className="ml-2 text-gray-800">
                {Array.isArray(value) ? value.join(', ') : value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No active filters in this preset</p>
      )}
    </div>
  );
};