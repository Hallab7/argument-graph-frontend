'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Plus, X, Info, Users, Eye, EyeOff, Clock, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';

interface DebateRules {
  max_arguments_per_user?: number;
  time_limit?: number;
  moderation_level: 'none' | 'light' | 'strict';
  allow_anonymous: boolean;
  require_citations: boolean;
}

export default function CreateDebatePage() {
  const [step, setStep] = useState<'basic' | 'rules' | 'review'>('basic');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'free-form' as 'oxford' | 'lincoln-douglas' | 'free-form',
    tags: [] as string[],
    visibility: 'public' as 'public' | 'private' | 'unlisted',
    rules: {
      max_arguments_per_user: undefined,
      time_limit: undefined,
      moderation_level: 'light',
      allow_anonymous: false,
      require_citations: false,
    } as DebateRules,
  });
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.createDebate(formData);
      if (response.success && response.data) {
        router.push(`/debate/${response.data.id}`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create debate');
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim()) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const renderBasicStep = () => (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Debate Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          placeholder="e.g., Should AI-generated content require mandatory watermarks?"
          maxLength={200}
        />
        <p className="text-xs text-slate-400 mt-1">{formData.title.length}/200 characters</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none h-32 resize-none"
          placeholder="Provide context and background for your debate. What specific aspects should participants focus on?"
          maxLength={1000}
        />
        <p className="text-xs text-slate-400 mt-1">{formData.description.length}/1000 characters</p>
      </div>

      {/* Debate Type */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Debate Format
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              type: 'free-form',
              title: 'Free-form',
              description: 'Open discussion with flexible argument structure',
              icon: '💬'
            },
            {
              type: 'oxford',
              title: 'Oxford Style',
              description: 'Structured format with opening statements and rebuttals',
              icon: '🎓'
            },
            {
              type: 'lincoln-douglas',
              title: 'Lincoln-Douglas',
              description: 'One-on-one debate with alternating arguments',
              icon: '⚖️'
            }
          ].map((format) => (
            <button
              key={format.type}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: format.type as any }))}
              className={`p-3 sm:p-4 rounded-lg border-2 transition text-left ${
                formData.type === format.type
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-2">{format.icon}</div>
              <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">{format.title}</h3>
              <p className="text-xs text-slate-400">{format.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Tags (up to 5)
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center space-x-1 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-blue-300"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        {formData.tags.length < 5 && (
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              placeholder="Add a tag..."
              maxLength={20}
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Visibility */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Visibility
        </label>
        <div className="space-y-3">
          {[
            {
              value: 'public',
              icon: <Eye size={20} />,
              title: 'Public',
              description: 'Anyone can view and participate'
            },
            {
              value: 'unlisted',
              icon: <EyeOff size={20} />,
              title: 'Unlisted',
              description: 'Only people with the link can access'
            },
            {
              value: 'private',
              icon: <Users size={20} />,
              title: 'Private',
              description: 'Only invited participants can access'
            }
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, visibility: option.value as any }))}
              className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition text-left ${
                formData.visibility === option.value
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
              }`}
            >
              <div className="text-slate-400">{option.icon}</div>
              <div>
                <h3 className="font-semibold text-white">{option.title}</h3>
                <p className="text-sm text-slate-400">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRulesStep = () => (
    <div className="space-y-6">
      {/* Moderation Level */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Moderation Level
        </label>
        <div className="space-y-3">
          {[
            {
              value: 'none',
              title: 'No Moderation',
              description: 'Community self-regulates through voting'
            },
            {
              value: 'light',
              title: 'Light Moderation',
              description: 'AI flags potential issues, community votes'
            },
            {
              value: 'strict',
              title: 'Strict Moderation',
              description: 'All arguments reviewed before publication'
            }
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                rules: { ...prev.rules, moderation_level: option.value as any }
              }))}
              className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition text-left ${
                formData.rules.moderation_level === option.value
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
              }`}
            >
              <Shield className="text-slate-400" size={20} />
              <div>
                <h3 className="font-semibold text-white">{option.title}</h3>
                <p className="text-sm text-slate-400">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Argument Limit */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Arguments per User (optional)
        </label>
        <input
          type="number"
          value={formData.rules.max_arguments_per_user || ''}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            rules: {
              ...prev.rules,
              max_arguments_per_user: e.target.value ? parseInt(e.target.value) : undefined
            }
          }))}
          className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          placeholder="No limit"
          min="1"
          max="50"
        />
        <p className="text-xs text-slate-400 mt-1">Leave empty for no limit</p>
      </div>

      {/* Time Limit */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Time Limit (hours, optional)
        </label>
        <input
          type="number"
          value={formData.rules.time_limit || ''}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            rules: {
              ...prev.rules,
              time_limit: e.target.value ? parseInt(e.target.value) : undefined
            }
          }))}
          className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          placeholder="No time limit"
          min="1"
          max="168"
        />
        <p className="text-xs text-slate-400 mt-1">Leave empty for no time limit</p>
      </div>

      {/* Additional Rules */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Additional Rules</h3>
        
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.rules.require_citations}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              rules: { ...prev.rules, require_citations: e.target.checked }
            }))}
            className="w-5 h-5 rounded border-2 border-slate-600 bg-slate-800 checked:bg-blue-600 checked:border-blue-600"
          />
          <div>
            <span className="text-white">Require Citations</span>
            <p className="text-sm text-slate-400">Arguments must include supporting sources</p>
          </div>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.rules.allow_anonymous}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              rules: { ...prev.rules, allow_anonymous: e.target.checked }
            }))}
            className="w-5 h-5 rounded border-2 border-slate-600 bg-slate-800 checked:bg-blue-600 checked:border-blue-600"
          />
          <div>
            <span className="text-white">Allow Anonymous Arguments</span>
            <p className="text-sm text-slate-400">Users can post arguments without revealing identity</p>
          </div>
        </label>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">{formData.title}</h3>
        <p className="text-slate-300 mb-4">{formData.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Format:</span>
            <span className="text-white ml-2 capitalize">{formData.type.replace('-', ' ')}</span>
          </div>
          <div>
            <span className="text-slate-400">Visibility:</span>
            <span className="text-white ml-2 capitalize">{formData.visibility}</span>
          </div>
          <div>
            <span className="text-slate-400">Moderation:</span>
            <span className="text-white ml-2 capitalize">{formData.rules.moderation_level}</span>
          </div>
          <div>
            <span className="text-slate-400">Creator:</span>
            <span className="text-white ml-2">@{user?.username}</span>
          </div>
        </div>

        {formData.tags.length > 0 && (
          <div className="mt-4">
            <span className="text-slate-400 text-sm">Tags:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-blue-400 font-medium mb-1">Ready to Launch</h4>
            <p className="text-blue-300 text-sm">
              Your debate will be created and made available to participants immediately. 
              You can always edit the settings later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Create New Debate</h1>
          <p className="text-slate-400">Set up a structured discussion on any topic</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto pb-2">
          {[
            { key: 'basic', label: 'Basic Info' },
            { key: 'rules', label: 'Rules' },
            { key: 'review', label: 'Review' }
          ].map((stepItem, index) => (
            <div key={stepItem.key} className="flex items-center flex-shrink-0">
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                  step === stepItem.key
                    ? 'bg-blue-600 text-white'
                    : index < ['basic', 'rules', 'review'].indexOf(step)
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 text-xs sm:text-sm text-slate-300 whitespace-nowrap">{stepItem.label}</span>
              {index < 2 && <div className="w-6 sm:w-8 h-px bg-slate-600 mx-2 sm:mx-4" />}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 sm:p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {step === 'basic' && renderBasicStep()}
          {step === 'rules' && renderRulesStep()}
          {step === 'review' && renderReviewStep()}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 space-y-4 sm:space-y-0">
            <button
              type="button"
              onClick={() => {
                if (step === 'rules') setStep('basic');
                if (step === 'review') setStep('rules');
              }}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition ${
                step === 'basic'
                  ? 'text-slate-500 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              disabled={step === 'basic'}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (step === 'basic') setStep('rules');
                else if (step === 'rules') setStep('review');
                else handleSubmit();
              }}
              disabled={loading || !formData.title || !formData.description}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {step === 'review' ? 'Create Debate' : 'Continue'}
                  </span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}