import React, { useContext, useEffect, useState } from 'react';
import { CarContext } from '../context/CarContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

export const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(CarContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('cars')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  // Function to handle cross icon click
  const handleCrossClick = () => {
    setShowSearch(false); // Hide the search bar
    setSearch(''); // Clear the search input
  };

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
          type='text'
          placeholder='Search'
        />
        <img className='w-4' src={assets.search_icon} alt='Search' />
      </div>
      {/* Cross icon to hide search bar and clear input */}
      <img
        onClick={handleCrossClick}
        className='inline w-3 cursor-pointer'
        src={assets.cross_icon}
        alt='Close'
      />
    </div>
  ) : null;
};