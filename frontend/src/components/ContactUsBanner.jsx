import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

export const ContactUsBanner = () => {
    return (
        <div className="bg-red-600 py-12 ">
            <div className="container mx-auto px-8">
                <div className="flex items-center justify-between">
                    {/* Left Side - Title */}
                    <h2 className="text-2xl font-bold text-white">
                        Discover the best European cars and offers.
                    </h2>

                    {/* Right Side - Contact Info + Button */}
                    <div className="flex items-center gap-10">
                        {/* Phone Number */}
                        <div className="flex items-center gap-3">
                            <div className="bg-red-700 p-2 rounded-full ">
                                <img
                                    src={assets.phone_white}
                                    alt="Phone"
                                    className="w-5 h-5 mx-auto "
                                />
                            </div>
                            <p className="text-white font-medium">(216) 52315781</p>
                        </div>

                        {/* Button */}
                        <NavLink 
                            to="/cars"
                            className="bg-white text-black px-5 py-2 rounded-lg 
                            hover:bg-black hover:text-white transition-all duration-300 
                            border-2 border-transparent hover:border-white"
                        >
                            More Listings
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};