import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiLogIn, FiLogOut, FiMenu, FiX, FiHome, FiImage, FiLayout } from 'react-icons/fi';
import LoginModal from './LoginModal';

const Navbar = ({ isScrolled, darkBackground = false }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-4 backdrop-blur-md shadow-lg"
        style={{
          backgroundColor: darkBackground ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://cdn.bio.link/uploads/profile_pictures/2023-10-06/IWyuyLz8EahJPxI2IWh9L8vdQkIYVjJZ.png"
              alt="TCET Capture Logo"
              className="h-10 w-10 md:h-12 md:w-12 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <motion.span
              className={`font-bold transition-all duration-300 text-4xl ${darkBackground ? 'text-white' : 'text-white'}`}
            >
              TCET Capture
            </motion.span>
          </Link>

          <ul className="navbar-expand-list hidden md:flex">
            <li className="navbar-expand-item" data-gradient="home">
              <Link to="/">
                <FiHome className="icon" />
                <span className="title">Home</span>
              </Link>
            </li>
            <li className="navbar-expand-item" data-gradient="gallery">
              <Link to="/gallery">
                <FiImage className="icon" />
                <span className="title">Gallery</span>
              </Link>
            </li>
            {currentUser && userRole === 'admin' && (
              <li className="navbar-expand-item" data-gradient="dashboard">
                <Link to="/admin">
                  <FiLayout className="icon" />
                  <span className="title">Dashboard</span>
                </Link>
              </li>
            )}
            {currentUser ? (
              <li className="navbar-expand-item" data-gradient="logout">
                <button onClick={handleLogout}>
                  <FiLogOut className="icon" />
                  <span className="title">Logout</span>
                </button>
              </li>
            ) : (
              <li className="navbar-expand-item" data-gradient="login">
                <button onClick={() => setIsLoginOpen(true)}>
                  <FiLogIn className="icon" />
                  <span className="title">Login</span>
                </button>
              </li>
            )}
          </ul>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-md border-t border-gray-700"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 space-y-3">
                <Link
                  to="/"
                  className="block text-white hover:text-red-orange-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/gallery"
                  className="block text-white hover:text-red-orange-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Gallery
                </Link>
                {currentUser && userRole === 'admin' && (
                  <Link
                    to="/admin"
                    className="block text-white hover:text-red-orange-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                {currentUser ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-white hover:text-red-orange-500"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-white hover:text-red-orange-500"
                  >
                    <FiLogIn />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;

