import { Link } from 'react-router-dom';
import { Calendar, Eye, Tag as TagIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Page } from '../lib/supabase';

interface PageCardProps {
  page: Page;
  index?: number;
}

export default function PageCard({ page, index = 0 }: PageCardProps) {
  const formattedDate = new Date(page.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/page/${page.slug}`} className="block">
        <div className="card p-6 h-full group hover:border-primary-300 transition-all">
          {/* Category Badge */}
          {page.category && (
            <span className="badge badge-primary mb-3">
              {page.category.name}
            </span>
          )}

          {/* Title */}
          <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
            {page.title}
          </h3>

          {/* Excerpt */}
          {page.excerpt && (
            <p className="text-neutral-600 mb-4 line-clamp-2">
              {page.excerpt}
            </p>
          )}

          {/* Tags */}
          {page.tags && page.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {page.tags.slice(0, 3).map((pt) => (
                <span
                  key={pt.tag.id}
                  className="inline-flex items-center gap-1 text-xs text-neutral-600 bg-neutral-100 px-2 py-1 rounded"
                >
                  <TagIcon className="w-3 h-3" />
                  {pt.tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-neutral-500 mt-auto pt-4 border-t border-neutral-100">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {page.views} views
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
