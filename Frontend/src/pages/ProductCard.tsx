import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Icon for "Add to Favorites"
import DeleteIcon from '@mui/icons-material/Delete'; // Icon for "Remove from Favorites"
import { Link } from 'react-router-dom';

// Define the types for props passed to ProductCard
interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

interface ProductCardProps {
  _id: string;
  title: string;
  image1: string;
  year: string;
  addOrRemove: (movie: Movie) => void;
  buttonLabel: string;
  iconType: 'add' | 'remove'; // Add or remove to toggle between icons
}

const ProductCard = ({ _id, title, image1, year, addOrRemove, buttonLabel, iconType }: ProductCardProps) => {
  return (
    <Box sx={{ margin: '20px', maxWidth: '320px', display: 'flex', flexDirection: 'column' }}>
      <Card
        sx={{
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid transparent',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transition: 'border 0.3s ease',
          '&:hover': {
            border: '2px solid #D10024',
          },
        }}
      >
        <Box className="product-img" sx={{ position: 'relative' }}>
          <CardMedia
            sx={{ height: 250, objectFit: 'contain' }}
            image={image1}
            title={title}
            component="img"
          />
        </Box>

        <CardContent
          sx={{
            padding: '15px',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component={Link}
            to={`/product/${_id}`} // Link to product details page
            sx={{
              textDecoration: 'none',
              color: '#333',
              fontWeight: 'bold',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              '&:hover': { color: '#D10024' },
            }}
          >
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <Box component="span" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
              {year}
            </Box>
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            padding: '10px',
            backgroundColor: '#f8f8f8',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#a8001b' },
            }}
            onClick={() => addOrRemove({ Title: title, Year: year, Poster: image1, imdbID: _id })}
          >
            {iconType === 'add' ? (
              <FavoriteBorderIcon sx={{ marginRight: '8px' }} />
            ) : (
              <DeleteIcon sx={{ marginRight: '8px' }} />
            )}
            {buttonLabel}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;
