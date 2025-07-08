import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Wand2, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  Languages,
  CheckCircle,
  Sparkles,
  RefreshCw,
  Copy,
  ArrowRight
} from 'lucide-react';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'Clean, modern design perfect for tech and creative roles',
    color: 'blue'
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    preview: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'Traditional layout ideal for corporate and executive positions',
    color: 'gray'
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    preview: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'Bold, creative design for designers and artists',
    color: 'purple'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    preview: 'https://images.pexels.com/photos/590018/pexels-photo-590018.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'Minimalist design that focuses on content',
    color: 'green'
  }
];

const aiSuggestions = {
  summaries: [
    "Results-driven software engineer with 5+ years of experience developing scalable web applications and leading cross-functional teams to deliver high-quality products.",
    "Creative marketing professional with expertise in digital campaigns, brand strategy, and data-driven decision making that increased ROI by 150%.",
    "Experienced project manager with a proven track record of delivering complex projects on time and under budget while maintaining high quality standards.",
    "Innovative data scientist passionate about leveraging machine learning and analytics to solve complex business problems and drive strategic decisions."
  ],
  skills: {
    'Software Engineer': ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Git', 'SQL'],
    'Marketing Manager': ['Digital Marketing', 'SEO/SEM', 'Google Analytics', 'Content Strategy', 'Social Media', 'Email Marketing'],
    'Data Scientist': ['Python', 'R', 'Machine Learning', 'SQL', 'Tableau', 'TensorFlow', 'Statistics', 'Data Visualization'],
    'Product Manager': ['Product Strategy', 'Agile/Scrum', 'User Research', 'A/B Testing', 'Roadmap Planning', 'Stakeholder Management']
  }
};

const ResumeBuilderPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    summary: ''
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setExperiences(prev => [...prev, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(prev => prev.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    setEducation(prev => [...prev, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(prev => prev.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(prev => prev.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate'
    };
    setSkills(prev => [...prev, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const removeSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  const generateAISummary = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    const randomSummary = aiSuggestions.summaries[Math.floor(Math.random() * aiSuggestions.summaries.length)];
    setPersonalInfo(prev => ({ ...prev, summary: randomSummary }));
    setIsGenerating(false);
  };

  const generateAISkills = async (jobTitle: string) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const suggestedSkills = aiSuggestions.skills[jobTitle as keyof typeof aiSuggestions.skills] || [];
    const newSkills = suggestedSkills.map(skillName => ({
      id: Date.now().toString() + Math.random(),
      name: skillName,
      level: 'Intermediate' as const
    }));
    
    setSkills(prev => [...prev, ...newSkills]);
    setIsGenerating(false);
  };

  const steps = [
    { number: 1, title: 'Template', icon: FileText },
    { number: 2, title: 'Personal Info', icon: User },
    { number: 3, title: 'Experience', icon: Briefcase },
    { number: 4, title: 'Education', icon: GraduationCap },
    { number: 5, title: 'Skills', icon: Code },
    { number: 6, title: 'Preview', icon: Eye }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Resume Builder
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create Your Perfect Resume with AI
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Build a professional resume in minutes with our AI-powered tools and expert-designed templates.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Progress Steps */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Build Your Resume</h3>
              <div className="space-y-4">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;
                  
                  return (
                    <button
                      key={step.number}
                      onClick={() => setCurrentStep(step.number)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 border-2 border-blue-200' 
                          : isCompleted
                          ? 'bg-green-50 text-green-700 hover:bg-green-100'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive 
                          ? 'bg-blue-600 text-white' 
                          : isCompleted
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <span className="font-medium">{step.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold flex items-center justify-center space-x-2"
                >
                  <Eye className="h-5 w-5" />
                  <span>Preview Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              {/* Step 1: Template Selection */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Template</h2>
                  <p className="text-gray-600 mb-8">
                    Select a professional template that matches your industry and personal style.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className={`group cursor-pointer border-2 rounded-2xl p-6 transition-all ${
                          selectedTemplate.id === template.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                        <p className="text-gray-600 text-sm">{template.description}</p>
                        {selectedTemplate.id === template.id && (
                          <div className="mt-4 flex items-center text-blue-600">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            <span className="font-medium">Selected</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {currentStep === 2 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                    <button
                      onClick={generateAISummary}
                      disabled={isGenerating}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium flex items-center space-x-2 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="h-4 w-4" />
                      )}
                      <span>AI Generate Summary</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            value={personalInfo.firstName}
                            onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your first name"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            value={personalInfo.lastName}
                            onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="tel"
                            value={personalInfo.phone}
                            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          value={personalInfo.location}
                          onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="City, State, Country"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="url"
                            value={personalInfo.website}
                            onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://yourwebsite.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          LinkedIn
                        </label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="url"
                            value={personalInfo.linkedin}
                            onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Professional Summary
                      </label>
                      <textarea
                        value={personalInfo.summary}
                        onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Write a brief summary of your professional background and career objectives..."
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Tip: Use the AI Generate button above to create a professional summary automatically.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Experience */}
              {currentStep === 3 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
                    <button
                      onClick={addExperience}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {experiences.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                        <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No work experience added yet</h3>
                        <p className="text-gray-600 mb-4">Add your work experience to showcase your professional background.</p>
                        <button
                          onClick={addExperience}
                          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                        >
                          Add Your First Experience
                        </button>
                      </div>
                    ) : (
                      experiences.map((exp, index) => (
                        <div key={exp.id} className="border border-gray-200 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Experience {index + 1}</h3>
                            <button
                              onClick={() => removeExperience(exp.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company *
                              </label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Company name"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Position *
                              </label>
                              <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Job title"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                              </label>
                              <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="City, State"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date *
                              </label>
                              <input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Date
                              </label>
                              <input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                disabled={exp.current}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                              />
                            </div>
                          </div>

                          <div className="mb-4">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="ml-2 text-sm text-gray-700">I currently work here</span>
                            </label>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              rows={4}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                              placeholder="Describe your responsibilities, achievements, and key contributions..."
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Education */}
              {currentStep === 4 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                    <button
                      onClick={addEducation}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Education</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {education.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                        <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No education added yet</h3>
                        <p className="text-gray-600 mb-4">Add your educational background to strengthen your resume.</p>
                        <button
                          onClick={addEducation}
                          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                        >
                          Add Your Education
                        </button>
                      </div>
                    ) : (
                      education.map((edu, index) => (
                        <div key={edu.id} className="border border-gray-200 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Education {index + 1}</h3>
                            <button
                              onClick={() => removeEducation(edu.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Institution *
                              </label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="University or school name"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Degree *
                              </label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Bachelor's, Master's, PhD, etc."
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Field of Study *
                              </label>
                              <input
                                type="text"
                                value={edu.field}
                                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Computer Science, Business, etc."
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date
                              </label>
                              <input
                                type="month"
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Date
                              </label>
                              <input
                                type="month"
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              GPA (Optional)
                            </label>
                            <input
                              type="text"
                              value={edu.gpa}
                              onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="3.8/4.0"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentStep(5)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Skills */}
              {currentStep === 5 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                    <div className="flex space-x-3">
                      <select
                        onChange={(e) => e.target.value && generateAISkills(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue=""
                      >
                        <option value="">AI Suggest Skills</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Marketing Manager">Marketing Manager</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Product Manager">Product Manager</option>
                      </select>
                      <button
                        onClick={addSkill}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Skill</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {skills.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                        <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h3>
                        <p className="text-gray-600 mb-4">Add your technical and soft skills to showcase your abilities.</p>
                        <button
                          onClick={addSkill}
                          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                        >
                          Add Your First Skill
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map((skill) => (
                          <div key={skill.id} className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                              <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
                                placeholder="Skill name"
                              />
                              <button
                                onClick={() => removeSkill(skill.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <select
                              value={skill.level}
                              onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Expert">Expert</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentStep(6)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2"
                    >
                      <span>Preview Resume</span>
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 6: Preview */}
              {currentStep === 6 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
                    <div className="flex space-x-3">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Save Resume</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
                    {/* Resume Preview Content */}
                    <div className="max-w-2xl mx-auto">
                      <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {personalInfo.firstName} {personalInfo.lastName}
                        </h1>
                        <div className="flex flex-wrap justify-center gap-4 text-gray-600 mb-4">
                          {personalInfo.email && <span>{personalInfo.email}</span>}
                          {personalInfo.phone && <span>{personalInfo.phone}</span>}
                          {personalInfo.location && <span>{personalInfo.location}</span>}
                        </div>
                        {personalInfo.summary && (
                          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                        )}
                      </div>

                      {experiences.length > 0 && (
                        <div className="mb-8">
                          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                            Work Experience
                          </h2>
                          <div className="space-y-6">
                            {experiences.map((exp) => (
                              <div key={exp.id}>
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                    <p className="text-blue-600">{exp.company}</p>
                                  </div>
                                  <div className="text-right text-gray-600 text-sm">
                                    <p>{exp.location}</p>
                                    <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                                  </div>
                                </div>
                                {exp.description && (
                                  <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {education.length > 0 && (
                        <div className="mb-8">
                          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                            Education
                          </h2>
                          <div className="space-y-4">
                            {education.map((edu) => (
                              <div key={edu.id} className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                                  <p className="text-blue-600">{edu.institution}</p>
                                  {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                                </div>
                                <div className="text-right text-gray-600 text-sm">
                                  <p>{edu.startDate} - {edu.endDate}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {skills.length > 0 && (
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                            Skills
                          </h2>
                          <div className="grid grid-cols-2 gap-4">
                            {skills.map((skill) => (
                              <div key={skill.id} className="flex justify-between items-center">
                                <span className="text-gray-900">{skill.name}</span>
                                <span className="text-blue-600 text-sm">{skill.level}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setCurrentStep(5)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Previous
                    </button>
                    <div className="flex space-x-3">
                      <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center space-x-2">
                        <Download className="h-5 w-5" />
                        <span>Download Resume</span>
                      </button>
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2">
                        <Save className="h-5 w-5" />
                        <span>Save & Apply to Jobs</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our AI Resume Builder?</h2>
            <p className="text-xl text-blue-100">
              Create professional resumes that get you noticed by employers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wand2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Content</h3>
              <p className="text-blue-100">
                Generate professional summaries and optimize your content with AI assistance
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
              <p className="text-blue-100">
                Choose from expertly designed templates that pass ATS systems
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
              <p className="text-blue-100">
                Download your resume as PDF and start applying to jobs immediately
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;