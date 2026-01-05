'use client';

import { useState } from 'react';
import { Trophy, Award, TrendingUp, Users, Star } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'reputation' | 'debates' | 'quality'>('reputation');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('alltime');

  const topUsers = [
    { rank: 1, username: 'LogicMaster', reputation: 3847, debatesWon: 23, avgRating: 4.9, trend: '+12%' },
    { rank: 2, username: 'CriticalThinker', reputation: 2941, debatesWon: 18, avgRating: 4.7, trend: '+8%' },
    { rank: 3, username: 'DebateChampion', reputation: 2654, debatesWon: 15, avgRating: 4.8, trend: '+15%' },
    { rank: 4, username: 'PolicyExpert', reputation: 2387, debatesWon: 21, avgRating: 4.6, trend: '+5%' },
    { rank: 5, username: 'TechEthicist', reputation: 2156, debatesWon: 14, avgRating: 4.7, trend: '+10%' },
    { rank: 6, username: 'PhilosopherKing', reputation: 1923, debatesWon: 12, avgRating: 4.5, trend: '+7%' },
    { rank: 7, username: 'ScienceAdvocate', reputation: 1847, debatesWon: 16, avgRating: 4.6, trend: '+9%' },
    { rank: 8, username: 'LegalScholar', reputation: 1765, debatesWon: 11, avgRating: 4.4, trend: '+6%' },
    { rank: 9, username: 'EconomicsGuru', reputation: 1642, debatesWon: 13, avgRating: 4.5, trend: '+11%' },
    { rank: 10, username: 'DataAnalyst', reputation: 1534, debatesWon: 10, avgRating: 4.3, trend: '+4%' }
  ];

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-slate-300 to-slate-400';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-slate-600 to-slate-700';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank.toString();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-24" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-6xl mx-auto px-8 pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy size={48} className="text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Leaderboards
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Top debaters recognized for quality reasoning, logical consistency, and constructive discourse
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          {/* Category Tabs */}
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('reputation')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                activeTab === 'reputation'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Award size={16} className="inline mr-2" />
              Top Reputation
            </button>
            <button
              onClick={() => setActiveTab('debates')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                activeTab === 'debates'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Users size={16} className="inline mr-2" />
              Most Active
            </button>
            <button
              onClick={() => setActiveTab('quality')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                activeTab === 'quality'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Star size={16} className="inline mr-2" />
              Highest Quality
            </button>
          </div>

          {/* Timeframe */}
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                timeframe === 'weekly'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                timeframe === 'monthly'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeframe('alltime')}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                timeframe === 'alltime'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {topUsers.slice(0, 3).map((user, index) => (
            <Link
              key={user.username}
              href={`/profile/${user.username}`}
              className={`group bg-gradient-to-br ${getRankColor(user.rank)} p-[2px] rounded-2xl ${
                index === 0 ? 'md:order-2 scale-105' : index === 1 ? 'md:order-1' : 'md:order-3'
              }`}
            >
              <div className="bg-slate-900 rounded-2xl p-8 text-center h-full group-hover:bg-slate-800/80 transition">
                <div className="text-6xl mb-3">{getRankIcon(user.rank)}</div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {user.username}
                </h3>
                <div className="text-3xl font-bold text-yellow-400 mb-4">
                  {user.reputation.toLocaleString()}
                </div>
                <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
                  <div>
                    <div className="font-bold text-white">{user.debatesWon}</div>
                    <div className="text-xs">Debates</div>
                  </div>
                  <div className="w-px h-8 bg-slate-700"></div>
                  <div>
                    <div className="font-bold text-white">{user.avgRating}⭐</div>
                    <div className="text-xs">Avg Rating</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center space-x-1 text-green-400 text-sm">
                  <TrendingUp size={16} />
                  <span>{user.trend}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Rankings Table */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/50">
                  <th className="text-left p-4 text-xs font-bold text-slate-400 uppercase">Rank</th>
                  <th className="text-left p-4 text-xs font-bold text-slate-400 uppercase">User</th>
                  <th className="text-left p-4 text-xs font-bold text-slate-400 uppercase">Reputation</th>
                  <th className="text-left p-4 text-xs font-bold text-slate-400 uppercase">Debates</th>
                  <th className="text-left p-4 text-xs font-bold text-slate-400 uppercase">Avg Rating</th>
                  <th className="text-left p-4 text-xs font-bold text-slate-400 uppercase">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.slice(3).map((user) => (
                  <tr key={user.username} className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                    <td className="p-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 font-bold text-sm">
                        {user.rank}
                      </div>
                    </td>
                    <td className="p-4">
                      <Link href={`/profile/${user.username}`} className="font-bold hover:text-blue-400 transition">
                        @{user.username}
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-yellow-400">{user.reputation.toLocaleString()}</span>
                    </td>
                    <td className="p-4 text-slate-300">{user.debatesWon}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <span className="font-bold">{user.avgRating}</span>
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center space-x-1 text-green-400">
                        <TrendingUp size={14} />
                        <span>{user.trend}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Ranking */}
        <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">Your Current Rank</p>
              <p className="text-3xl font-bold">#247</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400 mb-1">Points to Next Tier</p>
              <p className="text-2xl font-bold text-blue-400">153</p>
            </div>
          </div>
          <div className="mt-4 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
