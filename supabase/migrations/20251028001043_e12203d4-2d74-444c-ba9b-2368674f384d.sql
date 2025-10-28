-- Blog posts table with full content management
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_name TEXT DEFAULT 'Pam O''Bryant',
  author_title TEXT DEFAULT 'Founder & CEO',
  author_image_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Categories table for organizing posts
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Many-to-many relationship for posts and categories
CREATE TABLE IF NOT EXISTS public.blog_post_categories (
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, category_id)
);

-- Tags table for additional organization
CREATE TABLE IF NOT EXISTS public.blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Many-to-many relationship for posts and tags
CREATE TABLE IF NOT EXISTS public.blog_post_tags (
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, tag_id)
);

-- Free resources table
CREATE TABLE IF NOT EXISTS public.free_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('pdf', 'video', 'webinar', 'toolkit', 'scorecard', 'plan')),
  file_url TEXT,
  thumbnail_url TEXT,
  download_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Track resource downloads per lead
CREATE TABLE IF NOT EXISTS public.resource_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID REFERENCES public.free_resources(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(resource_id, lead_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON public.blog_posts(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_free_resources_active ON public.free_resources(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_resource_downloads_lead ON public.resource_downloads(lead_id);

-- Trigger for updated_at on blog_posts
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for updated_at on free_resources
CREATE TRIGGER update_free_resources_updated_at
  BEFORE UPDATE ON public.free_resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.free_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;

-- Blog Posts RLS Policies
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts FOR SELECT
USING (is_published = true);

DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- Categories and Tags RLS
DROP POLICY IF EXISTS "Anyone can view categories" ON public.blog_categories;
CREATE POLICY "Anyone can view categories"
ON public.blog_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view tags" ON public.blog_tags;
CREATE POLICY "Anyone can view tags"
ON public.blog_tags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view post categories" ON public.blog_post_categories;
CREATE POLICY "Anyone can view post categories"
ON public.blog_post_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view post tags" ON public.blog_post_tags;
CREATE POLICY "Anyone can view post tags"
ON public.blog_post_tags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage categories" ON public.blog_categories;
CREATE POLICY "Admins can manage categories"
ON public.blog_categories FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can manage tags" ON public.blog_tags;
CREATE POLICY "Admins can manage tags"
ON public.blog_tags FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can manage post categories" ON public.blog_post_categories;
CREATE POLICY "Admins can manage post categories"
ON public.blog_post_categories FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can manage post tags" ON public.blog_post_tags;
CREATE POLICY "Admins can manage post tags"
ON public.blog_post_tags FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- Resources RLS Policies
DROP POLICY IF EXISTS "Anyone can view active resources" ON public.free_resources;
CREATE POLICY "Anyone can view active resources"
ON public.free_resources FOR SELECT
USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage resources" ON public.free_resources;
CREATE POLICY "Admins can manage resources"
ON public.free_resources FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can view downloads" ON public.resource_downloads;
CREATE POLICY "Admins can view downloads"
ON public.resource_downloads FOR SELECT
USING (is_admin());

DROP POLICY IF EXISTS "Service role can insert downloads" ON public.resource_downloads;
CREATE POLICY "Service role can insert downloads"
ON public.resource_downloads FOR INSERT
WITH CHECK (true);

-- Storage Buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('free-resources', 'free-resources', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS for blog-images
DROP POLICY IF EXISTS "Admins can upload blog images" ON storage.objects;
CREATE POLICY "Admins can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' AND
  is_admin()
);

DROP POLICY IF EXISTS "Anyone can view blog images" ON storage.objects;
CREATE POLICY "Anyone can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Admins can delete blog images" ON storage.objects;
CREATE POLICY "Admins can delete blog images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-images' AND
  is_admin()
);

-- Storage RLS for free-resources
DROP POLICY IF EXISTS "Admins can upload resources" ON storage.objects;
CREATE POLICY "Admins can upload resources"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'free-resources' AND
  is_admin()
);

DROP POLICY IF EXISTS "Admins can view all resources" ON storage.objects;
CREATE POLICY "Admins can view all resources"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'free-resources' AND
  is_admin()
);

DROP POLICY IF EXISTS "Admins can delete resources" ON storage.objects;
CREATE POLICY "Admins can delete resources"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'free-resources' AND
  is_admin()
);

-- Insert sample categories
INSERT INTO public.blog_categories (name, slug, description) VALUES
('Agent Success', 'agent-success', 'Tips and strategies for real estate agent success'),
('Database Management', 'database-management', 'Building and managing your sphere of influence'),
('Marketing', 'marketing', 'Marketing strategies and tactics for agents'),
('Systems & Automation', 'systems-automation', 'Streamlining your business with systems')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample tags
INSERT INTO public.blog_tags (name, slug) VALUES
('Sphere Building', 'sphere-building'),
('Lead Generation', 'lead-generation'),
('Client Retention', 'client-retention'),
('Time Management', 'time-management'),
('Referrals', 'referrals'),
('Events', 'events')
ON CONFLICT (slug) DO NOTHING;