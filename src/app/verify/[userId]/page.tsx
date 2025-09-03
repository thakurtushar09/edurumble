'use client'
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

const VerifyPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/verify", {
        userId,
        code,
      });

      setMessage(res.data.message);

      if (res.data.success) {
        // wait 1.5s before redirecting
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 min-h-screen justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Verify Your Account</h1>
      <p className="text-gray-400">Enter the code sent to your email</p>

      <input
        type="text"
        placeholder="Enter 6-digit code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border border-gray-600 bg-transparent p-2 rounded w-64 text-center"
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-semibold disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default VerifyPage;
