import React, { useState } from 'react';
import { X, Upload, FileText, User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Phone, MapPin, Briefcase } from 'lucide-react';
import { signUp } from '../lib/supabase';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
  onSuccess?: () => void;
}

const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn, onSuccess }: SignUpModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    experience: '',
    jobTitle: '',
    skills: '',
    linkedin: '',
    portfolio: '',
    notifications: true,
    terms: false,
  });
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }
      setUploadedResume(file);
      setErrors(prev => ({ ...prev, resume: '' }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (step === 2) {
      if (!formData.location.trim()) newErrors.location = 'Location is required';
      if (!formData.experience) newErrors.experience = 'Experience level is required';
      if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    }

    if (step === 3) {
      if (!formData.terms) newErrors.terms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    try {
      await signUp(formData.email, formData.password, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        location: formData.location,
        job_title: formData.jobTitle,
        experience_level: formData.experience,
        linkedin_url: formData.linkedin,
        portfolio_url: formData.portfolio,
        email_notifications: formData.notifications,
      });
      
      setIsRegistered(true);
      setTimeout(() => {
        onSuccess?.();
        resetModal();
      }, 2000);
    } catch (err: any) {
      setErrors({ submit: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setCurrentStep(1);
    setIsRegistered(false);
    setErrors({});
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      location: '',
      experience: '',
      jobTitle: '',
      skills: '',
      linkedin: '',
      portfolio: '',
      notifications: true,
      terms: false,
    });
    setUploadedResume(null);
    onClose();
  };

  if (!isOpen) return null;

  if (isRegistered) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Unidemy Jobs!</h3>
          <p className="text-gray-600 mb-6">
            Your account has been created successfully. You can now start applying to jobs and managing your profile.
          </p>
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
            <p className="text-gray-600">Join thousands of professionals finding their dream jobs</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep >= step ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {step === 1 && 'Account Details'}
                  {step === 2 && 'Professional Info'}
                  {step === 3 && 'Complete Setup'}
                </span>
                {step < 3 && (
                  <div
                    className={`w-12 h-0.5 ml-4 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Account Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.firstName ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="Enter your first name"
                      />
                    </div>
                    {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.lastName ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="Enter your last name"
                      />
                    </div>
                    {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.password ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, State"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.location ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.experience ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select experience</option>
                      <option value="Entry-level">Entry-level</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                    {errors.experience && <p className="text-red-600 text-sm mt-1">{errors.experience}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current/Desired Job Title *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="e.g., Frontend Developer, Product Manager"
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.jobTitle ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.jobTitle && <p className="text-red-600 text-sm mt-1">{errors.jobTitle}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio/Website
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="https://yourportfolio.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Complete Setup */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Your Setup</h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">You're almost done!</p>
                      <p className="text-blue-700">
                        Complete your registration to start exploring job opportunities and connecting with top employers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifications"
                      name="notifications"
                      checked={formData.notifications}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="notifications" className="ml-2 text-sm text-gray-700">
                      Send me job recommendations and updates
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> *
                    </label>
                  </div>
                  {errors.terms && <p className="text-red-600 text-sm mt-1">{errors.terms}</p>}
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-800 text-sm">{errors.submit}</p>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Previous
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              Already have an account? Sign In
            </button>
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;