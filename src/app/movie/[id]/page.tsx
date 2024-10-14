import { fetchMovieDetails, fetchMovieTrailers, fetchSimilarMovies } from '@/utils/tmdb';
import MovieCard from '@/components/MovieCard';
import { notFound } from 'next/navigation';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  genres: { name: string }[];
  overview: string;
  vote_average: number;
  poster_path: string;
  videos: { results: { key: string; site: string; type: string }[] };

}
interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string;
}
const MoviePage = async ({ params }: { params: { id: string } }) => {
  const movieId = parseInt(params.id, 10);

  try {
    const movie: Movie = await fetchMovieDetails(movieId);
    const similarMoviesResponse = await fetchSimilarMovies(movieId);
    const similarMovies = similarMoviesResponse.results;
    const trailers = await fetchMovieTrailers(movieId);
    const firstTrailer = trailers.length > 0 ? trailers[0] : null;

    return (
      <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-4 md:mb-0">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          <div className="md:w-2/3 md:pl-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{movie.title}</h1>
            <p className="text-gray-500 dark:text-gray-400">Release Date: {new Date(movie.release_date).toDateString()}</p>
            <p className="text-gray-500 dark:text-gray-400">Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
            <p className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-300">{movie.overview}</p>
            <p className="mt-2 font-semibold text-xl text-gray-900 dark:text-gray-100">Rating: {movie.vote_average}</p>
          </div>
          <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Trailers</h2>
          {firstTrailer ? (
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${firstTrailer.key}`}
                title={`Trailer: ${movie.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No trailers available for this movie.</p>
          )}
        </section>
        </div>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Similar Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarMovies.map((similarMovie: SimilarMovie) => (
              <div
                key={similarMovie.id}
                className="border rounded-lg shadow-lg overflow-hidden bg-gray-200 dark:bg-gray-700 transition-transform transform hover:scale-105"
              >
                <MovieCard movie={similarMovie} showAddToFavorites={true} />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return (
      <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Something went wrong</h1>
        <p className="text-gray-500 dark:text-gray-400">We couldn't load the movie details. Please try again later.</p>
      </div>
    );
  }
};

export default MoviePage;