import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to login page
  };

  return (
    <header className="main-header w-full">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center flex-grow justify-center">
              <ul className="flex space-x-8">
                <li>
                  <NavLink to="/admin/dashboard" className="text-gray-700 hover:text-red-600 font-medium">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cars" className="text-gray-700 hover:text-red-600 font-medium">
                    Cars
                  </NavLink>
                </li>
              </ul>
            </nav>
            
            {/* Logout Section */}
            <div className="flex items-center">
              {user && (
                <button 
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};