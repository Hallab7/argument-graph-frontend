'use client';

import { Shield, Users, MessageSquare, Award, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="text-blue-400" size={32} />
            <h1 className="text-4xl font-bold text-white">Community Guidelines</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Building a respectful environment for quality discourse and critical thinking
          </p>
        </div>

        {/* Core Principles */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <Award className="text-yellow-400" size={24} />
            <span>Core Principles</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Respectful Discourse</h3>
                  <p className="text-slate-400 text-sm">
                    Engage with ideas, not personal attacks. Maintain civility even in disagreement.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Evidence-Based Arguments</h3>
                  <p className="text-slate-400 text-sm">
                    Support your claims with credible sources and logical reasoning.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Good Faith Participation</h3>
                  <p className="text-slate-400 text-sm">
                    Engage genuinely with opposing viewpoints and be open to changing your mind.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Intellectual Honesty</h3>
                  <p className="text-slate-400 text-sm">
                    Acknowledge the strengths of opposing arguments and weaknesses in your own.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Constructive Criticism</h3>
                  <p className="text-slate-400 text-sm">
                    Provide specific, actionable feedback that helps improve the discussion.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Stay On Topic</h3>
                  <p className="text-slate-400 text-sm">
                    Keep arguments relevant to the debate topic and avoid tangential discussions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prohibited Behavior */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <XCircle className="text-red-400" size={24} />
            <span>Prohibited Behavior</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={16} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Personal Attacks</h3>
                  <p className="text-slate-400 text-sm">
                    Attacking the person rather than their arguments (ad hominem fallacies).
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={16} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Harassment</h3>
                  <p className="text-slate-400 text-sm">
                    Repeated unwelcome contact, threats, or intimidation of other users.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={16} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Spam & Self-Promotion</h3>
                  <p className="text-slate-400 text-sm">
                    Excessive posting of irrelevant content or promotional material.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={16} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Misinformation</h3>
                  <p className="text-slate-400 text-sm">
                    Deliberately spreading false information or conspiracy theories.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={16} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Hate Speech</h3>
                  <p className="text-slate-400 text-sm">
                    Content that promotes hatred based on identity, race, religion, etc.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={16} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Bad Faith Arguments</h3>
                  <p className="text-slate-400 text-sm">
                    Strawman arguments, moving goalposts, or deliberate misrepresentation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={16} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Vote Manipulation</h3>
                  <p className="text-slate-400 text-sm">
                    Using multiple accounts or coordinating to manipulate ratings.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={16} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Doxxing</h3>
                  <p className="text-slate-400 text-sm">
                    Sharing personal information about other users without consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Argument Quality Standards */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <MessageSquare className="text-blue-400" size={24} />
            <span>Argument Quality Standards</span>
          </h2>
          
          <div className="space-y-6">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <h3 className="font-semibold text-green-400 mb-2 flex items-center space-x-2">
                <CheckCircle size={16} />
                <span>High-Quality Arguments</span>
              </h3>
              <ul className="space-y-2 text-sm text-green-300">
                <li>• Clear thesis statement with logical structure</li>
                <li>• Supporting evidence from credible sources</li>
                <li>• Acknowledgment of counterarguments</li>
                <li>• Proper citations and references</li>
                <li>• Respectful tone and professional language</li>
              </ul>
            </div>
            
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <h3 className="font-semibold text-red-400 mb-2 flex items-center space-x-2">
                <XCircle size={16} />
                <span>Low-Quality Arguments</span>
              </h3>
              <ul className="space-y-2 text-sm text-red-300">
                <li>• Unsupported claims or opinions presented as facts</li>
                <li>• Logical fallacies (ad hominem, strawman, false dichotomy)</li>
                <li>• Inflammatory language or emotional manipulation</li>
                <li>• Off-topic tangents or irrelevant information</li>
                <li>• Plagiarism or uncredited sources</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reputation System */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <Users className="text-purple-400" size={24} />
            <span>Reputation System</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">How to Earn Reputation</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">+5</div>
                  <span className="text-slate-300">Creating a well-structured argument</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">+3</div>
                  <span className="text-slate-300">Receiving positive ratings from peers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">+2</div>
                  <span className="text-slate-300">Providing constructive feedback</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">+1</div>
                  <span className="text-slate-300">Daily participation in debates</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-3">How to Lose Reputation</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">-10</div>
                  <span className="text-slate-300">Violating community guidelines</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">-5</div>
                  <span className="text-slate-300">Posting low-quality arguments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">-3</div>
                  <span className="text-slate-300">Receiving negative peer ratings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">-1</div>
                  <span className="text-slate-300">Deleting arguments after criticism</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enforcement */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <AlertTriangle className="text-orange-400" size={24} />
            <span>Enforcement & Consequences</span>
          </h2>
          
          <div className="space-y-4">
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-400 mb-2">First Violation</h3>
              <p className="text-yellow-300 text-sm">
                Warning message with explanation of the violation and guidance for improvement.
              </p>
            </div>
            
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-2">Repeated Violations</h3>
              <p className="text-orange-300 text-sm">
                Temporary restrictions on posting, commenting, or rating (1-7 days).
              </p>
            </div>
            
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <h3 className="font-semibold text-red-400 mb-2">Serious Violations</h3>
              <p className="text-red-300 text-sm">
                Account suspension or permanent ban for harassment, hate speech, or persistent rule violations.
              </p>
            </div>
          </div>
        </div>

        {/* Reporting */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <Info className="text-blue-400" size={24} />
            <span>Reporting & Appeals</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">How to Report</h3>
              <div className="space-y-2 text-slate-300 text-sm">
                <p>• Use the report button on any argument or comment</p>
                <p>• Select the appropriate violation category</p>
                <p>• Provide specific details about the issue</p>
                <p>• Include relevant context or evidence</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-3">Appeals Process</h3>
              <div className="space-y-2 text-slate-300 text-sm">
                <p>• Contact moderators within 7 days of action</p>
                <p>• Provide clear explanation of your position</p>
                <p>• Include any additional context or evidence</p>
                <p>• Decisions are reviewed by multiple moderators</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <p className="text-blue-300 text-sm">
              <strong>Remember:</strong> Our goal is to maintain a constructive environment for learning and debate. 
              These guidelines help ensure everyone can participate in meaningful discussions while feeling safe and respected.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <p className="text-slate-400">
            Questions about these guidelines? Contact us at{' '}
            <a href="mailto:community@argumentgraph.com" className="text-blue-400 hover:text-blue-300">
              community@argumentgraph.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}