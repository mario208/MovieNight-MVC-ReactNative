export interface Movie {
id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  // Add these optional properties for the Detail View
  tagline?: string;      // The error fix
  runtime?: number;      // Optional: helpful for details
  genres?: { id: number; name: string }[]; 
}