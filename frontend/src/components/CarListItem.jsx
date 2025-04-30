import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LoginPromptModal } from '../Modals/Modal';
import { isTokenExpired, checkFavorite } from '../services/api';
import { assets } from '../assets/assets';

export const CarListItem = ({ id, image, name, price, brand, model, year, mileage, fuel, gearbox }) => {
  const { currency } = useContext(AppContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const isLoggedIn = token ? !isTokenExpired(token) : false;

    if (isLoggedIn) {
      navigate(`/car/${id}`);
    } else {
      setShowLoginPrompt(true);
    }
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const { isFavorite } = await checkFavorite(id);
        setIsFavorite(isFavorite);
      } catch (err) {
        console.error('Error checking favorite:', err);
      }
    };
    checkFavoriteStatus();
  }, [id]);

  return (
    <>
      <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
        <div className="cursor-pointer flex-grow flex flex-col sm:flex-row gap-4 sm:gap-6" onClick={handleClick}>
          {/* Image Gallery */}
          <div className="relative w-full sm:w-64 flex-shrink-0 aspect-[4/3] overflow-hidden rounded-lg">
            {image.slice(0, 3).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  activeImageIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}

            {image.length > 3 && activeImageIndex === 2 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex items-center text-white text-sm">
                  <img src={assets.camera} className="w-4 h-4 mr-1 sm:mr-2" alt="camera" />
                  <span>+{image.length - 3}</span>
                </div>
              </div>
            )}

            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between">
              <div className="bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm flex items-center">
                <img src={assets.camera} className="w-3 h-3 sm:w-4 sm:h-4 mr-1" alt="photos" />
                <span>{image.length}</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm flex items-center">
                <img src={assets.year} className="w-3 h-3 sm:w-4 sm:h-4 mr-1" alt="year" />
                <span>{year}</span>
              </div>
            </div>

            {image.length > 1 && (
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
                {image.slice(0, 3).map((_, index) => (
                  <div
                    key={index}
                    className={`w-6 sm:w-8 h-1 rounded-full cursor-pointer transition-colors ${
                      activeImageIndex === index ? 'bg-red-600' : 'bg-white/50'
                    }`}
                    onMouseEnter={() => setActiveImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-grow">
            <div className="mb-2 sm:mb-3">
              <span className="text-red-700 text-xs sm:text-sm">{brand}</span>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-1">{name}</h3>
              <p className="text-xl sm:text-2xl font-bold text-red-700 mt-1">
                {currency} {price.toLocaleString()}
              </p>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-6 text-xs sm:text-sm border-t pt-3 sm:pt-4">
              {[
                {icon: assets.fuel, label: 'Fuel', value: fuel},
                {icon: assets.speedometer, label: 'Mileage', value: `${mileage} km`},
                {icon: assets.gearbox, label: 'Gearbox', value: gearbox}
              ].map((spec, index) => (
                <div key={index} className="flex items-center">
                  <img src={spec.icon} className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" alt={spec.label} />
                  <div>
                    <p className="text-gray-500">{spec.label}</p>
                    <p className="font-medium capitalize">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-4 sm:mt-6 border-t pt-3 sm:pt-4">
              <div className="flex items-center text-red-700 hover:text-amber-700 font-medium text-sm sm:text-base">
                View Details
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <button className="self-start sm:self-center p-1 sm:p-2 hover:bg-gray-100 rounded-full">
          <svg
            className={`w-5 h-5 sm:w-6 sm:h-6 ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>

      {showLoginPrompt && <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />}
    </>
  );
};