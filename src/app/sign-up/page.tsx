"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { User, Mail, Lock, IdCard } from "lucide-react";
import axios from 'axios'
import { useRouter } from "next/navigation";


export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const res = await axios.post("/api/auth/sign-up", form);
    console.log(res.data);

    if (res.data.success) {
      router.push(`/verify/${res.data.userId}`);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {

      console.log(error.response?.data?.message || "Signup failed");
    } else {
      console.log("Something went wrong");
    }
    console.error("Signup error:", error);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2734] via-[#2b3b52] to-[#3c4c70] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6"
      >
        <div className="flex justify-center mb-4">
          <Image
            src="/signup_gif.gif"
            alt="Robot using laptop"
            width={100}
            height={100}
            className="drop-shadow-md"
          />
        </div>
        <h2 className="text-2xl text-center font-bold text-white mb-2">
          Create <span className="text-[#a7b8eb]">Account</span>
        </h2>
        <p className="text-gray-300 text-center mb-6 text-sm">
          Join EduRumble and start your AI journey 🚀
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-gray-300 text-sm block mb-1">Username</label>
            <div className="flex items-center bg-white/20 rounded-lg border border-white/20 px-3 py-2 focus-within:border-[#a7b8eb] transition">
              <User className="text-gray-300 w-5 h-5" />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="cool_username"
                className="ml-2 bg-transparent outline-none text-white placeholder-gray-400 w-full text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm block mb-1">Email</label>
            <div className="flex items-center bg-white/20 rounded-lg border border-white/20 px-3 py-2 focus-within:border-[#a7b8eb] transition">
              <Mail className="text-gray-300 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="ml-2 bg-transparent outline-none text-white placeholder-gray-400 w-full text-sm"
              />
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-gray-300 text-sm block mb-1">Full Name</label>
            <div className="flex items-center bg-white/20 rounded-lg border border-white/20 px-3 py-2 focus-within:border-[#a7b8eb] transition">
              <IdCard className="text-gray-300 w-5 h-5" />
              <input
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                placeholder="John Doe"
                className="ml-2 bg-transparent outline-none text-white placeholder-gray-400 w-full text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm block mb-1">Password</label>
            <div className="flex items-center bg-white/20 rounded-lg border border-white/20 px-3 py-2 focus-within:border-[#a7b8eb] transition">
              <Lock className="text-gray-300 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="ml-2 bg-transparent outline-none text-white placeholder-gray-400 w-full text-sm"
              />
            </div>
          </div>

          {/* Signup Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-2.5 mt-4 bg-gradient-to-r from-[#6e82b7] to-[#a7b8eb] rounded-lg text-white font-semibold text-sm shadow-md hover:shadow-[#a7b8eb]/40 transition"
          >
            Sign Up
          </motion.button>

          {/* Switch to Login */}
          <div className="flex justify-center text-sm text-gray-400 mt-3">
            <p>
              Already have an account?{" "}
              <a href="/login" className="hover:text-[#a7b8eb] font-medium">
                Log In
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
