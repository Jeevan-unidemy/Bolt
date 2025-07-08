import React, { useState } from 'react';
import { Search, Menu, X, Briefcase, User, LogOut, Bell, Settings, Eye } from 'lucide-react';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';
import ProfileModal from './ProfileModal';
import { useAuthContext } from './AuthProvider';
import { signOut } from '../lib/supabase';

interface HeaderProps {
  onNavigate?: (page: 'home' | 'jobs' | 'companies' | 'about' | 'resume-builder' | 'dashboard') => void;
  currentPage?: 'home' | 'jobs' | 'companies' | 'about' | 'resume-builder' | 'dashboard';
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Header = ({ onNavigate, currentPage = 'home', onLogin, onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { isAuthenticated, user, profile } = useAuthContext();

  const handleSwitchToSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
  };

  const handleSwitchToSignUp = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const handleSignInSuccess = () => {
    setIsSignInModalOpen(false);
    onLogin?.();
  };

  const handleSignUpSuccess = () => {
    setIsSignUpModalOpen(false);
    onLogin?.();
  };

  const handleLogout = async () => {
    if (isSigningOut) return;
    
    setIsSigningOut(true);
    setShowUserMenu(false);
    setIsMenuOpen(false);
    
    try {
      await signOut();
      onLogout?.();
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  const getNavItemClass = (page: string) => {
    const baseClass = "transition-colors font-medium";
    if (currentPage === page) {
      return `${baseClass} text-blue-600 font-semibold`;
    }
    return `${baseClass} text-gray-700 hover:text-blue-600`;
  };

  const getMobileNavItemClass = (page: string) => {
    const baseClass = "block transition-colors font-medium w-full text-left";
    if (currentPage === page) {
      return `${baseClass} text-blue-600 font-semibold`;
    }
    return `${baseClass} text-gray-700 hover:text-blue-600`;
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => onNavigate?.('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Unidemy Jobs</span>
            </button>

            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => onNavigate?.('jobs')}
                className={getNavItemClass('jobs')}
              >
                Find Jobs
              </button>
              <button 
                onClick={() => onNavigate?.('companies')}
                className={getNavItemClass('companies')}
              >
                Companies
              </button>
              <button 
                onClick={() => onNavigate?.('resume-builder')}
                className={getNavItemClass('resume-builder')}
              >
                AI Resume Builder
              </button>
              <button 
                onClick={() => onNavigate?.('about')}
                className={getNavItemClass('about')}
              >
                About
              </button>
              {isAuthenticated && (
                <button 
                  onClick={() => onNavigate?.('dashboard')}
                  className={getNavItemClass('dashboard')}
                >
                  Dashboard
                </button>
              )}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-600 hover:text-blue-600 transition-colors relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        3
                      </span>
                    </button>
                    <button 
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <img
                        src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium">
                        {profile ? `${profile.first_name} ${profile.last_name}` : user?.email?.split('@')[0]}
                      </span>
                    </button>
                  </div>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {profile ? `${profile.first_name} ${profile.last_name}` : 'User'}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      
                      <button 
                        onClick={() => {
                          onNavigate?.('dashboard');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <User className="h-4 w-4" />
                        <span>Dashboard</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setIsProfileModalOpen(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Profile Settings</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          // View public profile
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Public Profile</span>
                      </button>
                      
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button 
                          onClick={handleLogout}
                          disabled={isSigningOut}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSigningOut ? (
                            <>
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                              <span>Signing Out...</span>
                            </>
                          ) : (
                            <>
                              <LogOut className="h-4 w-4" />
                              <span>Sign Out</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setIsSignInModalOpen(true)}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => setIsSignUpModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 mt-2 py-4 space-y-4">
              <button 
                onClick={() => {
                  onNavigate?.('jobs');
                  setIsMenuOpen(false);
                }}
                className={getMobileNavItemClass('jobs')}
              >
                Find Jobs
              </button>
              <button 
                onClick={() => {
                  onNavigate?.('companies');
                  setIsMenuOpen(false);
                }}
                className={getMobileNavItemClass('companies')}
              >
                Companies
              </button>
              <button 
                onClick={() => {
                  onNavigate?.('resume-builder');
                  setIsMenuOpen(false);
                }}
                className={getMobileNavItemClass('resume-builder')}
              >
                AI Resume Builder
              </button>
              <button 
                onClick={() => {
                  onNavigate?.('about');
                  setIsMenuOpen(false);
                }}
                className={getMobileNavItemClass('about')}
              >
                About
              </button>
              {isAuthenticated && (
                <button 
                  onClick={() => {
                    onNavigate?.('dashboard');
                    setIsMenuOpen(false);
                  }}
                  className={getMobileNavItemClass('dashboard')}
                >
                  Dashboard
                </button>
              )}
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">
                        {profile ? `${profile.first_name} ${profile.last_name}` : 'User'}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left"
                    >
                      Profile Settings
                    </button>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      disabled={isSigningOut}
                      className="text-red-600 hover:text-red-700 transition-colors font-medium text-left disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isSigningOut ? (
                        <>
                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                          <span>Signing Out...</span>
                        </>
                      ) : (
                        <span>Sign Out</span>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        setIsSignInModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => {
                        setIsSignUpModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSwitchToSignIn={handleSwitchToSignIn}
        onSuccess={handleSignUpSuccess}
      />
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
        onSuccess={handleSignInSuccess}
      />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

export default Header;