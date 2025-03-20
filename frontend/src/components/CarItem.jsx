import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarContext } from '../context/CarContext';
import { LoginPromptModal } from '../Modals/Modal'; // Import the LoginPromptModal

export const CarItem = ({ id, image, name, price, brand, model }) => {
  const { currency } = useContext(CarContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // State for login prompt modal
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  const handleClick = () => {
    const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in
    if (isLoggedIn) {
      navigate(`/car/${id}`); // Navigate to the car details page
    } else {
      setShowLoginPrompt(true); // Show the login prompt modal
    }
  };

  return (
    <>
      {/* Car Item Container */}
      <div className='text-gray-700 cursor-pointer' onClick={handleClick}>
        <div className='overflow-hidden'>
          {/* Image Container */}
          <div className='w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-lg relative group'>
            {/* Image */}
            <img
              className='w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out'
              src={image[0]} // Use the first image in the array
              alt={name}
            />
            {/* Brand and Model Overlay (Top) */}
            <div className='absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2'>
              <p className='text-sm font-medium'>{brand}</p>
              <p className='text-xs'>{model}</p>
            </div>
            {/* Price Overlay (Center Bottom) */}
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-full shadow-lg'>
              <p className='text-sm font-medium'>{currency} {price}</p>
            </div>
          </div>
          {/* Car Details */}
          <p className='pt-3 pb-1 text-sm font-medium'>{name}</p>
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
    </>
  );
};