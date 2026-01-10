'use client';

import { Search, Bell, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 bg-[rgba(30,41,59,0.7)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.1)]">
      <div className="flex items-center space-x-4 lg:space-x-8">
        <Link href="/" className="flex items-center space-x-2 sm:space-x-4">
          <h1
            className="text-lg sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="hidden sm:inline">ArgumentGraph</span>
            <span className="sm:hidden">AG</span>
          </h1>
          <span className="hidden sm:inline bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded border border-blue-500/30">
            v1.0 Beta
          </span>
        </Link>

        <nav className="hidden lg:flex space-x-6 text-sm font-medium">
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

      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Search */}
        <button className="hidden lg:flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-700/50 transition">
          <Search size={16} />
          <span>Search...</span>
        </button>

        {/* Mobile Search */}
        <button className="lg:hidden p-2 hover:bg-slate-700/50 rounded-lg transition">
          <Search size={20} className="text-slate-400" />
        </button>

        {user ? (
          <>
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
                <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
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
              className="hidden sm:flex bg-blue-600 hover:bg-blue-700 px-3 lg:px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              <span className="hidden lg:inline">+ Create Debate</span>
              <span className="lg:hidden">+ Create</span>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border-2 border-slate-700 hover:border-blue-500 transition flex items-center justify-center text-white font-semibold text-sm sm:text-base"
              >
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.username} className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.username.charAt(0).toUpperCase()
                )}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 max-w-[90vw] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-slate-800">
                    <p className="font-bold truncate">@{user.username}</p>
                    <p className="text-xs text-slate-400 mt-1">Reputation: {user.reputation}</p>
                  </div>

                  <Link
                    href={`/profile/${user.username}`}
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

                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-slate-800/50 transition text-left"
                  >
                    <LogOut size={16} className="text-slate-400" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Auth Buttons */}
            <Link
              href="/auth/login"
              className="text-slate-300 hover:text-white transition text-sm font-medium"
            >
              <span className="hidden sm:inline">Sign In</span>
              <span className="sm:hidden">Login</span>
            </Link>
            <Link
              href="/auth/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              <span className="hidden sm:inline">Sign Up</span>
              <span className="sm:hidden">Join</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
