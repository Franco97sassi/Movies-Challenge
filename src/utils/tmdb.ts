

 import axios from "axios";


 const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
 const BASE_URL = 'https://api.themoviedb.org/3';
 export async function fetchMovies(query: string) {
   try {
     const response = await axios.get(`${BASE_URL}/search/movie`, {
       params: {
         api_key: API_KEY,
         query: query,
       },
     });
     return response.data.results;
   } catch (error) {
     if (axios.isAxiosError(error)) {
       console.error('Axios error:', error.message);
     } else {
       console.error('Unexpected error:', error);
     }
     return [];
   }
 }
 
 export async function fetchMovieDetails(id: number) {
   const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
     params: {
       api_key: API_KEY,
       language: 'es', 
     },
   });
   return data;
 }
 export async function fetchRecommendedMovies(genreId: number) {
   const { data } = await axios.get(`${BASE_URL}/discover/movie`, {
     params: {
       api_key: API_KEY,
       with_genres: genreId,
     },
   });
   return data.results;
 }
 
 export async function fetchMovieGenres() {
   const { data } = await axios.get(`${BASE_URL}/genre/movie/list`, {
     params: {
       api_key: API_KEY,
     },
   });
   return data.genres;
 }
 export async function fetchSimilarMovies(id: number) {
   const { data } = await axios.get(`${BASE_URL}/movie/${id}/similar`, {
     params: {
       api_key: API_KEY,
       language: 'en-US',
     },
   });
   return data;
 }
 export async function fetchMovieTrailers(id: number) {
   try {
     const { data } = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
       params: {
         api_key: API_KEY,
       },
     });
     return data.results.filter(video => video.site === 'YouTube' && video.type === 'Trailer');
   } catch (error) {
     console.error(`Error al obtener trailers para la película con ID ${id}:`, error);
     return [];
   }
 }
 export async function fetchRecommendedMoviesByMovieId(id: number): Promise<Movie[]> {
   try {
     const { data } = await axios.get(`${BASE_URL}/movie/${id}/recommendations`, {
       params: {
         api_key: API_KEY,
         language: 'en-US',
       },
     });
     return data.results as Movie[];
   } catch (error) {
     console.error(`Error al obtener recomendaciones para la película con ID ${id}:`, error);
     return [];
   }
 }