import { Shield, Heart, CircleAlert, CircleCheck, Target, Users } from 'lucide-react';

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-24" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-4xl mx-auto px-8 pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield size={48} className="text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Community Guidelines
          </h1>
          <p className="text-slate-400 text-lg">
            Building a respectful space for quality discourse and critical thinking
          </p>
        </div>

        {/* Core Principles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Core Principles
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6">
              <Heart size={24} className="text-red-400 mb-3" />
              <h3 className="font-bold mb-2">Respect & Civility</h3>
              <p className="text-sm text-slate-400">
                Treat all participants with respect. Disagree with ideas, not people. Personal attacks have no place here.
              </p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6">
              <Target size={24} className="text-blue-400 mb-3" />
              <h3 className="font-bold mb-2">Evidence-Based</h3>
              <p className="text-sm text-slate-400">
                Support your claims with credible sources. Citations strengthen arguments and build trust.
              </p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6">
              <CircleCheck size={24} className="text-green-400 mb-3" />
              <h3 className="font-bold mb-2">Intellectual Honesty</h3>
              <p className="text-sm text-slate-400">
                Acknowledge valid counterarguments. Admitting mistakes and updating views is a strength.
              </p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6">
              <Users size={24} className="text-purple-400 mb-3" />
              <h3 className="font-bold mb-2">Good Faith Engagement</h3>
              <p className="text-sm text-slate-400">
                Assume participants mean well. Engage to understand, not just to win.
              </p>
            </div>
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Do's */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              ✓ Do This
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Provide sources and citations for factual claims</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Stay on topic and address the debate resolution</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Use clear, logical reasoning in your arguments</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Acknowledge when opponents make valid points</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Ask clarifying questions to understand opposing views</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Report violations rather than engaging with trolls</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Rate arguments fairly based on their merits</span>
              </li>
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              ✗ Don't Do This
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Use personal attacks or ad hominem arguments</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Post spam, off-topic content, or advertisements</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Deliberately misrepresent others' arguments (straw man)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Share false information or unverified claims as fact</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Harass or bully other users</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Create multiple accounts to manipulate votes</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Copy others' arguments without attribution</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Common Fallacies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Common Logical Fallacies to Avoid
          </h2>
          <div className="space-y-4">
            {[
              {
                name: 'Ad Hominem',
                description: 'Attacking the person instead of their argument',
                example: '"You can\'t trust their climate data because they\'re not a scientist."'
              },
              {
                name: 'Straw Man',
                description: 'Misrepresenting an argument to make it easier to attack',
                example: '"They want healthcare reform, so they must want complete socialism."'
              },
              {
                name: 'False Dichotomy',
                description: 'Presenting only two options when more exist',
                example: '"Either we ban all AI or accept total job loss."'
              },
              {
                name: 'Appeal to Authority',
                description: 'Claiming something is true because an authority says so',
                example: '"This CEO said crypto is the future, so it must be."'
              },
              {
                name: 'Slippery Slope',
                description: 'Claiming one action will lead to extreme consequences',
                example: '"If we allow this regulation, soon the government will control everything."'
              }
            ].map((fallacy, index) => (
              <div key={index} className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg">{fallacy.name}</h3>
                  <CircleAlert size={20} className="text-yellow-400" />
                </div>
                <p className="text-sm text-slate-300 mb-2">{fallacy.description}</p>
                <div className="bg-slate-800/50 p-3 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-xs text-slate-400 italic">{fallacy.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enforcement */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Enforcement & Consequences
          </h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">Warning</h3>
              <p className="text-slate-300">
                First violation: You'll receive a warning and guidance on our guidelines. Your reputation score may be reduced.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-orange-400">Temporary Suspension</h3>
              <p className="text-slate-300">
                Repeated violations: Temporary ban from participating (1-7 days). Severe violations may result in immediate suspension.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-red-400">Permanent Ban</h3>
              <p className="text-slate-300">
                Serious violations (harassment, hate speech, coordinated manipulation): Permanent account termination.
              </p>
            </div>
          </div>
          <div className="mt-6 bg-slate-900/50 p-4 rounded-xl">
            <p className="text-xs text-slate-400">
              <strong>Appeal Process:</strong> If you believe a moderation action was made in error, you can submit an appeal within 7 days. All appeals are reviewed by senior moderators.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Last updated: January 2026 • Questions? Contact <a href="mailto:conduct@argumentgraph.com" className="text-blue-400 hover:text-blue-300">conduct@argumentgraph.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}