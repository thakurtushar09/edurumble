'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function VerifyPage() {
  const { userId } = useParams(); 
  const router = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    try {
      setLoading(true);
      setMessage('');
      const res = await axios.post('/api/auth/verify', {
        userId,
        code,
      });

      if (res.data.success) {
        setMessage('✅ Verification successful! Redirecting...');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setMessage(`❌ ${res.data.message}`);
      }
    } catch (error: any) {
      console.error(error);
      setMessage('❌ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a2734] via-[#2b3b52] to-[#3c4c70] px-4">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Verify Your Account</h1>
        <p className="text-gray-300 text-sm mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/20 text-white placeholder-gray-400 text-center text-lg tracking-widest focus:outline-none focus:border-[#a7b8eb]"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full mt-4 py-2.5 bg-gradient-to-r from-[#6e82b7] to-[#a7b8eb] rounded-lg text-white font-semibold text-sm shadow-md hover:shadow-[#a7b8eb]/40 transition disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>

        {message && (
          <p className="mt-4 text-sm text-gray-200">{message}</p>
        )}
      </div>
    </div>
  );
}
