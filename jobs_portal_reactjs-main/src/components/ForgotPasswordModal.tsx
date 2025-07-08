import React, { useState } from 'react';
import { X, Mail, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { resetPassword } from '../lib/supabase';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToSignIn: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose, onBackToSignIn }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await resetPassword(email);
      setIsEmailSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset email');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setEmail('');
    setIsEmailSent(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  if (isEmailSent) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h3>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>. 
            Click the link in the email to reset your password.
          </p>
          <div className="space-y-3">
            <button
              onClick={onBackToSignIn}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Back to Sign In
            </button>
            <button
              onClick={resetModal}
              className="w-full text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Didn't receive the email? Check your spam folder or try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
            <p className="text-gray-600">Enter your email to receive a reset link</p>
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending Reset Link...</span>
              </>
            ) : (
              <span>Send Reset Link</span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={onBackToSignIn}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;