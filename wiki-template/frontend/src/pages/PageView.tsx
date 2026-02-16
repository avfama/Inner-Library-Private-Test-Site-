import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, Tag as TagIcon, ArrowLeft, Edit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { supabase, type Page } from '../lib/supabase';

export default function PageView() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadPage();
    }
  }, [slug]);

  const loadPage = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select(`
          *,
          category:categories(*),
          tags:page_tags(tag:tags(*))
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      if (data) {
        setPage(data);
        // Increment view count
        await supabase
          .from('pages')
          .update({ views: data.views + 1 })
          .eq('id', data.id);
      }
    } catch (error) {
      console.error('Error loading page:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading page...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-neutral-600 mb-8">
            The page you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(page.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 sm:p-12 mb-8"
        >
          {/* Category */}
          {page.category && (
            <span className="badge badge-primary mb-4">
              {page.category.name}
            </span>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
            {page.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-neutral-600 mb-6">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {page.views} views
            </span>
          </div>

          {/* Tags */}
          {page.tags && page.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {page.tags.map((pt) => (
                <span
                  key={pt.tag.id}
                  className="inline-flex items-center gap-1 text-sm text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full"
                >
                  <TagIcon className="w-3 h-3" />
                  {pt.tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Edit Button */}
          <Link
            to={`/edit/${page.id}`}
            className="btn btn-secondary"
          >
            <Edit className="w-4 h-4" />
            Edit Page
          </Link>
        </motion.div>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 sm:p-12"
        >
          <div className="wiki-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {page.content}
            </ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
