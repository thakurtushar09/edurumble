"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2734] via-[#2b3b52] to-[#3c4c70] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6"
      >
        <div className="flex justify-center mb-4">
          <Image src="/login_gif.gif" alt="Robot" width={120} height={120} className="drop-shadow-md" />
        </div>

        <h2 className="text-2xl text-center font-bold text-white mb-2">
          Welcome <span className="text-[#a7b8eb]">Back</span>!
        </h2>
        <p className="text-gray-300 text-center mb-6 text-sm">
          Sign in to access your AI-powered quizzes
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-xs block mb-1">Email</label>
            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg border border-white/20 px-3 py-2 focus-within:border-[#a7b8eb] transition">
              <Mail className="text-gray-300 w-4 h-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="ml-2 bg-transparent outline-none text-white placeholder-gray-400 w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-xs block mb-1">Password</label>
            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg border border-white/20 px-3 py-2 focus-within:border-[#a7b8eb] transition">
              <Lock className="text-gray-300 w-4 h-4" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="ml-2 bg-transparent outline-none text-white placeholder-gray-400 w-full text-sm"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 mt-4 bg-gradient-to-r from-[#6e82b7] to-[#a7b8eb] rounded-lg text-white font-semibold shadow-md hover:shadow-[#a7b8eb]/40 transition"
          >
            Sign In
          </motion.button>

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <a href="#" className="hover:text-[#a7b8eb]">Forgot Password?</a>
            <a href="#" className="hover:text-[#a7b8eb]">Create Account</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
