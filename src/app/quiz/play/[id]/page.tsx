"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [start, setStart] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; selected: string }[]>([]);

  const { id } = useParams() as { id: string };
  const { data: session, status } = useSession();

  const handleOptionClick = (questionId: string, option: string) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, selected: option } : a
        );
      } else {
        return [...prev, { questionId, selected: option }];
      }
    });
  };

  const handleNextClick = () => {
    if (!quiz) return;
    if (current === quiz.questions.length - 1) {
      handleFinishQuiz();
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const handleFinishQuiz = async () => {
    if (!quiz || !session?.user?._id) {
      alert("Please login to submit the quiz");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/quiz/attempt", {
        quizId: quiz._id,
        userId: session.user._id,
        answers,
      });

      if (res.data.success) {
        setQuizFinished(true);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = async () => {
    if (status !== "authenticated" || !session?.user?._id) {
      alert("Please login to start the quiz");
      return;
    }

    try {
      setLoading(true);

      const statusRes = await axios.post("/api/quiz/checkstatus", {
        quizId: id,
      });

      if (!statusRes.data.success) {
        setError(statusRes.data.message || "Quiz not available");
        return;
      }

      const res = await axios.post("/api/quiz/addPartcipant", {
        quizId: id,
        userId: session.user._id,
      });

      if (res.data.success) {
        setStart(true);
      } else {
        setError(res.data.message || "Failed to join quiz");
      }
    } catch (error: any) {
      if (error.response?.status === 403 || error.response?.status === 404) {
        setError(error.response.data?.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await axios.post("/api/quiz/get", { id });
        setQuiz(res.data.quiz);
      } catch (error) {
        setError("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchQuiz();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7F27FF]"></div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43]">
        <div className="text-white text-xl">{error || "Quiz not found"}</div>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Quiz Finished!</h1>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white font-bold rounded-xl"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!start) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43]">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-4">{quiz.title}</h1>
          <p className="text-[#C4B5FD] text-lg mb-6">{quiz.description}</p>

          {error && <div className="text-red-400 mb-4">{error}</div>}

          <div className="bg-[#251040]/50 rounded-xl p-6 border border-[#7965C1]/30 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm text-[#C4B5FD]">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{quiz.questions.length}</div>
                <div>Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{quiz.participants.length}</div>
                <div>Participants</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="px-8 py-4 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white font-bold rounded-xl"
          >
            {status === "loading" ? "Checking Session..." : "Start Now"}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[current];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{quiz.title}</h1>
          <p className="text-[#C4B5FD]">{quiz.description}</p>
        </div>

        <div className="bg-[#251040]/50 rounded-xl p-4 border border-[#7965C1]/30 mb-6">
          <div className="flex justify-between items-center text-sm text-[#C4B5FD] mb-2">
            <span>
              Question {current + 1} of {quiz.questions.length}
            </span>
            <span>{Math.round(((current + 1) / quiz.questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-[#2A1458] rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#E4004B] to-[#7F27FF] h-2 rounded-full"
              style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-[#251040]/50 rounded-xl p-6 border border-[#7965C1]/30 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers.find(
                (a) => a.questionId === currentQuestion._id && a.selected === option
              );

              return (
                <div
                  key={index}
                  onClick={() => handleOptionClick(currentQuestion._id, option)}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#E4004B] to-[#7F27FF] border-[#7F27FF]"
                      : "bg-[#2A1458]/60 border-[#7965C1]/30"
                  } text-white`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#7965C1]/30 flex items-center justify-center font-medium">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleNextClick}
          className="w-full py-4 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white font-bold rounded-xl"
        >
          {current === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Page;
