'use client';

import HomePage from '../pages/HomePage';

export default function Home() {
  return (
    <div
      className="min-h-screen bg-[#0f172a] flex flex-col"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <main className="flex-1">
        <HomePage />
      </main>
    </div>
  );
}
