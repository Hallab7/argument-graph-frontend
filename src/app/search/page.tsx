'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Users, MessageSquare, Calendar, TrendingUp, Eye } from 'lucide-react';
import { SearchResult, SearchFilters } from '@/types';
import { formatRelativeTime, formatNumber } from '@/lib/utils';
import api from '@/lib/api';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'debates' | 'arguments' | 'users'>('all');
  const [filters, setFilters] = useState<SearchFilters>({
    query: initialQuery,
    sort_by: 'relevance',
    sort_order: 'desc'
  });

  useEffect(() => {
    if (initialQuery) {
      performSearch();
    }
  }, [initialQuery]);

  const performSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      // Mock search results - replace with actual API call
      const mockResults: SearchResult = {
        debates: [
          {
            id: '1',
            title: 'Should AI-generated content require mandatory digital watermarks?',
            description: 'Exploring the balance between innovation and transparency in AI content creation.',
            creator: {
              id: '1',
              username: 'TechEthicist',
              email: 'tech@example.com',
              avatar_url: undefined,
              reputation: 2654,
              verified: true,
              followers_count: 987,
              following_count: 432,
              debates_count: 67,
              arguments_count: 389,
              created_at: '2024-01-15'
            },
            status: 'active',
            visibility: 'public',
            type: 'free-form',
            tags: ['Technology', 'AI', 'Ethics'],
            participants: [],
            arguments_count: 42,
            views_count: 1847,
            created_at: '2024-03-10',
            updated_at: '2024-03-15',
            featured: true
          }
        ],
        arguments: [
          {
            id: '1',
            debate_id: '1',
            author: {
              id: '2',
              username: 'PrivacyAdvocate',
              email: 'privacy@example.com',
              avatar_url: undefined,
              reputation: 1892,
              verified: false,
              followers_count: 543,
              following_count: 234,
              debates_count: 34,
              arguments_count: 156,
              created_at: '2024-02-01'
            },
            type: 'claim',
            content: 'Mandatory watermarking would stifle innovation and create unnecessary barriers for legitimate AI applications.',
            position: { x: 100, y: 100 },
            ratings: [],
            average_rating: 4.2,
            replies_count: 8,
            created_at: '2024-03-11',
            updated_at: '2024-03-11',
            edited: false
          }
        ],
        users: [
          {
            id: '1',
            username: 'TechEthicist',
            email: 'tech@example.com',
            avatar_url: undefined,
            reputation: 2654,
            verified: true,
            bio: 'Technology ethics researcher and debate moderator',
            expertise_tags: ['Technology', 'Ethics', 'AI'],
            badges: [],
            followers_count: 987,
            following_count: 432,
            debates_count: 67,
            arguments_count: 389,
            created_at: '2024-01-15'
          }
        ],
        total_count: 3
      };

      setResults(mockResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, query }));
    performSearch();
  };

  const getTabCount = (tab: string) => {
    if (!results) return 0;
    switch (tab) {
      case 'debates': return results.debates.length;
      case 'arguments': return results.arguments.length;
      case 'users': return results.users.length;
      default: return results.total_count;
    }
  };

  const renderDebates = () => (
    <div className="space-y-4">
      {results?.debates.map((debate) => (
        <Link
          key={debate.id}
          href={`/debate/${debate.id}`}
          className="block bg-slate-900/50 backdrop-blur-md border border-slate-700 hover:border-blue-500/50 rounded-xl p-6 transition-all hover:transform hover:scale-[1.01]"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                debate.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'
              }`}>
                {debate.status}
              </span>
              {debate.featured && (
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold uppercase">
                  Featured
                </span>
              )}
              <span className="text-slate-400 text-sm capitalize">{debate.type.replace('-', ' ')}</span>
            </div>
            <div className="text-slate-400 text-sm">{formatRelativeTime(debate.created_at)}</div>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition">
            {debate.title}
          </h3>

          <p className="text-slate-300 mb-4 line-clamp-2">{debate.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
                <span>@{debate.creator.username}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare size={14} />
                <span>{debate.arguments_count} arguments</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye size={14} />
                <span>{formatNumber(debate.views_count)} views</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {debate.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  const renderArguments = () => (
    <div className="space-y-4">
      {results?.arguments.map((argument) => (
        <div
          key={argument.id}
          className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
              {argument.author.username.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="font-semibold text-white">@{argument.author.username}</span>
                {argument.author.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  argument.type === 'claim' ? 'bg-blue-600/20 text-blue-400' :
                  argument.type === 'counter' ? 'bg-red-600/20 text-red-400' :
                  argument.type === 'support' ? 'bg-green-600/20 text-green-400' :
                  'bg-purple-600/20 text-purple-400'
                }`}>
                  {argument.type}
                </span>
                <span className="text-slate-400 text-sm">{formatRelativeTime(argument.created_at)}</span>
              </div>
              
              <p className="text-slate-300 mb-3 leading-relaxed">{argument.content}</p>
              
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <TrendingUp size={14} />
                  <span>{argument.average_rating.toFixed(1)} rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare size={14} />
                  <span>{argument.replies_count} replies</span>
                </div>
                <Link
                  href={`/debate/${argument.debate_id}`}
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  View debate
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderUsers = () => (
    <div className="grid md:grid-cols-2 gap-4">
      {results?.users.map((user) => (
        <Link
          key={user.id}
          href={`/profile/${user.username}`}
          className="block bg-slate-900/50 backdrop-blur-md border border-slate-700 hover:border-blue-500/50 rounded-xl p-6 transition-all hover:transform hover:scale-[1.01]"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.username} className="w-full h-full rounded-full object-cover" />
              ) : (
                user.username.charAt(0).toUpperCase()
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-bold text-white">@{user.username}</h3>
                {user.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
              {user.bio && (
                <p className="text-slate-400 text-sm mb-2 line-clamp-2">{user.bio}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span>{formatNumber(user.reputation)} reputation</span>
                <span>{formatNumber(user.followers_count)} followers</span>
              </div>
            </div>
          </div>

          {user.expertise_tags && user.expertise_tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {user.expertise_tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                placeholder="Search debates, arguments, or users..."
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Search
              </button>
            </div>
          </form>

          {results && (
            <div className="text-center text-slate-400">
              Found {results.total_count} results for "{filters.query}"
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          {/* Tabs */}
          <div className="flex bg-slate-800 rounded-lg p-1">
            {[
              { key: 'all', label: 'All', icon: <Search size={16} /> },
              { key: 'debates', label: 'Debates', icon: <Users size={16} /> },
              { key: 'arguments', label: 'Arguments', icon: <MessageSquare size={16} /> },
              { key: 'users', label: 'Users', icon: <Users size={16} /> }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className="bg-slate-600 text-slate-300 px-2 py-0.5 rounded text-xs">
                  {getTabCount(tab.key)}
                </span>
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-slate-400" />
              <select
                value={filters.sort_by}
                onChange={(e) => setFilters(prev => ({ ...prev, sort_by: e.target.value as any }))}
                className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="relevance">Most Relevant</option>
                <option value="date">Most Recent</option>
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Searching...</p>
          </div>
        ) : results ? (
          <div>
            {activeTab === 'all' && (
              <div className="space-y-8">
                {results.debates.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">Debates</h2>
                    {renderDebates()}
                  </div>
                )}
                {results.arguments.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">Arguments</h2>
                    {renderArguments()}
                  </div>
                )}
                {results.users.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">Users</h2>
                    {renderUsers()}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'debates' && renderDebates()}
            {activeTab === 'arguments' && renderArguments()}
            {activeTab === 'users' && renderUsers()}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="text-slate-600 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-semibold text-slate-400 mb-2">Start Your Search</h3>
            <p className="text-slate-500">Enter a query above to find debates, arguments, and users.</p>
          </div>
        )}

        {/* No Results */}
        {results && results.total_count === 0 && (
          <div className="text-center py-12">
            <Search className="text-slate-600 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-semibold text-slate-400 mb-2">No Results Found</h3>
            <p className="text-slate-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}