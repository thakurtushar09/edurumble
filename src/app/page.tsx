'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Brain, Trophy, Users, Zap, ChevronRight, ArrowRight, BookOpen, User, LogOut, Target, Clock, BarChart3, Map, Sword, UsersRound, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { io } from "socket.io-client"

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
                  href="/auth/signin"
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

// Main page component
export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: <Sparkles size={24} className="text-[#7F27FF]" />,
      title: "AI-Powered Quiz Creation",
      description: "Generate custom quizzes on any topic with our advanced AI. No more searching for questions - let AI do the work for you!",
      color: "from-blue-500/10 to-purple-500/10"
    },
    {
      icon: <Sword size={24} className="text-[#7F27FF]" />,
      title: "Compete with Friends",
      description: "Challenge your friends in real-time quiz battles. See who comes out on top in our competitive learning environment.",
      color: "from-purple-500/10 to-pink-500/10"
    },
    {
      icon: <BarChart3 size={24} className="text-[#7F27FF]" />,
      title: "Detailed Performance Analytics",
      description: "Get comprehensive reports on your strengths and weaknesses. Track progress and focus on areas that need improvement.",
      color: "from-pink-500/10 to-red-500/10"
    },
    {
      icon: <Map size={24} className="text-[#7F27FF]" />, // Changed from Roadmap to Map
      title: "Personalized Learning Roadmaps",
      description: "Choose any topic and let AI create a customized syllabus and learning path tailored to your goals and skill level.",
      color: "from-red-500/10 to-orange-500/10"
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp size={32} className="text-[#7F27FF]" />,
      title: "Accelerated Learning",
      description: "AI-powered insights help you learn faster and retain more information"
    },
    {
      icon: <UsersRound size={32} className="text-[#7F27FF]" />,
      title: "Social Learning",
      description: "Compete with friends and learn together in an engaging environment"
    },
    {
      icon: <Target size={32} className="text-[#7F27FF]" />,
      title: "Focused Improvement",
      description: "Identify and work on your weak areas with personalized recommendations"
    },
    {
      icon: <Calendar size={32} className="text-[#7F27FF]" />,
      title: "Structured Progress",
      description: "Follow AI-generated roadmaps that adapt to your learning pace"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E0B43] via-[#2A1458] to-[#15092E] overflow-hidden">
      <AuthNavbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#7F27FF]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E4004B]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7965C1] to-[#C4B5FD]">Learn</span>,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7965C1] to-[#C4B5FD]"> Compete</span>, and <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7965C1] to-[#C4B5FD]">Master</span> with AI
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-2xl">
                Create AI-powered quizzes, compete with friends, and follow personalized learning roadmaps. 
                Transform how you learn with intelligent analytics and tailored educational experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/quiz/create">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white font-medium flex items-center gap-2 shadow-lg shadow-[#E4004B]/30"
                  >
                    <Sparkles size={20} />
                    Create Your First Quiz
                  </motion.button>
                </Link>
                <Link href="/auth/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-transparent border border-[#7965C1] text-white font-medium"
                  >
                    Start Learning Free
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative bg-[#251040]/50 backdrop-blur-md rounded-2xl border border-[#7965C1]/30 p-6 shadow-2xl">
                  <Image
                    src="/hero-gif.gif"
                    alt="AI Learning Platform"
                    width={500}
                    height={400}
                    className="rounded-lg"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7965C1] to-[#7F27FF]">EduRumble</span>?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Our AI-powered platform offers a unique approach to learning that combines competition, personalization, and intelligent analytics
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#251040]/50 backdrop-blur-sm rounded-xl p-6 text-center border border-[#7965C1]/30"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#2A1458] flex items-center justify-center">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-[#C4B5FD]">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7965C1] to-[#7F27FF]">EduRumble</span> Works
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Discover our powerful features designed to transform your learning experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl bg-gradient-to-br ${feature.color} border border-[#7965C1]/30 cursor-pointer transition-all ${
                    activeFeature === index ? 'ring-2 ring-[#7F27FF]' : 'hover:border-[#C4B5FD]/50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative bg-[#251040]/90 backdrop-blur-xl rounded-2xl border border-[#7965C1]/30 p-8 shadow-2xl">
                  <div className="text-4xl font-black text-gray-200/70 mb-4">0{activeFeature + 1}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{features[activeFeature].title}</h3>
                  <p className="text-white/70 mb-6">{features[activeFeature].description}</p>
                  <Link href={activeFeature === 0 ? "/quiz/create" : "/auth/signup"}>
                    <div className="flex items-center text-[#7F27FF] cursor-pointer hover:underline">
                      <span className="text-sm font-medium">Try it now</span>
                      <ChevronRight size={16} />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white"></div>
        <div className="container mx-auto max-w-4xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#E4004B] to-[#7F27FF] rounded-2xl p-10 md:p-12 text-center text-white shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to revolutionize your learning?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join the community of learners who are already mastering new skills with AI-powered education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 bg-white text-[#7F27FF] font-medium rounded-full shadow-md"
                >
                  Get Started Free
                </motion.button>
              </Link>
              <Link href="/quiz/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 bg-transparent border border-white text-white font-medium rounded-full"
                >
                  Create a Quiz
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

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
                AI-powered quiz generation and personalized learning roadmaps.
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