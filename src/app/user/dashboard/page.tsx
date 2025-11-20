"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  BarChart3,
  Target,
  Brain,
  TrendingUp,
  BookOpen,
  Zap,
  Calendar,
  Clock,
  Eye,
} from "lucide-react";

const UserDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);
  

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?._id) return;
      try {
        setLoading(true);
        const res = await axios.post("/api/auth/dashboard", {
          userId: session.user._id,
        });
        
        const transformedData = {
          name: session.user.name,
          stats: {
            totalQuizzes: res.data.data.length,
            attemptedQuizzes: res.data.data.length,
            averageScore:
              Math.round(
                res.data.data.reduce((acc: any, quiz: any) => acc + quiz.score, 0) /
                  res.data.data.length
              ) * 20 || 0,
            currentStreak: 0, 
          },
          
          
          recentQuizzes: res.data.data.map((quiz: any) => ({
            id:quiz.quizId,
            title: quiz.quizTitle,
            totalQuestions: quiz.totalQuestions,
            score: (quiz.score / quiz.totalQuestions) * 100, 
            attemptedAt: quiz.attemptedAt,
            date: quiz.attemptedAt,
            timeSpent: "N/A", 
            correctAnswers: quiz.correctAnswers,
          })),
        };
        

        setUserData(transformedData);
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && session?.user?._id) {
      fetchData();
    }
  }, [status, session?.user?._id]);

  const handleGenerateReport = async (quizId: string) => {
    
    
    setReportLoading(true);
    setTimeout(() => {
      router.push(`/quiz/report/${quizId}`)
    }, 1500);
  
  };

  const handleViewClick = async (quizId:string)=>{
    console.log(quizId);
    router.push(`/user/quiz/${quizId}`);
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-emerald-400";
    if (score >= 70) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  // 🌀 Loading UI
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0628] text-white text-lg">
        Loading dashboard...
      </div>
    );
  }

  // 🚫 Failed to load
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0628] text-red-400 text-lg">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {userData.name || "User"}! 👋
            </h1>
            <p className="text-[#C4B5FD] mt-2">
              Track your learning progress and quiz performance
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white rounded-xl flex items-center gap-2"
          >
            <Zap size={20} />
            Create New Quiz
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              icon: BookOpen,
              color: "#7F27FF",
              label: "Total Quizzes",
              value: userData.stats?.totalQuizzes,
            },
            {
              icon: Target,
              color: "#00C851",
              label: "Attempted",
              value: userData.stats?.attemptedQuizzes,
            },
            {
              icon: BarChart3,
              color: "#E4004B",
              label: "Average Score",
              value: `${userData.stats?.averageScore}%`,
            },
            {
              icon: TrendingUp,
              color: "#FFD43B",
              label: "Current Streak",
              value: `${userData.stats?.currentStreak} days`,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#251040]/50 backdrop-blur-md rounded-2xl p-6 border border-[#7965C1]/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-[#C4B5FD] text-sm">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-white">
                    {stat.value}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Recent Quizzes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#251040]/50 backdrop-blur-md rounded-2xl p-6 border border-[#7965C1]/30"
        >
          <h2 className="text-xl font-bold text-white mb-6">
            Recent Quiz Attempts
          </h2>
          <div className="space-y-4">
            {userData.recentQuizzes?.length > 0 ? (
              userData.recentQuizzes.map((quiz: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="bg-[#2A1458]/40 rounded-xl p-4 border border-[#7965C1]/20"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white">{quiz.title}</h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${getScoreColor(
                            quiz.score
                          )} bg-opacity-20`}
                        >
                          {quiz.score}%
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#C4B5FD]">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(quiz.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {quiz.timeSpent}
                        </div>
                        <div className="flex items-center gap-1">
                          <Target size={14} />
                          {quiz.correctAnswers}/{quiz.totalQuestions} correct
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGenerateReport(quiz.id)}
                        disabled={reportLoading}
                        className="px-4 py-2 bg-gradient-to-r from-[#7F27FF] to-[#E4004B] text-white text-sm rounded-lg flex items-center gap-2 disabled:opacity-50"
                      >
                        <Brain size={16} />
                        {reportLoading ? "Generating..." : "AI Report"}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewClick(quiz.id)}
                        className="p-2 bg-[#2A1458]/60 border border-[#7965C1]/30 text-[#C4B5FD] rounded-lg"
                      >
                        <Eye size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-[#C4B5FD]">No recent quiz attempts found.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
