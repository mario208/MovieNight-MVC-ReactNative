import { useState, useEffect, useCallback } from 'react';
import { MovieService } from '../models/movieService';
import { Movie } from '../models/movie.model';
import { useGlobalController } from './MovieContext';

export const useHomeController = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Track the user's input
  const { setMovies: setGlobalMovies } = useGlobalController();

  // Load Trending Data (The default view)
  const loadData = async () => {
    setIsLoading(true);
    const data = await MovieService.fetchTrending();
    setMovies(data);
    setGlobalMovies(data); 
    setIsLoading(false);
  };

  // Handle Search Logic
  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    
    if (text.trim().length > 2) {
      setIsLoading(true);
      const results = await MovieService.searchMovies(text);
      setMovies(results);
      // We also update global movies so the Favorites screen can find them
      setGlobalMovies((prev: Movie[]) => {
        const existingIds = new Set(prev.map(m => m.id));
        const newMovies = results.filter(m => !existingIds.has(m.id));
        return [...prev, ...newMovies];
      });
      setIsLoading(false);
    } else if (text.trim().length === 0) {
      // If the user clears the search bar, go back to Trending
      loadData();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { 
    movies, 
    isLoading, 
    searchQuery, 
    handleSearch, 
    refresh: loadData 
  };
};