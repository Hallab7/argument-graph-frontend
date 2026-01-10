'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import api from '@/lib/api';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'otp' | 'reset' | 'success'>('email');
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetToken, setResetToken] = useState('');
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.forgotPassword(formData.email);
      if (response.success) {
        setStep('otp');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.verifyResetOTP(formData.email, formData.otp);
      if (response.success && response.data) {
        setResetToken(response.data.resetToken);
        setStep('reset');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await api.resetPassword(resetToken, formData.newPassword);
      if (response.success) {
        setStep('success');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const renderEmailStep = () => (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleEmailSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your email address"
              required
            />
          </div>
          <p className="text-sm text-slate-400 mt-2">
            We'll send you a verification code to reset your password
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Send Reset Code</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );

  const renderOtpStep = () => (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="text-blue-400" size={24} />
        </div>
        <p className="text-slate-300">
          We've sent a verification code to <br />
          <span className="font-medium text-white">{formData.email}</span>
        </p>
      </div>

      <form onSubmit={handleOtpSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Verification Code
          </label>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white text-center text-lg tracking-widest placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            placeholder="000000"
            maxLength={6}
            required
          />
          <p className="text-sm text-slate-400 mt-2 text-center">
            Enter the 6-digit code from your email
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Verify Code</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setStep('email')}
          className="w-full text-slate-400 hover:text-white transition flex items-center justify-center space-x-2"
        >
          <ArrowLeft size={16} />
          <span>Back to email</span>
        </button>
      </form>
    </div>
  );

  const renderResetStep = () => (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleResetSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            placeholder="Enter new password"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            placeholder="Confirm new password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Reset Password</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 text-center">
      <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="text-green-400" size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Password Reset Successful</h3>
      <p className="text-slate-400 mb-6">
        Your password has been successfully reset. You can now sign in with your new password.
      </p>
      <Link
        href="/auth/login"
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        <span>Sign In</span>
        <ArrowRight size={20} />
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              ArgumentGraph
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">
            {step === 'email' && 'Reset Password'}
            {step === 'otp' && 'Verify Email'}
            {step === 'reset' && 'New Password'}
            {step === 'success' && 'All Set!'}
          </h2>
          <p className="text-slate-400">
            {step === 'email' && 'Enter your email to receive a reset code'}
            {step === 'otp' && 'Check your email for the verification code'}
            {step === 'reset' && 'Create a new secure password'}
            {step === 'success' && 'Your password has been updated'}
          </p>
        </div>

        {/* Form Steps */}
        {step === 'email' && renderEmailStep()}
        {step === 'otp' && renderOtpStep()}
        {step === 'reset' && renderResetStep()}
        {step === 'success' && renderSuccessStep()}

        {/* Back to Login */}
        {step !== 'success' && (
          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-slate-400 hover:text-white transition flex items-center justify-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span>Back to sign in</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}