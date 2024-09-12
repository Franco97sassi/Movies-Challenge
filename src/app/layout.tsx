'use client';
 import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from '@/context/AuthContext';
import { ReactNode, useState } from 'react';
 
 import Navbar from '@/components/NavBar';

const Layout = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <AuthProvider>
      <Provider store={store}>
        <html lang="en" className={darkMode ? 'dark' : ''}>
          <body className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> 

            <main className="max-w-4xl mx-auto px-4 py-6">
              {children}
            </main>
          </body>
        </html>
      </Provider>
    </AuthProvider>
  );
};

export default Layout;