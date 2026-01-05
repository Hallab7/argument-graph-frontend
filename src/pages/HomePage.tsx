'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, TrendingUp, Clock, Users, Award, Filter } from 'lucide-react';

interface Debate {
  id: string;
  title: string;
  category: string;
  argumentCount: number;
  participantCount: number;
  avgReputation: number;
  lastActive: string;
  status: 'active' | 'hot' | 'new';
  creator: string;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredDebates: Debate[] = [
    { id: '1', title: 'Should AI-generated content require a mandatory digital watermark?', category: 'Technology', argumentCount: 42, participantCount: 18, avgReputation: 89, lastActive: '2h ago', status: 'hot', creator: 'TechEthicist' },
    { id: '2', title: 'Should cryptocurrencies be classified as securities?', category: 'Economics', argumentCount: 67, participantCount: 24, avgReputation: 92, lastActive: '4h ago', status: 'active', creator: 'FinanceGuru' },
    { id: '3', title: 'Is universal basic income economically viable?', category: 'Policy', argumentCount: 89, participantCount: 31, avgReputation: 85, lastActive: '1h ago', status: 'hot', creator: 'PolicyAnalyst' },
    { id: '4', title: 'Should social media platforms be held liable for user content?', category: 'Law', argumentCount: 54, participantCount: 22, avgReputation: 88, lastActive: '30m ago', status: 'new', creator: 'LegalScholar' },
    { id: '5', title: 'Does remote work improve overall productivity?', category: 'Business', argumentCount: 38, participantCount: 15, avgReputation: 81, lastActive: '5h ago', status: 'active', creator: 'WorkCulturePro' },
    { id: '6', title: 'Should gene editing be allowed for human enhancement?', category: 'Ethics', argumentCount: 73, participantCount: 28, avgReputation: 94, lastActive: '3h ago', status: 'hot', creator: 'BioethicsExpert' }
  ];

  const categories = ['All', 'Technology', 'Economics', 'Policy', 'Law', 'Business', 'Ethics', 'Science', 'Philosophy'];

  const filteredDebates = featuredDebates.filter(debate => {
    const matchesSearch = debate.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || debate.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 pt-32 pb-20">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Debate with Purpose
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Transform online discourse through visual argument mapping, AI-powered analysis, and structured engagement. Build reputation through quality reasoning.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                placeholder="Search debates by topic, keyword, or question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">1,247</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">Active Debates</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">28.4K</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">Arguments</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-pink-400 mb-1">5,892</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">Participants</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">89%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">Quality Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        {/* Category Filters */}
        <div className="flex items-center space-x-3 mb-8 overflow-x-auto pb-2">
          <Filter size={20} className="text-slate-400 flex-shrink-0" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex-shrink-0 ${
                selectedCategory === category.toLowerCase()
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Debate Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDebates.map((debate) => (
            <Link
              key={debate.id}
              href={`/debate/${debate.id}`}
              className="group bg-slate-900/50 backdrop-blur-md border border-slate-700 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:transform hover:scale-[1.02]"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  debate.status === 'hot' ? 'bg-red-500/20 text-red-400' :
                  debate.status === 'new' ? 'bg-green-500/20 text-green-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {debate.status}
                </span>
                <span className="text-xs text-slate-500">{debate.category}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-4 group-hover:text-blue-400 transition line-clamp-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {debate.title}
              </h3>

              {/* Creator */}
              <div className="flex items-center space-x-2 mb-4 text-sm text-slate-400">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"></div>
                <span>@{debate.creator}</span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800">
                <div className="flex items-center space-x-1">
                  <Users size={14} />
                  <span>{debate.argumentCount} arguments</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{debate.lastActive}</span>
                </div>
              </div>

              {/* Reputation */}
              <div className="mt-3 flex items-center space-x-2">
                <Award size={14} className="text-green-400" />
                <span className="text-xs text-green-400 font-medium">{debate.avgReputation} Avg Reputation</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredDebates.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">No debates found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Start Your Own Debate
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Create a new debate, invite participants, and watch as AI helps maintain quality discourse
          </p>
          <Link
            href="/create-debate"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition"
          >
            Create Debate
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            How ArgumentGraph Works
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A structured approach to online debate that rewards quality reasoning
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              🎯
            </div>
            <h3 className="font-bold text-lg mb-2">Visual Argument Mapping</h3>
            <p className="text-sm text-slate-400">
              See debates as interactive graphs showing how arguments connect and build on each other
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              🤖
            </div>
            <h3 className="font-bold text-lg mb-2">AI-Powered Analysis</h3>
            <p className="text-sm text-slate-400">
              Real-time fallacy detection, fact-checking, and quality scoring to maintain discourse standards
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              ⭐
            </div>
            <h3 className="font-bold text-lg mb-2">Reputation System</h3>
            <p className="text-sm text-slate-400">
              Build credibility through quality contributions and earn badges for constructive participation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
