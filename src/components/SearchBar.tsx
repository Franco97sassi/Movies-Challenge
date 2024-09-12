'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/?search=${query}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border rounded-lg p-2 w-full md:w-1/2 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-500 focus:outline-none focus:border-blue-500"
      placeholder="Search for movies..."
    />
    <button
      onClick={handleSearch}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
    >
      Search
    </button>
  </div>
  );
};

export default SearchBar;