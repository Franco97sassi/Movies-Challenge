import React from 'react';
import { recomendarPeliculas } from '@/utils/recommendation';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/utils/types';

const Recomendaciones = ({ favoritas, todasLasPeliculas }: { favoritas: Movie[], todasLasPeliculas: Movie[] }) => {
  if (!todasLasPeliculas || !favoritas) {
    return <p>Not enough data to recommend movies.</p>;
  }

   ;

  const peliculasRecomendadas = recomendarPeliculas(todasLasPeliculas, favoritas);
  console.log('Películas recomendadas:', peliculasRecomendadas); 

 
  return (
    <div>
      <h2>Recommended Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {peliculasRecomendadas.length > 0 ? (
          peliculasRecomendadas.map(pelicula => (
            <MovieCard key={pelicula.id} movie={pelicula} showAddToFavorites={true} />
          ))
        ) : (
          <p>No recommendations found.</p>
        )}
      </div>
    </div>
  );
};

export default Recomendaciones;