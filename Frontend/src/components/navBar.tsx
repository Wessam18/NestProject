import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(-1),
  width: "25%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "25%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface SearchAppBarProps {
  onSearchResults?: (movies: any[]) => void;
}

const SearchAppBar: React.FC<SearchAppBarProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const search = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=800bdf56`
      );
      const apiMovies = response.data.Search || [];

      const mappedMovies = apiMovies.map((movie: any) => ({
        _id: movie.imdbID,
        title: movie.Title,
        image1:
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/200x300?text=No+Poster",
        year: movie.Year,
        imdbID: movie.imdbID,
      }));

      if (onSearchResults) {
        onSearchResults(mappedMovies); // Pass results if callback is provided
      }

      // Navigate to SearchMovies with results
      navigate("/", { state: { movies: mappedMovies } });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
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
              inputProps={{ "aria-label": "search" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Search>
          <Button
            variant="contained"
            color="secondary"
            onClick={search}
            sx={{ marginLeft: "10px" }}
          >
            Search
          </Button>
          <Link to="/favorites" style={{ textDecoration: "none", marginLeft: "10px" }}>
            <Button variant="contained" color="primary">
              Favorites
            </Button>
          </Link>
          <Link to="/home" style={{ textDecoration: "none", marginLeft: "10px" }}>
            <Button variant="contained" color="primary">
              Home
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchAppBar;
