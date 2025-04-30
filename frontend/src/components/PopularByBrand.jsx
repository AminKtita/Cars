import { useState, useEffect } from "react";
import { CarItem } from '../components/CarItem';
import { getMostViewedCarIdsByBrand, getCarById } from '../services/api';

export const PopularByBrand = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);

    const tabs = [
        { id: 1, name: 'Mercedes-Benz' },
        { id: 2, name: 'Peugeot' },
        { id: 3, name: 'Volkswagen' },
        { id: 4, name: 'Audi' },
        { id: 5, name: 'BMW' }
    ];

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const selectedBrand = tabs.find(t => t.id === activeIndex)?.name;
                if (selectedBrand) {
                    const carIds = await getMostViewedCarIdsByBrand(selectedBrand);
                    const carPromises = carIds.map(id => getCarById(id));
                    const carDetails = await Promise.all(carPromises);
                    setCars(carDetails);
                }
            } catch (error) {
                console.error('Error loading cars:', error);
                setCars([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [activeIndex]);

    const handleOnClick = (index) => setActiveIndex(index);

    return (
        <div className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-8 md:mb-12 flex flex-col gap-4 sm:gap-6 md:flex-row justify-between items-start">
                    <div className="mb-4 md:mb-0">
                        <span className="block text-red-600 font-medium text-sm md:text-base mb-1 md:mb-2">
                            Trusted Car Dealer Service
                        </span>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                            Popular Cars By Brand
                        </h3>
                    </div>

                    {/* Tabs Navigation */}
                    <ul className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                        {tabs.map((tab) => (
                            <li key={tab.id}>
                                <button 
                                    onClick={() => handleOnClick(tab.id)}
                                    className={`px-2.5 sm:px-3 py-1 text-xs sm:text-sm transition-all duration-200 rounded-md
                                        ${
                                            activeIndex === tab.id 
                                                ? 'bg-red-600 text-white shadow-md md:shadow-lg shadow-red-200/50'
                                                : 'bg-white text-gray-600 shadow-sm md:shadow-md shadow-gray-100 hover:bg-gray-50 hover:shadow-lg'
                                        }`}
                                >
                                    {tab.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Cars Grid */}
                {loading ? (
                    <div className="text-center py-6 md:py-8 text-sm md:text-base">
                        Loading popular cars...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-center">
                        {cars.length > 0 ? (
                            cars.map((car) => (
                                <CarItem
                                    key={car._id}
                                    id={car._id}
                                    name={car.vehicle_title}
                                    price={car.price}
                                    image={car.images}
                                    brand={car.brand_name}
                                    model={car.model_name}
                                    year={car.year}
                                    mileage={car.mileage}
                                    fuel={car.fuel_type}
                                    gearbox={car.gearbox_type}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-6 md:py-8 text-sm md:text-base">
                                No popular cars found for this brand
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};