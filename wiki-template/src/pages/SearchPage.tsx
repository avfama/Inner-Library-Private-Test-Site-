import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { api } from '../lib/api';
import type { SearchResult } from '../types';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const data = await api.searchPages(query);
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
        <p className="text-gray-600">
          {loading ? 'Searching...' : `Found ${results.length} results for "${query}"`}
        </p>
      </div>

      {!loading && results.length === 0 && query && (
        <div className="card text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">Try searching with different keywords</p>
        </div>
      )}

      <div className="space-y-6">
        {results.map((result) => (
          <Link
            key={result.id}
            to={`/page/${result.slug}`}
            className="card hover:shadow-md transition-shadow block"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {result.title}
            </h2>
            <p className="text-gray-600 line-clamp-2 mb-3">
              {result.content.substring(0, 200)}...
            </p>
            <div className="text-sm text-gray-500">
              Relevance: {(result.rank * 100).toFixed(0)}%
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
