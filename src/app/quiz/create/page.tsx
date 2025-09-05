"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Brain, Trophy, Users, Zap, ChevronRight, ArrowRight, BookOpen, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";

// Create a client component for the navbar that uses authentication

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
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#E4004B] to-[#7F27FF] flex items-center justify-center">
            <Brain size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#C4B5FD] bg-clip-text text-transparent">
            EduRumble
          </h1>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-6">
          {["How it works", "Pricing", "Services", "About"].map((item, index) => (
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
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
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
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/login"
                  className="hidden md:block px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
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

// Create a client component for the user dashboard
function UserDashboard() {
  const { data: session } = useSession();
  
  if (!session) return null;
  
  return (
    <div className="relative bg-gradient-to-br from-[#251040] to-[#2A1458] py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7965C1] to-[#C4B5FD]">{session.user?.name}</span>!
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Continue your learning journey with personalized quizzes and progress tracking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#251040]/70 backdrop-blur-sm rounded-xl p-6 border border-[#7965C1]/30"
          >
            <div className="text-2xl font-bold text-white mb-2">12</div>
            <div className="text-white/70">Quizzes Created</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#251040]/70 backdrop-blur-sm rounded-xl p-6 border border-[#7965C1]/30"
          >
            <div className="text-2xl font-bold text-white mb-2">87%</div>
            <div className="text-white/70">Average Score</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#251040]/70 backdrop-blur-sm rounded-xl p-6 border border-[#7965C1]/30"
          >
            <div className="text-2xl font-bold text-white mb-2">5</div>
            <div className="text-white/70">Topics Mastered</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Main page component
export default function CreateQuiz() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const { data: session } = useSession();
  console.log(session);
  




  const handleQuiz = async()=>{
  const res = await axios.post('/api/quiz/create',{
    topic,
    difficulty,
    createdBy:session?.user?.id

  })

  if(res.success=='success'){
    console.log(res);
  }
  
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E0B43] via-[#2A1458] to-[#15092E]">
      <AuthNavbar />

      <div className="relative pt-16 pb-28 px-4">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#7F27FF]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E4004B]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7965C1] to-[#C4B5FD]">AI-Powered Quizzes</span> in Seconds
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Transform any topic into an engaging learning experience with our advanced AI technology.
            </p>
          </motion.div>

          {/* Modern Quiz Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] rounded-2xl opacity-20 blur-lg"></div>
            <div className="relative bg-[#251040]/90 backdrop-blur-xl rounded-2xl border border-[#7965C1]/30 shadow-2xl p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Create Your Quiz</h2>
                    <p className="text-white/70">Enter your content and let AI do the magic.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/80">
                      <div className="w-6 h-6 rounded-full bg-[#7F27FF]/20 flex items-center justify-center">
                        <Sparkles size={14} className="text-[#7F27FF]" />
                      </div>
                      <span className="text-sm">Instant generation</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <div className="w-6 h-6 rounded-full bg-[#7F27FF]/20 flex items-center justify-center">
                        <BookOpen size={14} className="text-[#7F27FF]" />
                      </div>
                      <span className="text-sm">Any topic or subject</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <div className="w-6 h-6 rounded-full bg-[#7F27FF]/20 flex items-center justify-center">
                        <Trophy size={14} className="text-[#7F27FF]" />
                      </div>
                      <span className="text-sm">Adaptive difficulty</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Topic or Subject
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Machine Learning, World History, JavaScript..."
                      className="w-full px-4 py-3.5 rounded-xl bg-[#2A1458]/60 text-white border border-[#7965C1]/40 focus:border-[#E4004B] focus:ring-2 focus:ring-[#E4004B]/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Difficulty Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['easy', 'medium', 'hard'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setDifficulty(level)}
                          className={`py-3 rounded-lg text-sm font-medium transition-all ${
                            difficulty === level
                              ? 'bg-[#7F27FF] text-white shadow-md'
                              : 'bg-[#2A1458]/60 text-white/70 hover:bg-[#2A1458]'
                          }`}
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
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#E4004B]/30"
                  >
                    <Sparkles size={18}  />
                    Generate Quiz
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <UserDashboard />

      {/* How it Works Section */}
      <div className="relative bg-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7965C1] to-[#7F27FF]">EduRumble</span> Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transforming learning through AI-powered quiz generation that adapts to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <BookOpen size={24} className="text-[#7F27FF]" />,
                title: "Enter Your Topic",
                desc: "Provide any text or subject and let our AI understand your content.",
                color: "from-blue-500/10 to-purple-500/10"
              },
              {
                step: "02",
                icon: <Trophy size={24} className="text-[#7F27FF]" />,
                title: "Choose Difficulty",
                desc: "Pick between Easy, Medium, or Hard to adjust question complexity.",
                color: "from-purple-500/10 to-pink-500/10"
              },
              {
                step: "03",
                icon: <Users size={24} className="text-[#7F27FF]" />,
                title: "Generate & Play",
                desc: "AI creates tailored quizzes instantly – challenge yourself or compete!",
                color: "from-pink-500/10 to-red-500/10"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * i }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7965C1] to-[#E4004B] opacity-0 group-hover:opacity-20 blur transition duration-300 rounded-2xl"></div>
                <div className={`relative h-full p-6 rounded-2xl bg-gradient-to-br ${item.color} border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="text-4xl font-black text-gray-200/70 mb-2">{item.step}</div>
                  <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                  <div className="mt-6 flex items-center text-[#7F27FF] group-hover:translate-x-1 transition-transform">
                    <span className="text-sm font-medium">Learn more</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-[#1E0B43] to-[#2A1458] py-16 px-4">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white"></div>
        <div className="container mx-auto max-w-4xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#E4004B] to-[#7F27FF] rounded-2xl p-10 md:p-12 text-center text-white shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform learning?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of educators and students creating engaging quizzes with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-white text-[#7F27FF] font-medium rounded-full shadow-md"
              >
                Get Started Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-transparent border border-white text-white font-medium rounded-full"
              >
                View Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0F0628] text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#E4004B] to-[#7F27FF] flex items-center justify-center">
                  <Brain size={18} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">EduRumble</h3>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered quiz generation for modern educators and learners.
              </p>
            </div>
            
            {['Product', 'Company', 'Support', 'Legal'].map((category) => (
              <div key={category}>
                <h4 className="font-semibold mb-4">{category}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {['Features', 'Pricing', 'Case Studies', 'API'].slice(0, 3).map((item) => (
                    <li key={item} className="hover:text-white transition-colors cursor-pointer">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} EduRumble. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}