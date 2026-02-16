import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase credentials not configured');
      this.supabase = createClient('https://placeholder.supabase.co', 'placeholder');
    } else {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
