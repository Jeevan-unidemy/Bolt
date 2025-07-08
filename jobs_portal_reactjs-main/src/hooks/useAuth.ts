import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, getCurrentUser, Profile, getProfile, signOut as supabaseSignOut } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          const userProfile = await getProfile(currentUser.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_OUT' || !session?.user) {
          setUser(null);
          setProfile(null);
          setLoading(false);
          return;
        }
        
        setUser(session.user);
        
        if (session.user) {
          try {
            const userProfile = await getProfile(session.user.id);
            setProfile(userProfile);
          } catch (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
          }
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      try {
        const userProfile = await getProfile(user.id);
        setProfile(userProfile);
      } catch (error) {
        console.error('Error refreshing profile:', error);
      }
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabaseSignOut();
      // Clear state immediately
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    refreshProfile,
    signOut,
  };
};