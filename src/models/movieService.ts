import axios from 'axios';
import { Movie } from './movie.model';

// PASTE THE ENTIRE LONG TOKEN HERE (Remove the dots)
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzRmN2Y3ZmNkZGIxNTUyZWI4MWNlOWFkYmE3NDM2YyIsIm5iZiI6MTc3NTkyMzI4OS4wMTUsInN1YiI6IjY5ZGE3MDU5MzgyMGNkNjNmZDAyNmVmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pE4eDD5j_6JpEU7DdmGkuwwk2VzGG-z0-q9dxMVmRbI'; 

const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN.trim()}`,
    'accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

export const MovieService = {
  fetchTrending: async (): Promise<Movie[]> => {
    try {
      // Adding a timestamp param can sometimes bypass local cache issues
      const response = await apiClient.get('/trending/movie/day', {
        params: { language: 'en-US' }
      });
      return response.data.results;
    } catch (error) {
      console.error("API Error (Trending):", error);
      return [];
    }
  }, 


  // Inside MovieService
fetchMovieTrailers: async (id: string): Promise<any[]> => {
  try {
    const response = await apiClient.get(`/movie/${id}/videos`, {
      params: { language: 'en-US' }
    });
    // Filter for YouTube trailers specifically
    return response.data.results.filter(
      (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
    );
  } catch (error) {
    console.error("API Error (Trailers):", error);
    return [];
  }
} , 


// searchMovies is an optional extension to allow searching for movies by title. You can call this from a search screen or a search bar in the header.
searchMovies: async (query: string): Promise<Movie[]> => {
  try {
    const response = await apiClient.get('/search/movie', {
      params: { 
        query,
        language: 'en-US',
        page: 1,
        include_adult: false
      }
    });
    return response.data.results;
  } catch (error) {
    console.error("API Error (Search):", error);
    return [];
  }
}, 


  fetchById: async (id: string): Promise<Movie | null> => {
    try {
      const response = await apiClient.get(`/movie/${id}`, {
        params: { language: 'en-US' }
      });
      return response.data;
    } catch (error) {
      console.error("API Error (ById):", error);
      return null;
    }
  }
};