"use client";
 
import { useEffect, useState } from 'react';
import { fetchMovies } from '../utils/tmdb';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { setSearchResults } from '../features/searchSlice';
import { store } from './store';
 import { auth } from '@/utils/firebase';

const Page = ({ searchParams }: { searchParams: { search?: string } }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const fetchAndSetMovies = async () => {
      const query = searchParams.search || '';
      const movies = await fetchMovies(query);
      setMovies(movies);
      store.dispatch(setSearchResults(movies));
    };

    fetchAndSetMovies();
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();  

  }, [searchParams.search]);

  return (
     
    <div>
       <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <SearchBar className="mb-6 md:mb-0" />  
          {user && (
            <span className="text-lg font-semibold md:ml-4">
              Hello, {user.email}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}  showAddToFavorites={true}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;