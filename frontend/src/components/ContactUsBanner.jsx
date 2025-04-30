import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

export const ContactUsBanner = () => {
    return (
        <div className="bg-red-600 py-8 sm:py-10 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                    {/* Left Side - Title */}
                    <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-white text-center sm:text-left">
                        Discover the best European cars and offers.
                    </h2>

                    {/* Right Side - Contact Info + Button */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8">
                        {/* Phone Number */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="bg-white p-1.5 sm:p-2 rounded-full">
                                <img
                                    src={assets.phone_white}
                                    alt="Phone"
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                />
                            </div>
                            <p className="text-white font-medium text-sm sm:text-base">(216) 52315781</p>
                        </div>

                        {/* Button */}
                        <NavLink 
                            to="/cars"
                            className="bg-white text-black px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg 
                            hover:bg-black hover:text-white transition-all duration-300 
                            border-2 border-transparent hover:border-white text-sm sm:text-base"
                        >
                            More Listings
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};