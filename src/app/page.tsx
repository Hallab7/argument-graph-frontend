'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
// import DebateView from './debate/page';
// import CreateDebatePage from './create-debate/page';
// import UserProfile from './profile/page';
// import LeaderboardPage from './leaderboard/page';
// import GuidelinesPage from './guidelines/page';
// import { usePathname } from 'next/navigation';

export default function Home() {

  // const renderPage = () => {
  //   if (pathname === '/') return <HomePage />;
  //   if (pathname.startsWith('/debate/')) return <DebateView />;
  //   if (pathname === '/create-debate') return <CreateDebatePage />;
  //   if (pathname.startsWith('/profile/')) return <UserProfile />;
  //   if (pathname === '/leaderboard') return <LeaderboardPage />;
  //   if (pathname === '/guidelines') return <GuidelinesPage />;

  //   return <DebateView />; // fallback
  // };

  return (
    <div
      className="min-h-screen bg-[#0f172a] flex flex-col"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <Header />

      <main className="flex-1">
        <HomePage />
      </main>

      <Footer />
    </div>
  );
}
