import { fetchSimilarMovies } from './tmdb';

export const getRecommendations = async (movieIds: number[]) => {
  const similarMovies = await Promise.all(
    movieIds.map(id => fetchSimilarMovies(id))
  );

  const recommendations = similarMovies.flat().filter((movie, index, self) =>
    index === self.findIndex((m) => (
      m.id === movie.id
    ))
  );

  return recommendations;
};