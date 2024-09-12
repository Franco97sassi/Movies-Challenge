// utils/firestore.ts
import { getFirestore, doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from "./firebase";
 
 
 
export const addFavoriteMovie = async (userId: string, movie: any) => {
  const movieRef = doc(db, 'users', userId, 'favorites', movie.id.toString());
  await setDoc(movieRef, movie);
};

export const getFavoriteMovies = async (userId: string) => {
  try {
    const favMoviesRef = collection(db, 'users', userId, 'favorites');
    const favMoviesSnap = await getDocs(favMoviesRef);
    return favMoviesSnap.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error al obtener películas favoritas:', error);
    throw new Error('No se pudieron obtener las películas favoritas. Inténtalo de nuevo más tarde.');
  }
};

export const isMovieFavorite = async (userId: string, movieId: number): Promise<boolean> => {
  try {
    const movieRef = doc(db, 'users', userId, 'favorites', movieId.toString());
    const docSnap = await getDoc(movieRef);
    return docSnap.exists();
  } catch (error) {
    console.error('Error al verificar si la película está en favoritos:', error);
    throw new Error('No se pudo verificar el estado de favoritos. Inténtalo de nuevo más tarde.');
  }
};