import React, { useState } from 'react';
import { AuthProvider } from './components/AuthProvider';
import Header from './components/Header';
import Hero from './components/Hero';
import JobTypeStats from './components/JobTypeStats';
import JobCategories from './components/JobCategories';
import FeaturedJobs from './components/FeaturedJobs';
import Companies from './components/Companies';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import JobsPage from './components/JobsPage';
import CompaniesPage from './components/CompaniesPage';
import AboutPage from './components/AboutPage';
import ResumeBuilderPage from './components/ResumeBuilderPage';
import Dashboard from './components/Dashboard';
import { useAuthContext } from './components/AuthProvider';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'jobs' | 'companies' | 'about' | 'resume-builder' | 'dashboard'>('home');
  const { isAuthenticated, user } = useAuthContext();

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'dashboard' && isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigate={setCurrentPage} 
          currentPage={currentPage}
          isLoggedIn={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <Dashboard onNavigate={setCurrentPage} />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'jobs') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigate={setCurrentPage} 
          currentPage={currentPage}
          isLoggedIn={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <JobsPage />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'companies') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigate={setCurrentPage} 
          currentPage={currentPage}
          isLoggedIn={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <CompaniesPage />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigate={setCurrentPage} 
          currentPage={currentPage}
          isLoggedIn={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <AboutPage />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'resume-builder') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigate={setCurrentPage} 
          currentPage={currentPage}
          isLoggedIn={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <ResumeBuilderPage />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onNavigate={setCurrentPage} 
        currentPage={currentPage}
        isLoggedIn={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <Hero onNavigateToResumeBuilder={() => setCurrentPage('resume-builder')} />
      <JobTypeStats />
      <Companies />
      <JobCategories />
      <FeaturedJobs onViewAllJobs={() => setCurrentPage('jobs')} />
      <Newsletter />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;