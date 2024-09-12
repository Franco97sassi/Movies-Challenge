"use client";

import { useState } from 'react';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      router.push('/');
    } catch (error: any) {
      console.error('Error logging in:', error);
      setError(error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </label>
          <label className="block mb-4 text-gray-700 dark:text-gray-300">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-600 w-full"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;