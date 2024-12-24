import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import ProductCard from './ProductCard'; // Import your ProductCard component

// Movie interface to type the movie data
interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

  // Fetch movies from OMDb API
  const searchMovies = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=800bdf56`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Add a movie to favorites
  const addToFavorites = (movie: Movie) => {
    const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!currentFavorites.find((fav: Movie) => fav.imdbID === movie.imdbID)) {
      currentFavorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(currentFavorites));
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          style={{ marginRight: '10px' }}
        />
        <button onClick={searchMovies}>Search</button>

        {/* Favorites Button */}
        <Link to="/favorites" style={{ textDecoration: 'none', marginLeft: '10px' }}>
          <button>Favorites</button>
        </Link>
      </div>

      {/* Grid of ProductCards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {movies.map((movie) => (
          <ProductCard
            key={movie.imdbID}
            _id={movie.imdbID}
            title={movie.Title}
            image1={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster'}
            year={movie.Year}
            addToFavorites={addToFavorites} // Pass addToFavorites as a prop
          />
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
