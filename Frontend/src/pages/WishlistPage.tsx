import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard"; // Import ProductCard
import SearchAppBar from "../components/navBar";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  // Fetch movies from the backend when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies/favorites");
        setWishlistItems(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/movies/favorites/${id}`);
      setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
  <div>
    <SearchAppBar  />
    
    <Box sx={{ padding: "75px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
        Wishlist
      </Typography>
      {wishlistItems.length === 0 ? (
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Typography variant="body1">
            Your wishlist is empty. <Link to="/">Go back to shop</Link>
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <ProductCard
                _id={item._id}
                title={item.title}
                image1={item.image1}
                year={item.year}
                addOrRemove={() => handleDelete(item._id)}
                buttonLabel="Remove from Favorites"
                iconType="remove" // Use 'remove' icon
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  </div>
  );
};

export default WishlistPage;
