import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarContext } from '../context/CarContext';
import { LoginPromptModal } from '../Modals/Modal';
import { isTokenExpired, checkFavorite } from '../services/api';
import { assets } from '../assets/assets';

export const CarListItem = ({ id, image, name, price, brand, model, year, mileage, fuel, gearbox }) => {
  const { currency } = useContext(CarContext);
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
      <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex gap-6 p-6">
        <div className="cursor-pointer flex-grow flex gap-6" onClick={handleClick}>
          {/* Image Gallery */}
          <div className="relative w-64 flex-shrink-0 aspect-[4/3] overflow-hidden rounded-lg">
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

            {/* Overlay for third image */}
            {image.length > 3 && activeImageIndex === 2 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex items-center text-white">
                  <img src={assets.camera} className="w-5 h-5 mr-2" alt="camera" />
                  <span>+{image.length - 3} more</span>
                </div>
              </div>
            )}

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center">
                <img src={assets.camera} className="w-4 h-4 mr-1" alt="photos" />
                <span>{image.length}</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center">
                <img src={assets.year} className="w-4 h-4 mr-1" alt="year" />
                <span>{year}</span>
              </div>
            </div>

            {/* Navigation bullets */}
            {image.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {image.slice(0, 3).map((_, index) => (
                  <div
                    key={index}
                    className={`w-8 h-1 rounded-full cursor-pointer transition-colors ${
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
            <div className="mb-3">
              <span className="text-red-700 text-sm font-medium">{brand}</span>
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              <p className="text-2xl font-bold text-red-700 mt-1">
                {currency} {price.toLocaleString()}
              </p>
            </div>

            {/* Specifications */}
            <div className="flex gap-8 text-sm border-t pt-4">
              <div className="flex items-center">
                <img src={assets.fuel} className="w-5 h-5 mr-2" alt="fuel" />
                <div>
                  <p className="text-gray-500">Fuel</p>
                  <p className="font-medium capitalize">{fuel}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <img src={assets.speedometer} className="w-5 h-5 mr-2" alt="mileage" />
                <div>
                  <p className="text-gray-500">Mileage</p>
                  <p className="font-medium">{mileage} km</p>
                </div>
              </div>

              <div className="flex items-center">
                <img src={assets.gearbox} className="w-5 h-5 mr-2" alt="transmission" />
                <div>
                  <p className="text-gray-500">Gearbox</p>
                  <p className="font-medium capitalize">{gearbox}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6 border-t pt-4">
              <div className="flex items-center text-red-700 hover:text-amber-700 font-medium">
                View Details
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Button */}
        <button className="self-start p-2 hover:bg-gray-100 rounded-full z-10">
          <svg
            className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600 fill-transparent'}`}
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