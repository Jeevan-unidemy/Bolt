import React from 'react';
import { Clock, Users, TrendingUp, Briefcase, Coffee } from 'lucide-react';

const jobTypeStats = [
  {
    type: 'Full Time',
    count: '6,234',
    icon: Briefcase,
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    growth: '+12%',
  },
  {
    type: 'Part Time',
    count: '2,891',
    icon: Clock,
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    growth: '+8%',
  },
  {
    type: 'Contract',
    count: '1,567',
    icon: Users,
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    growth: '+15%',
  },
  {
    type: 'Internship',
    count: '892',
    icon: TrendingUp,
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    growth: '+22%',
  },
  {
    type: 'Freelancing',
    count: '3,456',
    icon: Coffee,
    color: 'bg-pink-500',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    growth: '+18%',
  },
];

const JobTypeStats = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Opportunities for Every Work Style
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're looking for flexibility, stability, or growth, we have the perfect job type for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {jobTypeStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.type}
                className={`${stat.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-white/50`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className={`font-semibold ${stat.textColor} text-lg`}>
                    {stat.type}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      {stat.count}
                    </span>
                    <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                      {stat.growth}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    jobs available
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Find the perfect work arrangement that fits your lifestyle and career goals.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 font-semibold shadow-lg">
            Explore All Job Types
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobTypeStats;