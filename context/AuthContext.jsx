
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
   
  
  useEffect(() => {
    // Check if user is logged in (could use local storage or cookies)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // This would be replaced with actual API call in production
      // Mock login for now
      const mockUser = {
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'manager',
        token: 'mock-token-123456',
        initials: 'AU'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const register = async (userData) => {
    try {
      // Mock registration
      // This would be replaced with actual API call in production
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
