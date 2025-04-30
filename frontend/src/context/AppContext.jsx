import { createContext, useContext, useEffect, useState } from 'react';
import { getProfile ,isTokenExpired} from '../services/api';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const currency = '€';


// In your fetchUser function:
const fetchUser = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      setLoading(false);
      return;
    }

    const data = await getProfile();
    setUser({
      ...data,
      profileImage: data.profileImage ? `${data.profileImage}?${Date.now()}` : null,
      favoritesCount: data.favoritesCount || 0,
      filtersCount: data.filtersCount || 0,
    
      createdAt: data.createdAt || new Date().toISOString()
    });
  } catch (error) {
    console.error('Fetch user error:', error);
    logout();
  } finally {
    setLoading(false);
  }
};          
      
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    };

    useEffect(() => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const initializeUser = async () => {
        if (token && !isTokenExpired(token)) {
          await fetchUser();
        } else {
          setLoading(false);
        }
      };
    
      initializeUser();
    }, []); // Keep empty array but add token check
    
    // Add this useEffect to watch for storage changes
    useEffect(() => {
      const handleStorageChange = () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
          fetchUser();
        } else {
          setUser(null);
        }
      };
    
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    const contextValue = {
        currency,
        user,
        loading,
        search,
        showSearch,
        setSearch,
        setShowSearch,
        fetchUser,
        logout
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
export const useAppContext = () => useContext(AppContext);