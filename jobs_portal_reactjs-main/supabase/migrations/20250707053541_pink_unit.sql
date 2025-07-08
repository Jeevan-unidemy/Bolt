/*
  # Initial Database Schema for Job Portal

  1. New Tables
    - `profiles` - User profile information
    - `companies` - Company information
    - `jobs` - Job listings
    - `applications` - Job applications
    - `saved_jobs` - User saved jobs
    - `skills` - Skills master data
    - `user_skills` - User skills mapping
    - `notifications` - User notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure data access based on user roles

  3. Features
    - User profile management
    - Job posting and management
    - Application tracking
    - Skill management
    - Notification system
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  bio TEXT,
  job_title TEXT,
  company TEXT,
  experience_level TEXT CHECK (experience_level IN ('Entry-level', '1-2 years', '3-5 years', '5+ years', '10+ years')),
  salary_range TEXT,
  availability TEXT CHECK (availability IN ('Open to opportunities', 'Actively looking', 'Not looking', 'Open to freelance')),
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  resume_url TEXT,
  profile_visibility TEXT DEFAULT 'public' CHECK (profile_visibility IN ('public', 'private', 'recruiters')),
  show_salary BOOLEAN DEFAULT false,
  show_contact BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  job_alerts BOOLEAN DEFAULT true,
  application_updates BOOLEAN DEFAULT true,
  marketing_emails BOOLEAN DEFAULT false,
  two_factor_enabled BOOLEAN DEFAULT false,
  profile_views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  industry TEXT,
  size_range TEXT CHECK (size_range IN ('1-50', '50-200', '200-500', '500-1000', '1000-5000', '5000+')),
  location TEXT,
  website_url TEXT,
  logo_url TEXT,
  rating DECIMAL(2,1) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  founded_year INTEGER,
  specialties TEXT[],
  benefits TEXT[],
  culture_description TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL CHECK (job_type IN ('Full Time', 'Part Time', 'Contract', 'Internship', 'Freelancing')),
  experience_level TEXT CHECK (experience_level IN ('Entry-level', 'Mid-level', 'Senior', 'Executive')),
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'USD',
  is_remote BOOLEAN DEFAULT false,
  requirements TEXT[],
  benefits TEXT[],
  skills_required TEXT[],
  application_deadline DATE,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  application_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'interview_scheduled', 'interview_completed', 'offer_made', 'accepted', 'rejected', 'withdrawn')),
  cover_letter TEXT,
  resume_url TEXT,
  expected_salary TEXT,
  availability_date DATE,
  portfolio_url TEXT,
  linkedin_url TEXT,
  additional_info JSONB,
  applied_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(job_id, user_id)
);

-- Create saved_jobs table
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, job_id)
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_skills table
CREATE TABLE IF NOT EXISTS user_skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  proficiency_level TEXT CHECK (proficiency_level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  years_experience INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('job_alert', 'application_update', 'profile_view', 'system', 'marketing')),
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create password_reset_tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (profile_visibility = 'public');

-- Companies policies
CREATE POLICY "Companies are viewable by everyone"
  ON companies
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create companies"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Company creators can update their companies"
  ON companies
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Jobs policies
CREATE POLICY "Active jobs are viewable by everyone"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can create jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Job creators can update their jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Applications policies
CREATE POLICY "Users can read own applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create applications"
  ON applications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON applications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Saved jobs policies
CREATE POLICY "Users can manage own saved jobs"
  ON saved_jobs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Skills policies
CREATE POLICY "Skills are viewable by everyone"
  ON skills
  FOR SELECT
  TO authenticated
  USING (true);

-- User skills policies
CREATE POLICY "Users can manage own skills"
  ON user_skills
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can read own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Password reset tokens policies
CREATE POLICY "Users can read own reset tokens"
  ON password_reset_tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(id);
CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON jobs(is_featured);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user_id ON saved_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample skills
INSERT INTO skills (name, category) VALUES
  ('React', 'Frontend'),
  ('TypeScript', 'Programming'),
  ('Node.js', 'Backend'),
  ('Python', 'Programming'),
  ('JavaScript', 'Programming'),
  ('HTML/CSS', 'Frontend'),
  ('SQL', 'Database'),
  ('AWS', 'Cloud'),
  ('Docker', 'DevOps'),
  ('Git', 'Tools'),
  ('Project Management', 'Management'),
  ('UI/UX Design', 'Design'),
  ('Machine Learning', 'AI/ML'),
  ('Data Analysis', 'Analytics'),
  ('Marketing', 'Business')
ON CONFLICT (name) DO NOTHING;