'use client'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';




export const Banner = ()=> {
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
                <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Text Content */}
                    <div className="flex flex-col space-y-6 text-white">
                        <span className="text-lg font-semibold text-red-600">
                            Trusted Dealer
                        </span>
                        
                        <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                            Premium Car Collection
                        </h1>
                        
                        <p className="max-w-xl text-lg text-gray-200">
                        Find and compare the best car deals from Europe, updated daily. Designed for Tunisians with FCR looking to import their perfect vehicle.</p>

                        <div className="flex items-center space-x-6">
                            <NavLink 
                                to='/cars'
                                className="rounded-lg bg-red-600 px-8 py-3 font-medium text-white transition-all hover:bg-red-700"
                            >
                                Go to listing
                            </NavLink>
                        </div>
                    </div>

                    {/* Car Image Section */}
                    <div className="relative mt-12 lg:mt-0">
                        <div className="absolute -left-0 -top-4 h-24 w-24 animate-pulse">
                            <img 
                                src={assets.icon}
                                alt="Car icon" 
                                className="h-full w-full object-contain"
                            />
                        </div>

                        {/* Offer Badge */}
                        <div className="absolute -left-12 -top-4 rounded-full bg-red-600 p-4 text-center">
                            <p className="text-3xl font-bold">40%</p>
                            <span className="text-sm">off</span>
                        </div>

                        {/* Car Image */}
                        <div className="relative">
                            <img 
                                src={assets.car}
                                alt="Luxury car" 
                                className="mx-auto w-full max-w-xl object-contain"
                            />

                            {/* Price Dot */}
                            <div className="absolute right-8 top-1/2 -translate-y-1/2">
                                <button 
                                    onClick={handleToggle}
                                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                                        isToggled ? 'bg-red-600' : 'bg-white/20'
                                    }`}
                                >
                                    <i className="text-white" />
                                </button>
                                
                                {/* Price Card */}
                                <div className={`absolute right-14 top-0 w-48 rounded-lg bg-white p-4 shadow-xl transition-all ${
                                    isToggled ? 'visible opacity-100' : 'invisible opacity-0'
                                }`}>
                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <span className="font-semibold">Luxury Ford Car</span>
                                            <span className="font-bold text-red-600">€13000</span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="absolute bottom-8 left-8 space-y-2 text-sm text-white p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                        <img src={assets.phone} className="w-4 h-4" alt="phone" />
                        <p>(603) 555-0123</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={assets.email} className="w-4 h-4" alt="email" />
                        <p>Contact@gmail.com</p>
                    </div>
                </div>            </div>
                        </div>
    )
}