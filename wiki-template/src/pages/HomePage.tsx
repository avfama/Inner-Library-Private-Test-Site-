import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock } from 'lucide-react';
import { api } from '../lib/api';
import type { WikiPage } from '../types';

export function HomePage() {
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const data = await api.getPages();
      setPages(data);
    } catch (error) {
      console.error('Failed to load pages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the Wiki</h1>
        <p className="text-lg text-gray-600">
          Browse and discover knowledge. Create an account to contribute your own pages.
        </p>
      </div>

      {pages.length === 0 ? (
        <div className="card text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No pages yet</h3>
          <p className="text-gray-600 mb-6">Be the first to create a page!</p>
          <Link to="/new" className="btn-primary inline-block">
            Create First Page
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Link
              key={page.id}
              to={`/page/${page.slug}`}
              className="card hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {page.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {page.content.substring(0, 150)}...
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(page.updated_at).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
