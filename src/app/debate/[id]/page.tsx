'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Users, 
  MessageSquare, 
  Eye, 
  Clock, 
  Share2, 
  Flag, 
  Plus,
  Filter,
  Maximize2,
  Settings,
  Star,
  TrendingUp
} from 'lucide-react';
import { Debate, Argument } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import api from '@/lib/api';

export default function DebateDetailPage() {
  const params = useParams();
  const debateId = params?.id as string;
  const { user } = useAuth();
  const [debate, setDebate] = useState<Debate | null>(null);
  const [debateArguments, setDebateArguments] = useState<Argument[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddArgument, setShowAddArgument] = useState(false);
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');
  const [filterBy, setFilterBy] = useState<'all' | 'recent' | 'top-rated'>('all');

  useEffect(() => {
    fetchDebateData();
  }, [debateId]);

  const fetchDebateData = async () => {
    setLoading(true);
    try {
      // Mock data for now - replace with actual API calls
      const mockDebate: Debate = {
        id: debateId,
        title: 'Should AI-generated content require a mandatory digital watermark?',
        description: 'As AI-generated content becomes increasingly sophisticated and widespread, there\'s growing concern about the ability to distinguish between human and AI-created material. This debate explores whether mandatory digital watermarking of AI content is necessary for transparency, accountability, and preventing misuse.',
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
        tags: ['Technology', 'AI', 'Ethics', 'Policy'],
        participants: [],
        arguments_count: 42,
        views_count: 1847,
        created_at: '2024-03-10',
        updated_at: '2024-03-15',
        featured: true,
        rules: {
          moderation_level: 'light',
          allow_anonymous: false,
          require_citations: true
        }
      };

      const mockArguments: Argument[] = [
        {
          id: '1',
          debate_id: debateId,
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
          content: 'Mandatory watermarking would stifle innovation and create unnecessary barriers for legitimate AI applications. The technology industry thrives on openness and accessibility, and adding bureaucratic requirements would slow down beneficial developments in education, healthcare, and creative industries.',
          position: { x: 100, y: 100 },
          ratings: [],
          average_rating: 4.2,
          replies_count: 8,
          created_at: '2024-03-11',
          updated_at: '2024-03-11',
          edited: false
        },
        {
          id: '2',
          debate_id: debateId,
          author: {
            id: '3',
            username: 'MediaLiteracy',
            email: 'media@example.com',
            avatar_url: undefined,
            reputation: 2156,
            verified: true,
            followers_count: 789,
            following_count: 345,
            debates_count: 45,
            arguments_count: 234,
            created_at: '2024-01-20'
          },
          type: 'counter',
          parent_id: '1',
          content: 'While innovation is important, transparency is crucial for maintaining public trust. Watermarking doesn\'t prevent AI development - it simply ensures users can make informed decisions about the content they consume. This is especially critical in journalism, education, and legal contexts where source authenticity matters.',
          position: { x: 300, y: 150 },
          ratings: [],
          average_rating: 4.6,
          replies_count: 5,
          created_at: '2024-03-12',
          updated_at: '2024-03-12',
          edited: false,
          citations: [
            {
              id: '1',
              url: 'https://example.com/ai-transparency-study',
              title: 'The Importance of AI Transparency in Digital Media',
              source_type: 'academic'
            }
          ]
        }
      ];

      setDebate(mockDebate);
      setDebateArguments(mockArguments);
    } catch (error) {
      console.error('Failed to fetch debate data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading debate...</p>
        </div>
      </div>
    );
  }

  if (!debate) {
    return (
      <div className="min-h-screen bg-[#0f172a] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Debate Not Found</h1>
          <p className="text-slate-400">The debate you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20">
      {/* Debate Header */}
      <div className="border-b border-slate-700 bg-slate-900/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col space-y-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
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
              
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3">{debate.title}</h1>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
                  <span>@{debate.creator.username}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{formatRelativeTime(debate.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare size={14} />
                  <span className="hidden sm:inline">{debate.arguments_count} arguments</span>
                  <span className="sm:hidden">{debate.arguments_count}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye size={14} />
                  <span className="hidden sm:inline">{debate.views_count} views</span>
                  <span className="sm:hidden">{debate.views_count}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-3 sm:px-4 py-2 rounded-lg transition text-sm">
                <Share2 size={16} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-3 sm:px-4 py-2 rounded-lg transition text-sm">
                <Flag size={16} />
                <span className="hidden sm:inline">Report</span>
              </button>
              {user && (
                <button
                  onClick={() => setShowAddArgument(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition text-sm"
                >
                  <Plus size={16} />
                  <span>Add Argument</span>
                </button>
              )}
            </div>

            {/* Tags */}
            {debate.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {debate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-600/20 text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6 order-2 lg:order-1">
            {/* Description */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-4 sm:p-6">
              <h3 className="font-semibold text-white mb-3">About This Debate</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{debate.description}</p>
            </div>

            {/* Rules */}
            {debate.rules && (
              <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-4 sm:p-6">
                <h3 className="font-semibold text-white mb-3">Debate Rules</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Moderation:</span>
                    <span className="text-white capitalize">{debate.rules.moderation_level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Citations:</span>
                    <span className="text-white">{debate.rules.require_citations ? 'Required' : 'Optional'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Anonymous:</span>
                    <span className="text-white">{debate.rules.allow_anonymous ? 'Allowed' : 'Not allowed'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-4 sm:p-6">
              <h3 className="font-semibold text-white mb-3">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Total Arguments</span>
                  <span className="text-white font-semibold">{debate.arguments_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Participants</span>
                  <span className="text-white font-semibold">{debate.participants.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Views</span>
                  <span className="text-white font-semibold">{debate.views_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Created</span>
                  <span className="text-white font-semibold">{formatDate(debate.created_at)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* View Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex bg-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('graph')}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition ${
                      viewMode === 'graph'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Maximize2 size={16} />
                    <span className="hidden sm:inline">Graph View</span>
                    <span className="sm:hidden">Graph</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <MessageSquare size={16} />
                    <span className="hidden sm:inline">List View</span>
                    <span className="sm:hidden">List</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <Filter size={16} className="text-slate-400" />
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value as any)}
                    className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="all">All Arguments</option>
                    <option value="recent">Most Recent</option>
                    <option value="top-rated">Top Rated</option>
                  </select>
                </div>
              </div>

              <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-3 sm:px-4 py-2 rounded-lg transition text-sm">
                <Settings size={16} />
                <span className="hidden sm:inline">View Options</span>
                <span className="sm:hidden">Options</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden">
              {viewMode === 'graph' ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Maximize2 className="text-slate-600 mx-auto mb-4" size={48} />
                    <h3 className="text-lg font-semibold text-slate-400 mb-2">Graph View Coming Soon</h3>
                    <p className="text-slate-500">Interactive argument graph visualization will be displayed here.</p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-slate-700">
                  {debateArguments.map((argument) => (
                    <div key={argument.id} className="p-6 hover:bg-slate-800/30 transition">
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
                          
                          {argument.citations && argument.citations.length > 0 && (
                            <div className="mb-3">
                              <h4 className="text-sm font-medium text-slate-400 mb-2">Sources:</h4>
                              {argument.citations.map((citation) => (
                                <a
                                  key={citation.id}
                                  href={citation.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block text-sm text-blue-400 hover:text-blue-300 mb-1"
                                >
                                  {citation.title}
                                </a>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-4 text-sm text-slate-400">
                            <div className="flex items-center space-x-1">
                              <Star size={14} />
                              <span>{argument.average_rating.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare size={14} />
                              <span>{argument.replies_count} replies</span>
                            </div>
                            <button className="hover:text-white transition">Reply</button>
                            <button className="hover:text-white transition">Rate</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}