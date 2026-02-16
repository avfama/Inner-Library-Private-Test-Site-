-- Create pages table
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  is_published BOOLEAN DEFAULT true
);

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);

-- Create index for search
CREATE INDEX IF NOT EXISTS idx_pages_title ON public.pages USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_pages_content ON public.pages USING gin(to_tsvector('english', content));

-- Enable Row Level Security
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published pages
CREATE POLICY "Published pages are viewable by everyone" 
  ON public.pages FOR SELECT 
  USING (is_published = true);

-- Policy: Authenticated users can insert pages
CREATE POLICY "Authenticated users can create pages" 
  ON public.pages FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Policy: Authors can update their own pages
CREATE POLICY "Authors can update their own pages" 
  ON public.pages FOR UPDATE 
  TO authenticated
  USING (auth.uid() = author_id);

-- Policy: Authors can delete their own pages
CREATE POLICY "Authors can delete their own pages" 
  ON public.pages FOR DELETE 
  TO authenticated
  USING (auth.uid() = author_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_pages_updated_at 
  BEFORE UPDATE ON public.pages 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create search function
CREATE OR REPLACE FUNCTION search_pages(search_query TEXT)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  title TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.slug,
    p.title,
    p.content,
    p.created_at,
    p.updated_at,
    ts_rank(
      to_tsvector('english', p.title || ' ' || p.content),
      plainto_tsquery('english', search_query)
    ) as rank
  FROM public.pages p
  WHERE 
    p.is_published = true
    AND to_tsvector('english', p.title || ' ' || p.content) @@ plainto_tsquery('english', search_query)
  ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql;
