import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { getMostViewedCar } from '../services/api';

export const TopViewedCar = () => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeDetailIndex, setActiveDetailIndex] = useState(0);
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <div className="text-center py-6 sm:py-8 text-sm sm:text-base">Loading most viewed car...</div>;
    if (!car) return <div className="text-center py-6 sm:py-8 text-sm sm:text-base">No viewed cars found</div>;

    return (
        <div className="bg-gray-50 py-8 md:py-12">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Heading Section */}
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">Top Viewed Car</h2>
                        <p className="text-gray-600 mt-2 md:mt-3 text-sm md:text-base">Most popular vehicle among our users</p>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
                        {/* Image Section */}
                        <div className="flex-1 lg:max-w-[65%]">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:rounded-xl">
                                {/* Offer Badge */}
                                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-40 animate-pulse">
                                    <img 
                                        src={assets.popular} 
                                        alt="Popular badge" 
                                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain drop-shadow-lg"
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
                                            <div className="flex items-center text-white text-xs sm:text-sm">
                                                <img src={assets.camera} className="w-4 h-4 mr-1 sm:mr-2" alt="camera" />
                                                <span>+{car.images.length - 3} more</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Navigation Dots */}
                                {car.images?.length > 1 && (
                                    <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
                                        {car.images.slice(0, 3).map((_, index) => (
                                            <button
                                                key={index}
                                                className={`w-6 sm:w-8 h-1 rounded-full transition-colors ${
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
                                            transition-all duration-300 group hidden sm:block`}
                                        onMouseEnter={() => setActiveDetailIndex(index)}
                                    >
                                        <button className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-110">
                                            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-600" />
                                        </button>
                                        <div className={`absolute left-10 sm:left-14 top-1/2 -translate-y-1/2 bg-white p-3 sm:p-4 rounded-lg shadow-md
                                            transition-opacity duration-300 ${activeDetailIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{dot.label}</h3>
                                            <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                                                {dot.value || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 lg:max-w-[35%]">
                            <div className="space-y-4 sm:space-y-6">
                                <span className="text-red-600 font-medium text-sm sm:text-base">{car.brand_name}</span>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{car.vehicle_title}</h3>
                                
                                {/* Price */}
                                <div className="flex gap-4 items-baseline">
                                    <span className="text-xl sm:text-2xl font-bold text-red-600">
                                    €{car.price}
                                    </span>
                                </div>

                                {/* Specifications */}
                                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                                    {[
                                        {icon: assets.speedometer, label: 'Mileage', value: `${car.mileage} KM`},
                                        {icon: assets.gearbox, label: 'Transmission', value: car.gearbox_type},
                                        {icon: assets.fuel, label: 'Fuel Type', value: car.fuel_type},
                                        {icon: assets.year, label: 'Year', value: car.year}
                                    ].map((spec, index) => (
                                        <div key={index} className="flex items-center gap-1.5 p-2 sm:p-3 bg-gray-50 rounded-lg">
                                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                <img src={spec.icon} className="w-3 h-3 sm:w-4 sm:h-4" alt={spec.label} />
                                            </div>
                                            <div>
                                                <span className="block text-xs sm:text-sm text-gray-500">{spec.label}</span>
                                                <span className="font-medium text-sm sm:text-base capitalize">{spec.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Buy Button */}
                                <NavLink 
                                    to={`/car/${car._id}`}
                                    className="inline-block w-full text-center px-6 py-2 sm:px-8 sm:py-3 bg-red-600 text-white rounded-lg 
                                    hover:bg-red-700 transition-colors duration-300 text-sm sm:text-base"
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

function getDotPosition(index) {
    switch(index) {
        case 0: return 'left-[10%] sm:left-[15%] top-[25%] sm:top-[30%]';
        case 1: return 'right-[20%] sm:right-[25%] top-[35%] sm:top-[40%]';
        case 2: return 'left-[15%] sm:left-[20%] bottom-[20%] sm:bottom-[25%]';
        case 3: return 'right-[10%] sm:right-[15%] bottom-[25%] sm:bottom-[30%]';
        default: return '';
    }
}