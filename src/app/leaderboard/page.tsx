'use client';

import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users, MessageSquare, Star, Crown } from 'lucide-react';
import { User } from '@/types';
import { formatNumber } from '@/lib/utils';
import api from '@/lib/api';

interface LeaderboardUser extends User {
  rank: number;
  weekly_change: number;
  monthly_change: number;
}

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');
  const [category, setCategory] = useState<'reputation' | 'debates' | 'arguments'>('reputation');
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [timeframe, category]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      // Mock data for now - replace with actual API call
      const mockUsers: LeaderboardUser[] = [
        {
          id: '1',
          username: 'CriticalThinker',
          email: 'critical@example.com',
          avatar_url: undefined,
          reputation: 2847,
          verified: true,
          bio: 'Philosophy professor specializing in logic and reasoning',
          expertise_tags: ['Philosophy', 'Logic', 'Ethics'],
          badges: [],
          followers_count: 1234,
          following_count: 567,
          debates_count: 89,
          arguments_count: 456,
          created_at: '2024-01-01',
          rank: 1,
          weekly_change: 12,
          monthly_change: 45
        },
        {
          id: '2',
          username: 'TechEthicist',
          email: 'tech@example.com',
          avatar_url: undefined,
          reputation: 2654,
          verified: true,
          bio: 'Technology ethics researcher',
          expertise_tags: ['Technology', 'Ethics', 'AI'],
          badges: [],
          followers_count: 987,
          following_count: 432,
          debates_count: 67,
          arguments_count: 389,
          created_at: '2024-01-15',
          rank: 2,
          weekly_change: -3,
          monthly_change: 23
        },
        {
          id: '3',
          username: 'PolicyAnalyst',
          email: 'policy@example.com',
          avatar_url: undefined,
          reputation: 2456,
          verified: false,
          bio: 'Public policy researcher and analyst',
          expertise_tags: ['Policy', 'Economics', 'Government'],
          badges: [],
          followers_count: 756,
          following_count: 234,
          debates_count: 45,
          arguments_count: 298,
          created_at: '2024-02-01',
          rank: 3,
          weekly_change: 8,
          monthly_change: 67
        }
      ];

      // Add more mock users
      for (let i = 4; i <= 20; i++) {
        mockUsers.push({
          id: i.toString(),
          username: `User${i}`,
          email: `user${i}@example.com`,
          avatar_url: undefined,
          reputation: Math.floor(Math.random() * 2000) + 500,
          verified: Math.random() > 0.7,
          bio: `Active community member #${i}`,
          expertise_tags: ['General'],
          badges: [],
          followers_count: Math.floor(Math.random() * 500),
          following_count: Math.floor(Math.random() * 300),
          debates_count: Math.floor(Math.random() * 50),
          arguments_count: Math.floor(Math.random() * 200),
          created_at: '2024-01-01',
          rank: i,
          weekly_change: Math.floor(Math.random() * 20) - 10,
          monthly_change: Math.floor(Math.random() * 50) - 25
        });
      }

      setUsers(mockUsers);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="text-yellow-400" size={24} />;
    if (rank === 2) return <Medal className="text-gray-400" size={24} />;
    if (rank === 3) return <Award className="text-amber-600" size={24} />;
    return <span className="text-slate-400 font-bold text-lg">#{rank}</span>;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-slate-400';
  };

  const getStatValue = (user: LeaderboardUser) => {
    switch (category) {
      case 'reputation': return user.reputation;
      case 'debates': return user.debates_count;
      case 'arguments': return user.arguments_count;
      default: return user.reputation;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="text-yellow-400" size={32} />
            <h1 className="text-4xl font-bold text-white">Leaderboards</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Recognize the most valuable contributors to our community
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          {/* Timeframe */}
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">Timeframe:</span>
            <div className="flex bg-slate-800 rounded-lg p-1">
              {[
                { key: 'weekly', label: 'Weekly' },
                { key: 'monthly', label: 'Monthly' },
                { key: 'all-time', label: 'All Time' }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setTimeframe(option.key as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    timeframe === option.key
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">Category:</span>
            <div className="flex bg-slate-800 rounded-lg p-1">
              {[
                { key: 'reputation', label: 'Reputation', icon: <Star size={16} /> },
                { key: 'debates', label: 'Debates', icon: <Users size={16} /> },
                { key: 'arguments', label: 'Arguments', icon: <MessageSquare size={16} /> }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setCategory(option.key as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                    category === option.key
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {users.slice(0, 3).map((user, index) => (
            <div
              key={user.id}
              className={`relative bg-gradient-to-br rounded-2xl p-6 text-center ${
                index === 0
                  ? 'from-yellow-600/20 to-yellow-800/20 border border-yellow-600/30'
                  : index === 1
                  ? 'from-gray-600/20 to-gray-800/20 border border-gray-600/30'
                  : 'from-amber-600/20 to-amber-800/20 border border-amber-600/30'
              }`}
            >
              {/* Rank Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-yellow-600' : index === 1 ? 'bg-gray-600' : 'bg-amber-600'
                }`}>
                  {getRankIcon(user.rank)}
                </div>
              </div>

              {/* Avatar */}
              <div className="mt-6 mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white">@{user.username}</h3>
                {user.verified && (
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-blue-400 text-sm">Verified</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">
                  {formatNumber(getStatValue(user))}
                </div>
                <div className="text-slate-400 text-sm capitalize">
                  {category === 'reputation' ? 'Reputation' : category}
                </div>
                <div className={`text-sm flex items-center justify-center space-x-1 ${
                  getChangeColor(timeframe === 'weekly' ? user.weekly_change : user.monthly_change)
                }`}>
                  <TrendingUp size={14} />
                  <span>
                    {timeframe === 'weekly' ? user.weekly_change : user.monthly_change > 0 ? '+' : ''}
                    {timeframe === 'weekly' ? user.weekly_change : user.monthly_change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white">Full Rankings</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400">Loading leaderboard...</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-6 hover:bg-slate-800/30 transition"
                >
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="w-12 flex justify-center">
                      {getRankIcon(user.rank)}
                    </div>

                    {/* Avatar & Info */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-white">@{user.username}</h3>
                        {user.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">{user.bio}</p>
                      {user.expertise_tags && user.expertise_tags.length > 0 && (
                        <div className="flex space-x-1 mt-1">
                          {user.expertise_tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {formatNumber(getStatValue(user))}
                      </div>
                      <div className="text-sm text-slate-400 capitalize">
                        {category === 'reputation' ? 'Reputation' : category}
                      </div>
                    </div>

                    <div className={`text-right ${
                      getChangeColor(timeframe === 'weekly' ? user.weekly_change : user.monthly_change)
                    }`}>
                      <div className="flex items-center space-x-1">
                        <TrendingUp size={16} />
                        <span className="font-medium">
                          {timeframe === 'weekly' ? user.weekly_change : user.monthly_change > 0 ? '+' : ''}
                          {timeframe === 'weekly' ? user.weekly_change : user.monthly_change}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {timeframe === 'weekly' ? 'this week' : 'this month'}
                      </div>
                    </div>

                    <div className="text-right text-slate-400">
                      <div className="text-sm">{formatNumber(user.followers_count)} followers</div>
                      <div className="text-xs">{user.debates_count} debates</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Achievement Badges Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Achievement Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Debate Master', description: '100+ debates created', icon: '🏆', color: 'from-yellow-600 to-yellow-800' },
              { name: 'Logic Expert', description: 'High-quality arguments', icon: '🧠', color: 'from-purple-600 to-purple-800' },
              { name: 'Fact Checker', description: 'Accurate citations', icon: '✅', color: 'from-green-600 to-green-800' },
              { name: 'Community Leader', description: '1000+ followers', icon: '👑', color: 'from-blue-600 to-blue-800' }
            ].map((badge) => (
              <div
                key={badge.name}
                className={`bg-gradient-to-br ${badge.color} rounded-lg p-4 text-center`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h3 className="font-bold text-white text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-white/80">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}