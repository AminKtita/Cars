import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';


export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const {user, logout }= useAppContext();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);



  return (
    <header className="main-header w-full">
      {/* Top Red Bar */}
      <div className="bg-red-600 text-white py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          {/* Contact Info */}
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <div className="flex items-center">
              <img src={assets.phone_white} className="w-4 h-4 mr-2" alt="Phone" />
              <span>+216 12 345 678</span>
            </div>
            <div className="flex items-center">
              <img src={assets.email} className="w-4 h-4 mr-2" alt="Email" />
              <span>contact@cardealer.com</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook} className="w-5 h-5 hover:opacity-80" alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter} className="w-5 h-5 hover:opacity-80" alt="Twitter" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.instagram} className="w-5 h-5 hover:opacity-80" alt="Instagram" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin} className="w-5 h-5 hover:opacity-80" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="logo-box flex items-center">
              <NavLink to="/">
                <img src={assets.logo} className="h-12" alt="Logo" />
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center flex-grow justify-center">
            <ul className="flex space-x-8">
              <li>
                <NavLink to="/" className="text-gray-700 hover:text-red-600 font-medium">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/cars" className="text-gray-700 hover:text-red-600 font-medium">
                  Cars
                </NavLink>
              </li>

              <li>
                <NavLink to="/faq" className="text-gray-700 hover:text-red-600 font-medium">
                  FAQ
                </NavLink>
              </li>

              <li>
                <NavLink to="/terms" className="text-gray-700 hover:text-red-600 font-medium">
                  Privacy Policy
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" className="text-gray-700 hover:text-red-600 font-medium">
                Contact Us
                </NavLink>
              </li>
            </ul>
            </nav>

            {/* Right Side Controls */}
          <div className="flex items-center space-x-6">
            <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2"
                >
                  {/* Profile image */}
                  {user?.profileImage ? (
                      <img 
                        src={`http://localhost:8001${user.profileImage}`} 
                        className="w-8 h-8 rounded-full object-cover"
                        alt="Profile"
                        onError={(e) => {
                          e.target.src = assets.profile_icon;
                          e.target.onerror = null;
                        }}
                      />
                    ) : (
                      <img 
                        src={assets.profile_icon} 
                        className="w-8 h-8 rounded-full"
                        alt="Default Profile"
                      />
                    )}
                    <span className="text-gray-700 font-medium">
                    {user ? user.username : 'Login'}
                  </span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    {user ? (
                      <>
                        <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</NavLink>
                        <NavLink to="/favorites" className="block px-4 py-2 hover:bg-gray-100">Favorites</NavLink>
                        <NavLink to="/history" className="block px-4 py-2 hover:bg-gray-100">History</NavLink>
                        <NavLink to="/filters" className="block px-4 py-2 hover:bg-gray-100">Saved Filters</NavLink>

                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => navigate('/login')}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Login
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setVisible(true)}
              className="lg:hidden text-gray-600 hover:text-red-600">
              <img src={assets.menu_icon} className="w-6" alt="Menu" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 transform ${visible ? 'translate-x-0' : 'translate-x-full'} transition-transform lg:hidden`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <img src={assets.logo} className="h-10" alt="Logo" />
            <button 
              onClick={() => setVisible(false)}
              className="text-gray-500 hover:text-red-600">
              ✕
            </button>
          </div>

          <nav className="space-y-4">
            <NavLink to="/" className="block py-2 text-gray-700 hover:text-red-600">Home</NavLink>
            <NavLink to="/cars" className="block py-2 text-gray-700 hover:text-red-600">Cars</NavLink>
            <NavLink to="/faq" className="block py-2 text-gray-700 hover:text-red-600">FAQ</NavLink>
            <NavLink to="/terms" className="block py-2 text-gray-700 hover:text-red-600">Privacy Policy</NavLink>
            <NavLink to="/contact" className="block py-2 text-gray-700 hover:text-red-600">Contact Us</NavLink>
            
            {user  ? (
              <>
                <NavLink to="/favorites" className="block py-2 text-gray-700 hover:text-red-600">Favorites</NavLink>
                <NavLink to="/history" className="block py-2 text-gray-700 hover:text-red-600">History</NavLink>
                <NavLink to="/filters" className="block py-2 text-gray-700 hover:text-red-600">Saved Filters</NavLink>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-600 hover:text-red-700">
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="w-full text-left py-2 text-gray-700 hover:text-red-600">
                Login
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};