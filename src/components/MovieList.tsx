import { fetchMovies } from '../utils/tmdb';
import MovieCard from './MovieCard';

const MoviesList = async ({ searchParams }: { searchParams: { search?: string } }) => {
  const query = searchParams?.search || '';
  const movies = await fetchMovies(query); 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie: any) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
