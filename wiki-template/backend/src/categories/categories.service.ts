import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll() {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.from('categories').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async getPagesByCategory(categoryId: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('category_id', categoryId)
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
}
