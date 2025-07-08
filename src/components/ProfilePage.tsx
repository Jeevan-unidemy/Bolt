import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Globe, Linkedin, Github, Camera, Save, X, Edit3, Shield, Bell, Eye, EyeOff, Upload, FileText, Award, Star, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthContext } from './AuthProvider';
import { updateProfile, resetPassword, uploadFile, getFileUrl, getUserApplications, getUserSavedJobs, Profile } from '../lib/supabase';

interface ProfilePageProps {
  onNavigate?: (page: string) => void;
}

const ProfilePage = ({ onNavigate }: ProfilePageProps) => {
  const { isAuthenticated, user, profile, refreshProfile } = useAuthContext();
  const [activeTab, setActiveTab] = useState<'overview' | 'edit' | 'security' | 'preferences'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profileStats, setProfileStats] = useState({
    profileViews: 0,
    applicationsSent: 0,
    savedJobs: 0,
    profileCompleteness: 0,
  });

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    onNavigate?.('home');
    return null;
  }

  const [profileData, setProfileData] = useState<Partial<Profile>>({
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

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Load profile data and stats on component mount
  useEffect(() => {
    if (profile) {
      setProfileData({
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
        show_contact: profile.show_contact !== false,
        email_notifications: profile.email_notifications !== false,
        job_alerts: profile.job_alerts !== false,
        application_updates: profile.application_updates !== false,
        marketing_emails: profile.marketing_emails || false,
        two_factor_enabled: profile.two_factor_enabled || false,
      });

      // Calculate profile completeness
      const completeness = calculateProfileCompleteness(profile);
      setProfileStats(prev => ({
        ...prev,
        profileViews: profile.profile_views || 0,
        profileCompleteness: completeness,
      }));
    }
  }, [profile]);

  // Load user stats
  useEffect(() => {
    const loadUserStats = async () => {
      if (!user) return;

      try {
        const [applications, savedJobs] = await Promise.all([
          getUserApplications(user.id),
          getUserSavedJobs(user.id),
        ]);

        setProfileStats(prev => ({
          ...prev,
          applicationsSent: applications.length,
          savedJobs: savedJobs.length,
        }));
      } catch (error) {
        console.error('Error loading user stats:', error);
      }
    };

    loadUserStats();
  }, [user]);

  const calculateProfileCompleteness = (profile: Profile): number => {
    const fields = [
      profile.first_name,
      profile.last_name,
      profile.phone,
      profile.location,
      profile.bio,
      profile.job_title,
      profile.experience_level,
    ];

    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setProfileData({
      ...profileData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
    // Clear message when user starts editing
    if (message) setMessage(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
    // Clear message when user starts editing
    if (message) setMessage(null);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setMessage({ type: 'error', text: 'File size must be less than 5MB' });
      return;
    }

    setIsUploadingResume(true);
    setMessage(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/resume.${fileExt}`;
      
      await uploadFile('resumes', fileName, file);
      const resumeUrl = getFileUrl('resumes', fileName);
      
      // Update profile with resume URL
      await updateProfile(user.id, { resume_url: resumeUrl });
      await refreshProfile();
      
      setUploadedResume(file);
      setMessage({ type: 'success', text: 'Resume uploaded successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to upload resume' });
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setMessage(null);
    
    try {
      await updateProfile(user.id, profileData);
      await refreshProfile();
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
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
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to send password reset email' });
    } finally {
      setIsResettingPassword(false);
    }
  };

  const ProfileOverview = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
            />
            <button className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full hover:bg-gray-50 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {profileData.first_name} {profileData.last_name}
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              {profileData.job_title && profileData.company 
                ? `${profileData.job_title} at ${profileData.company}`
                : profileData.job_title || 'Job Seeker'
              }
            </p>
            <div className="flex flex-wrap items-center gap-4 text-blue-100">
              {profileData.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
              )}
              {profileData.experience_level && (
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{profileData.experience_level} experience</span>
                </div>
              )}
              {profileData.availability && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{profileData.availability}</span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setActiveTab('edit')}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-colors font-semibold flex items-center space-x-2"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">{profileStats.profileViews}</div>
          <div className="text-gray-600 text-sm">Profile Views</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">{profileStats.applicationsSent}</div>
          <div className="text-gray-600 text-sm">Applications Sent</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">{profileStats.savedJobs}</div>
          <div className="text-gray-600 text-sm">Saved Jobs</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-2">{profileStats.profileCompleteness}%</div>
          <div className="text-gray-600 text-sm">Profile Complete</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
            {profileData.bio ? (
              <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
            ) : (
              <p className="text-gray-400 italic">No bio added yet. Click "Edit Profile" to add your bio.</p>
            )}
          </div>

          {/* Experience Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
            {profileData.job_title && profileData.company ? (
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold text-gray-900">{profileData.job_title}</h4>
                  <p className="text-blue-600 font-medium">{profileData.company}</p>
                  <p className="text-gray-600 text-sm">Current Position</p>
                  {profileData.bio && (
                    <p className="text-gray-600 mt-2">{profileData.bio}</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-400 italic">No experience information added yet. Click "Edit Profile" to add your work experience.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{user?.email}</span>
              </div>
              {profileData.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{profileData.phone}</span>
                </div>
              )}
              {profileData.location && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{profileData.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
            <div className="space-y-3">
              {profileData.linkedin_url ? (
                <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-blue-600 hover:text-blue-700">
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn Profile</span>
                </a>
              ) : (
                <div className="flex items-center space-x-3 text-gray-400">
                  <Linkedin className="h-4 w-4" />
                  <span>No LinkedIn profile</span>
                </div>
              )}
              
              {profileData.github_url ? (
                <a href={profileData.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-600 hover:text-gray-700">
                  <Github className="h-4 w-4" />
                  <span>GitHub Profile</span>
                </a>
              ) : (
                <div className="flex items-center space-x-3 text-gray-400">
                  <Github className="h-4 w-4" />
                  <span>No GitHub profile</span>
                </div>
              )}
              
              {profileData.portfolio_url ? (
                <a href={profileData.portfolio_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-purple-600 hover:text-purple-700">
                  <Globe className="h-4 w-4" />
                  <span>Portfolio Website</span>
                </a>
              ) : (
                <div className="flex items-center space-x-3 text-gray-400">
                  <Globe className="h-4 w-4" />
                  <span>No portfolio website</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completeness</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-semibold text-gray-900">{profileStats.profileCompleteness}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${profileStats.profileCompleteness}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500">
                {profileStats.profileCompleteness < 100 
                  ? 'Complete your profile to increase visibility to employers'
                  : 'Your profile is complete! Great job!'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EditProfile = () => (
    <div className="space-y-8">
      {/* Message Display */}
      {message && (
        <div className={`p-4 rounded-xl ${
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

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Edit Profile Information</h3>
        
        <form className="space-y-6">
          {/* Personal Information */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={profileData.first_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={profileData.last_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
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
                <input
                  type="text"
                  name="job_title"
                  value={profileData.job_title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={profileData.company}
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
                value={profileData.experience_level}
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
                value={profileData.availability}
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
              value={profileData.salary_range}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="$120k - $160k"
            />
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Social Links</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedin_url"
                  value={profileData.linkedin_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                <input
                  type="url"
                  name="github_url"
                  value={profileData.github_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/yourusername"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Website</label>
                <input
                  type="url"
                  name="portfolio_url"
                  value={profileData.portfolio_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://yourportfolio.com"
                />
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
                disabled={isUploadingResume}
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                {isUploadingResume ? (
                  <div className="text-blue-600">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <span className="font-medium">Uploading...</span>
                  </div>
                ) : uploadedResume ? (
                  <div className="text-green-600">
                    <FileText className="h-5 w-5 inline mr-2" />
                    <span className="font-medium">{uploadedResume.name}</span>
                  </div>
                ) : profile?.resume_url ? (
                  <div className="text-blue-600">
                    <FileText className="h-5 w-5 inline mr-2" />
                    <span className="font-medium">Resume uploaded</span>
                    <p className="text-sm text-gray-500 mt-1">Click to upload a new resume</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-gray-700 mb-1">
                      Upload new resume
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, DOC, DOCX (max 5MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
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
        </form>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-8">
      {/* Message Display */}
      {message && (
        <div className={`p-4 rounded-xl ${
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

      {/* Password Reset */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Password Reset</h3>
        
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Reset Password</h5>
              <p className="text-gray-600 text-sm">Send a password reset email to {user?.email}</p>
            </div>
            <button
              onClick={handlePasswordReset}
              disabled={isResettingPassword}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isResettingPassword ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Reset Password</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Visibility */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
            <select
              name="profile_visibility"
              value={profileData.profile_visibility}
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
                onClick={() => setProfileData({...profileData, show_salary: !profileData.show_salary})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  profileData.show_salary ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    profileData.show_salary ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Show contact information</span>
              <button
                onClick={() => setProfileData({...profileData, show_contact: !profileData.show_contact})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  profileData.show_contact ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    profileData.show_contact ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PreferencesSettings = () => (
    <div className="space-y-8">
      {/* Notification Preferences */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-700 font-medium">Email Notifications</span>
              <p className="text-gray-500 text-sm">Receive general updates via email</p>
            </div>
            <button
              onClick={() => setProfileData({...profileData, email_notifications: !profileData.email_notifications})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                profileData.email_notifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  profileData.email_notifications ? 'translate-x-6' : 'translate-x-1'
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
              onClick={() => setProfileData({...profileData, job_alerts: !profileData.job_alerts})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                profileData.job_alerts ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  profileData.job_alerts ? 'translate-x-6' : 'translate-x-1'
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
              onClick={() => setProfileData({...profileData, application_updates: !profileData.application_updates})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                profileData.application_updates ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  profileData.application_updates ? 'translate-x-6' : 'translate-x-1'
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
              onClick={() => setProfileData({...profileData, marketing_emails: !profileData.marketing_emails})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                profileData.marketing_emails ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  profileData.marketing_emails ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Actions</h3>
        
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-700 font-medium">Download My Data</span>
                <p className="text-gray-500 text-sm">Get a copy of all your data</p>
              </div>
              <span className="text-blue-600">Download</span>
            </div>
          </button>

          <button className="w-full text-left p-4 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-red-700 font-medium">Delete Account</span>
                <p className="text-red-500 text-sm">Permanently delete your account and data</p>
              </div>
              <span className="text-red-600">Delete</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Management</h1>
          <p className="text-gray-600 mt-2">Manage your profile information and account settings</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'edit'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Edit Profile
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

        {/* Tab Content */}
        {activeTab === 'overview' && <ProfileOverview />}
        {activeTab === 'edit' && <EditProfile />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'preferences' && <PreferencesSettings />}
      </div>
    </div>
  );
};

export default ProfilePage;