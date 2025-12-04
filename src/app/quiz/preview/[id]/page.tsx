'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Play, Users, Clock, BarChart3 } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Question {
    question: string;
    options: string[];
    answer: string;
    _id: string;
}

interface Quiz {
    _id: string;
    title: string;
    description: string;
    questions: Question[];
    createdAt: string;
    createdBy: string;
    isLive: boolean;
    participants: any[];
    winner: null | string;
    __v: number;
}

interface ApiResponse {
    success: boolean;
    quiz?: Quiz;
    message: string;
}

const QuizPreviewPage = () => {
    const params = useParams() as { id: string };
    const router = useRouter();
    const { id } = params;

    const { data: session, status } = useSession();

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleMakeLive = () => {
        router.push(`/quiz/${id}`);
    };

    useEffect(() => {
        if (!id) return;

        // Wait until session is resolved
        if (status === 'loading') return;

        const fetchQuizWithAuth = async () => {
            try {
                setLoading(true);
                setError('');

                // Get userId from session
                const userAny = session?.user as any;
                const userId = userAny?._id || userAny?.id;

                if (!userId) {
                    setError('User not logged in');
                    return;
                }

                // 1) Check ownership / authorization
                const checkRes = await axios.post('/api/quiz/checkowner', {
                    quizId: id,
                    userId,
                });

                if (!checkRes.data?.success) {
                    setError(checkRes.data?.message || 'You are not authorized to view this quiz.');
                    return;
                }

                // 2) If authorized, fetch quiz data
                const res = await axios.post<ApiResponse>('/api/quiz/get', { id });

                if (!res.data.success || !res.data.quiz) {
                    setError(res.data.message || 'Failed to load quiz.');
                    return;
                }

                setQuiz(res.data.quiz);
            } catch (err: any) {
                if (axios.isAxiosError(err) && err.response) {
                    const msg = (err.response.data as any)?.message;
                    const statusCode = err.response.status;

                    if (statusCode === 401) {
                        setError(msg || 'You are not authorized to view this quiz.');
                    } else if (statusCode === 404) {
                        setError(msg || 'Quiz not found.');
                    } else {
                        setError(msg || 'Something went wrong while loading the quiz.');
                    }
                } else {
                    setError('Something went wrong while loading the quiz.');
                }
            } finally {
                setLoading(false);
            }
        };

        // If unauthenticated, show error
        if (status === 'unauthenticated') {
            setError('Please log in to view this quiz.');
            setLoading(false);
            return;
        }

        fetchQuizWithAuth();
    }, [id, session, status]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7F27FF]" />
            </div>
        );
    }

    if (error || !quiz) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] flex items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Access Issue</h2>
                    <p className="text-[#C4B5FD] mb-4">
                        {error || 'Quiz not found'}
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-2 px-4 py-2 rounded-lg bg-[#7F27FF] text-white font-medium"
                    >
                        Go back home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-white">{quiz.title}</h1>
                        <p className="text-[#C4B5FD] mt-2">{quiz.description}</p>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                >
                    <div className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-4 border border-[#7965C1]/30">
                        <div className="flex items-center gap-2 text-[#C4B5FD]">
                            <BarChart3 size={20} />
                            <span className="text-sm">Questions</span>
                        </div>
                        <div className="text-2xl font-bold text-white mt-2">
                            {quiz.questions.length}
                        </div>
                    </div>

                    <div className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-4 border border-[#7965C1]/30">
                        <div className="flex items-center gap-2 text-[#C4B5FD]">
                            <Users size={20} />
                            <span className="text-sm">Participants</span>
                        </div>
                        <div className="text-2xl font-bold text-white mt-2">
                            {quiz.participants.length}
                        </div>
                    </div>

                    <div className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-4 border border-[#7965C1]/30">
                        <div className="flex items-center gap-2 text-[#C4B5FD]">
                            <Clock size={20} />
                            <span className="text-sm">Created</span>
                        </div>
                        <div className="text-sm text-white mt-2">
                            {formatDate(quiz.createdAt)}
                        </div>
                    </div>

                    <div className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-4 border border-[#7965C1]/30">
                        <div className="flex items-center gap-2 text-[#C4B5FD]">
                            <Eye size={20} />
                            <span className="text-sm">Status</span>
                        </div>
                        <div
                            className={`text-sm font-medium mt-2 ${
                                quiz.isLive ? 'text-green-400' : 'text-amber-400'
                            }`}
                        >
                            {quiz.isLive ? 'Live' : 'Draft'}
                        </div>
                    </div>
                </motion.div>

                {/* Make Live Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleMakeLive}
                        className="w-full py-4 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#E4004B]/30"
                    >
                        <Play size={20} />
                        {quiz.isLive ? 'Quiz is Live - Manage' : 'Make Quiz Live'}
                    </motion.button>
                </motion.div>

                {/* Questions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">Questions</h2>

                    {quiz.questions.map((question, index) => (
                        <motion.div
                            key={question._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-6 border border-[#7965C1]/30"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-white">
                                    {index + 1}. {question.question}
                                </h3>
                                <span className="px-2 py-1 bg-[#7F27FF]/20 text-[#7F27FF] text-xs rounded-full">
                                    {index + 1}/{quiz.questions.length}
                                </span>
                            </div>

                            <div className="grid gap-3">
                                {question.options.map((option, optIndex) => {
                                    const isCorrect = option === question.answer;
                                    return (
                                        <div
                                            key={optIndex}
                                            className={`p-3 rounded-lg border ${
                                                isCorrect
                                                    ? 'bg-green-500/10 border-green-500/30 text-green-200'
                                                    : 'bg-[#2A1458]/60 border-[#7965C1]/30 text-white'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                                        isCorrect
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-[#7965C1]/30 text-[#C4B5FD]'
                                                    }`}
                                                >
                                                    {String.fromCharCode(65 + optIndex)}
                                                </div>
                                                <span>{option}</span>
                                                {isCorrect && (
                                                    <span className="ml-auto text-green-400 text-sm">
                                                        Correct answer
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default QuizPreviewPage;
