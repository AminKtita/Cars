'use client'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

export const Banner = () => {
    const [isToggled, setToggled] = useState(true)
    const handleToggle = () => setToggled(!isToggled)
    
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={assets.bg} 
                    alt="Banner background" 
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content Section */}
            <div className="relative z-10 flex h-full items-center px-4 md:px-8 lg:px-16">
                <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                    {/* Text Content */}
                    <div className="flex flex-col space-y-4 text-white md:space-y-6">
                        <span className="text-base font-semibold text-red-600 md:text-lg">
                            Trusted Dealer
                        </span>
                        
                        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                            Premium Car Collection
                        </h1>
                        
                        <p className="max-w-xl text-base text-gray-200 md:text-lg">
                            Find and compare the best car deals from Europe, updated daily. 
                            Designed for Tunisians with FCR looking to import their perfect vehicle.
                        </p>

                        <div className="flex items-center space-x-6">
                            <NavLink 
                                to='/cars'
                                className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-all hover:bg-red-700 md:px-8 md:py-3"
                            >
                                Go to listing
                            </NavLink>
                        </div>
                    </div>

                    {/* Car Image Section */}
                    <div className="relative mt-8 md:mt-12 lg:mt-0">
                        <div className="absolute -left-0 -top-4 h-20 w-20 animate-pulse md:h-24 md:w-24">
                            <img 
                                src={assets.icon}
                                alt="Car icon" 
                                className="h-full w-full object-contain"
                            />
                        </div>

                        {/* Offer Badge */}
                        <div className="absolute -left-8 -top-4 rounded-full bg-red-600 p-3 text-center md:-left-12 md:p-4">
                            <p className="text-2xl font-bold md:text-3xl">40%</p>
                            <span className="text-xs md:text-sm">off</span>
                        </div>

                        {/* Car Image */}
                        <div className="relative">
                            <img 
                                src={assets.car}
                                alt="Luxury car" 
                                className="mx-auto w-full max-w-md object-contain lg:max-w-xl"
                            />

                            {/* Price Dot */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 md:right-8">
                                <button 
                                    onClick={handleToggle}
                                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all md:h-12 md:w-12 ${
                                        isToggled ? 'bg-red-600' : 'bg-white/20'
                                    }`}
                                >
                                    <i className="text-white" />
                                </button>
                                
                                {/* Price Card */}
                                <div className={`absolute right-12 top-0 w-40 rounded-lg bg-white p-3 shadow-xl transition-all md:right-14 md:w-48 md:p-4 ${
                                    isToggled ? 'visible opacity-100' : 'invisible opacity-0'
                                }`}>
                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-semibold md:text-base">Luxury Ford Car</span>
                                            <span className="text-sm font-bold text-red-600 md:text-base">€13000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="absolute bottom-4 left-4 space-y-1 text-xs text-white md:bottom-8 md:left-8 md:space-y-2 md:text-sm">
                    <div className="flex items-center gap-2">
                        <img src={assets.phone} className="h-3 w-3 md:h-4 md:w-4" alt="phone" />
                        <p>(603) 555-0123</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={assets.email} className="h-3 w-3 md:h-4 md:w-4" alt="email" />
                        <p>Contact@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}