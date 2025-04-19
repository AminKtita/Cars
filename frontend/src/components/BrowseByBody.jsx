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
        <div className="relative h-screen w-full overflow-hidden">
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
            <div className="relative z-10 h-full flex items-center px-4 md:px-8 lg:px-16">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 text-white">
                        {/* Left Content */}
                        <div className="lg:max-w-[460px]">
                            <span className="text-red-600 font-semibold text-lg mb-6 block">
                                Trusted Car Dealer Service
                            </span>
                            <h2 className="text-4xl font-bold mb-10">
                                Browse By Body
                            </h2>
                            <p className="text-gray-200 text-lg mb-10">
                                For 15 years, we raising the standard of used car retailing with
                                one of the most innovative and reliable used vehicle
                            </p>
                            <div className="flex items-center space-x-6">
                                <NavLink 
                                    to='/cars'
                                    className="rounded-lg bg-red-600 px-8 py-3 font-medium text-white transition-all hover:bg-red-700"
                                >
                                    Go to listing
                                </NavLink>
                            </div>
                        </div>

                        {/* Grid Section */}
                        <div className="flex-1">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {body_types.map((bodyType) => (
                                    <NavLink 
                                        key={bodyType.id}
                                        to={`/cars?bodyTypes=${encodeURIComponent(bodyType.name)}`}
                                        className="group bg-white/10 p-6 rounded-xl backdrop-blur-sm 
                                                hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
                                    >
                                        <div className="bg-white/20 rounded-lg p-4 mb-4">
                                            <img 
                                                src={bodyType.image} 
                                                alt={bodyType.name} 
                                                className="w-full h-20 object-contain"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-medium capitalize">
                                                {bodyType.name}
                                            </span>
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center 
                                                        justify-center group-hover:bg-red-600 transition-colors">
                                                <svg 
                                                    className="w-4 h-4 text-white" 
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