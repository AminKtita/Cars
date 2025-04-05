import React from 'react';
import { PriceRangeFilter } from './FiltersComponents/PriceRangeFilter';
import { BrandFilter } from './FiltersComponents/BrandFilter';
import { ModelFilter } from './FiltersComponents/ModelFilter';
import { TransmissionFilter } from './FiltersComponents/TransmissionFilter';
import { FuelFilter } from './FiltersComponents/FuelFilter';
import { YearFilter } from './FiltersComponents/YearFilter';
import { MileageFilter } from './FiltersComponents/MileageFilter';
import { PowerCVFilter } from './FiltersComponents/PowerCVFilter';
import { assets } from '../assets/assets';

export const FilterSection = ({
  showFilter,
  setShowFilter,
  brands,
  models,
  selectedBrands,
  setSelectedBrands,
  selectedModel,
  setSelectedModel,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedTransmissions,
  handleTransmissionSelect,
  selectedFuelTypes,
  handleFuelSelect,
  resetFilters,
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  minMileage,
  setMinMileage,
  maxMileage,
  setMaxMileage,
  minPowerCV,
  setMinPowerCV,
  maxPowerCV,
  setMaxPowerCV,
  savedFilters,
  onSaveClick,
  showNameInput,
  filterName,
  onFilterNameChange,
  onSaveConfirm,
  onSaveCancel,
  onApplySavedFilter,
  onDeleteSavedFilter,

}) => {
  return (
<div className={`min-w-60 md:w-48 lg:w-72 ${showFilter ? 'block' : 'hidden'} sm:block`}>
<div className="hidden sm:flex justify-between items-center gap-2 p-2">
<p className='my-2 text-xl font-semibold'>FILTERS</p>
<div className="flex gap-2">
  <button 
    className="p-2 hover:bg-gray-100 rounded-full"
    onClick={onSaveClick}
    title="Save filter"
  >
    <img src={assets.save} alt='Save' className='w-4 h-4' />
  </button>
  <button 
    className="p-2 hover:bg-gray-100 rounded-full" 
    onClick={resetFilters}
    title="Reset filter"

  >
    <img src={assets.cross_icon} alt='Reset' className='w-4 h-4' />
  </button>
  </div>
</div>

{/* Saved Filters Section */}
      <div className="mb-4">
        
        {savedFilters.length > 0 && (
          <>
            <h3 className="font-semibold mb-2">Saved Filters</h3>
            <div className="space-y-2">
            {savedFilters.map((preset) => (
              <div key={preset._id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <button 
                  className="text-sm hover:underline flex-1 text-left"
                  onClick={() => onApplySavedFilter(preset)}
                >
                  {preset.name}
                </button>
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => onDeleteSavedFilter(preset._id)}
                  title="Delete filter"
                >
                  ×
                </button>
              </div>
            ))}

            </div>
          </>
        )}

        {/* Name Input */}
        {showNameInput && (
          <div className="mt-4 space-y-2">
            <input
              type="text"
              value={filterName}
              onChange={(e) => onFilterNameChange(e.target.value)}
              placeholder="Name your filter"
              className="w-full p-2 border rounded text-sm"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && onSaveConfirm()}
            />
            <div className="flex gap-2">
              <button
                onClick={onSaveConfirm}
                className="flex-1 text-sm bg-violet-500 text-white px-2 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={onSaveCancel}
                className="flex-1 text-sm bg-gray-200 px-2 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Filter Components */}
      <BrandFilter
         brands={brands}
         selectedBrands={selectedBrands}
         setSelectedBrands={setSelectedBrands}
      />
      <ModelFilter
        models={models}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <TransmissionFilter
        selectedTransmissions={selectedTransmissions}
        handleTransmissionSelect={handleTransmissionSelect}
      />
      <FuelFilter
        selectedFuelTypes={selectedFuelTypes}
        handleFuelSelect={handleFuelSelect}
      />
      <PriceRangeFilter
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
            <YearFilter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
      />
       <PowerCVFilter
        minPowerCV={minPowerCV}
        setMinPowerCV={setMinPowerCV}
        maxPowerCV={maxPowerCV}
        setMaxPowerCV={setMaxPowerCV}
      />
      
      <MileageFilter
        minMileage={minMileage}
        setMinMileage={setMinMileage}
        maxMileage={maxMileage}
        setMaxMileage={setMaxMileage}
      />

    </div>
  );
};