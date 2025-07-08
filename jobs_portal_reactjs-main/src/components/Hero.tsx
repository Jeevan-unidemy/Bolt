import React, { useState } from 'react';
import { Search, MapPin, Filter, Clock, FileText, Sparkles } from 'lucide-react';

const jobTypes = [
  { id: 'full-time', label: 'Full Time', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'part-time', label: 'Part Time', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'contract', label: 'Contract', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'internship', label: 'Internship', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'freelancing', label: 'Freelancing', color: 'bg-pink-100 text-pink-700 border-pink-200' },
];

interface HeroProps {
  onNavigateToResumeBuilder?: () => void;
}

const Hero = ({ onNavigateToResumeBuilder }: HeroProps = {}) => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  const toggleJobType = (typeId: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  return (
    <section className="pt-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Dream Job</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover thousands of opportunities from top companies worldwide. Your next career move is just a search away.
          </p>
          
          {/* AI Resume Builder CTA */}
          <div className="mb-8">
            <button 
              onClick={onNavigateToResumeBuilder}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Create AI Resume
            </button>
            <p className="text-sm text-gray-500 mt-2">Build a professional resume in minutes with AI assistance</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 font-semibold shadow-lg">
                Search Jobs
              </button>
            </div>

            {/* Job Types Filter */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Job Type:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {jobTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => toggleJobType(type.id)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all transform hover:scale-105 ${
                      selectedJobTypes.includes(type.id)
                        ? type.color + ' shadow-md'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              <span className="text-sm text-gray-500">Popular searches:</span>
              {['Frontend Developer', 'Data Scientist', 'Product Manager', 'UX Designer', 'Software Engineer'].map((term) => (
                <button key={term} className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="group">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Active Job Listings</div>
            </div>
          </div>
          <div className="group">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
          </div>
          <div className="group">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-indigo-600 mb-2">1M+</div>
              <div className="text-gray-600">Success Stories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;