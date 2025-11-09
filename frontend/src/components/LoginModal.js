import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiX, FiMail, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  const [loginType, setLoginType] = useState('admin'); // 'admin' or 'client'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin, clientLogin, googleLogin, phoneLogin, verifyOTP } = useAuth();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOTP, setShowOTP] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (loginType === 'admin') {
        await adminLogin(email, password);
        navigate('/admin');
      } else {
        await clientLogin(email, password);
      }
      onClose();
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await googleLogin();
      if (loginType === 'admin') {
        navigate('/admin');
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await phoneLogin(phoneNumber);
      setConfirmationResult(result);
      setShowOTP(true);
    } catch (err) {
      setError(err.message || 'Phone login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError('');
    setLoading(true);

    try {
      await verifyOTP(confirmationResult, otpCode);
      onClose();
      setPhoneNumber('');
      setOtpCode('');
      setShowOTP(false);
    } catch (err) {
      setError(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div
          className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => {
                setLoginType('admin');
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded ${
                loginType === 'admin'
                  ? 'bg-red-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Admin Login
            </button>
            <button
              onClick={() => {
                setLoginType('client');
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded ${
                loginType === 'client'
                  ? 'bg-red-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Client Login
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {!showOTP ? (
            <>
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-orange-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-orange-500"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-orange-500 text-white py-2 px-4 rounded hover:bg-red-orange-600 disabled:opacity-50"
                >
                  {loading ? 'Logging in...' : 'Login with Email'}
                </button>
              </form>

              <div className="my-4 text-center text-gray-500">OR</div>

              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 mb-3"
              >
                {loading ? 'Logging in...' : 'Login with Google'}
              </button>

              {loginType === 'client' && (
                <>
                  <div className="my-4 text-center text-gray-500">OR</div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-orange-500"
                        placeholder="+1234567890"
                      />
                    </div>
                    <button
                      onClick={handlePhoneLogin}
                      disabled={loading || !phoneNumber}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
                    >
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-orange-500"
                  placeholder="Enter 6-digit OTP"
                />
              </div>
              <button
                onClick={handleVerifyOTP}
                disabled={loading || !otpCode}
                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                onClick={() => {
                  setShowOTP(false);
                  setOtpCode('');
                }}
                className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              >
                Back
              </button>
            </div>
          )}

          <div id="recaptcha-container"></div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoginModal;


