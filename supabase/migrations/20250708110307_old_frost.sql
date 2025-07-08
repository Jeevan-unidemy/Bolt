/*
  # Create Storage Buckets for File Uploads

  1. Storage Setup
    - Create resumes bucket for user resume uploads
    - Set up proper RLS policies for file access
    - Configure file type and size restrictions

  2. Security
    - Users can only upload to their own folder
    - Users can only access their own files
    - File type restrictions for security
*/

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('resumes', 'resumes', false, 5242880, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for resumes bucket
CREATE POLICY "Users can upload their own resumes"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'resumes' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can view their own resumes"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'resumes' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own resumes"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'resumes' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own resumes"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'resumes' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );