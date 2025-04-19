import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { getMostViewedCar } from '../services/api';

export const TopViewedCar = () => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeDetailIndex, setActiveDetailIndex] = useState(0);
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    // Dots configuration
    const detailDots = [
        { key: 'country', label: 'Country', value: car?.country },
        { key: 'power', label: 'Power CV', value: car?.power_cv },
        { key: 'color', label: 'Color', value: car?.color },
        { key: 'fiscal', label: 'Fiscal Power', value: car?.power_cv_fiscal }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMostViewedCar();
                setCar(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center py-8">Loading most viewed car...</div>;
    if (!car) return <div className="text-center py-8">No viewed cars found</div>;

    return (
        <div className="bg-gray-50 py-82 md:py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Heading Section */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold">Top Viewed Car</h2>
                        <p className="text-gray-600 mt-4">Most popular vehicle among our users</p>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl shadow-lg p-8">
                        {/* Image Section (60-65% width) */}
                        <div className="flex-1 lg:max-w-[65%]">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                                {/* Offer Badge */}
                                <div className="absolute top-4 left-4 z-40 animate-pulse">
                                    <img 
                                        src={assets.popular} 
                                        alt="Popular badge" 
                                        className="w-40 h-40 object-contain drop-shadow-lg"
                                    />
                                </div>

                                {/* Image Gallery */}
                                <div className="relative h-full w-full">
                                    {car.images?.slice(0, 3).map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={car.vehicle_title}
                                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                                                activeImageIndex === index ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        />
                                    ))}

                                    {car.images?.length > 3 && activeImageIndex === 2 && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <div className="flex items-center text-white">
                                                <img src={assets.camera} className="w-5 h-5 mr-2" alt="camera" />
                                                <span>+{car.images.length - 3} more</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Navigation Dots */}
                                {car.images?.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {car.images.slice(0, 3).map((_, index) => (
                                            <button
                                                key={index}
                                                className={`w-8 h-1 rounded-full transition-colors ${
                                                    activeImageIndex === index ? 'bg-red-600' : 'bg-white/50'
                                                }`}
                                                onMouseEnter={() => setActiveImageIndex(index)}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Detail Dots */}
                                {detailDots.map((dot, index) => (
                                    <div 
                                        key={dot.key}
                                        className={`absolute ${getDotPosition(index)} 
                                            transition-all duration-300 group`}
                                        onMouseEnter={() => setActiveDetailIndex(index)}
                                    >
                                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-110">
                                            <div className="h-3 w-3 rounded-full bg-red-600" />
                                        </button>
                                        <div className={`absolute left-14 top-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md
                                            transition-opacity duration-300 ${activeDetailIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                                            <h3 className="font-semibold text-gray-800">{dot.label}</h3>
                                            <p className="text-sm text-gray-600 mt-2">
                                                {dot.value || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content Section (35-40% width) */}
                        <div className="flex-1 lg:max-w-[35%]">
                            <div className="space-y-6">
                                <span className="text-red-600 font-medium">{car.brand_name}</span>
                                <h3 className="text-3xl font-bold">{car.vehicle_title}</h3>
                                
                                {/* Price */}
                                <div className="flex gap-4 items-baseline">
                                    <span className="text-2xl font-bold text-red-600">
                                    €{car.price}
                                    </span>
                                </div>

                                {/* Specifications */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <img src={assets.speedometer} className="w-4 h-4" alt="mileage" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-500">Mileage</span>
                                            <span className="font-medium">{car.mileage} KM</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <img src={assets.gearbox} className="w-4 h-4" alt="transmission" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-500">Transmission</span>
                                            <span className="font-medium capitalize">{car.gearbox_type}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <img src={assets.fuel} className="w-4 h-4" alt="fuel" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-500">Fuel Type</span>
                                            <span className="font-medium capitalize">{car.fuel_type}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <img src={assets.year} className="w-4 h-4" alt="year" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-500">Year</span>
                                            <span className="font-medium">{car.year}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Buy Button */}
                                <NavLink 
                                    to={`/car/${car._id}`}
                                    className="inline-block w-full text-center px-8 py-3 bg-red-600 text-white rounded-lg 
                                    hover:bg-red-700 transition-colors duration-300"
                                >
                                    View Full Details
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Positioning helper function
function getDotPosition(index) {
    switch(index) {
        case 0: return 'left-[15%] top-[30%]';  // Color
        case 1: return 'right-[25%] top-[40%]';  // Power
        case 2: return 'left-[20%] bottom-[25%]'; // Country
        case 3: return 'right-[15%] bottom-[30%]'; // Fiscal
        default: return '';
    }
}