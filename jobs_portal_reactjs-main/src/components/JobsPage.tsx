import React, { useState, useMemo } from 'react';
import { Search, MapPin, Filter, SlidersHorizontal, Grid, List, ChevronDown, Bookmark, Clock, DollarSign, Building } from 'lucide-react';
import ApplyModal from './ApplyModal';

const allJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full Time',
    salary: '$120k - $160k',
    logo: 'https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    featured: true,
    typeColor: 'bg-blue-100 text-blue-700',
    category: 'Technology',
    experience: 'Senior',
    remote: false,
    postedDate: '2 days ago',
    description: 'We are looking for a Senior Frontend Developer to join our dynamic team...',
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'InnovateLab',
    location: 'New York, NY',
    type: 'Full Time',
    salary: '$130k - $180k',
    logo: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    featured: true,
    typeColor: 'bg-blue-100 text-blue-700',
    category: 'Management',
    experience: 'Mid-level',
    remote: false,
    postedDate: '1 day ago',
    description: 'Join our product team to drive innovation and growth...',
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'DesignStudio',
    location: 'Remote',
    type: 'Contract',
    salary: '$90k - $120k',
    logo: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    featured: false,
    typeColor: 'bg-purple-100 text-purple-700',
    category: 'Design',
    experience: 'Mid-level',
    remote: true,
    postedDate: '3 days ago',
    description: 'Create beautiful and intuitive user experiences...',
  },
  {
    id: 4,
    title: 'Data Science Intern',
    company: 'DataFlow',
    location: 'Austin, TX',
    type: 'Internship',
    salary: '$25/hour',
    logo: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    featured: false,
    typeColor: 'bg-orange-100 text-orange-700',
    category: 'Technology',
    experience: 'Entry-level',
    remote: false,
    postedDate: '1 week ago',
    description: 'Learn data science in a fast-paced environment...',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Seattle, WA',
    type: 'Part Time',
    salary: '$60k - $80k',
    logo: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    featured: true,
    typeColor: 'bg-green-100 text-green-700',
    category: 'Technology',
    experience: 'Mid-level',
    remote: false,
    postedDate: '4 days ago',
    description: 'Help us scale our cloud infrastructure...',
  },
  {
    id: 6,
    title: 'Marketing Freelancer',
    company: 'GrowthHack',
    location: 'Los Angeles, CA',
    type: 'Freelancing',
    salary: '$50 - $85/hour',
    logo: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    featured: false,
    typeColor: 'bg-pink-100 text-pink-700',
    category: 'Marketing',
    experience: 'Mid-level',
    remote: true,
    postedDate: '5 days ago',
    description: 'Drive growth through innovative marketing strategies...',
  },
  {
    id: 7,
    title: 'Software Engineer',
    company: 'StartupXYZ',
    location: 'Boston, MA',
    type: 'Full Time',
    salary: '$95k - $130k',
    logo: 'https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    featured: false,
    typeColor: 'bg-blue-100 text-blue-700',
    category: 'Technology',
    experience: 'Mid-level',
    remote: false,
    postedDate: '6 days ago',
    description: 'Build the next generation of software solutions...',
  },
  {
    id: 8,
    title: 'Graphic Designer',
    company: 'CreativeAgency',
    location: 'Remote',
    type: 'Contract',
    salary: '$40 - $65/hour',
    logo: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    featured: false,
    typeColor: 'bg-purple-100 text-purple-700',
    category: 'Design',
    experience: 'Entry-level',
    remote: true,
    postedDate: '1 week ago',
    description: 'Create stunning visual designs for our clients...',
  },
];

const jobTypes = [
  { id: 'full-time', label: 'Full Time', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'part-time', label: 'Part Time', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'contract', label: 'Contract', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'internship', label: 'Internship', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'freelancing', label: 'Freelancing', color: 'bg-pink-100 text-pink-700 border-pink-200' },
];

const categories = ['All Categories', 'Technology', 'Design', 'Marketing', 'Management', 'Sales', 'Finance'];
const experienceLevels = ['All Levels', 'Entry-level', 'Mid-level', 'Senior', 'Executive'];
const locations = ['All Locations', 'Remote', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Los Angeles, CA', 'Boston, MA'];

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedExperience, setSelectedExperience] = useState('All Levels');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedJob, setSelectedJob] = useState<typeof allJobs[0] | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const toggleJobType = (typeId: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleApplyClick = (job: typeof allJobs[0]) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const filteredJobs = useMemo(() => {
    let filtered = allJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesJobType = selectedJobTypes.length === 0 || 
                            selectedJobTypes.some(type => 
                              job.type.toLowerCase().replace(' ', '-') === type
                            );
      
      const matchesCategory = selectedCategory === 'All Categories' || job.category === selectedCategory;
      const matchesExperience = selectedExperience === 'All Levels' || job.experience === selectedExperience;
      const matchesLocation = selectedLocation === 'All Locations' || 
                             job.location === selectedLocation || 
                             (selectedLocation === 'Remote' && job.remote);

      return matchesSearch && matchesJobType && matchesCategory && matchesExperience && matchesLocation;
    });

    // Sort jobs
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
    } else if (sortBy === 'salary') {
      filtered.sort((a, b) => {
        const getSalaryValue = (salary: string) => {
          const match = salary.match(/\$(\d+)k?/);
          return match ? parseInt(match[1]) * (salary.includes('k') ? 1000 : 1) : 0;
        };
        return getSalaryValue(b.salary) - getSalaryValue(a.salary);
      });
    }

    return filtered;
  }, [searchTerm, selectedJobTypes, selectedCategory, selectedExperience, selectedLocation, sortBy]);

  const JobCard = ({ job, isListView = false }: { job: typeof allJobs[0], isListView?: boolean }) => (
    <div className={`group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden ${isListView ? 'flex items-center space-x-6' : ''}`}>
      {job.featured && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
          Featured
        </div>
      )}

      <div className={`${isListView ? 'flex-shrink-0' : ''}`}>
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className="w-12 h-12 rounded-lg object-cover"
        />
      </div>

      <div className={`${isListView ? 'flex-1' : 'mt-4'}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">
              {job.title}
            </h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
          {!isListView && (
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Bookmark className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className={`space-y-3 mb-6 ${isListView ? 'flex items-center space-y-0 space-x-6' : ''}`}>
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
          {isListView && (
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {job.postedDate}
            </div>
          )}
        </div>

        {!isListView && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {job.description}
          </p>
        )}

        <div className={`${isListView ? 'flex items-center space-x-4' : ''}`}>
          <button 
            onClick={() => handleApplyClick(job)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Apply Now
          </button>
          {isListView && (
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Bookmark className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Jobs</h1>
              <p className="text-gray-600 mt-2">
                Showing {filteredJobs.length} of {allJobs.length} jobs
              </p>
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 min-w-80">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="salary">Highest Salary</option>
                  <option value="relevance">Most Relevant</option>
                </select>

                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-gray-500"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Job Types */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Job Type</h4>
                  <div className="space-y-2">
                    {jobTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => toggleJobType(type.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedJobTypes.includes(type.id)
                            ? type.color
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Level */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Experience Level</h4>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Location</h4>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedJobTypes([]);
                    setSelectedCategory('All Categories');
                    setSelectedExperience('All Levels');
                    setSelectedLocation('All Locations');
                    setSearchTerm('');
                  }}
                  className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="flex-1">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Building className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} isListView={viewMode === 'list'} />
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredJobs.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold">
                  Load More Jobs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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

export default JobsPage;