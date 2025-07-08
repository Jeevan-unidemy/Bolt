import React, { useState } from 'react';
import { User, Briefcase, Heart, FileText, TrendingUp, Bell, Search, Filter, MapPin, Clock, DollarSign, Building, Star, Share2, Eye, Calendar, Award, Target, Users, CheckCircle } from 'lucide-react';
import ApplyModal from './ApplyModal';
import ProfilePage from './ProfilePage';
import { useAuthContext } from './AuthProvider';

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const { isAuthenticated } = useAuthContext();
  const [activeTab, setActiveTab] = useState<'overview' | 'browse-jobs' | 'saved-jobs' | 'applications' | 'profile'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedJobType, setSelectedJobType] = useState('All Types');
  const [savedJobs, setSavedJobs] = useState<number[]>([1, 3, 5]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    onNavigate?.('home');
    return null;
  }
  // Mock data for jobs
  const allJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full Time',
      salary: '$120k - $160k',
      logo: 'https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      rating: 4.8,
      employees: '1000+',
      description: 'We are looking for a Senior Frontend Developer to join our dynamic team and help build the next generation of web applications.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Team leadership skills'],
      benefits: ['Health Insurance', 'Remote Work', '401k Matching', 'Stock Options'],
      category: 'Technology',
      postedDate: '2 days ago',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'InnovateLab',
      location: 'New York, NY',
      type: 'Full Time',
      salary: '$130k - $180k',
      logo: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      rating: 4.6,
      employees: '500+',
      description: 'Join our product team to drive innovation and growth in our cutting-edge mobile applications.',
      requirements: ['3+ years PM experience', 'Agile methodology', 'Data-driven mindset'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Team Events'],
      category: 'Management',
      postedDate: '1 day ago',
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Remote',
      type: 'Contract',
      salary: '$90k - $120k',
      logo: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      rating: 4.9,
      employees: '200+',
      description: 'Create beautiful and intuitive user experiences for our award-winning design projects.',
      requirements: ['Portfolio required', 'Figma expertise', 'User research skills'],
      benefits: ['Remote Work', 'Creative Freedom', 'Professional Development'],
      category: 'Design',
      postedDate: '3 days ago',
    },
    {
      id: 4,
      title: 'Marketing Manager',
      company: 'GrowthHack',
      location: 'Los Angeles, CA',
      type: 'Full Time',
      salary: '$85k - $110k',
      logo: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      rating: 4.4,
      employees: '100+',
      description: 'Drive growth through innovative marketing strategies and data-driven campaigns.',
      requirements: ['Digital marketing experience', 'Analytics skills', 'Creative thinking'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Results Bonuses'],
      category: 'Marketing',
      postedDate: '5 days ago',
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Seattle, WA',
      type: 'Full Time',
      salary: '$110k - $140k',
      logo: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      rating: 4.7,
      employees: '800+',
      description: 'Help us scale our cloud infrastructure and improve deployment processes.',
      requirements: ['AWS/Azure experience', 'Docker/Kubernetes', 'CI/CD pipelines'],
      benefits: ['Health Insurance', 'Stock Options', '401k Matching'],
      category: 'Technology',
      postedDate: '4 days ago',
    },
    {
      id: 6,
      title: 'Data Scientist',
      company: 'DataFlow',
      location: 'Austin, TX',
      type: 'Full Time',
      salary: '$100k - $130k',
      logo: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      rating: 4.5,
      employees: '300+',
      description: 'Analyze complex datasets and build machine learning models to drive business insights.',
      requirements: ['Python/R proficiency', 'ML experience', 'Statistics background'],
      benefits: ['Health Insurance', 'Learning Stipend', 'Remote Work'],
      category: 'Technology',
      postedDate: '1 week ago',
    },
  ];

  const applications = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      appliedDate: '2024-01-15',
      status: 'Interview Scheduled',
      statusColor: 'bg-blue-100 text-blue-700',
      nextStep: 'Technical interview on Jan 20',
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      company: 'InnovateLab',
      appliedDate: '2024-01-12',
      status: 'Under Review',
      statusColor: 'bg-yellow-100 text-yellow-700',
      nextStep: 'Waiting for response',
    },
    {
      id: 3,
      jobTitle: 'UX Designer',
      company: 'DesignStudio',
      appliedDate: '2024-01-10',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-700',
      nextStep: 'Application not selected',
    },
  ];

  const stats = [
    { label: 'Profile Views', value: '1,247', icon: Eye, color: 'text-blue-600' },
    { label: 'Applications Sent', value: '23', icon: FileText, color: 'text-green-600' },
    { label: 'Saved Jobs', value: savedJobs.length.toString(), icon: Heart, color: 'text-red-600' },
    { label: 'Interview Invites', value: '5', icon: Calendar, color: 'text-purple-600' },
  ];

  const categories = ['All Categories', 'Technology', 'Design', 'Marketing', 'Management'];
  const jobTypes = ['All Types', 'Full Time', 'Part Time', 'Contract', 'Remote'];

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || job.category === selectedCategory;
    const matchesType = selectedJobType === 'All Types' || job.type === selectedJobType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const recommendedJobs = allJobs.slice(0, 3);

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const JobCard = ({ job, showFullDetails = false }: { job: any, showFullDetails?: boolean }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">{job.rating}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">{job.employees} employees</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleSaveJob(job.id)}
            className={`p-2 rounded-lg transition-colors ${
              savedJobs.includes(job.id)
                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-2" />
          {job.location}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {job.type}
            </span>
          </div>
          <span className="text-sm text-gray-500">{job.postedDate}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <DollarSign className="h-4 w-4 mr-2" />
          {job.salary}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

      {showFullDetails && (
        <div className="space-y-4 mb-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
            <ul className="space-y-1">
              {job.requirements.map((req: string, index: number) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Benefits</h4>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((benefit: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        <button
          onClick={() => handleApplyClick(job)}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Apply Now
        </button>
        <button className="px-4 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          View Details
        </button>
      </div>
    </div>
  );

  if (activeTab === 'profile') {
    return <ProfilePage onNavigate={onNavigate} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your job search overview.</p>
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
              onClick={() => setActiveTab('browse-jobs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'browse-jobs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Browse Jobs
            </button>
            <button
              onClick={() => setActiveTab('saved-jobs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'saved-jobs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Saved Jobs ({savedJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('browse-jobs')}
                  className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <Search className="h-6 w-6 text-blue-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Browse Jobs</h4>
                  <p className="text-gray-600 text-sm">Find new opportunities</p>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <User className="h-6 w-6 text-green-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Update Profile</h4>
                  <p className="text-gray-600 text-sm">Keep your profile current</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <FileText className="h-6 w-6 text-purple-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Update Resume</h4>
                  <p className="text-gray-600 text-sm">Upload latest version</p>
                </button>
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recommended for You</h3>
                <button
                  onClick={() => setActiveTab('browse-jobs')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Browse Jobs Tab */}
        {activeTab === 'browse-jobs' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search jobs, companies, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedJobType}
                    onChange={(e) => setSelectedJobType(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {filteredJobs.length} Jobs Found
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} showFullDetails />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Saved Jobs Tab */}
        {activeTab === 'saved-jobs' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Your Saved Jobs ({savedJobs.length})
              </h3>
              {savedJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No saved jobs yet</h4>
                  <p className="text-gray-600 mb-6">Start browsing and save jobs you're interested in</p>
                  <button
                    onClick={() => setActiveTab('browse-jobs')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    Browse Jobs
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {allJobs
                    .filter(job => savedJobs.includes(job.id))
                    .map((job) => (
                      <JobCard key={job.id} job={job} showFullDetails />
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Applications</h3>
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{application.jobTitle}</h4>
                        <p className="text-gray-600">{application.company}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${application.statusColor}`}>
                        {application.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Applied on {new Date(application.appliedDate).toLocaleDateString()}</span>
                      <span>{application.nextStep}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {selectedJob && (
        <ApplyModal
          isOpen={isApplyModalOpen}
          onClose={() => {
            setIsApplyModalOpen(false);
            setSelectedJob(null);
          }}
          job={selectedJob}
        />
      )}
    </div>
  );
};

export default Dashboard;