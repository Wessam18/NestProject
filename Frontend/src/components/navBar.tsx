import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button'; // For Favorites button
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(-1), // Moves it to the left
  width: '25%', // Makes it wider
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0), // Adjust for larger screens
    width: '25%', // Wider on larger screens
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

interface SearchAppBarProps {
  query: string;
  setQuery: (query: string) => void;
  search: () => void;
}

export default function SearchAppBar({ query, setQuery, search }: SearchAppBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/" 
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' },
            textDecoration: 'none', // Remove underline
            color: 'inherit', // Inherit color for consistency
          }}
          >
            MovieHome
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for a movie..."
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Search>
          <Button
            variant="contained"
            color="secondary"
            onClick={search}
            sx={{ marginLeft: '10px' }}
          >
            Search
          </Button>
          <Link to="/favorites" style={{ textDecoration: 'none', marginLeft: '10px' }}>
            <Button variant="contained" color="primary">
              Favorites
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
