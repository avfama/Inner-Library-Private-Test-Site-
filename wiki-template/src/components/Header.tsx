import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, User, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.getCurrentUser().then(setUser);
  }, []);

  const handleSignOut = async () => {
    await api.signOut();
    setUser(null);
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span>Wiki</span>
            </Link>

            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
                />
              </div>
            </form>
          </div>

          <nav className="flex items-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            
            {user ? (
              <>
                <Link to="/new" className="btn-primary">
                  New Page
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
