import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { CarContext } from '../context/CarContext';
import { isTokenExpired ,login} from '../services/api'; 

export const Navbar = () => {
  const [visible, setVisible] = useState(false); 
  const [showDropdown, setShowDropdown] = useState(false); 
  const { setShowSearch } = useContext(CarContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); 

  // Check if the user is logged in
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const isLoggedIn = token ? !isTokenExpired(token) : false;
  
  // Updated username retrieval
  const username = localStorage.getItem('username') || sessionStorage.getItem('username') || 'User';
  const handleLogin = () => {
    navigate('/login');
  };
  
  // Updated logout handler
  const handleLogout = () => {
    // Clear all storage locations
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    navigate('/');
    window.location.reload(); // Force refresh to update all components
  };

  // Add storage listener to update state
  useEffect(() => {
    const handleStorageChange = () => {
      // Force re-render when token changes
      setShowDropdown(false);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex items-center justify-between py-5 font-medium relative'>
      {/* Logo */}
      <NavLink className='flex flex-col items-center gap-l' to={`/`}>
        <img src={assets.logo} className='w-36' alt='' />
      </NavLink>

      {/* Desktop Menu */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink className='flex flex-col items-center gap-1' to={`/`}>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to={`/cars`}>
          <p>BUY</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Search and Profile Icons */}
      <div className='flex items-center gap-6'>
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className='w-5 cursor-pointer'
          alt=''
        />
        <div
          ref={dropdownRef}
          className='relative flex items-center gap-2 cursor-pointer'
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={assets.profile_icon} className='w-6' alt='' />
          <p className='text-sm'>{isLoggedIn ? username : 'Login'}</p>
          <img
            src={assets.dropdown_icon}
            className={`w-3 transition-transform ${showDropdown ? '-rotate-90' : 'rotate-90'}`}
            alt=''
          />

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className='absolute top-8 right-0 bg-white shadow-lg rounded-lg w-48 z-50'>
              <div className='p-4 space-y-3'>
                {/* Menu Items */}
                <div className='flex items-center gap-2'>
                  <img src={assets.save} className='w-4' alt='' />
                  <p className='text-sm font-medium'>Saved Searches</p>
                </div>
                <div className='flex items-center gap-2'>
                  <img src={assets.history} className='w-4' alt='' />
                  <p className='text-sm font-medium'>Last Searches</p>
                </div>
                <div className='flex items-center gap-2'>
                  <img src={assets.heart} className='w-4' alt='' />
                  <p className='text-sm font-medium'>Favorite Cars</p>
                </div>

                {/* Log In/Out Button */}
                <button
                  onClick={isLoggedIn ? handleLogout : handleLogin}
                  className='w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-violet-500 text-white text-sm font-bold mt-2'
                >
                  {isLoggedIn ? 'Log Out' : 'Log In'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <img
        onClick={() => setVisible(true)}
        src={assets.menu_icon}
        className='w-5 cursor-pointer sm:hidden'
        alt=''
      />

      {/* Mobile Menu (Full-Screen Overlay) */}
      <div
        className={`fixed top-0 right-0 bottom-0 left-0 bg-white z-50 transition-transform transform ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col text-gray-600 p-4'>
          {/* Close Button */}
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='' />
            <p>Back</p>
          </div>

          {/* Menu Links */}
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border'>
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border'>
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border'>
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};