'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  User, 
  MapPin, 
  Calendar, 
  Award, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Settings,
  UserPlus,
  UserMinus,
  Star,
  Trophy,
  Target
} from 'lucide-react';
import { User as UserType } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate, formatNumber } from '@/lib/utils';
import api from '@/lib/api';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'debates' | 'arguments' | 'activity'>('overview');

  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    fetchUserProfile();
  }, [username]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      // Mock data for now - replace with actual API call
      const mockUser: UserType = {
        id: '1',
        username: username,
        email: 'user@example.com',
        avatar_url: undefined,
        reputation: 2847,
        verified: true,
        bio: 'Philosophy professor specializing in logic and reasoning. Passionate about critical thinking and constructive discourse.',
        expertise_tags: ['Philosophy', 'Logic', 'Ethics', 'Critical Thinking'],
        badges: [
          {
            id: '1',
            name: 'Debate Master',
            description: 'Created 100+ high-quality debates',
            icon: '🏆',
            color: 'gold',
            tier: 'gold',
            earned_at: '2024-01-15'
          },
          {
            id: '2',
            name: 'Logic Expert',
            description: 'Consistently high-rated arguments',
            icon: '🧠',
            color: 'purple',
            tier: 'platinum',
            earned_at: '2024-02-01'
          }
        ],
        followers_count: 1234,
        following_count: 567,
        debates_count: 89,
        arguments_count: 456,
        created_at: '2024-01-01',
        last_login: '2024-03-15'
      };

      setUser(mockUser);
      // Check if following (mock)
      setIsFollowing(Math.random() > 0.5);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!user) return;
    
    try {
      if (isFollowing) {
        await api.unfollowUser(user.id);
        setIsFollowing(false);
        setUser(prev => prev ? { ...prev, followers_count: prev.followers_count - 1 } : null);
      } else {
        await api.followUser(user.id);
        setIsFollowing(true);
        setUser(prev => prev ? { ...prev, followers_count: prev.followers_count + 1 } : null);
      }
    } catch (error) {
      console.error('Failed to follow/unfollow user:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">User Not Found</h1>
          <p className="text-slate-400">The user @{username} does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.username} className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.username.charAt(0).toUpperCase()
                )}
              </div>
              {user.verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-slate-900">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">@{user.username}</h1>
                  {user.bio && (
                    <p className="text-slate-300 mb-4 max-w-2xl">{user.bio}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  {isOwnProfile ? (
                    <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition">
                      <Settings size={16} />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleFollow}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                        isFollowing
                          ? 'bg-slate-700 hover:bg-slate-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isFollowing ? <UserMinus size={16} /> : <UserPlus size={16} />}
                      <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formatNumber(user.reputation)}</div>
                  <div className="text-sm text-slate-400">Reputation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formatNumber(user.followers_count)}</div>
                  <div className="text-sm text-slate-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formatNumber(user.debates_count)}</div>
                  <div className="text-sm text-slate-400">Debates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formatNumber(user.arguments_count)}</div>
                  <div className="text-sm text-slate-400">Arguments</div>
                </div>
              </div>

              {/* Expertise Tags */}
              {user.expertise_tags && user.expertise_tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {user.expertise_tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Join Date */}
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>Joined {formatDate(user.created_at)}</span>
                </div>
                {user.last_login && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Last active {formatDate(user.last_login)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        {user.badges && user.badges.length > 0 && (
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Trophy className="text-yellow-400" size={20} />
              <span>Achievement Badges</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`bg-gradient-to-r rounded-lg p-4 ${
                    badge.tier === 'platinum'
                      ? 'from-slate-600 to-slate-800'
                      : badge.tier === 'gold'
                      ? 'from-yellow-600 to-yellow-800'
                      : badge.tier === 'silver'
                      ? 'from-gray-600 to-gray-800'
                      : 'from-amber-600 to-amber-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <h3 className="font-bold text-white">{badge.name}</h3>
                      <p className="text-sm text-white/80">{badge.description}</p>
                      <p className="text-xs text-white/60 mt-1">
                        Earned {formatDate(badge.earned_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-700">
            {[
              { key: 'overview', label: 'Overview', icon: <User size={16} /> },
              { key: 'debates', label: 'Debates', icon: <Users size={16} /> },
              { key: 'arguments', label: 'Arguments', icon: <MessageSquare size={16} /> },
              { key: 'activity', label: 'Activity', icon: <TrendingUp size={16} /> }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition ${
                  activeTab === tab.key
                    ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
                      <Star className="text-yellow-400" size={16} />
                      <span>Recent Achievements</span>
                    </h3>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p>• Reached 2,500+ reputation points</p>
                      <p>• Created 5 featured debates this month</p>
                      <p>• Received 50+ positive argument ratings</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
                      <Target className="text-green-400" size={16} />
                      <span>Specializations</span>
                    </h3>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p>• Philosophy & Ethics debates</p>
                      <p>• Logical reasoning analysis</p>
                      <p>• Critical thinking methodology</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'debates' && (
              <div className="text-center py-12">
                <MessageSquare className="text-slate-600 mx-auto mb-4" size={48} />
                <h3 className="text-lg font-semibold text-slate-400 mb-2">Debates Coming Soon</h3>
                <p className="text-slate-500">User's debate history will be displayed here.</p>
              </div>
            )}

            {activeTab === 'arguments' && (
              <div className="text-center py-12">
                <MessageSquare className="text-slate-600 mx-auto mb-4" size={48} />
                <h3 className="text-lg font-semibold text-slate-400 mb-2">Arguments Coming Soon</h3>
                <p className="text-slate-500">User's argument history will be displayed here.</p>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="text-center py-12">
                <TrendingUp className="text-slate-600 mx-auto mb-4" size={48} />
                <h3 className="text-lg font-semibold text-slate-400 mb-2">Activity Feed Coming Soon</h3>
                <p className="text-slate-500">User's recent activity will be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}