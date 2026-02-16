import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class SearchService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async search(query: string) {
    const supabase = this.supabaseService.getClient();
    
    // Use PostgreSQL full-text search
    const { data, error } = await supabase
      .from('pages')
      .select(`
        *,
        category:categories(*),
        tags:page_tags(tag:tags(*))
      `)
      .textSearch('title', query, {
        type: 'websearch',
        config: 'english',
      })
      .eq('is_published', true)
      .limit(20);

    if (error) throw error;
    return data;
  }

  async searchByContent(query: string) {
    const supabase = this.supabaseService.getClient();
    
    // Search in both title and content
    const { data, error } = await supabase.rpc('search_pages', {
      search_query: query,
    });

    if (error) {
      // Fallback to simple search if function doesn't exist
      return this.search(query);
    }
    
    return data;
  }
}
