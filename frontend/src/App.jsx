import {Home} from './pages/Home'
import { Navbar } from './components/Navbar'
import { CarList } from './pages/CarList'
import { CarDetail } from './pages/CarDetail'
import { LoginSignUp } from './pages/LoginSignUp'
import { ProtectedRoute } from './components/ProtectedRoute';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { isTokenExpired } from './services/api';
import { FavoritesPage } from './pages/FavoritesPage'
import { HistoryPage } from './pages/HistoryPage'
import { SavedFiltersPage } from './pages/SavedFiltersPage'
import { FaqPage } from './pages/FaqPage'
import { TermsPage } from './pages/TermsPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { Footer } from './components/Footer'
import { ProfilePage } from './pages/ProfilePage'


import { Dashboard } from './pages/Dashboard'






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
    <div>
      <Navbar />
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

      <Route path="/favorites" element={
         <ProtectedRoute>
          <FavoritesPage />
         </ProtectedRoute>
        } />

      <Route path="/history" element={
         <ProtectedRoute>
          <HistoryPage />
         </ProtectedRoute>
        } />
      <Route path="/filters" element={
         <ProtectedRoute>
          <SavedFiltersPage />
         </ProtectedRoute>
        } />

      <Route path='/Profile' element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }/>
      <Route path='/faq' element={<FaqPage />} />
      <Route path='/terms' element={<TermsPage />} />
      <Route path='/contact' element={<ContactPage />} />


      <Route path='/dashboard' element={<Dashboard />} />




      <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}