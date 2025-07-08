import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Bookmark } from 'lucide-react';
import ApplyModal from './ApplyModal';

interface FeaturedJobsProps {
  onViewAllJobs?: () => void;
}

const jobs = [
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
  },
];

const FeaturedJobs = ({ onViewAllJobs }: FeaturedJobsProps) => {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleApplyClick = (job: typeof jobs[0]) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Job Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hand-picked positions from top companies across all job types and industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <div
              key={job.id}
              className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {job.featured && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  Featured
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{job.company}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.typeColor}`}>
                      {job.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {job.salary}
                </div>
              </div>

              <button 
                onClick={() => handleApplyClick(job)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={onViewAllJobs}
            className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold"
          >
            View All Jobs
          </button>
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
    </section>
  );
};

export default FeaturedJobs;