import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
 
export const addMovieToFavorites = async (userId: string, movie: any) => {
  try {
    const movieRef = doc(db, 'users', userId, 'favorites', movie.id.toString());
    await setDoc(movieRef, movie);
  } catch (error) {
    console.error('Error adding movie to favorites:', error);
  }
};
export const getFavoriteMovies = async (userId: string) => {
    const moviesSnapshot = await getDocs(collection(db, 'users', userId, 'favorites'));
    const movies = moviesSnapshot.docs.map((doc) => doc.data());
    return movies;
  };
  