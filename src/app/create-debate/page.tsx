'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, CircleAlert } from 'lucide-react';

export default function CreateDebatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    resolution: '',
    description: '',
    category: 'technology',
    visibility: 'public',
    duration: 'ongoing'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const categories = [
    'Technology',
    'Economics',
    'Policy',
    'Law',
    'Business',
    'Ethics',
    'Science',
    'Philosophy',
    'Healthcare',
    'Education'
  ];

  const handleTitleChange = (value: string) => {
    setFormData({ ...formData, title: value });
    
    if (value.length > 10) {
      setTimeout(() => {
        setAiSuggestions([
          'Consider rephrasing as a declarative statement',
          'This topic has 3 similar active debates',
          'Add specific scope (e.g., "in the US" or "by 2030")'
        ]);
      }, 500);
    } else {
      setAiSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    setTimeout(() => {
      alert('Debate created successfully! Redirecting to your new debate...');
      router.push('/debate/new'); // Next.js navigation
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center space-x-2 text-slate-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Create a New Debate
          </h1>
          <p className="text-slate-400">
            Start a structured debate with clear resolution, invite participants, and let AI help maintain quality discourse.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6">
            <label className="block text-sm font-bold mb-3">
              Debate Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g., Should AI-generated content require mandatory watermarking?"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-sm focus:border-blue-500 outline-none"
              required
              minLength={10}
              maxLength={150}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Make it clear and concise</span>
              <span>{formData.title.length} / 150</span>
            </div>

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="mt-4 space-y-2">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-2 text-xs text-blue-400 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <Sparkles size={14} className="flex-shrink-0 mt-0.5" />
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resolution Statement */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6">
            <label className="block text-sm font-bold mb-3">
              Resolution Statement <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.resolution}
              onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
              placeholder="State your resolution as a clear, declarative statement..."
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-sm focus:border-blue-500 outline-none"
              required
              minLength={20}
              maxLength={500}
            />
            <div className="flex items-start space-x-2 text-xs text-slate-500 mt-2">
              <CircleAlert size={14} className="flex-shrink-0 mt-0.5" />
              <span>Keep it specific and measurable. Avoid vague terms like "better" or "should consider"</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6">
            <label className="block text-sm font-bold mb-3">
              Context & Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide background information, context, or specific parameters for this debate..."
              rows={5}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-sm focus:border-blue-500 outline-none"
              maxLength={2000}
            />
            <div className="text-xs text-slate-500 mt-2 text-right">
              {formData.description.length} / 2000
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Category */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6">
              <label className="block text-sm font-bold mb-3">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Visibility */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6">
              <label className="block text-sm font-bold mb-3">
                Visibility
              </label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none"
              >
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="private">Private</option>
              </select>
            </div>

            {/* Duration */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6">
              <label className="block text-sm font-bold mb-3">
                Duration
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none"
              >
                <option value="ongoing">Ongoing</option>
                <option value="1week">1 Week</option>
                <option value="2weeks">2 Weeks</option>
                <option value="1month">1 Month</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-8 py-3 text-sm font-medium text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAnalyzing || formData.title.length < 10 || formData.resolution.length < 20}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-sm font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Debate...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Create Debate</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
