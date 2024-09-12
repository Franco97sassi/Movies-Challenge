"use client";

import { useState } from 'react';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      router.push('/login');   
    } catch (error: any) {
      console.error('Error registering:', error);
      setError(error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-center">Register</h1>
        <form onSubmit={handleRegister}>
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
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </label>
          <label className="block mb-4 text-gray-700 dark:text-gray-300">
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </label>
          {error && (
            <p className="text-red-600 dark:text-red-400 mb-4 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-600 w-full"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;