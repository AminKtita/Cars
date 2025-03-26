import {Home} from './pages/Home'
import { Navbar } from './components/Navbar'
import { CarList } from './pages/CarList'
import { CarDetail } from './pages/CarDetail'
import { SearchBar } from './components/SearchBar'
import { LoginSignUp } from './pages/LoginSignUp'
import { ProtectedRoute } from './components/ProtectedRoute';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { isTokenExpired } from './services/api';


const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate('/login');
      }
    };

    checkToken(); // Initial check
    window.addEventListener('storage', checkToken); // Cross-tab sync
    
    return () => window.removeEventListener('storage', checkToken);
  }, [navigate]);
};

export const App = () => {
  useAuthCheck(); // Add the auth check hook here

  return (
    <div className='px-4 sm:px-4 md:px-6 lg:px-8'>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/cars' element={
          <ProtectedRoute>
            <CarList />
          </ProtectedRoute>
        }/>
        <Route path='/car/:CarId' element={
          <ProtectedRoute>
            <CarDetail />
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  )
}