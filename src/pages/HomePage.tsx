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

  // Stats data
  const statsData = [
    {
      id: 'debates',
      value: '1,247',
      label: 'Active Debates',
      color: 'text-blue-400',
      icon: '🗣️'
    },
    {
      id: 'arguments',
      value: '28.4K',
      label: 'Arguments',
      color: 'text-purple-400',
      icon: '💭'
    },
    {
      id: 'participants',
      value: '5,892',
      label: 'Participants',
      color: 'text-pink-400',
      icon: '👥'
    },
    {
      id: 'quality',
      value: '89%',
      label: 'Quality Score',
      color: 'text-green-400',
      icon: '⭐'
    }
  ];

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 sm:pb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Debate with Purpose
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Transform online discourse through visual argument mapping, AI-powered analysis, and structured engagement. Build reputation through quality reasoning.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative px-4">
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                placeholder="Search debates by topic, keyword, or question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl pl-12 pr-4 py-3 sm:py-4 text-sm focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="w-full max-w-5xl mx-auto mb-8 sm:mb-12 px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 2fr)' }}>
              {statsData.map((stat) => (
                <div 
                  key={stat.id}
                  className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-center hover:bg-slate-800/50 transition-colors duration-200"
                  style={{ minWidth: '0' }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-lg sm:text-xl mr-2">{stat.icon}</span>
                  </div>
                  <div className={`text-lg sm:text-2xl lg:text-3xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wide leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        {/* Category Filters */}
        <div className="flex items-center space-x-3 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <Filter size={20} className="text-slate-400 flex-shrink-0" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition flex-shrink-0 ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
              <h3 className="text-lg font-bold mb-3 sm:mb-4 group-hover:text-blue-400 transition line-clamp-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {debate.title}
              </h3>

              {/* Creator */}
              <div className="flex items-center space-x-2 mb-3 sm:mb-4 text-sm text-slate-400">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"></div>
                <span>@{debate.creator}</span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 sm:pt-4 border-t border-slate-800">
                <div className="flex items-center space-x-1">
                  <Users size={12} />
                  <span className="hidden sm:inline">{debate.argumentCount} arguments</span>
                  <span className="sm:hidden">{debate.argumentCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={12} />
                  <span>{debate.lastActive}</span>
                </div>
              </div>

              {/* Reputation */}
              <div className="mt-2 sm:mt-3 flex items-center space-x-2">
                <Award size={12} className="text-green-400" />
                <span className="text-xs text-green-400 font-medium">{debate.avgReputation} Avg</span>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Start Your Own Debate
          </h2>
          <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Create a new debate, invite participants, and watch as AI helps maintain quality discourse
          </p>
          <Link
            href="/create-debate"
            className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-blue-50 transition"
          >
            Create Debate
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            How ArgumentGraph Works
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto px-4">
            A structured approach to online debate that rewards quality reasoning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center px-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 text-xl sm:text-2xl">
              🎯
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-2">Visual Argument Mapping</h3>
            <p className="text-sm text-slate-400">
              See debates as interactive graphs showing how arguments connect and build on each other
            </p>
          </div>
          <div className="text-center px-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 text-xl sm:text-2xl">
              🤖
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-2">AI-Powered Analysis</h3>
            <p className="text-sm text-slate-400">
              Real-time fallacy detection, fact-checking, and quality scoring to maintain discourse standards
            </p>
          </div>
          <div className="text-center px-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 text-xl sm:text-2xl">
              ⭐
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-2">Reputation System</h3>
            <p className="text-sm text-slate-400">
              Build credibility through quality contributions and earn badges for constructive participation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
