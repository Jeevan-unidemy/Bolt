import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { signIn } from '../lib/supabase';
import ForgotPasswordModal from './ForgotPasswordModal';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
  onSuccess?: () => void;
}

const SignInModal = ({ isOpen, onClose, onSwitchToSignUp, onSuccess }: SignInModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await signIn(formData.email, formData.password);
      setIsSignedIn(true);
      setTimeout(() => {
        onSuccess?.();
        resetModal();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setIsSignedIn(false);
    setError('');
    setFormData({
      email: '',
      password: '',
      rememberMe: false,
    });
    onClose();
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordOpen(true);
  };

  const handleBackToSignIn = () => {
    setIsForgotPasswordOpen(false);
  };

  if (!isOpen) return null;

  if (isSignedIn) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome Back!</h3>
          <p className="text-gray-600 mb-6">
            You're now signed in and ready to explore job opportunities.
          </p>
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignUp}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onBackToSignIn={handleBackToSignIn}
      />
    </>
  );
};

export default SignInModal;