import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

// Predefined users
const PREDEFINED_USERS = {
  manager: {
    id: 1,
    name: 'Admin Manager',
    email: 'admin@daystar.com',
    password: 'admin123',
    role: 'manager'
  },
  babysitter1: {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@daystar.com',
    password: 'jane123',
    role: 'babysitter'
  },
  babysitter2: {
    id: 3,
    name: 'John Doe',
    email: 'john@daystar.com',
    password: 'john123',
    role: 'babysitter'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Check for saved user data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    // Find user with matching credentials
    const foundUser = Object.values(PREDEFINED_USERS).find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      // Remove password before storing user data
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return { 
        success: true,
        user: userWithoutPassword
      };
    }

    return { 
      success: false, 
      message: 'Invalid email or password' 
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isManager = () => {
    return user?.role === 'manager';
  };

  const isBabysitter = () => {
    return user?.role === 'babysitter';
  };

  const isParent = () => {
    return user?.role === 'parent';
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      login, 
      logout, 
      isManager, 
      isBabysitter, 
      isParent 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
