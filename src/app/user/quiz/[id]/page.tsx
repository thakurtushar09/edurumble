'use client';
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  BarChart3,
  Trophy,
  Brain,
  ArrowLeft,
  Share,
  Download
} from "lucide-react";
import Link from "next/link";

// ----------------------
// Types
// ----------------------

interface Answer {
  questionId?: string; // may be missing, fall back to index
  isCorrect: boolean;
  selectedAnswer: string;
  correctAnswer: string;
}

interface QuizData {
  answers: Answer[];
  score: number; // points (your original code used `score` alongside percentage)
  attemptedAt: string; // ISO string
  quiz?: any;
}

interface GetAttemptedQuizResponse {
  success: boolean;
  getAttemptedQuiz?: QuizData[]; // API returns array; we take index 0
}

// ----------------------
// Component
// ----------------------

const QuizResultsPage: React.FC = () => {
  const params = useParams();
  // useParams() can return string | string[] | undefined depending on route, so cast safely to string | undefined
  const id = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string | undefined);

  const router = useRouter();
  const { data: session, status } = useSession();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (status === "unauthenticated") {
      // router.push returns void; no need to await
      router.push("/login");
      return;
    }

    const getQuiz = async () => {
      try {
        setLoading(true);

        const payload = {
          quizId: id,
          userId: (session?.user as any)?._id ?? (session?.user as any)?.id, // try both _id and id
        };

        const res = await axios.post<GetAttemptedQuizResponse>('/api/quiz/getAttemptedQuiz', payload);

        if (res.data.success && Array.isArray(res.data.getAttemptedQuiz) && res.data.getAttemptedQuiz.length > 0) {
          setQuizData(res.data.getAttemptedQuiz[0]);
        } else {
          setError("No quiz results found");
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Failed to load quiz results");
      } finally {
        setLoading(false);
      }
    };

    // call only when user id is available (either _id or id)
    const hasUserId = !!((session?.user as any)?._id || (session?.user as any)?.id);
    if (hasUserId && id) {
      getQuiz();
    } else {
      // if user is authenticated but we don't yet have session.user id, stop loading
      if (status === "authenticated" && !hasUserId) {
        setLoading(false);
        setError("User id not available in session");
      }
    }
  }, [status, router, session, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7F27FF]"></div>
      </div>
    );
  }

  if (error || !quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] flex items-center justify-center">
        <div className="text-white text-xl text-center">
          <p>{error || "Quiz results not found"}</p>
          <Link href="/dashboard" className="text-[#7F27FF] hover:underline mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Destructure with fallback values to satisfy TS
  const { answers = [], score = 0, attemptedAt = new Date().toISOString(), quiz } = quizData;

  const totalQuestions = answers.length;
  const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const getScoreColor = (s: number): string => {
    if (s >= 80) return 'text-green-400';
    if (s >= 60) return 'text-yellow-400';
    if (s >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (s: number): string => {
    if (s >= 80) return 'bg-green-500/20 border-green-500/30';
    if (s >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    if (s >= 40) return 'bg-orange-500/20 border-orange-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const formatDate = (dateString: string): string => {
    // guard: if invalid date string, return original
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/user/dashboard"
              className="p-2 bg-[#2A1458]/60 border border-[#7965C1]/30 text-[#C4B5FD] rounded-lg hover:border-[#7965C1]/50 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Quiz Results</h1>
              <p className="text-[#C4B5FD] mt-1">Detailed analysis of your performance</p>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#2A1458]/60 border border-[#7965C1]/30 text-[#C4B5FD] rounded-lg flex items-center gap-2"
            >
              <Share size={16} />
              Share
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#2A1458]/60 border border-[#7965C1]/30 text-[#C4B5FD] rounded-lg flex items-center gap-2"
            >
              <Download size={16} />
              Export
            </motion.button>
          </div>
        </motion.div>

        {/* Score Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {/* Main Score Card */}
          <div className="md:col-span-2 bg-[#251040]/50 backdrop-blur-md rounded-2xl p-6 border border-[#7965C1]/30">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className={`w-32 h-32 rounded-full ${getScoreBgColor(percentage)} border-8 flex items-center justify-center`}>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
                    {percentage}%
                  </div>
                  <div className="text-[#C4B5FD] text-sm mt-1">Score</div>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4">Performance Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{correctAnswers}</div>
                    <div className="text-[#C4B5FD] text-sm">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{totalQuestions - correctAnswers}</div>
                    <div className="text-[#C4B5FD] text-sm">Incorrect</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{totalQuestions}</div>
                    <div className="text-[#C4B5FD] text-sm">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{score}</div>
                    <div className="text-[#C4B5FD] text-sm">Points</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <div className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-4 border border-[#7965C1]/30">
              <div className="flex items-center gap-3 text-[#C4B5FD] mb-2">
                <Calendar size={18} />
                <span className="text-sm">Attempted On</span>
              </div>
              <div className="text-white text-sm">{formatDate(attemptedAt)}</div>
            </div>

            <div className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-4 border border-[#7965C1]/30">
              <div className="flex items-center gap-3 text-[#C4B5FD] mb-2">
                <Trophy size={18} />
                <span className="text-sm">Performance</span>
              </div>
              <div className={`text-sm font-medium ${getScoreColor(percentage)}`}>
                {percentage >= 80 ? 'Excellent!' :
                  percentage >= 60 ? 'Good Job!' :
                    percentage >= 40 ? 'Keep Practicing!' : 'Needs Improvement'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Report Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-[#7F27FF] to-[#E4004B] text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-[#7F27FF]/30"
          >
            <Brain size={20} />
            Generate AI-Powered Detailed Report
          </motion.button>
        </motion.div>

        {/* Questions Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#251040]/50 backdrop-blur-md rounded-2xl p-6 border border-[#7965C1]/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Question Review</h2>

          <div className="space-y-6">
            {answers.map((answer, index) => (
              <motion.div
                key={answer.questionId ?? index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-6 rounded-xl border ${
                  answer.isCorrect
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-white">Q{index + 1}</span>
                    {answer.isCorrect ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : (
                      <XCircle size={20} className="text-red-400" />
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    answer.isCorrect
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {answer.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                {/* Question Content */}
                <div className="mb-4">
                  <p className="text-white font-medium mb-3">
                    {/* Replace this with actual question text from your database if available */}
                    Question about JavaScript fundamentals...
                  </p>
                </div>

                {/* Answers Comparison */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={`p-3 rounded-lg ${
                    !answer.isCorrect
                      ? 'bg-red-500/20 border border-red-500/30'
                      : 'bg-[#2A1458]/60 border border-[#7965C1]/30'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        !answer.isCorrect
                          ? 'bg-red-500 text-white'
                          : 'bg-[#7965C1] text-white'
                      }`}>
                        A
                      </div>
                      <span className="text-[#C4B5FD] text-sm">Your Answer</span>
                    </div>
                    <p className="text-white">{answer.selectedAnswer}</p>
                  </div>

                  <div className={`p-3 rounded-lg ${
                    answer.isCorrect
                      ? 'bg-green-500/20 border border-green-500/30'
                      : 'bg-[#2A1458]/60 border border-[#7965C1]/30'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        answer.isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-[#7965C1] text-white'
                      }`}>
                        B
                      </div>
                      <span className="text-[#C4B5FD] text-sm">Correct Answer</span>
                    </div>
                    <p className="text-white">{answer.correctAnswer}</p>
                  </div>
                </div>

                {/* Explanation (would come from your database) */}
                {!answer.isCorrect && (
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-300 text-sm">
                      <strong>Explanation:</strong> The correct answer is "{answer.correctAnswer}" because...
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/user/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3 bg-[#2A1458]/60 border border-[#7965C1]/30 text-white rounded-xl"
            >
              Back to Dashboard
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizResultsPage;
