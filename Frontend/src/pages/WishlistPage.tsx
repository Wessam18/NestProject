import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Card, CardActions, CardContent, CardMedia, TextField } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useWishlist } from "../context/wishlistContext";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const { updateWishlistItem } = useWishlist();

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

  const handleDelete = async (id: number) => { // Use `id` as a number
    try {
      await axios.delete(`http://localhost:3000/movies/favorites/${id}`);
      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Access `id`, not `_id`
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

// Function to update the movie title
const handleUpdate = (id: string, updatedTitle: string) => {
  const itemToUpdate = wishlistItems.find((item) => item._id === id); // Change item.id to item._id
  if (itemToUpdate) {
    updateWishlistItem(id, { ...itemToUpdate, title: updatedTitle });
  }
};


  return (
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
            <Grid item xs={12} sm={6} md={4} key={item._d}>
              <Card
                sx={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  border: "1px solid transparent",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "border 0.3s ease",
                  "&:hover": {
                    border: "2px solid #D10024",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 250, objectFit: "contain" }}
                  image={item.image1}
                  title={item.title}
                  component="img"
                />
                <CardContent sx={{ padding: "15px", flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{
                      textDecoration: "none",
                      color: "#333",
                      fontWeight: "bold",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    <TextField
                      defaultValue={item.title}
                      onBlur={(e) => handleUpdate(item._id, e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" sx={{ fontSize: "18px", fontWeight: "bold" }}>
                      {item.year}
                    </Box>
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    padding: "10px",
                    backgroundColor: "#f8f8f8",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Remove from Wishlist Button */}
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#D10024",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      "&:hover": { backgroundColor: "#a8001b" },
                    }}
                    onClick={() => handleDelete(item.id)} // Trigger the delete function on click
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        // Inside the return statement
        <Grid item xs={12} sx={{ marginTop: "20px" }}>
          <Link to="/" style={{ textDecoration: "none" }}> {/* Wrap the button with Link */}
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#D10024",
                fontWeight: "bold",
                borderRadius: "5px",
                marginTop: "40px",
                paddingTop: "10px",
                width: "100%",
                marginLeft: "10px",
                marginRight: "10px",
                "&:hover": { backgroundColor: "#a8001b" },
              }}
            >
              Go to Home
            </Button>
          </Link>
        </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default WishlistPage;
