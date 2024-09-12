import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../utils/firebase'; 
import { signOut } from 'firebase/auth';

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); 
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-4 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
        <Link href="/">
          <p className="text-2xl font-bold">Movie Recommendation App</p>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold p-2 rounded-lg transition duration-200"
              >
                Sign Out
              </button>
              <Link href="/favorites">
                <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200">
                  Favorite Movies
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg transition duration-200">
                  Log In
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-lg transition duration-200">
                  Register
                </button>
              </Link>
            </div>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="h-6 w-6" />
          </button>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-800 dark:text-gray-200"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="h-6 w-6" />
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col items-center mt-20 space-y-6">
          {user ? (
            <>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold p-2 rounded-lg transition duration-200"
              >
                Sign Out
              </button>
              <Link href="/favorites">
                <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200">
                  Películas Favoritas
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg transition duration-200">
                  Log In
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-lg transition duration-200">
                  Register
                </button>
              </Link>
            </>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;