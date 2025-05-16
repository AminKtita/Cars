import { useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminLogin, AdminRoute } from './pages/AdminLogin';
import { MetabaseDashboard } from './pages/MetabaseDashboard';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
    const location = useLocation();
    
    return (
      <AuthProvider> {/* Wrap everything inside AuthProvider */}
        <div>
          {location.pathname !== "/" && <Navbar />}
          <Routes>
              <Route path="/" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                  <AdminRoute>
                      <MetabaseDashboard />
                  </AdminRoute>
              } />
          </Routes>
        </div>
      </AuthProvider>
    );
}