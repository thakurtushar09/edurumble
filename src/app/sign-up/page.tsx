"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { User, Mail, Lock, IdCard, Sparkles, Eye, EyeOff } from "lucide-react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/auth/sign-up", form);
      console.log(res.data);

      if (res.data.success) {
        router.push(`/verify/${res.data.userId}`);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Signup failed");
      } else {
        setError("Something went wrong");
      }
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
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
                src="/signup_gif.gif" 
                alt="Robot signup animation" 
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Join EduRumble</h3>
                <p className="text-[#C4B5FD]">Start your AI-powered learning journey today</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Signup Form */}
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
                  Create Account
                </h2>
                <p className="mt-2 text-[#C4B5FD]">Join EduRumble and start your AI journey</p>
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

                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-[#C4B5FD] mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-[#7965C1]" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="pl-10 appearance-none relative block w-full px-3 py-3 border border-[#7965C1]/40 bg-[#2A1458]/60 placeholder-[#7965C1] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F27FF] focus:border-transparent transition-all"
                      placeholder="Enter your username"
                      value={form.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
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
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-[#C4B5FD] mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IdCard size={18} className="text-[#7965C1]" />
                    </div>
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      required
                      className="pl-10 appearance-none relative block w-full px-3 py-3 border border-[#7965C1]/40 bg-[#2A1458]/60 placeholder-[#7965C1] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F27FF] focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      value={form.fullname}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Password */}
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
                      autoComplete="new-password"
                      required
                      className="pl-10 pr-10 appearance-none relative block w-full px-3 py-3 border border-[#7965C1]/40 bg-[#2A1458]/60 placeholder-[#7965C1] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F27FF] focus:border-transparent transition-all"
                      placeholder="Create a password"
                      value={form.password}
                      onChange={handleChange}
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
                      Creating account...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Sparkles size={16} className="mr-2" />
                      Sign Up
                    </div>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#C4B5FD]">
                  Already have an account?{' '}
                  <Link href="/auth/signin" className="font-medium text-[#7F27FF] hover:text-white transition-colors">
                    Sign in
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