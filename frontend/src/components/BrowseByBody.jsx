import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

export const BrowseByBody = () => {
    const body_types = [
        { id: 1, name: 'Hatchback', image: assets.hatchback },
        { id: 2, name: 'Sedan', image: assets.sedan },
        { id: 3, name: 'Suv', image: assets.suv },
        { id: 4, name: 'Wagon', image: assets.wagon },
        { id: 5, name: 'Mini', image: assets.mini },
        { id: 6, name: 'Van', image: assets.van }
    ];

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={assets.bg2}
                    alt="Background" 
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content Section */}
            <div className="relative z-10 h-full flex items-center px-4 py-12 md:px-8 md:py-16 lg:px-16 lg:py-24">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 text-white">
                        {/* Left Content */}
                        <div className="lg:max-w-[460px] mb-8 lg:mb-0">
                            <span className="text-red-600 font-semibold text-base md:text-lg mb-4 md:mb-6 block">
                                Trusted Car Dealer Service
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
                                Browse By Body
                            </h2>
                            <p className="text-gray-200 text-base md:text-lg mb-8 md:mb-10">
                                For 15 years, we raising the standard of used car retailing with
                                one of the most innovative and reliable used vehicle
                            </p>
                            <div className="flex items-center space-x-6">
                                <NavLink 
                                    to='/cars'
                                    className="rounded-lg bg-red-600 px-6 py-2 md:px-8 md:py-3 font-medium text-white transition-all hover:bg-red-700 text-sm md:text-base"
                                >
                                    Go to listing
                                </NavLink>
                            </div>
                        </div>

                        {/* Grid Section */}
                        <div className="flex-1">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                                {body_types.map((bodyType) => (
                                    <NavLink 
                                        key={bodyType.id}
                                        to={`/cars?bodyTypes=${encodeURIComponent(bodyType.name)}`}
                                        className="group bg-white/10 p-4 md:p-6 rounded-lg md:rounded-xl backdrop-blur-sm 
                                                hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
                                    >
                                        <div className="bg-white/20 rounded-lg p-2 md:p-4 mb-2 md:mb-4">
                                            <img 
                                                src={bodyType.image} 
                                                alt={bodyType.name} 
                                                className="w-full h-16 md:h-20 object-contain"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-medium capitalize text-sm md:text-base">
                                                {bodyType.name}
                                            </span>
                                            <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center 
                                                        justify-center group-hover:bg-red-600 transition-colors">
                                                <svg 
                                                    className="w-3 h-3 md:w-4 md:h-4 text-white" 
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
                                        </div>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}