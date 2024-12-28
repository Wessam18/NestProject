// SearchMovies.tsx
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchAppBar from "../components/navBar";
import { useWishlist } from "../context/wishlistContext";

// Movie interface
interface Movie {
  _id: string;
  title: string;
  image1: string;
  year: string;
  imdbID: string;
}

const SearchMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // For storing fetched movies
  const { addToWishlist } = useWishlist(); // For managing wishlist

  // Add a movie to the wishlist
  const addToFavorites = (movie: Movie) => {
    addToWishlist(movie);
  };

  return (
    <div>
      {/* Search App Bar with callback for search results */}
      <SearchAppBar onSearchResults={setMovies} />

      {/* Displaying search results */}
      <div>
        <h2>Movie Results</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
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
    </div>
  );
};

export default SearchMovies;
