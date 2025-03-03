import React, { useState, useEffect, useContext } from 'react';
import { getCars } from '../services/api';
import { Title } from '../components/Title';
import { CarContext } from '../context/CarContext';
import { FilterSection } from '../components/FilterSection';
import { SortSection } from '../components/SortSection';
import { CarGrid } from '../components/CarGrid';
import { Pagination } from '../components/Pagination'; // Import the Pagination component

export const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('');
  const { search, setSearch } = useContext(CarContext);
  const [minPowerCV, setMinPowerCV] = useState('');
  const [maxPowerCV, setMaxPowerCV] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  // Normalize brand names
  const normalizeBrandName = (brand) => {
    const brandMappings = {
      'Mercedes Benz': 'Mercedes-Benz',
    };
    return brandMappings[brand] || brand;
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

  // Update models dropdown based on selected brand
  useEffect(() => {
    if (selectedBrand) {
      const filteredModels = [
        ...new Set(cars.filter((car) => car.brand_name === selectedBrand).map((car) => car.model_name)),
      ];
      setModels(filteredModels);
    } else {
      const allModels = [...new Set(cars.map((car) => car.model_name))];
      setModels(allModels);
    }
  }, [selectedBrand, cars]);

  // Update brand dropdown based on selected model
  useEffect(() => {
    if (selectedModel) {
      const brandOfSelectedModel = cars.find((car) => car.model_name === selectedModel)?.brand_name;
      if (brandOfSelectedModel) {
        setSelectedBrand(brandOfSelectedModel);
      }
    }
  }, [selectedModel, cars]);

  // Update filterProducts when filters, sorting, or search change
  useEffect(() => {
    let filteredCars = cars;

    if (selectedBrand) {
      filteredCars = filteredCars.filter((car) => car.brand_name === selectedBrand);
    }

    if (selectedModel) {
      filteredCars = filteredCars.filter((car) => car.model_name === selectedModel);
    }

    if (minPrice) {
      filteredCars = filteredCars.filter((car) => Number(car.price) >= Number(minPrice));
    }
    if (maxPrice) {
      filteredCars = filteredCars.filter((car) => Number(car.price) <= Number(maxPrice));
    }

    if (minPowerCV) {
      filteredCars = filteredCars.filter((car) => Number(car.power_cv) >= Number(minPowerCV));
    }
    if (maxPowerCV) {
      filteredCars = filteredCars.filter((car) => Number(car.power_cv) <= Number(maxPowerCV));
    }

    if (search) {
      filteredCars = filteredCars.filter((car) =>
        car.vehicle_title.toLowerCase().includes(search.toLowerCase())
      );
    }

    let sortedCars = [...filteredCars];
    if (sortBy === 'price-low-high') {
      sortedCars.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-high-low') {
      sortedCars.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'name-a-z') {
      sortedCars.sort((a, b) => a.vehicle_title.localeCompare(b.vehicle_title));
    } else if (sortBy === 'name-z-a') {
      sortedCars.sort((a, b) => b.vehicle_title.localeCompare(a.vehicle_title));
    }

    setFilterProducts(sortedCars);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [selectedBrand, selectedModel, minPrice, maxPrice, minPowerCV, maxPowerCV, sortBy, search, cars]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setMinPrice('');
    setMaxPrice('');
    setMinPowerCV('');
    setMaxPowerCV('');
    setSortBy('');
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  // Calculate paginated data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCars = filterProducts.slice(startIndex, endIndex);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <FilterSection
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        brands={brands}
        models={models}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minPowerCV={minPowerCV}
        setMinPowerCV={setMinPowerCV}
        maxPowerCV={maxPowerCV}
        setMaxPowerCV={setMaxPowerCV}
        resetFilters={resetFilters}
      />

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'CARS'} />
          <SortSection sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        <CarGrid filterProducts={paginatedCars} />

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};