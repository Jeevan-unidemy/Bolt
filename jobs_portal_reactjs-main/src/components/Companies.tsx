import React from 'react';
import { Star, Users, TrendingUp, Award } from 'lucide-react';

const companies = [
  {
    name: 'TechCorp',
    logo: 'https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&fit=crop',
    industry: 'Technology',
    employees: '10,000+',
    rating: 4.8,
    description: 'Leading cloud computing solutions'
  },
  {
    name: 'InnovateLab',
    logo: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&fit=crop',
    industry: 'AI & Machine Learning',
    employees: '5,000+',
    rating: 4.9,
    description: 'Pioneering artificial intelligence'
  },
  {
    name: 'DesignStudio',
    logo: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&fit=crop',
    industry: 'Creative Agency',
    employees: '2,500+',
    rating: 4.7,
    description: 'Award-winning design solutions'
  },
  {
    name: 'DataFlow',
    logo: 'https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&fit=crop',
    industry: 'Data Analytics',
    employees: '3,000+',
    rating: 4.6,
    description: 'Advanced data intelligence'
  },
  {
    name: 'CloudTech',
    logo: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&fit=crop',
    industry: 'Cloud Infrastructure',
    employees: '8,000+',
    rating: 4.8,
    description: 'Enterprise cloud solutions'
  },
  {
    name: 'GrowthHack',
    logo: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&fit=crop',
    industry: 'Digital Marketing',
    employees: '1,500+',
    rating: 4.5,
    description: 'Performance marketing experts'
  },
];

const stats = [
  {
    icon: Users,
    value: '500+',
    label: 'Partner Companies',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Success Rate',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Award,
    value: '4.8',
    label: 'Average Rating',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    icon: Star,
    value: '50K+',
    label: 'Placements Made',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

const Companies = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2" />
            Trusted by Industry Leaders
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Join the Companies That
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Trust Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From innovative startups to Fortune 500 companies, leading organizations choose our platform 
            to find exceptional talent and build their dream teams.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`${stat.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {companies.map((company, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">{company.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {company.name}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Industry</span>
                    <span className="text-sm font-medium text-gray-900">{company.industry}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Employees</span>
                    <span className="text-sm font-medium text-gray-900">{company.employees}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {company.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    Hiring Now
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:underline transition-all">
                    View Jobs →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join These Industry Leaders?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you're looking for your next career opportunity or seeking top talent for your company, 
              we're here to make the perfect connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Find Your Dream Job
              </button>
              <button className="bg-blue-700 text-white px-8 py-4 rounded-xl hover:bg-blue-800 transition-colors font-semibold border-2 border-blue-500 hover:border-blue-400">
                Post a Job Opening
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Companies;