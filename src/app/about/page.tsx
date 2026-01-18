'use client';

import { Users, Target, Lightbulb, Shield, Award, TrendingUp, MessageSquare, Brain } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            About ArgumentGraph
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We're transforming online discourse through visual argument mapping, AI-powered analysis, 
            and structured engagement that rewards quality reasoning over volume.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <Target className="text-blue-400 mx-auto mb-4" size={48} />
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              To create a platform where complex ideas can be explored through structured, respectful debate, 
              helping people develop critical thinking skills and make more informed decisions.
            </p>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-3">
              <MessageSquare className="text-red-400" size={24} />
              <span>The Problem</span>
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li>• Online debates often devolve into personal attacks</li>
              <li>• Complex arguments get lost in endless comment threads</li>
              <li>• Misinformation spreads faster than fact-checking</li>
              <li>• Echo chambers reinforce existing beliefs</li>
              <li>• Quality reasoning isn't rewarded or recognized</li>
            </ul>
          </div>

          <div className="bg-green-600/10 border border-green-600/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-3">
              <Lightbulb className="text-green-400" size={24} />
              <span>Our Solution</span>
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li>• Visual argument mapping shows logical connections</li>
              <li>• AI analysis helps identify fallacies and bias</li>
              <li>• Reputation system rewards quality contributions</li>
              <li>• Structured formats encourage thoughtful discourse</li>
              <li>• Fact-checking integration promotes accuracy</li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">How ArgumentGraph Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Create or Join Debates</h3>
              <p className="text-slate-400">
                Start a new debate on any topic or join existing discussions. Choose from structured formats 
                like Oxford-style or free-form conversations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Build Arguments Visually</h3>
              <p className="text-slate-400">
                Add your arguments to an interactive graph that shows how ideas connect, support, 
                or challenge each other. See the debate structure at a glance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Earn Reputation</h3>
              <p className="text-slate-400">
                Get recognized for quality reasoning, constructive feedback, and helping others 
                understand complex topics. Build your credibility over time.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <MessageSquare className="text-blue-400" size={24} />,
                title: 'Visual Argument Mapping',
                description: 'See debates as interactive graphs showing logical connections'
              },
              {
                icon: <Brain className="text-purple-400" size={24} />,
                title: 'AI-Powered Analysis',
                description: 'Real-time fallacy detection and argument quality scoring'
              },
              {
                icon: <Shield className="text-green-400" size={24} />,
                title: 'Fact-Checking Integration',
                description: 'Verify claims with credible sources and evidence'
              },
              {
                icon: <Award className="text-yellow-400" size={24} />,
                title: 'Reputation System',
                description: 'Build credibility through quality contributions'
              },
              {
                icon: <Users className="text-pink-400" size={24} />,
                title: 'Community Moderation',
                description: 'Peer review and community-driven quality control'
              },
              {
                icon: <TrendingUp className="text-orange-400" size={24} />,
                title: 'Learning Analytics',
                description: 'Track your reasoning skills and debate performance'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-800/30 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  {feature.icon}
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Intellectual Honesty</h3>
                  <p className="text-slate-400 text-sm">
                    We believe in acknowledging the strengths of opposing arguments and the limitations of our own positions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="text-green-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Respectful Discourse</h3>
                  <p className="text-slate-400 text-sm">
                    Every participant deserves to be heard and treated with dignity, regardless of their viewpoint.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="text-purple-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Evidence-Based Reasoning</h3>
                  <p className="text-slate-400 text-sm">
                    Arguments should be supported by credible evidence and logical reasoning, not just opinion.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="text-yellow-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Continuous Learning</h3>
                  <p className="text-slate-400 text-sm">
                    We're all here to learn and grow. Changing your mind based on good evidence is a strength, not weakness.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="text-pink-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Constructive Engagement</h3>
                  <p className="text-slate-400 text-sm">
                    Focus on building understanding and finding common ground, not just winning arguments.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="text-orange-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Quality Over Quantity</h3>
                  <p className="text-slate-400 text-sm">
                    We reward thoughtful, well-reasoned contributions over volume or popularity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Chen',
                role: 'Founder & CEO',
                bio: 'Former philosophy professor with expertise in logic and argumentation theory.',
                avatar: '👩‍🏫'
              },
              {
                name: 'Marcus Rodriguez',
                role: 'CTO',
                bio: 'AI researcher focused on natural language processing and knowledge graphs.',
                avatar: '👨‍💻'
              },
              {
                name: 'Dr. Ibrahim Habeeb',
                role: 'Head of Community',
                bio: 'Social psychologist specializing in online communities and behavior change.',
                avatar: '👩‍🔬'
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm mb-3">{member.role}</p>
                <p className="text-slate-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Join the Movement</h2>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Help us build a better way to discuss complex ideas. Start your first debate today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="/auth/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
              >
                Get Started
              </a>
              <a
                href="/guidelines"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition"
              >
                Read Guidelines
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}