'use client'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

export const BrowseByBrand = () => {
    const brands = [
        { id: 1, name: 'Mercedes-Benz', image: assets.brand1 },
        { id: 2, name: 'Jeep', image: assets.brand2 },
        { id: 3, name: 'Bmw', image: assets.brand3 },
        { id: 4, name: 'Audi', image: assets.brand4 },
        { id: 5, name: 'Ford', image: assets.brand5 },
        { id: 6, name: 'Volkswagen', image: assets.brand6 }
    ];

    return (
        <div className="relative mt-2 px-4 py-16 md:py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Heading Section */}
                <div className="mb-12 text-center">
                    <span className="mb-3 block text-lg font-medium text-red-600">
                        Find your car by car brand
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                        Browse by Brands
                    </h2>
                </div>

                {/* Brand Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6 xl:gap-8">
                    {brands.map((brand) => (
                        <div key={brand.id} className="group relative">
                            <NavLink 
                                to={`/cars?brand=${encodeURIComponent(brand.name)}`}
                                className="flex flex-col items-center rounded-xl border p-6 transition-all hover:border-red-500 hover:bg-white hover:shadow-lg"
                            >
                                {/* Brand Image */}
                                <div className="mb-4 h-20 w-20">
                                    <img 
                                        src={brand.image} 
                                        alt={`${brand.name} logo`} 
                                        className="h-full w-full object-contain object-center"
                                    />
                                </div>
                                
                                {/* Brand Name */}
                                <span className="mb-2 text-lg font-medium text-gray-800">
                                    {brand.name}
                                </span>
                                
                                {/* Arrow Icon */}
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white transition-all group-hover:bg-red-700">
                                    <svg 
                                        className="h-4 w-4" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M14 5l7 7m0 0l-7 7m7-7H3" 
                                        />
                                    </svg>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}