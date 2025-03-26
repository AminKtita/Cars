import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../services/api'; // Add this import

export const ProtectedRoute = ({ children }) => {
  // Check both storage locations
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const isExpired = token ? isTokenExpired(token) : true;

  if (!token || isExpired) {
    // Clear invalid tokens
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return children;
};