import { supabase } from './supabase';
import type { WikiPage, CreatePageInput, UpdatePageInput, SearchResult } from '../types';

export const api = {
  // Get all pages
  async getPages(): Promise<WikiPage[]> {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('is_published', true)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get a single page by slug
  async getPage(slug: string): Promise<WikiPage | null> {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  },

  // Create a new page
  async createPage(input: CreatePageInput): Promise<WikiPage> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('pages')
      .insert([{ ...input, author_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a page
  async updatePage(slug: string, input: UpdatePageInput): Promise<WikiPage> {
    const { data, error } = await supabase
      .from('pages')
      .update(input)
      .eq('slug', slug)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a page
  async deletePage(slug: string): Promise<void> {
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('slug', slug);

    if (error) throw error;
  },

  // Search pages
  async searchPages(query: string): Promise<SearchResult[]> {
    const { data, error } = await supabase
      .rpc('search_pages', { search_query: query });

    if (error) throw error;
    return data || [];
  },

  // Auth methods
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
};
