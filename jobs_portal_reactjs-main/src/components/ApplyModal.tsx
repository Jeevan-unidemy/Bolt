import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, MapPin, Clock, DollarSign, Building, User, Mail, Phone, FileText, Upload, Briefcase } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    logo: string;
    typeColor: string;
  };
}

const ApplyModal = ({ isOpen, onClose, job }: ApplyModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    experience: '',
    availability: '',
    expectedSalary: '',
    portfolio: '',
    linkedin: '',
  });
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedResume(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetModal = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      coverLetter: '',
      experience: '',
      availability: '',
      expectedSalary: '',
      portfolio: '',
      linkedin: '',
    });
    setUploadedResume(null);
    onClose();
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for applying to <strong>{job.title}</strong> at <strong>{job.company}</strong>. 
            We'll review your application and get back to you within 3-5 business days.
          </p>
          <div className="space-y-3">
            <button
              onClick={resetModal}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Apply to More Jobs
            </button>
            <button
              onClick={resetModal}
              className="w-full text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Job Details */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-600" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.typeColor}`}>
                {job.type}
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <DollarSign className="h-4 w-4 mr-2" />
              {job.salary}
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>
              
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="4-6">4-6 years</option>
                    <option value="7-10">7-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Salary
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleInputChange}
                      placeholder="e.g., $120k - $150k"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select availability</option>
                    <option value="immediate">Immediate</option>
                    <option value="2-weeks">2 weeks notice</option>
                    <option value="1-month">1 month</option>
                    <option value="2-months">2 months</option>
                    <option value="3-months">3+ months</option>
                  </select>
                </div>
                
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
              </div>

              <div className="mb-6">
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

              {/* Resume Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                    id="resume-upload"
                    required
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    {uploadedResume ? (
                      <div className="text-green-600">
                        <FileText className="h-5 w-5 inline mr-2" />
                        <span className="font-medium">{uploadedResume.name}</span>
                        <p className="text-sm text-gray-500 mt-1">
                          {(uploadedResume.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium text-gray-700 mb-1">
                          Drop your resume here or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                          Supported formats: PDF, DOC, DOCX (max 5MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell the employer why you're interested in this position and what makes you a great fit..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Tip: Mention specific skills or experiences that match the job requirements.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !uploadedResume}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting Application...</span>
              </>
            ) : (
              <span>Submit Application</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;