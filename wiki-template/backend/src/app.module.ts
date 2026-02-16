import { Module } from '@nestjs/common';
import { PagesModule } from './pages/pages.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { SearchModule } from './search/search.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    SupabaseModule,
    PagesModule,
    CategoriesModule,
    TagsModule,
    SearchModule,
  ],
})
export class AppModule {}
