@@ .. @@
 // File upload functions
 export const uploadFile = async (bucket: string, path: string, file: File) => {
   const { data, error } = await supabase.storage
     .from(bucket)
     .upload(path, file, {
       cacheControl: '3600',
-      upsert: false
+      upsert: true
     });
 
   if (error) throw error;
   return data;
 };
 
 export const getFileUrl = (bucket: string, path: string) => {
   const { data } = supabase.storage
     .from(bucket)
     .getPublicUrl(path);
 
   return data.publicUrl;
 };
+
+// Storage bucket setup
+export const createStorageBuckets = async () => {
+  try {
+    // Create resumes bucket if it doesn't exist
+    const { data: buckets } = await supabase.storage.listBuckets();
+    const resumesBucketExists = buckets?.some(bucket => bucket.name === 'resumes');
+    
+    if (!resumesBucketExists) {
+      await supabase.storage.createBucket('resumes', {
+        public: false,
+        allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
+        fileSizeLimit: 5242880 // 5MB
+      });
+    }
+  } catch (error) {
+    console.error('Error creating storage buckets:', error);
+  }
+};