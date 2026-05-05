import { useState, useEffect } from 'react';
import { MovieService } from '../models/movieService';
import { Movie } from '../models/movie.model';

export const useDetailController = (id: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailers, setTrailers] = useState<any[]>([]); // New state for video data
  const [isLoading, setIsLoading] = useState(true);

  const loadMovieDetails = async () => {
    setIsLoading(true);
    try {
      // Use Promise.all to fetch movie info and trailers in parallel for better performance
      const [movieData, trailerData] = await Promise.all([
        MovieService.fetchById(id),
        MovieService.fetchMovieTrailers(id)
      ]);

      setMovie(movieData);
      setTrailers(trailerData);
    } catch (error) {
      console.error("Controller Error (Details/Trailers):", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadMovieDetails();
  }, [id]);

  // Return the trailers array so your View can render the WebView
  return { movie, trailers, isLoading };
};