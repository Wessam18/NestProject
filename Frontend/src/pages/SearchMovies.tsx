import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useWishlist } from "../context/wishlistContext";

// Shared Movie interface
interface Movie {
  _id: string;
  title: string;
  image1: string;
  year: string;
  imdbID: string; // Include imdbID in the interface
}

// Component
const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]); // Use Movie interface for state
  const { addToWishlist } = useWishlist();

  // Fetch movies from OMDb API
  const searchMovies = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=800bdf56`);
      const apiMovies = response.data.Search || [];
      
      // Map API response to Movie type
      const mappedMovies: Movie[] = apiMovies.map((movie: any) => ({
        _id: movie.imdbID,
        title: movie.Title,
        image1: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Poster",
        year: movie.Year,
        imdbID: movie.imdbID,
      }));
      
      setMovies(mappedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Add a movie to wishlist
  const addToFavorites = (movie: Movie) => {
    addToWishlist(movie);
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          style={{ marginRight: "10px" }}
        />
        <button onClick={searchMovies}>Search</button>
        <Link to="/favorites" style={{ textDecoration: "none", marginLeft: "10px" }}>
          <button>Favorites</button>
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {movies.map((movie) => (
          <ProductCard
          key={movie.imdbID}
          _id={movie._id}
          title={movie.title}
          image1={movie.image1}
          year={movie.year}
          addOrRemove={() => addToFavorites(movie)}
          buttonLabel="Add to Favorites"
          iconType="add" // Use 'add' icon
        />
        
        
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
