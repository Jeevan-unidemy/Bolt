import React, { useState, useMemo } from 'react';
import { Search, MapPin, Users, Star, Building, Filter, Grid, List, ExternalLink, Briefcase, TrendingUp, Award, Globe } from 'lucide-react';

const companies = [
  {
    id: 1,
    name: 'TechCorp',
    logo: 'https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    industry: 'Technology',
    size: '1000-5000',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviewCount: 1247,
    description: 'Leading technology company specializing in cloud computing and AI solutions.',
    openJobs: 45,
    website: 'https://techcorp.com',
    founded: 2010,
    specialties: ['Cloud Computing', 'Artificial Intelligence', 'Machine Learning', 'Software Development'],
    benefits: ['Health Insurance', 'Remote Work', '401k Matching', 'Stock Options', 'Unlimited PTO'],
    culture: 'Innovation-driven culture with focus on work-life balance and continuous learning.',
    featured: true,
  },
  {
    id: 2,
    name: 'InnovateLab',
    logo: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    industry: 'Technology',
    size: '500-1000',
    location: 'New York, NY',
    rating: 4.6,
    reviewCount: 892,
    description: 'Innovative startup focused on developing cutting-edge mobile applications.',
    openJobs: 23,
    website: 'https://innovatelab.com',
    founded: 2015,
    specialties: ['Mobile Development', 'Product Design', 'User Experience', 'Agile Development'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Team Events'],
    culture: 'Fast-paced startup environment with emphasis on creativity and collaboration.',
    featured: true,
  },
  {
    id: 3,
    name: 'DesignStudio',
    logo: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    industry: 'Design',
    size: '50-200',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviewCount: 456,
    description: 'Creative design agency working with Fortune 500 companies on brand identity.',
    openJobs: 12,
    website: 'https://designstudio.com',
    founded: 2012,
    specialties: ['Brand Design', 'UI/UX Design', 'Digital Marketing', 'Creative Strategy'],
    benefits: ['Health Insurance', 'Creative Freedom', 'Professional Development', 'Flexible PTO'],
    culture: 'Creative and collaborative environment that values artistic expression.',
    featured: false,
  },
  {
    id: 4,
    name: 'DataFlow',
    logo: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    industry: 'Data & Analytics',
    size: '200-500',
    location: 'Austin, TX',
    rating: 4.7,
    reviewCount: 623,
    description: 'Data analytics company helping businesses make data-driven decisions.',
    openJobs: 18,
    website: 'https://dataflow.com',
    founded: 2018,
    specialties: ['Data Science', 'Business Intelligence', 'Machine Learning', 'Analytics'],
    benefits: ['Health Insurance', 'Remote Work', 'Learning Stipend', 'Performance Bonuses'],
    culture: 'Data-driven culture with focus on continuous improvement and innovation.',
    featured: false,
  },
  {
    id: 5,
    name: 'CloudTech',
    logo: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    industry: 'Technology',
    size: '1000-5000',
    location: 'Seattle, WA',
    rating: 4.5,
    reviewCount: 1089,
    description: 'Cloud infrastructure provider serving enterprise clients worldwide.',
    openJobs: 67,
    website: 'https://cloudtech.com',
    founded: 2008,
    specialties: ['Cloud Infrastructure', 'DevOps', 'Security', 'Enterprise Solutions'],
    benefits: ['Health Insurance', 'Stock Options', '401k Matching', 'Parental Leave'],
    culture: 'Engineering excellence with strong emphasis on reliability and scalability.',
    featured: true,
  },
  {
    id: 6,
    name: 'GrowthHack',
    logo: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    industry: 'Marketing',
    size: '50-200',
    location: 'Miami, FL',
    rating: 4.4,
    reviewCount: 234,
    description: 'Digital marketing agency specializing in growth hacking and performance marketing.',
    openJobs: 8,
    website: 'https://growthhack.com',
    founded: 2019,
    specialties: ['Digital Marketing', 'Growth Hacking', 'Performance Marketing', 'Analytics'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Results Bonuses', 'Team Retreats'],
    culture: 'Results-oriented culture with focus on experimentation and rapid growth.',
    featured: false,
  },
  {
    id: 7,
    name: 'FinanceFlow',
    logo: 'https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    industry: 'Finance',
    size: '500-1000',
    location: 'Chicago, IL',
    rating: 4.6,
    reviewCount: 567,
    description: 'Financial technology company revolutionizing personal finance management.',
    openJobs: 29,
    website: 'https://financeflow.com',
    founded: 2016,
    specialties: ['FinTech', 'Personal Finance', 'Mobile Banking', 'Investment Tools'],
    benefits: ['Health Insurance', 'Financial Planning', 'Stock Options', 'Wellness Programs'],
    culture: 'Mission-driven culture focused on financial empowerment and inclusion.',
    featured: true,
  },
  {
    id: 8,
    name: 'HealthTech Solutions',
    logo: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    industry: 'Healthcare',
    size: '200-500',
    location: 'Boston, MA',
    rating: 4.8,
    reviewCount: 445,
    description: 'Healthcare technology company improving patient outcomes through innovation.',
    openJobs: 34,
    website: 'https://healthtech.com',
    founded: 2014,
    specialties: ['Healthcare Technology', 'Medical Devices', 'Patient Care', 'Health Analytics'],
    benefits: ['Health Insurance', 'Medical Benefits', 'Research Time', 'Conference Attendance'],
    culture: 'Purpose-driven culture dedicated to improving healthcare outcomes.',
    featured: false,
  },
];

const industries = ['All Industries', 'Technology', 'Design', 'Data & Analytics', 'Marketing', 'Finance', 'Healthcare'];
const companySizes = ['All Sizes', '1-50', '50-200', '200-500', '500-1000', '1000-5000', '5000+'];
const locations = ['All Locations', 'San Francisco, CA', 'New York, NY', 'Los Angeles, CA', 'Austin, TX', 'Seattle, WA', 'Miami, FL', 'Chicago, IL', 'Boston, MA'];

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedSize, setSelectedSize] = useState('All Sizes');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const filteredCompanies = useMemo(() => {
    let filtered = companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.specialties.some(specialty => 
                             specialty.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      
      const matchesIndustry = selectedIndustry === 'All Industries' || company.industry === selectedIndustry;
      const matchesSize = selectedSize === 'All Sizes' || company.size === selectedSize;
      const matchesLocation = selectedLocation === 'All Locations' || company.location === selectedLocation;

      return matchesSearch && matchesIndustry && matchesSize && matchesLocation;
    });

    // Sort companies
    if (sortBy === 'featured') {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'jobs') {
      filtered.sort((a, b) => b.openJobs - a.openJobs);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchTerm, selectedIndustry, selectedSize, selectedLocation, sortBy]);

  const CompanyCard = ({ company, isListView = false }: { company: typeof companies[0], isListView?: boolean }) => (
    <div className={`group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden ${isListView ? 'flex items-start space-x-6' : ''}`}>
      {company.featured && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
          Featured
        </div>
      )}

      <div className={`${isListView ? 'flex-shrink-0' : ''}`}>
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="w-16 h-16 rounded-xl object-cover"
        />
      </div>

      <div className={`${isListView ? 'flex-1' : 'mt-4'}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-xl group-hover:text-blue-600 transition-colors">
              {company.name}
            </h3>
            <p className="text-gray-600 text-sm">{company.industry}</p>
          </div>
          {!isListView && (
            <button className="text-gray-400 hover:text-blue-500 transition-colors">
              <ExternalLink className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className={`space-y-3 mb-4 ${isListView ? 'flex items-center space-y-0 space-x-6' : ''}`}>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            {company.location}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="h-4 w-4 mr-2" />
            {company.size} employees
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Star className="h-4 w-4 mr-2 text-yellow-500" />
            {company.rating} ({company.reviewCount} reviews)
          </div>
          {isListView && (
            <div className="flex items-center text-blue-600 text-sm font-medium">
              <Briefcase className="h-4 w-4 mr-1" />
              {company.openJobs} open jobs
            </div>
          )}
        </div>

        {!isListView && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {company.description}
          </p>
        )}

        <div className={`flex flex-wrap gap-2 mb-4 ${isListView ? 'max-w-md' : ''}`}>
          {company.specialties.slice(0, isListView ? 2 : 3).map((specialty) => (
            <span
              key={specialty}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              {specialty}
            </span>
          ))}
          {company.specialties.length > (isListView ? 2 : 3) && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{company.specialties.length - (isListView ? 2 : 3)} more
            </span>
          )}
        </div>

        <div className={`${isListView ? 'flex items-center justify-between' : ''}`}>
          <div className={`${isListView ? '' : 'flex items-center justify-between'}`}>
            <span className="text-blue-600 font-semibold">
              {company.openJobs} open positions
            </span>
            {isListView && (
              <button className="text-gray-400 hover:text-blue-500 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </button>
            )}
          </div>
          {!isListView && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
              View Company
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Amazing Companies
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore top companies, learn about their culture, and find your perfect workplace match.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 min-w-80">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search companies, industries, or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="jobs">Most Jobs</option>
                <option value="name">Company Name</option>
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

          {/* Quick Filters */}
          <div className={`mt-6 space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {companySizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
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
            </div>

            <button
              onClick={() => {
                setSelectedIndustry('All Industries');
                setSelectedSize('All Sizes');
                setSelectedLocation('All Locations');
                setSearchTerm('');
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredCompanies.length} of {companies.length} companies
          </p>
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Building className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} isListView={viewMode === 'list'} />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredCompanies.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold">
              Load More Companies
            </button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Growing Network</h2>
            <p className="text-xl text-blue-100">
              Connect with top companies and discover your next career opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Open Positions</div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">4.8</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;