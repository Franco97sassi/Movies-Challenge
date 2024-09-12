export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  genre_ids: number[];
  release_date: string;
  overview: string;
}