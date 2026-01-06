// import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900/50 backdrop-blur-md border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              ArgumentGraph
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Transforming online discourse through visual argument mapping and AI-powered analysis.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href='/' className="hover:text-white transition">Explore Debates</Link></li>
              <li><Link href="/create-debate" className="hover:text-white transition">Create Debate</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition">Leaderboards</Link></li>
              <li><Link href="#" className="hover:text-white transition">API Documentation</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-3 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/guidelines" className="hover:text-white transition">Community Guidelines</Link></li>
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Research</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
          <p>© 2026 ArgumentGraph. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart size={14} className="text-red-400 fill-red-400" />
            <span>for quality discourse</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
