import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { api } from '../lib/api';
import type { WikiPage } from '../types';

export function PageView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<WikiPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      loadPage();
      api.getCurrentUser().then(setUser);
    }
  }, [slug]);

  const loadPage = async () => {
    if (!slug) return;
    
    try {
      const data = await api.getPage(slug);
      setPage(data);
    } catch (error) {
      console.error('Failed to load page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!slug || !window.confirm('Are you sure you want to delete this page?')) {
      return;
    }

    try {
      await api.deletePage(slug);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete page:', error);
      alert('Failed to delete page');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page not found</h2>
          <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary inline-block">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = user && page.author_id === user.id;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all pages
        </Link>
      </div>

      <article className="card">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{page.title}</h1>
            <p className="text-gray-500 text-sm">
              Last updated: {new Date(page.updated_at).toLocaleDateString()}
            </p>
          </div>

          {isAuthor && (
            <div className="flex gap-2">
              <Link
                to={`/edit/${page.slug}`}
                className="btn-secondary flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
              <button onClick={handleDelete} className="btn-danger flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="markdown-content">
          <ReactMarkdown>{page.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
