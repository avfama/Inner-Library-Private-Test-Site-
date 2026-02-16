import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category_id?: string;
  author_id?: string;
  is_published: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  category?: Category;
  tags?: { tag: Tag }[];
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Revision = {
  id: string;
  page_id: string;
  title: string;
  content: string;
  author_id?: string;
  created_at: string;
};
