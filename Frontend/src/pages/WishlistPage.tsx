import { Box, Grid, Typography, Button, Card, CardActions, CardContent, CardMedia, TextField } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useWishlist } from "../context/wishlistContext"; // Import custom hook

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist, updateWishlistItem } = useWishlist(); // Use custom hook

  const handleUpdate = (id: string, updatedTitle: string) => {
    const itemToUpdate = wishlistItems.find((item) => item._id === id);
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
            <Grid item xs={12} sm={6} md={4} key={item._id}>
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
                    onClick={() => removeFromWishlist(item._id)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} sx={{ marginTop: "20px" }}>
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
              onClick={clearWishlist}
            >
              Clear Wishlist
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default WishlistPage;
