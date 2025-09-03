"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function CreateQuiz() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  return (
    <div className="min-h-screen bg-[#2A1458]">
      {/* Navbar */}
      <div className="relative z-10 flex items-center justify-between px-8 md:px-24 py-6">
        <div>
          <h1 className="text-3xl text-white font-extrabold">EduRumble</h1>
        </div>
        <div className="flex items-center gap-5 md:gap-7">
          <Link href={"/"}>
            <h1 className="text-md font-bold text-white hover:text-[#7965C1]">
              How it works
            </h1>
          </Link>
          <Link href={"/"}>
            <h1 className="text-md font-bold text-white hover:text-[#7965C1]">
              Prices
            </h1>
          </Link>
          <Link href={"/"}>
            <h1 className="text-md font-bold text-white hover:text-[#7965C1]">
              Services
            </h1>
          </Link>
          <Link href={"/"}>
            <h1 className="text-md font-bold text-white hover:text-[#7965C1]">
              About us
            </h1>
          </Link>
          <Link
            href={"/"}
            className="bg-white text-[#7F27FF] px-6 py-2 md:px-10 md:py-3 rounded-lg font-semibold"
          >
            Login
          </Link>
          <Link
            href={"/"}
            className="bg-[#E4004B] text-white px-6 py-2 md:px-10 md:py-3 rounded-lg font-semibold"
          >
            Start a new AI journey
          </Link>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-3xl bg-[#251040]/80 border border-[#7965C1]/30 rounded-2xl shadow-2xl p-10 backdrop-blur-md"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white text-center"
          >
            <span className="text-[#7965C1]">Create</span> Your Own{" "}
            <span className="text-[#E4004B]">AI-Powered Quiz</span>
          </motion.h1>

          <p className="text-gray-300 text-center mt-4">
            Enter a topic and let AI generate questions tailored for you.
          </p>

          {/* Form */}
          <div className="mt-10 space-y-6">
            <div>
              <label className="block text-gray-200 text-sm mb-2">
                Enter Topic or Text
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Data Structures, Machine Learning..."
                className="w-full px-5 py-4 rounded-xl bg-[#2A1458] text-white border border-[#7965C1]/40 focus:border-[#E4004B] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-200 text-sm mb-2">
                Select Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-[#2A1458] text-white border border-[#7965C1]/40 focus:border-[#E4004B] outline-none"
              >
                <option value="easy" className="bg-[#2A1458]">
                  Easy
                </option>
                <option value="medium" className="bg-[#2A1458]">
                  Medium
                </option>
                <option value="hard" className="bg-[#2A1458]">
                  Hard
                </option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Generate Quiz
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* How it Works Section */}
      <div className="bg-white  mt-16 px-8 py-20 md:px-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-black"
        >
          How <span className="text-[#7965C1]">EduRumble</span> Works
        </motion.h2>

        <div className="mt-10 grid md:grid-cols-3 gap-10">
          {[
            {
              step: "1",
              title: "Enter Your Topic",
              desc: "Provide any text or subject and let our AI understand your content.",
            },
            {
              step: "2",
              title: "Choose Difficulty",
              desc: "Pick between Easy, Medium, or Hard to adjust question complexity.",
            },
            {
              step: "3",
              title: "Generate & Play",
              desc: "AI creates tailored quizzes instantly – challenge yourself or compete!",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * i }}
              className="p-6 rounded-2xl border border-gray-200 shadow-md bg-white"
            >
              <div className="text-4xl font-extrabold text-[#7965C1]">
                {item.step}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-black">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
