"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    // Handle both default NextAuth "CredentialsSignin"
    // and our custom thrown errors (like "Please verify email")
    setError(result.error === 'CredentialsSignin' 
      ? 'Invalid email or password' 
      : result.error
    );
    setIsLoading(false);
  } else {
    router.push('/');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full items-center">
        {/* Left side - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden md:flex flex-col items-center justify-center"
        >
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-[#251040]/50 backdrop-blur-md rounded-2xl border border-[#7965C1]/30 p-8 shadow-2xl">
              <img 
                src="/login_gif.gif" 
                alt="Robot login animation" 
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Welcome to EduRumble</h3>
                <p className="text-[#C4B5FD]">AI-powered learning made fun and engaging</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-[#251040]/90 backdrop-blur-xl rounded-2xl border border-[#7965C1]/30 shadow-2xl p-8">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] rounded-2xl mb-4"
                >
                  <Sparkles size={28} className="text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-[#C4B5FD] bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="mt-2 text-[#C4B5FD]">Sign in to continue your learning journey</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-lg text-sm flex items-center"
                  >
                    <div className="flex-1">{error}</div>
                  </motion.div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#C4B5FD] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-[#7965C1]" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-10 appearance-none relative block w-full px-3 py-3 border border-[#7965C1]/40 bg-[#2A1458]/60 placeholder-[#7965C1] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F27FF] focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#C4B5FD] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-[#7965C1]" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="pl-10 pr-10 appearance-none relative block w-full px-3 py-3 border border-[#7965C1]/40 bg-[#2A1458]/60 placeholder-[#7965C1] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F27FF] focus:border-transparent transition-all"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="text-[#7965C1]" />
                      ) : (
                        <Eye size={18} className="text-[#7965C1]" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#7F27FF] focus:ring-[#7F27FF] border-[#7965C1] rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-[#C4B5FD]">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-[#7F27FF] hover:text-[#C4B5FD] transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#E4004B] to-[#7F27FF] hover:shadow-lg hover:shadow-[#E4004B]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7F27FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Sparkles size={16} className="mr-2" />
                      Sign in
                    </div>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#C4B5FD]">
                  Don't have an account?{' '}
                  <Link href="/sign-up" className="font-medium text-[#7F27FF] hover:text-white transition-colors">
                    Sign up now
                  </Link>
                </p>
              </div>

              
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}