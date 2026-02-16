import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { api } from '../lib/api';
import type { WikiPage } from '../types';

export function PageEditor() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [pageSlug, setPageSlug] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditMode = !!slug;

  useEffect(() => {
    if (slug) {
      loadPage();
    }
  }, [slug]);

  const loadPage = async () => {
    if (!slug) return;

    try {
      const page = await api.getPage(slug);
      if (page) {
        setTitle(page.title);
        setPageSlug(page.slug);
        setContent(page.content);
      }
    } catch (error) {
      console.error('Failed to load page:', error);
      setError('Failed to load page');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditMode && slug) {
        await api.updatePage(slug, { title, content });
        navigate(`/page/${slug}`);
      } else {
        const newPage = await api.createPage({
          title,
          slug: pageSlug,
          content,
        });
        navigate(`/page/${newPage.slug}`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save page');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditMode) {
      setPageSlug(generateSlug(value));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditMode ? 'Edit Page' : 'Create New Page'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="card">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="input"
            required
            placeholder="Enter page title"
          />
        </div>

        {!isEditMode && (
          <div className="mb-6">
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug
            </label>
            <input
              type="text"
              id="slug"
              value={pageSlug}
              onChange={(e) => setPageSlug(e.target.value)}
              className="input"
              required
              placeholder="url-friendly-slug"
              pattern="[a-z0-9-]+"
              title="Only lowercase letters, numbers, and hyphens"
            />
            <p className="text-sm text-gray-500 mt-1">
              The URL-friendly identifier for this page
            </p>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content (Markdown supported)
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input min-h-[400px] font-mono text-sm"
            required
            placeholder="Write your content here... You can use Markdown formatting."
          />
          <p className="text-sm text-gray-500 mt-1">
            Supports Markdown: **bold**, *italic*, # headings, - lists, etc.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : isEditMode ? 'Update Page' : 'Create Page'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
