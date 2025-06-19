import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Sun, Moon, LogOut, User, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
            >
              <Building2 className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              JobWise
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/feedback" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Feedback
            </Link>
            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/jobs" 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Jobs
                </Link>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-300">{user.name}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;