"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Brain, Trophy, Users, Zap, ChevronRight, ArrowRight, BookOpen, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast'; // Toast notifications

function AuthNavbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#251040]/70 border-b border-[#7965C1]/20">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#E4004B] to-[#7F27FF] flex items-center justify-center">
            <Brain size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#C4B5FD] bg-clip-text text-transparent">
            EduRumble
          </h1>
        </motion.div>

        <div className="hidden lg:flex items-center gap-6">
          {["How it works", "Pricing", "Services", "Dashboard"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href="/">
                <span className="text-sm font-medium text-white/90 hover:text-white transition-colors">
                  {item}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse"></div>
          ) : isAuthenticated ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-[#2A1458]/60 px-3 py-1.5 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E4004B] to-[#7F27FF] flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-sm text-white">Hi, {session.user?.name}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="p-2 rounded-lg bg-[#2A1458]/60 text-white/90 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </motion.button>
            </motion.div>
          ) : (
            <>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                <Link
                  href="/login"
                  className="hidden md:block px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/auth/signup"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white text-sm font-medium flex items-center gap-2 shadow-lg shadow-[#E4004B]/20"
                >
                  <Zap size={16} />
                  Get Started
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function UserDashboard() {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <div className="relative bg-gradient-to-br from-[#251040] to-[#2A1458] py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7965C1] to-[#C4B5FD]">{session.user?.name}</span>!
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Continue your learning journey with personalized quizzes and progress tracking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "Quizzes Created", value: 12 },
            { label: "Average Score", value: "87%" },
            { label: "Topics Mastered", value: 5 },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="bg-[#251040]/70 backdrop-blur-sm rounded-xl p-6 border border-[#7965C1]/30">
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CreateQuiz() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleQuiz = async () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/quiz/create', { topic, difficulty });

      if (res.data.success) {
        toast.success("Quiz created successfully!");
        router.push(`/quiz/preview/${res.data.quiz._id}`);
      } else {
        toast.error(res.data.message || "Quiz creation failed");
      }
    } catch (err) {
      toast.error("Error creating quiz");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E0B43] via-[#2A1458] to-[#15092E]">
      <Toaster position="top-right" />
      <AuthNavbar />

      <div className="relative pt-16 pb-28 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7965C1] to-[#C4B5FD]">AI-Powered Quizzes</span> in Seconds
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Transform any topic into an engaging learning experience with our advanced AI technology.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] rounded-2xl opacity-20 blur-lg"></div>
            <div className="relative bg-[#251040]/90 backdrop-blur-xl rounded-2xl border border-[#7965C1]/30 shadow-2xl p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Create Your Quiz</h2>
                  <p className="text-white/70">Enter your content and let AI do the magic.</p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/80">
                      <div className="w-6 h-6 rounded-full bg-[#7F27FF]/20 flex items-center justify-center"><Sparkles size={14} className="text-[#7F27FF]" /></div>
                      <span className="text-sm">Instant generation</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <div className="w-6 h-6 rounded-full bg-[#7F27FF]/20 flex items-center justify-center"><BookOpen size={14} className="text-[#7F27FF]" /></div>
                      <span className="text-sm">Any topic or subject</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <div className="w-6 h-6 rounded-full bg-[#7F27FF]/20 flex items-center justify-center"><Trophy size={14} className="text-[#7F27FF]" /></div>
                      <span className="text-sm">Adaptive difficulty</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Topic or Subject</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Machine Learning, World History..."
                      className="w-full px-4 py-3.5 rounded-xl bg-[#2A1458]/60 text-white border border-[#7965C1]/40 focus:border-[#E4004B] focus:ring-2 focus:ring-[#E4004B]/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Difficulty Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['easy', 'medium', 'hard'].map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setDifficulty(level)}
                          className={`py-3 rounded-lg text-sm font-medium transition-all ${
                            difficulty === level ? 'bg-[#7F27FF] text-white shadow-md' : 'bg-[#2A1458]/60 text-white/70 hover:bg-[#2A1458]'
                          }`}
                          aria-pressed={difficulty === level}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleQuiz}
                    disabled={loading}
                    className={`w-full py-4 rounded-xl bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#E4004B]/30 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? "Generating..." : "Generate Quiz"}
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <UserDashboard />
    </div>
  );
}
