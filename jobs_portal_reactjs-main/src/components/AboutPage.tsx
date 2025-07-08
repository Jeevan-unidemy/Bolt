import React from 'react';
import { Users, Target, Award, Globe, Heart, Zap, Shield, TrendingUp, Mail, Linkedin, Twitter, MapPin, Phone, CheckCircle } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    bio: 'Former VP at Google with 15+ years in tech recruitment. Passionate about connecting talent with opportunity.',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    bio: 'Tech veteran with expertise in AI and machine learning. Leading our platform innovation.',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Head of Product',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    bio: 'Product strategist focused on user experience and data-driven design decisions.',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Head of Partnerships',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    bio: 'Building relationships with top companies to create more opportunities for job seekers.',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Head of Marketing',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    bio: 'Creative marketer with a passion for storytelling and brand building.',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Head of Engineering',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    bio: 'Full-stack engineer ensuring our platform scales to serve millions of users.',
    linkedin: '#',
    twitter: '#',
  },
];

const values = [
  {
    icon: Heart,
    title: 'People First',
    description: 'We believe every person deserves meaningful work that aligns with their values and aspirations.',
    color: 'bg-red-500',
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'Building trust through honest communication and transparent processes in everything we do.',
    color: 'bg-blue-500',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Continuously improving our platform with cutting-edge technology and user-centric design.',
    color: 'bg-yellow-500',
  },
  {
    icon: Globe,
    title: 'Inclusivity',
    description: 'Creating equal opportunities for everyone, regardless of background, location, or experience level.',
    color: 'bg-green-500',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'Striving for excellence in every interaction, feature, and service we provide.',
    color: 'bg-purple-500',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a supportive community where professionals can grow and succeed together.',
    color: 'bg-indigo-500',
  },
];

const milestones = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'Started with a vision to revolutionize job searching and recruitment.',
  },
  {
    year: '2021',
    title: '10K Users',
    description: 'Reached our first 10,000 registered users and 100 partner companies.',
  },
  {
    year: '2022',
    title: 'Series A Funding',
    description: 'Raised $15M Series A to expand our platform and team.',
  },
  {
    year: '2023',
    title: '100K Jobs Posted',
    description: 'Milestone of 100,000 jobs posted and 50,000 successful placements.',
  },
  {
    year: '2024',
    title: 'Global Expansion',
    description: 'Expanded to 15 countries with localized job markets.',
  },
  {
    year: '2025',
    title: '1M+ Users',
    description: 'Serving over 1 million job seekers and 500+ companies worldwide.',
  },
];

const stats = [
  { number: '1M+', label: 'Active Job Seekers', icon: Users },
  { number: '500+', label: 'Partner Companies', icon: Award },
  { number: '50K+', label: 'Successful Placements', icon: CheckCircle },
  { number: '95%', label: 'User Satisfaction', icon: TrendingUp },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connecting Dreams with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Opportunities</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to transform how people find meaningful work and how companies discover exceptional talent. 
              Every connection we make is a step toward a better future for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Unidemy Jobs, we believe that finding the right job shouldn't be a matter of luck or who you know. 
                We're building a platform where talent meets opportunity based on merit, skills, and cultural fit.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our advanced matching algorithms, combined with human insight, ensure that every job seeker finds 
                roles that align with their career goals, and every company discovers candidates who will thrive 
                in their environment.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">AI-powered job matching</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Personalized career guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Transparent hiring processes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Global opportunities</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-blue-600">2020</div>
                <div className="text-gray-600">Founded</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${value.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From a small startup to a global platform, here's how we've grown together.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Unidemy Jobs, working tirelessly to connect talent with opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover group-hover:scale-110 transition-transform"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.linkedin}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={member.twitter}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Let's Connect
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Have questions about our platform? Want to partner with us? 
                We'd love to hear from you and explore how we can work together.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <div className="text-blue-100">hello@unidemyjobs.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-blue-100">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Visit Us</div>
                    <div className="text-blue-100">123 Innovation Drive<br />San Francisco, CA 94105</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70 text-white"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70 text-white"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70 text-white resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 py-3 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;