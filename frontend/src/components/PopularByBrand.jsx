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
        <div className="py-16 md:py-24 px-4 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-6 md:mb-0">
                        <span className="block text-red-600 font-medium mb-2">
                            Trusted Car Dealer Service
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold">
                            Popular Cars By Brand
                        </h3>
                    </div>

                    {/* Tabs Navigation */}
                    <ul className="flex flex-wrap gap-2 md:gap-3">
                        {tabs.map((tab) => (
                            <li key={tab.id}>
                            <button 
                                onClick={() => handleOnClick(tab.id)}
                                className={`px-3 py-1.5 text-sm transition-all duration-200 ${
                                activeIndex === tab.id 
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-200/50'
                                    : 'bg-white text-gray-600 shadow-md shadow-gray-100 hover:bg-gray-50 hover:shadow-lg'
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
                    <div className="text-center py-8">Loading popular cars...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <div className="col-span-2 text-center py-8">
                                No popular cars found for this brand
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};