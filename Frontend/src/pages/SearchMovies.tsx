import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import SearchAppBar from "../components/navBar";
import { useWishlist } from "../context/wishlistContext";

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
  const location = useLocation();

  // Fetch movies from state when navigating
  useEffect(() => {
    if (location.state && location.state.movies) {
      setMovies(location.state.movies);
    }
  }, [location.state]);

  const addToFavorites = (movie: Movie) => {
    addToWishlist(movie);
  };

  return (
    <div>
      <SearchAppBar onSearchResults={setMovies} />
      <Box sx={{ padding: "75px" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
          Movie Results
        </Typography>
        {movies.length === 0 ? (
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <Typography variant="body1">No movies found. Try a different search.</Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie._id}>
                <ProductCard
                  _id={movie._id}
                  title={movie.title}
                  image1={movie.image1}
                  year={movie.year}
                  addOrRemove={() => addToFavorites(movie)}
                  buttonLabel="Add to Favorites"
                  iconType="add"
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default SearchMovies;
