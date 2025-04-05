import React, { useContext, useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { CarContext } from '../context/CarContext';
import { LoginPromptModal } from '../Modals/Modal';
import { isTokenExpired,checkFavorite } from '../services/api';


export const CarListItem = ({ id, image, name, price, brand, model, year, mileage }) => {
  const { currency } = useContext(CarContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
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
      <div className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors" onClick={handleClick}>
        {/* Image thumbnail */}
        <div className="w-32 h-24 flex-shrink-0 relative">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={image[0]}
            alt={name}
          />
          <div className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
            {currency} {price}
          </div>
        </div>

        {/* Details */}
        <div className="flex-grow min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-lg font-semibold truncate">{name}</h3>
            <span className="text-sm text-gray-500 whitespace-nowrap">{brand} {model}</span>
          </div>
          
          <div className="flex gap-4 text-sm text-gray-600">
            {year && <div>Year: {year}</div>}
            {mileage && <div>Mileage: {mileage} km</div>}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 flex-shrink-0 pl-4">
            {/* Price */}
          <span className="text-base md:text-lg font-semibold">
            {currency} {price}
          </span>

            {/* Favorite Icon */}
            <div 
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
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
        </div>

      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
    </>
  );
};