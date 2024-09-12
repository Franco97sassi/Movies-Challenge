'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { addFavoriteMovie, isMovieFavorite } from '@/utils/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    genres?: {
      id: number;
      name: string;
    }[];
  };
  showAddToFavorites?: boolean;

}

const MovieCard = ({ movie, showAddToFavorites = true }: MovieCardProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (user) {
        const favorite = await isMovieFavorite(user.uid, movie.id);
        setIsFavorite(favorite);
      }
    };

    checkIfFavorite();
  }, [user, movie.id]);
  const handleAddFavorite = async () => {
    if (user) {
      try {
        await addFavoriteMovie(user.uid, movie);
        setIsFavorite(true);  
        alert('Movie added to favorites');
        router.push(`/recommendations?movieId=${movie.id}`);
      } catch (error) {
        console.error('Error al añadir película a favoritos:', error);
        alert('Unable to add movie to favorites. Please try again later.');
      }
    } else {
      alert('Please log in to add to favorites');
    }
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 flex flex-col">
    <Link href={`/movie/${movie.id}`}>
      <div className="relative w-full h-64">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col p-4 bg-white dark:bg-gray-900 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">{movie.title}</h3>
        <p className="text-sm text-gray-600 mt-2 dark:text-gray-400 truncate">
          {new Date(movie.release_date).toDateString()}
        </p>
        
      </div>
    </Link>
    {showAddToFavorites && (
        <button
          onClick={handleAddFavorite}
          disabled={isFavorite}  
          className={`${
            isFavorite ? 'bg-gray-800 text-gray-300' : 'bg-blue-600 hover:bg-blue-700 text-white'
          } font-semibold p-2 rounded-lg transition duration-200 dark:${isFavorite ? 'bg-gray-700 text-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isFavorite ? 'Added' : 'Add to favorites'}
          </button>
      )}
  </div>
  );
};

export default MovieCard;