import { Key, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/wishlistContext";
import SearchAppBar from "../components/navBar";

// Shared Movie interface
interface Movie {
  id: Key | null | undefined;
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
  const search = async () => {
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
      <div>
        <SearchAppBar query={query} setQuery={setQuery} search={search} />
        <div>
          <h2>Movie Results</h2>
        </div>
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
