import React, { useState, useEffect, useContext, useRef } from 'react';
import { getCars } from '../services/api';
import { Title } from '../components/Title';
import { AppContext } from '../context/AppContext';
import { FilterSection } from '../components/FilterSection';
import { SortSection } from '../components/SortSection';
import { CarGrid } from '../components/CarGrid';
import { CarListView } from '../components/CarListView';
import { Pagination } from '../components/Pagination';
import { logUserAction ,getFilterPresets,saveFilterPreset,deleteFilterPreset} from '../services/api';
import { useSearchParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ViewSelector } from '../components/ViewSelector';



export const CarList = () => {
  const [viewMode, setViewMode] = useState('grid'); 

  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [bodyTypes, setbodyTypes] = useState([]);
  const [selectedbodyTypes, setSelectedbodyTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('');
  const {search, setSearch } = useContext(AppContext);
  const [minPowerCV, setMinPowerCV] = useState('');
  const [maxPowerCV, setMaxPowerCV] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const filterTimeoutRef = useRef(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [savedFilters, setSavedFilters] = useState([]);


  const handleSaveClick = () => {
  setShowNameInput(true);
};


const handleSaveConfirm = async () => {
  if (!filterName.trim()) return;

  try {
    const newPreset = await saveFilterPreset({
      name: filterName.trim(),
      filters: {
        selectedBrands,
        selectedModel,
        selectedbodyTypes,
        minPrice,
        maxPrice,
        selectedTransmissions,
        selectedFuelTypes,
        minYear,
        maxYear,
        minMileage,
        maxMileage,
        minPowerCV,
        maxPowerCV
      }
    });
    
    setSavedFilters(prev => [...prev, newPreset]);
    setShowNameInput(false);
    setFilterName('');
  } catch (err) {
    console.error('Error saving filter preset:', err);
  }
};

useEffect(() => {
  const loadPresets = async () => {
    try {
      const presets = await getFilterPresets();
      setSavedFilters(presets);
    } catch (err) {
      console.error('Error loading filter presets:', err);
    }
  };
  loadPresets();
}, []);
  const applySavedFilter = (preset) => {
    setSelectedBrands(Array.isArray(preset.filters.selectedBrands) ? preset.filters.selectedBrands : []);
    setSelectedbodyTypes(Array.isArray(preset.filters.selectedbodyTypes) ? preset.filters.selectedbodyTypes : []);
    setSelectedModel(preset.filters.selectedModel || '');
    setMinPrice(preset.filters.minPrice || '');
    setMaxPrice(preset.filters.maxPrice || '');
    setSelectedTransmissions(preset.filters.selectedTransmissions || []);
    setSelectedFuelTypes(preset.filters.selectedFuelTypes || []);
    setMinYear(preset.filters.minYear || '');
    setMaxYear(preset.filters.maxYear || '');
    setMinMileage(preset.filters.minMileage || '');
    setMaxMileage(preset.filters.maxMileage || '');
    setMinPowerCV(preset.filters.minPowerCV || '');
    setMaxPowerCV(preset.filters.maxPowerCV || '');
  };
  
  const deleteSavedFilter = async (presetId) => {
  try {
    await deleteFilterPreset(presetId);
    setSavedFilters(prev => prev.filter(p => p._id !== presetId));
  } catch (err) {
    console.error('Error deleting filter preset:', err);
  }
};


  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    // Set all filter states from URL params
    setSelectedBrands(params.brand ? params.brand.split(',') : []);
    setSelectedbodyTypes(params.bodyTypes ? params.bodyTypes.split(',') : []);
    setSelectedModel(params.model || '');
    setSelectedTransmissions(params.transmission ? params.transmission.split(',') : []);
    setSelectedFuelTypes(params.fuel ? params.fuel.split(',') : []);
    setMinPrice(params.minPrice || '');
    setMaxPrice(params.maxPrice || '');
    setMinMileage(params.minMileage || '');
    setMaxMileage(params.maxMileage || '');
    setMinYear(params.minYear || '');
    setMaxYear(params.maxYear || '');
    setSortBy(params.sortBy || '');
    setMinPowerCV(params.minPowerCV || '');
    setMaxPowerCV(params.maxPowerCV || '');
  }, []);

  useEffect(() => {
    const params = {
      brand: selectedBrands?.join(',') || '',
      bodyTypes: selectedbodyTypes?.join(',') || '',
      model: selectedModel || '',
      transmission: selectedTransmissions?.join(',') || '',
      fuel: selectedFuelTypes?.join(',') || '',         
      minPrice: minPrice || '',
      maxPrice: maxPrice || '',
      minMileage: minMileage || '',
      maxMileage: maxMileage || '',
      minYear: minYear || '',
      maxYear: maxYear || '',
      minPowerCV: minPowerCV || '',
      maxPowerCV: maxPowerCV || '',
      sortBy: sortBy || '',
    };
    setSearchParams(params);
    }, [selectedBrands,selectedbodyTypes, selectedModel, selectedFuelTypes, selectedTransmissions, minPrice, maxPrice, minMileage, maxMileage, minYear, maxYear, minPowerCV, maxPowerCV, sortBy]);


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);
  
  // Debounced filter logging
  const logFilters = () => {
    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current);
    }

    filterTimeoutRef.current = setTimeout(async () => {
      const hasActiveFilters = 
        selectedBrands || 
        selectedbodyTypes || 
        selectedModel || 
        minPrice || 
        maxPrice || 
        minPowerCV || 
        maxPowerCV ||
        minYear ||
        maxYear ||
        minMileage ||
        maxMileage ||
        selectedTransmissions.length > 0 ||
        selectedFuelTypes.length > 0;

      if (hasActiveFilters) {
        await logUserAction({
          actionType: 'filter',
          details: {
            filters: {
              brand: selectedBrands,
              bodyTypes: selectedbodyTypes,
              model: selectedModel,
              priceRange: [Number(minPrice), Number(maxPrice)],
              powerCV: [Number(minPowerCV), Number(maxPowerCV)],
              yearRange: [Number(minYear), Number(maxYear)],
              mileageRange: [Number(minMileage), Number(maxMileage)],
              transmission: selectedTransmissions.join(','),
              fuelType: selectedFuelTypes.join(',')
            }
          }
        });
      }
    }, 500);
  };
  useEffect(() => {
  const searchTimeout = setTimeout(async () => {
    if (search && search.trim().length > 0) {
      await logUserAction({
        actionType: 'search',
        details: {
          searchQuery: search.trim()
        }
      });
    }
  }, 500);

  return () => clearTimeout(searchTimeout);
}, [search]); // Only trigger when search changes

  // Handle filter changes logging
  useEffect(() => {
    logFilters();
    
    return () => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
    };
  }, [
    selectedBrands,
    selectedbodyTypes,
    selectedModel,
    minPrice,
    maxPrice,
    minPowerCV,
    maxPowerCV,
    minYear,
    maxYear,
    minMileage,
    maxMileage,
    selectedTransmissions,
    selectedFuelTypes
  ]);

  // Normalize brand names
  const normalizeBrandName = (brand) => {
    const brandMappings = {
      'Mercedes Benz': 'Mercedes-Benz',
    };
    return brandMappings[brand] || brand;
  };
  // Normalize fuel types
  const normalizeFuelType = (fuelType) => {
    return fuelType
      .toLowerCase()
      .replace(/\s*\(.*?\)\s*/g, '') // Remove content inside parentheses and surrounding whitespace
      .trim();
  };
  // Fetch cars data
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        const normalizedData = data.map((car) => ({
          ...car,
          brand_name: normalizeBrandName(car.brand_name),
        }));

        setCars(normalizedData);
        setFilterProducts(normalizedData);

        const uniqueBrands = [...new Set(normalizedData.map((car) => car.brand_name))];
        setBrands(uniqueBrands);

        const uniqueBodyTypes = [...new Set(normalizedData.map((car) => car.body_type))];
        setbodyTypes(uniqueBodyTypes);

        const allModels = [...new Set(normalizedData.map((car) => car.model_name))];
        setModels(allModels);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);
  //  filterProducts when filters, sorting, or search change
  useEffect(() => {
    let filteredCars = cars;

    if (selectedBrands.length > 0) {
      filteredCars = filteredCars.filter((car) => 
        selectedBrands.includes(car.brand_name)
      );
    }
    if (selectedbodyTypes.length > 0) {
      filteredCars = filteredCars.filter((car) => 
        selectedbodyTypes.includes(car.body_type)
      );
    }
    if (selectedModel) {
      filteredCars = filteredCars.filter((car) => 
        car.model_name === selectedModel && 
        (selectedBrands.length === 0 || selectedBrands.includes(car.brand_name))
      );
    }
    if (selectedBrands.length > 0) {
      const filteredModels = [
        ...new Set(cars
          .filter((car) => selectedBrands.includes(car.brand_name))
          .map((car) => car.model_name)
        )
      ];
      setModels(filteredModels);
      // Clear model selection if not in filtered models
      if (selectedModel && !filteredModels.includes(selectedModel)) {
        setSelectedModel('');
      }
    } else {
      const allModels = [...new Set(cars.map((car) => car.model_name))];
      setModels(allModels);
    }
   
    if (minPrice) filteredCars = filteredCars.filter((car) => Number(car.price) >= Number(minPrice));
    if (maxPrice) filteredCars = filteredCars.filter((car) => Number(car.price) <= Number(maxPrice));
    if (minPowerCV) filteredCars = filteredCars.filter((car) => Number(car.power_cv) >= Number(minPowerCV));
    if (maxPowerCV) filteredCars = filteredCars.filter((car) => Number(car.power_cv) <= Number(maxPowerCV));
    if (minYear) filteredCars = filteredCars.filter((car) => Number(car.year) >= Number(minYear));
    if (maxYear) filteredCars = filteredCars.filter((car) => Number(car.year) <= Number(maxYear));
    if (minMileage) filteredCars = filteredCars.filter((car) => Number(car.mileage) >= Number(minMileage));
    if (maxMileage) filteredCars = filteredCars.filter((car) => Number(car.mileage) <= Number(maxMileage));
    if (selectedTransmissions.length > 0) filteredCars = filteredCars.filter((car) => selectedTransmissions.includes(car.gearbox_type));
    if (selectedFuelTypes.length > 0) {
      filteredCars = filteredCars.filter((car) => {
        const carFuelNormalized = normalizeFuelType(car.fuel_type);
        return selectedFuelTypes.some(selectedFuel => 
          carFuelNormalized === normalizeFuelType(selectedFuel)
        );
      });
    }
    
    if (search) filteredCars = filteredCars.filter((car) => car.vehicle_title.toLowerCase().includes(search.toLowerCase()));

    // Sorting logic remains the same
    let sortedCars = [...filteredCars];
    switch (sortBy) {
      case 'price-low-high':
        sortedCars.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high-low':
        sortedCars.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'name-a-z':
        sortedCars.sort((a, b) => a.vehicle_title.localeCompare(b.vehicle_title));
        break;
      case 'name-z-a':
        sortedCars.sort((a, b) => b.vehicle_title.localeCompare(a.vehicle_title));
        break;
    }

    setFilterProducts(sortedCars);
    setCurrentPage(1);
  }, [selectedBrands,,selectedbodyTypes, selectedModel, minPrice, maxPrice, minPowerCV, maxPowerCV, minYear, maxYear, minMileage, maxMileage, selectedTransmissions, selectedFuelTypes, sortBy, search, cars]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedbodyTypes([]);
    setSelectedBrands([]);
    setSelectedModel('');
    setMinPrice('');
    setMaxPrice('');
    setMinPowerCV('');
    setMaxPowerCV('');
    setMinYear('');
    setMaxYear('');
    setMinMileage('');
    setMaxMileage('');
    setSelectedTransmissions([]);
    setSelectedFuelTypes([]);
    setSortBy('');
    logUserAction({ actionType: 'filter', details: { filters: null } });
  };

  // Pagination handlers remain the same
  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Render logic remains the same
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='flex flex-col sm:flex-row gap-6 py-4 px-4 md:px-6 lg:px-8'>
      {/* Mobile Filter Header */}
      <div className='sm:hidden flex justify-between items-center bg-white p-4 rounded-lg shadow-sm'>
        <button 
          onClick={() => setShowFilter(!showFilter)} 
          className='flex items-center gap-2 text-red-600 font-semibold'
        >
          FILTERS
          <svg 
            className={`w-4 h-4 transform transition-transform ${showFilter ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className='flex gap-3'>
          <button 
            className='p-2 hover:bg-red-50 rounded-md transition-colors'
            onClick={handleSaveClick}
          >
            <img src={assets.save} alt='Save' className='w-5 h-5' />
          </button>
          <button 
            className='p-2 hover:bg-red-50 rounded-md transition-colors' 
            onClick={resetFilters}
          >
            <img src={assets.cross_icon} alt='Reset' className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <FilterSection
        savedFilters={savedFilters}
        onSaveClick={handleSaveClick}
        showNameInput={showNameInput}
        filterName={filterName}
        onFilterNameChange={setFilterName}
        onSaveConfirm={handleSaveConfirm}
        onSaveCancel={() => {
          setShowNameInput(false);
          setFilterName('');
        }}
        onApplySavedFilter={applySavedFilter}
        onDeleteSavedFilter={deleteSavedFilter}     
        minMileage={minMileage}
        setMinMileage={setMinMileage}
        maxMileage={maxMileage}
        setMaxMileage={setMaxMileage}
        minPowerCV={minPowerCV}
        setMinPowerCV={setMinPowerCV}
        maxPowerCV={maxPowerCV}
        setMaxPowerCV={setMaxPowerCV}
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}      
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        brands={brands}
        bodyTypes={bodyTypes}
        models={models}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedbodyTypes={selectedbodyTypes}
        setSelectedbodyTypes={setSelectedbodyTypes}

        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        selectedTransmissions={selectedTransmissions}
        handleTransmissionSelect={(transmission) =>
          setSelectedTransmissions(prev => prev.includes(transmission) ? prev.filter(t => t !== transmission) : [...prev, transmission])
        }
        selectedFuelTypes={selectedFuelTypes}
        handleFuelSelect={(fuel) =>
          setSelectedFuelTypes(prev => prev.includes(fuel) ? prev.filter(f => f !== fuel) : [...prev, fuel])
        }
        resetFilters={resetFilters}
        className={`sm:block w-full sm:w-80 ${showFilter ? 'block' : 'hidden'}`}
      />

      {/* Main Content */}
      <div className='flex-1 space-y-6'>
        {/* Header Section */}
        <div className='bg-white p-4 rounded-lg shadow-sm'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <Title text1={'ALL'} text2={'CARS'} className='text-2xl sm:text-3xl' />
            <div className='flex items-center gap-4 w-full sm:w-auto'>
              <ViewSelector viewMode={viewMode} setViewMode={setViewMode} />
              <SortSection sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <CarGrid 
            filterProducts={filterProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} 
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          />
        ) : (
          <CarListView 
            filterProducts={filterProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} 
            className='space-y-4'
          />
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          className='bg-white p-4 rounded-lg shadow-sm'
        />
      </div>
    </div>
  );
};