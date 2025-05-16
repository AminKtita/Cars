import { createContext, useContext, useEffect, useState } from 'react';
import { login, getProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const data = await getProfile();
            setUser({
                ...data,
                role: data.role || 'user' // Default to user role
            });
        } catch (error) {
            logout();
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (token) => {
        localStorage.setItem('token', token);
        await fetchUser();
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) fetchUser();
        else setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login: handleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);