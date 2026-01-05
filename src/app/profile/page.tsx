'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Award,
  Calendar,
  MapPin,
  Mail,
  Twitter,
  Github,
  Trophy,
  MessageSquare,
  ThumbsUp,
} from 'lucide-react';

export default function UserProfile() {
  const params = useParams();
  const username = params?.username as string;

  const [activeTab, setActiveTab] = useState<
    'debates' | 'arguments' | 'achievements'
  >('arguments');

  const userStats = {
    reputation: 1847,
    rank: 'Expert',
    tier: 4,
    debatesCreated: 12,
    argumentsPosted: 89,
    avgRating: 4.3,
    badges: 23,
    joined: 'January 2025',
    location: 'San Francisco, CA',
  };

  const recentArguments = [
    {
      id: '1',
      debateTitle:
        'Should AI-generated content require mandatory watermarking?',
      argument: 'Essential for preserving copyright in the digital age',
      rating: 4.7,
      responses: 12,
      likes: 45,
      timestamp: '2h ago',
    },
    {
      id: '2',
      debateTitle: 'Is universal basic income economically viable?',
      argument:
        'UBI trials in Finland showed 60% reduction in stress-related illness',
      rating: 4.9,
      responses: 18,
      likes: 67,
      timestamp: '1d ago',
    },
  ];

  const badges = [
    { name: 'Logic Knight', icon: '🛡️', description: '100 fallacy-free arguments' },
    { name: 'Evidence Master', icon: '📚', description: '50 cited arguments' },
    { name: 'Debate Champion', icon: '🏆', description: 'Highest rated in 5 debates' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* Profile Header */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-3xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-6">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-5xl">
                🎯
              </div>

              <div>
                <h1 className="text-4xl font-bold mb-2">
                  @{username || 'CriticalThinker'}
                </h1>

                <div className="flex items-center space-x-3 text-slate-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span className="text-sm">{userStats.location}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span className="text-sm">
                      Joined {userStats.joined}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-xl">
                  <Award size={20} className="text-yellow-300" />
                  <div>
                    <div className="text-xs">Reputation</div>
                    <div className="text-xl font-bold">
                      {userStats.reputation}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mt-4">
                  <Twitter size={18} />
                  <Github size={18} />
                  <Mail size={18} />
                </div>
              </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-bold">
              Follow
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {['arguments', 'debates', 'achievements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 rounded-xl ${
                activeTab === tab
                  ? 'bg-blue-600'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Arguments */}
        {activeTab === 'arguments' && (
          <div className="space-y-4">
            {recentArguments.map((arg) => (
              <div
                key={arg.id}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6"
              >
                <Link
                  href={`/debate/${arg.id}`}
                  className="text-xs text-slate-500 hover:text-blue-400"
                >
                  {arg.debateTitle}
                </Link>

                <h3 className="text-lg font-bold mt-2">{arg.argument}</h3>

                <div className="flex justify-between text-sm text-slate-400 mt-4">
                  <div className="flex space-x-4">
                    <span className="flex items-center gap-1">
                      <MessageSquare size={16} /> {arg.responses}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={16} /> {arg.likes}
                    </span>
                  </div>
                  <span>{arg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-3 gap-4">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center"
              >
                <div className="text-5xl mb-3">{badge.icon}</div>
                <h3 className="font-bold">{badge.name}</h3>
                <p className="text-xs text-slate-400">{badge.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
