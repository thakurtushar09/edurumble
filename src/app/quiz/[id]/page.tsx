'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Play, Users, Clock, BarChart3, Copy, ExternalLink, ArrowLeft } from 'lucide-react';

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

interface Question {
    question: string;
    options: string[];
    answer: string;
    _id: string;
}

interface ApiResponse {
    success: boolean;
    quiz?: Quiz;
    message: string;
}

const QuizManagementPage = () => {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const quizLink = `localhost:3000/quiz/play/${id}`;

    const handleMakeLive = async () => {
        try {
            const res = await axios.post('/api/quiz/make-live', { id });
            if (res.data.success) {
                setQuiz(prev => prev ? { ...prev, isLive: true } : null);
            }
        } catch (error) {
            console.error("Failed to make quiz live:", error);
            setError("Failed to make quiz live");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(quizLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openQuiz = () => {
        window.open(quizLink, '_blank');
    };

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setLoading(true);
                const res = await axios.post(`/api/quiz/get`, { id });
                setQuiz(res.data.quiz);
                console.log(res.data.quiz);
                setLoading(false);
            } catch (error) {
                setError("Failed to load quiz");
                setLoading(false);
                console.error(error);
            }
        };

        if (id) fetchQuiz();
    }, [id]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7F27FF]"></div>
            </div>
        );
    }

    if (error || !quiz) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] flex items-center justify-center">
                <div className="text-white text-xl">{error || 'Quiz not found'}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header with back button */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
                >
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-[#251040]/50 hover:bg-[#251040] transition-colors"
                        >
                            <ArrowLeft size={20} className="text-white" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-white">{quiz.title}</h1>
                            <p className="text-[#C4B5FD] mt-2">{quiz.description}</p>
                        </div>
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
                        <div className="text-2xl font-bold text-white mt-2">{quiz.questions.length}</div>
                    </div>

                    <div className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-4 border border-[#7965C1]/30">
                        <div className="flex items-center gap-2 text-[#C4B5FD]">
                            <Users size={20} />
                            <span className="text-sm">Participants</span>
                        </div>
                        <div className="text-2xl font-bold text-white mt-2">{quiz.participants.length}</div>
                    </div>

                    <div className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-4 border border-[#7965C1]/30">
                        <div className="flex items-center gap-2 text-[#C4B5FD]">
                            <Clock size={20} />
                            <span className="text-sm">Created</span>
                        </div>
                        <div className="text-sm text-white mt-2">{formatDate(quiz.createdAt)}</div>
                    </div>

                    <div className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-4 border border-[#7965C1]/30">
                        <div className="flex items-center gap-2 text-[#C4B5FD]">
                            <Eye size={20} />
                            <span className="text-sm">Status</span>
                        </div>
                        <div
                            className={`text-sm font-medium mt-2 ${quiz.isLive ? 'text-green-400' : 'text-amber-400'
                                }`}
                        >
                            {quiz.isLive ? 'Live' : 'Draft'}
                        </div>
                    </div>
                </motion.div>

                {/* Make Live Button and URL Sharing */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    {!quiz.isLive ? (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleMakeLive}
                            className="w-full py-4 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#E4004B]/30"
                        >
                            <Play size={20} />
                            Start Quiz Now
                        </motion.button>
                    ) : (
                        <div className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-6 border border-[#7965C1]/30">
                            <h2 className="text-xl font-bold text-white mb-4">Share Quiz URL</h2>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <p className="text-[#C4B5FD] text-sm mb-2">Share this URL with participants:</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-full bg-[#2A1458]/60 border border-[#7965C1]/30 text-white rounded-lg py-2 px-3 text-sm font-mono">
                                            {quizLink}
                                        </div>
                                        <button
                                            onClick={copyToClipboard}
                                            className="p-3 bg-[#7F27FF] hover:bg-[#6A1FC1] rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            {copied ? (
                                                <span className="text-green-400 text-sm">Copied!</span>
                                            ) : (
                                                <>
                                                    <Copy size={18} className="text-white" />
                                                    <span className="text-white text-sm">Copy</span>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={openQuiz}
                                            className="p-3 bg-[#E4004B] hover:bg-[#C3003F] rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <ExternalLink size={18} className="text-white" />
                                            <span className="text-white text-sm">Open</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Participants List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-6 border border-[#7965C1]/30"
                >
                    <h2 className="text-xl font-bold text-white mb-4">Participants ({quiz.participants.length})</h2>
                    
                    {quiz.participants.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[#7965C1]/30">
                                        <th className="text-left text-[#C4B5FD] py-2">Name</th>
                                        <th className="text-left text-[#C4B5FD] py-2">Score</th>
                                        <th className="text-left text-[#C4B5FD] py-2">Time Taken</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quiz.participants.map((participant, index) => (
                                        <tr key={index} className="border-b border-[#7965C1]/10 last:border-0">
                                            <td className="py-3 text-white">
                                                {participant.name || `Participant ${index + 1}`}
                                            </td>
                                            <td className="py-3 text-white">
                                                {participant.score !== undefined ? `${participant.score}/${quiz.questions.length}` : 'N/A'}
                                            </td>
                                            <td className="py-3 text-white">
                                                {participant.timeTaken ? `${participant.timeTaken}s` : 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-[#C4B5FD]">
                            <Users size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No participants yet. Share the quiz URL to get participants.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default QuizManagementPage;