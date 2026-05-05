import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../models/movie.model';

const MovieContext = createContext<any>(null);
const STORAGE_KEY = '@movie_night_favorites';

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  // 1. Load favorites from storage on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
          setFavorites(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to load favorites from device storage", e);
      }
    };
    loadFavorites();
  }, []);

  // 2. Save favorites to storage whenever they change
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (e) {
        console.error("Failed to save favorites to device storage", e);
      }
    };
    saveFavorites();
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <MovieContext.Provider 
      value={{ 
        favorites, 
        toggleFavorite, 
        isFavorite, 
        movies, 
        // We add these aliases to match your controller's expectations
        setMovies, 
        setGlobalMovies: setMovies 
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useGlobalController = () => useContext(MovieContext);