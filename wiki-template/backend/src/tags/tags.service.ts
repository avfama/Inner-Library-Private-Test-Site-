import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class TagsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll() {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  }

  async getPagesByTag(tagId: string) {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('page_tags')
      .select('page:pages(*)')
      .eq('tag_id', tagId);

    if (error) throw error;
    return data.map(item => item.page);
  }
}
