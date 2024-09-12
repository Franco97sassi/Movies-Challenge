"use client"
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getFavoriteMovies } from '@/utils/firestore';
import MovieCard from '@/components/MovieCard';

const FavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const movies = await getFavoriteMovies(user.uid);
          setFavorites(movies);
        } catch (error) {
          console.error('Error fetching favorite movies:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to see your favorite movies.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Películas Favoritas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.length > 0 ? (
          favorites.map((movie: any) => <MovieCard key={movie.id} movie={movie} showAddToFavorites={false} />)
        ) : (
          <p>You have no favorite movies.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;