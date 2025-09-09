-- Create storage bucket for PDF reports
INSERT INTO storage.buckets (id, name, public) VALUES ('pdf-reports', 'pdf-reports', false);

-- Create policy for PDF reports access
CREATE POLICY "Admin can view all PDF reports" ON storage.objects
FOR SELECT USING (bucket_id = 'pdf-reports');

CREATE POLICY "System can create PDF reports" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'pdf-reports');