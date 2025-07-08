import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, Briefcase, Save, Upload, FileText, Eye, EyeOff, Shield, Bell, Camera, Linkedin, Github, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuthContext } from './AuthProvider';
import { updateProfile, Profile, resetPassword } from '../lib/supabase';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user, profile, refreshProfile } = useAuthContext();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  
  const [formData, setFormData] = useState<Partial<Profile>>({
    first_name: '',
    last_name: '',
    phone: '',
    location: '',
    bio: '',
    job_title: '',
    company: '',
    experience_level: '',
    salary_range: '',
    availability: '',
    linkedin_url: '',
    github_url: '',
    portfolio_url: '',
    profile_visibility: 'public',
    show_salary: false,
    show_contact: true,
    email_notifications: true,
    job_alerts: true,
    application_updates: true,
    marketing_emails: false,
    two_factor_enabled: false,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        location: profile.location || '',
        bio: profile.bio || '',
        job_title: profile.job_title || '',
        company: profile.company || '',
        experience_level: profile.experience_level || '',
        salary_range: profile.salary_range || '',
        availability: profile.availability || '',
        linkedin_url: profile.linkedin_url || '',
        github_url: profile.github_url || '',
        portfolio_url: profile.portfolio_url || '',
        profile_visibility: profile.profile_visibility || 'public',
        show_salary: profile.show_salary || false,
        show_contact: profile.show_contact || true,
        email_notifications: profile.email_notifications || true,
        job_alerts: profile.job_alerts || true,
        application_updates: profile.application_updates || true,
        marketing_emails: profile.marketing_emails || false,
        two_factor_enabled: profile.two_factor_enabled || false,
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setMessage({ type: 'error', text: 'File size must be less than 5MB' });
        return;
      }
      setUploadedResume(file);
      setMessage(null);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setMessage(null);
    
    try {
      await updateProfile(user.id, formData);
      await refreshProfile();
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    
    setIsResettingPassword(true);
    setMessage(null);
    
    try {
      await resetPassword(user.email);
      setMessage({ type: 'success', text: 'Password reset email sent! Check your inbox.' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to send password reset email' });
    } finally {
      setIsResettingPassword(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`mx-6 mt-4 p-4 rounded-xl ${
            message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <p className={`text-sm ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {message.text}
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'preferences'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Preferences
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                  <p className="text-gray-600 text-sm">Upload a professional photo</p>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Professional Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Professional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select
                    name="experience_level"
                    value={formData.experience_level}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select experience</option>
                    <option value="Entry-level">Entry-level</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select availability</option>
                    <option value="Open to opportunities">Open to opportunities</option>
                    <option value="Actively looking">Actively looking</option>
                    <option value="Not looking">Not looking</option>
                    <option value="Open to freelance">Open to freelance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <input
                  type="text"
                  name="salary_range"
                  value={formData.salary_range}
                  onChange={handleInputChange}
                  placeholder="e.g., $120k - $160k"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Social Links</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="url"
                        name="linkedin_url"
                        value={formData.linkedin_url}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="url"
                        name="github_url"
                        value={formData.github_url}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="url"
                        name="portfolio_url"
                        value={formData.portfolio_url}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Resume</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    {uploadedResume ? (
                      <div className="text-green-600">
                        <FileText className="h-5 w-5 inline mr-2" />
                        <span className="font-medium">{uploadedResume.name}</span>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Upload new resume</p>
                        <p className="text-sm text-gray-500">PDF, DOC, DOCX (max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Password</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900">Reset Password</h5>
                      <p className="text-gray-600 text-sm">Send a password reset email to {user?.email}</p>
                    </div>
                    <button
                      onClick={handlePasswordReset}
                      disabled={isResettingPassword}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isResettingPassword ? 'Sending...' : 'Reset Password'}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">Profile Visibility</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile?</label>
                    <select
                      name="profile_visibility"
                      value={formData.profile_visibility}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">Public - Visible to everyone</option>
                      <option value="private">Private - Only visible to you</option>
                      <option value="recruiters">Recruiters only</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Show salary information</span>
                      <button
                        onClick={() => setFormData({...formData, show_salary: !formData.show_salary})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.show_salary ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.show_salary ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Show contact information</span>
                      <button
                        onClick={() => setFormData({...formData, show_contact: !formData.show_contact})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.show_contact ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.show_contact ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Notification Preferences</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 font-medium">Email Notifications</span>
                      <p className="text-gray-500 text-sm">Receive general updates via email</p>
                    </div>
                    <button
                      onClick={() => setFormData({...formData, email_notifications: !formData.email_notifications})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.email_notifications ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.email_notifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 font-medium">Job Alerts</span>
                      <p className="text-gray-500 text-sm">Get notified about new job opportunities</p>
                    </div>
                    <button
                      onClick={() => setFormData({...formData, job_alerts: !formData.job_alerts})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.job_alerts ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.job_alerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 font-medium">Application Updates</span>
                      <p className="text-gray-500 text-sm">Updates on your job applications</p>
                    </div>
                    <button
                      onClick={() => setFormData({...formData, application_updates: !formData.application_updates})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.application_updates ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.application_updates ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 font-medium">Marketing Emails</span>
                      <p className="text-gray-500 text-sm">Promotional content and tips</p>
                    </div>
                    <button
                      onClick={() => setFormData({...formData, marketing_emails: !formData.marketing_emails})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.marketing_emails ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.marketing_emails ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;