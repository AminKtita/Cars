import React, { useContext, useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { CarContext } from '../context/CarContext';
import { LoginPromptModal } from '../Modals/Modal'; // Import the LoginPromptModal
import { isTokenExpired ,checkFavorite} from '../services/api';

export const CarItem = ({ id, image, name, price, brand, model ,year, mileage}) => {
  const {currency } = useContext(CarContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); 
  const [isFavorite, setIsFavorite] = useState(false);
  
  const navigate = useNavigate(); 

  const handleClick = () => {
    // Check both storage locations
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
          {/* Top Overlay with flex container */}
              <div className='absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between items-center'>
              <div>
                <p className='text-sm font-medium'>{brand}</p>
                <p className='text-xs'>{model}</p>
              </div>
              
              {/* Favorite */}
              <div className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-300 fill-transparent'}`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
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