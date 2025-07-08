import React, { createContext, useContext, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { Profile } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};