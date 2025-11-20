'use client';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  Brain,
  Trophy,
  Target,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  TrendingUp,
  ArrowLeft,
  Download,
  Share,
  Star,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';

// ----------------------
// TYPES
// ----------------------

interface Strength {
  questionId: string;
  note: string;
}

interface Weakness {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  inferredTopic: string;
  shortTip: string;
  recommendedExercises: string[];
}

interface StudyPlanDay {
  day: number;
  task: string;
  durationMin: number;
}

interface AdvancedPath {
  suggestedTopics: string[];
  projects: string[];
  timeEstimateWeeks: number;
}

interface Report {
  summary: string;
  score: {
    correct: number;
    total: number;
    percent: number;
  };
  strengths: Strength[];
  weaknesses: Weakness[];
  studyPlan7Days: StudyPlanDay[];
  nextSteps: string[];
  confidence: string;
  advancedPath: AdvancedPath | null;
}

interface Attempt {
  attemptedAt: string;
}

interface APIResponse {
  success: boolean;
  attempt: Attempt;
  report: Report;
}

// ----------------------
// COMPONENT
// ----------------------

const AIReportPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data: session } = useSession();
  const [reportData, setReportData] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const generateReport = async () => {
      try {
        setLoading(true);

        const res = await axios.post<APIResponse>('/api/quiz/getAttemptedQuiz', {
          quizId: id,
          userId: session?.user?._id
        });

        if (res.data.success) {
          setReportData(res.data);
        } else {
          setError("Failed to load report");
        }
      } catch (error) {
        console.error("Error generating report:", error);
        setError('Failed to generate AI report');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?._id) {
      generateReport();
    }
  }, [session?.user?._id, id]);

  // ----------------------
  // Loading Screen
  // ----------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#7F27FF] mx-auto mb-4"></div>
          <p className="text-white text-lg">Generating your AI-powered report...</p>
          <p className="text-[#C4B5FD] text-sm mt-2">Analyzing your performance patterns</p>
        </div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl mb-4">{error || 'Report not available'}</p>
          <Link href="/dashboard" className="text-[#7F27FF] hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { attempt, report } = reportData;

 
  const getScoreColor = (percent: number) => {
    if (percent >= 90) return 'text-green-400';
    if (percent >= 80) return 'text-emerald-400';
    if (percent >= 70) return 'text-yellow-400';
    if (percent >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence?.toLowerCase()) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
      default: return 'text-[#C4B5FD]';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
                >
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/dashboard"
                            className="p-2 bg-[#2A1458]/60 border border-[#7965C1]/30 text-[#C4B5FD] rounded-lg hover:border-[#7965C1]/50 transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Brain size={32} className="text-[#7F27FF]" />
                                AI-Powered Learning Report
                            </h1>
                            <p className="text-[#C4B5FD] mt-1">Personalized insights and recommendations</p>
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

                {/* Main Score Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-[#7F27FF] to-[#E4004B] rounded-2xl p-8 mb-8 shadow-2xl"
                >
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="text-center">
                            <div className={`text-6xl font-bold text-white mb-2 ${getScoreColor(report.score.percent)}`}>
                                {report.score.percent}%
                            </div>
                            <div className="text-white/90 text-lg">Overall Score</div>
                        </div>
                        
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">
                                {report.score.correct}/{report.score.total}
                            </div>
                            <div className="text-white/90">Correct Answers</div>
                        </div>
                        
                        <div className="text-center">
                            <div className={`text-2xl font-bold mb-2 ${getConfidenceColor(report.confidence)}`}>
                                {report.confidence} Confidence
                            </div>
                            <div className="text-white/90">Learning Potential</div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Summary & Strengths */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Executive Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#251040]/50 backdrop-blur-md rounded-2xl p-6 border border-[#7965C1]/30"
                        >
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Lightbulb size={20} className="text-yellow-400" />
                                Executive Summary
                            </h2>
                            <p className="text-[#C4B5FD] leading-relaxed">{report.summary}</p>
                        </motion.div>

                        {/* Strengths */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-[#251040]/50 backdrop-blur-md rounded-2xl p-6 border border-[#7965C1]/30"
                        >
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <TrendingUp size={20} className="text-green-400" />
                                Your Strengths
                            </h2>
                            <div className="space-y-3">
                                {report.strengths.map((strength, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20"
                                    >
                                        <CheckCircle size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-white text-sm">{strength.note}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Areas for Improvement */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-[#251040]/50 backdrop-blur-md rounded-2xl p-6 border border-[#7965C1]/30"
                        >
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Target size={20} className="text-orange-400" />
                                Areas for Improvement
                            </h2>
                            <div className="space-y-4">
                                {report.weaknesses.map((weakness, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20"
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <AlertCircle size={20} className="text-orange-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h3 className="text-white font-semibold">{weakness.inferredTopic}</h3>
                                                <p className="text-[#C4B5FD] text-sm mt-1">{weakness.shortTip}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-red-400">Your answer: </span>
                                                <span className="text-white">{weakness.selectedAnswer}</span>
                                            </div>
                                            <div>
                                                <span className="text-green-400">Correct answer: </span>
                                                <span className="text-white">{weakness.correctAnswer}</span>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <h4 className="text-white text-sm font-semibold mb-2">Recommended Exercises:</h4>
                                            <ul className="text-[#C4B5FD] text-sm space-y-1">
                                                {weakness.recommendedExercises.map((exercise, exIndex) => (
                                                    <li key={exIndex} className="flex items-center gap-2">
                                                        <BookOpen size={12} className="text-[#7F27FF]" />
                                                        {exercise}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Study Plan & Next Steps */}
                    <div className="space-y-6">
                        {/* 7-Day Study Plan */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-[#251040]/50 backdrop-blur-md rounded-2xl p-6 border border-[#7965C1]/30"
                        >
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Calendar size={20} className="text-[#7F27FF]" />
                                7-Day Study Plan
                            </h2>
                            <div className="space-y-3">
                                {report.studyPlan7Days.map((day, index) => (
                                    <motion.div
                                        key={day.day}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.05 * index }}
                                        className="p-3 bg-[#2A1458]/40 rounded-lg border border-[#7965C1]/20"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-white font-semibold">Day {day.day}</span>
                                            <span className="text-[#C4B5FD] text-sm flex items-center gap-1">
                                                <Clock size={12} />
                                                {day.durationMin}min
                                            </span>
                                        </div>
                                        <p className="text-[#C4B5FD] text-sm">{day.task}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Next Steps */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-[#251040]/50 backdrop-blur-md rounded-2xl p-6 border border-[#7965C1]/30"
                        >
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Star size={20} className="text-yellow-400" />
                                Next Steps
                            </h2>
                            <div className="space-y-2">
                                {report.nextSteps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="flex items-center gap-3 text-sm"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-[#7F27FF] flex items-center justify-center text-white text-xs font-bold">
                                            {index + 1}
                                        </div>
                                        <span className="text-[#C4B5FD]">{step}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quiz Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-[#251040]/50 backdrop-blur-md rounded-2xl p-6 border border-[#7965C1]/30"
                        >
                            <h2 className="text-xl font-bold text-white mb-4">Quiz Details</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[#C4B5FD]">Attempted On</span>
                                    <span className="text-white">{formatDate(attempt.attemptedAt)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#C4B5FD]">Total Questions</span>
                                    <span className="text-white">{report.score.total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#C4B5FD]">Correct Answers</span>
                                    <span className="text-green-400">{report.score.correct}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#C4B5FD]">Score</span>
                                    <span className={`font-semibold ${getScoreColor(report.score.percent)}`}>
                                        {report.score.percent}%
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-8 py-3 bg-[#2A1458]/60 border border-[#7965C1]/30 text-white rounded-xl"
                        >
                            Back to Dashboard
                        </motion.button>
                    </Link>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#7F27FF] to-[#E4004B] text-white rounded-xl"
                    >
                        Start Study Plan
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}

export default AIReportPage;