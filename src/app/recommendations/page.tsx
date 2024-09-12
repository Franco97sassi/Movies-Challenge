import { fetchRecommendedMoviesByMovieId } from '@/utils/tmdb';
import MovieCard from '@/components/MovieCard';

const RecommendationsPage = async ({ searchParams }: { searchParams: { movieId?: number } }) => {
  const movieId = searchParams.movieId;
  const recommendedMovies = movieId ? await fetchRecommendedMoviesByMovieId(movieId) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <h1 className="text-2xl font-bold mb-4">Recommendations</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {recommendedMovies.length > 0 ? (
          recommendedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}  showAddToFavorites={true}/>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;