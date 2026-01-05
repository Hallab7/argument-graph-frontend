'use client';

import { Search, Bell, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname(); // ✅ Next.js replacement
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-[rgba(30,41,59,0.7)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.1)]">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center space-x-4">
          <h1
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            ArgumentGraph
          </h1>
          <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded border border-blue-500/30">
            v1.0 Beta
          </span>
        </Link>

        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={`hover:text-white transition ${
              isActive('/') ? 'text-white' : 'text-slate-400'
            }`}
          >
            Explore
          </Link>

          <Link
            href="/leaderboard"
            className={`hover:text-white transition ${
              isActive('/leaderboard') ? 'text-white' : 'text-slate-400'
            }`}
          >
            Leaderboards
          </Link>

          <Link
            href="/guidelines"
            className={`hover:text-white transition ${
              isActive('/guidelines') ? 'text-white' : 'text-slate-400'
            }`}
          >
            Guidelines
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <button className="hidden md:flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-700/50 transition">
          <Search size={16} />
          <span>Search...</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-slate-700/50 rounded-lg transition"
          >
            <Bell size={20} className="text-slate-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-bold text-sm">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 hover:bg-slate-800/50 transition cursor-pointer border-b border-slate-800">
                  <p className="text-sm mb-1">
                    <span className="font-bold text-blue-400">@TechExpert</span> responded to your argument
                  </p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Create Debate */}
        <Link
          href="/create-debate"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          + Create Debate
        </Link>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border-2 border-slate-700 hover:border-blue-500 transition"
          />

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <p className="font-bold">@CriticalThinker</p>
                <p className="text-xs text-slate-400 mt-1">Reputation: 1,847</p>
              </div>

              <Link
                href="/profile/CriticalThinker"
                className="flex items-center space-x-3 p-3 hover:bg-slate-800/50 transition"
              >
                <User size={16} className="text-slate-400" />
                <span className="text-sm">My Profile</span>
              </Link>

              <Link
                href="/settings"
                className="flex items-center space-x-3 p-3 hover:bg-slate-800/50 transition"
              >
                <Settings size={16} className="text-slate-400" />
                <span className="text-sm">Settings</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
