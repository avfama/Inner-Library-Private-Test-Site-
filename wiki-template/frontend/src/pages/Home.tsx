import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import PageCard from '../components/PageCard';
import { supabase, type Page, type Category } from '../lib/supabase';

export default function Home() {
  const [pages, setPages] = useState<Page[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load recent pages
      const { data: pagesData } = await supabase
        .from('pages')
        .select(`
          *,
          category:categories(*),
          tags:page_tags(tag:tags(*))
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(6);

      // Load categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (pagesData) setPages(pagesData);
      if (categoriesData) setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-neutral-50 border-b border-neutral-200 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Modern Knowledge Base</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-display font-bold text-neutral-900 mb-6">
              Your Team's
              <span className="text-primary-600"> Knowledge Hub</span>
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8">
              Create, organize, and share documentation with ease. 
              Built for teams who value clarity and collaboration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/new" className="btn btn-primary text-lg px-8 py-3">
                Create New Page
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/categories" className="btn btn-secondary text-lg px-8 py-3">
                <BookOpen className="w-5 h-5" />
                Browse Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-neutral-900">
              Browse by Category
            </h2>
            <Link to="/categories" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/category/${category.slug}`}>
                  <div className="card p-6 group hover:border-primary-300">
                    <h3 className="font-display font-semibold text-lg text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-neutral-600 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Pages Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-neutral-900">
              Recent Pages
            </h2>
          </div>
          
          {pages.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600 mb-4">No pages yet. Be the first to create one!</p>
              <Link to="/new" className="btn btn-primary">
                Create First Page
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.map((page, index) => (
                <PageCard key={page.id} page={page} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
