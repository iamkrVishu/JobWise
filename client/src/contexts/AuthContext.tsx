import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'applicant' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Simulate token validation
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      if (email === 'admin@jobwise.com' && password === 'admin123') {
        const adminUser = { 
          id: '1', 
          email: 'admin@jobwise.com', 
          name: 'Admin', 
          role: 'admin' as const 
        };
        setUser(adminUser);
        localStorage.setItem('token', 'admin-token');
        localStorage.setItem('user', JSON.stringify(adminUser));
        toast.success('Welcome back, Admin!');
        return true;
      } else if (email === 'user@jobwise.com' && password === 'user123') {
        const regularUser = { 
          id: '2', 
          email: 'user@jobwise.com', 
          name: 'Admin', 
          role: 'applicant' as const 
        };
        setUser(regularUser);
        localStorage.setItem('token', 'user-token');
        localStorage.setItem('user', JSON.stringify(regularUser));
        toast.success('Welcome back!');
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      toast.error('Login failed');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, role = 'applicant'): Promise<boolean> => {
    try {
      // Simulate API call
      const newUser = { 
        id: Date.now().toString(), 
        email, 
        name, 
        role: role as 'applicant' | 'admin' 
      };
      setUser(newUser);
      localStorage.setItem('token', 'new-user-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error('Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};