'use client'
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Lock } from 'lucide-react';
import Link from 'next/link';

const VerifyPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleVerify = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/verify", {
        userId,
        code,
      });

      setMessage(res.data.message);
      setIsSuccess(res.data.success);

      if (res.data.success) {
        // wait 1.5s before redirecting to login
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Something went wrong");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0628] via-[#2A1458] to-[#1E0B43] py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] rounded-3xl opacity-20 blur-xl"></div>
          <div className="relative bg-[#251040]/90 backdrop-blur-xl rounded-2xl border border-[#7965C1]/30 shadow-2xl p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] rounded-2xl mb-4"
              >
                <Mail size={28} className="text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-[#C4B5FD] bg-clip-text text-transparent">
                Verify Your Account
              </h2>
              <p className="mt-2 text-[#C4B5FD]">Enter the verification code sent to your email</p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-[#C4B5FD] mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-[#7965C1]" />
                  </div>
                  <input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="pl-10 appearance-none relative block w-full px-3 py-3 border border-[#7965C1]/40 bg-[#2A1458]/60 placeholder-[#7965C1] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F27FF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVerify}
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#E4004B] to-[#7F27FF] hover:shadow-lg hover:shadow-[#E4004B]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7F27FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles size={16} className="mr-2" />
                    Verify Account
                  </div>
                )}
              </motion.button>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`px-4 py-3 rounded-lg text-sm flex items-center ${
                    isSuccess 
                      ? "bg-green-500/10 border border-green-500/30 text-green-500" 
                      : "bg-red-500/10 border border-red-500/30 text-red-500"
                  }`}
                >
                  <div className="flex-1">{message}</div>
                </motion.div>
              )}

              <div className="text-center">
                <p className="text-sm text-[#C4B5FD]">
                  Didn't receive the code?{' '}
                  <button className="font-medium text-[#7F27FF] hover:text-white transition-colors">
                    Resend code
                  </button>
                </p>
              </div>

              <div className="pt-4 border-t border-[#7965C1]/30 text-center">
                <p className="text-sm text-[#C4B5FD]">
                  Return to{' '}
                  <Link href="/auth/signin" className="font-medium text-[#7F27FF] hover:text-white transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyPage;