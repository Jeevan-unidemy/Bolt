import React from 'react';
import { Code, BarChart, Palette, Zap, Shield, Globe, Heart, Calculator } from 'lucide-react';

const categories = [
  { icon: Code, name: 'Technology', jobs: '3,245', color: 'bg-blue-500' },
  { icon: BarChart, name: 'Marketing', jobs: '1,892', color: 'bg-emerald-500' },
  { icon: Palette, name: 'Design', jobs: '967', color: 'bg-purple-500' },
  { icon: Zap, name: 'Sales', jobs: '2,134', color: 'bg-yellow-500' },
  { icon: Shield, name: 'Finance', jobs: '1,456', color: 'bg-red-500' },
  { icon: Globe, name: 'Remote', jobs: '4,567', color: 'bg-indigo-500' },
  { icon: Heart, name: 'Healthcare', jobs: '789', color: 'bg-pink-500' },
  { icon: Calculator, name: 'Engineering', jobs: '1,023', color: 'bg-teal-500' },
];

const JobCategories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse Jobs by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore opportunities across different industries and find the perfect role for your skills.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-sm">{category.jobs} jobs available</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;