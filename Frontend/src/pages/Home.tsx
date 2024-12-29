import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard"; // Import your ProductCard component

// Define the interface for the movie structure (based on OMDB response)
interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  imdbRating: string;
  [key: string]: any;
}

export default function Home() {
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]); // State for most recent movies
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]); // State for top rated movies
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Function to shuffle the array
  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Make the API call to fetch movies (using a common search term)
        const response = await axios.get(`https://www.omdbapi.com/?apikey=800bdf56&s=movie`);
        if (response.data.Response === "True") {
          const allMovies = response.data.Search; // All movies from the API

          // Filter out movies without a rating and sort by imdbRating (descending)
          const filteredMovies = allMovies.filter((movie: Movie) => movie.imdbRating !== "N/A");
          console.log("Filtered Movies:", filteredMovies); // Log the filtered movies

          // Top 10 rated movies - Sort by imdbRating (descending)
          const sortedByRating = filteredMovies.sort(
            (a: Movie, b: Movie) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating)
          );
          console.log("Sorted by Rating:", sortedByRating); // Log the sorted movies

          // Shuffle and get the top 10 random rated movies
          setTopRatedMovies(shuffleArray(sortedByRating).slice(0, 10));

          // Most Recent 10 Movies - Sort by Year (descending)
          const sortedByYear = filteredMovies.sort(
            (a: Movie, b: Movie) => parseInt(b.Year) - parseInt(a.Year)
          );
          console.log("Sorted by Year:", sortedByYear); // Log the sorted by year movies

          // Shuffle and get the top 10 random most recent movies
          setRecentMovies(shuffleArray(sortedByYear).slice(0, 10));
        } else {
          console.error("No movies found or API error:", response.data.Error);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchMovies();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h1>Movie List</h1>

      {/* Most Recent Movies */}
      <h2>Most Recent Movies</h2>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {recentMovies.length > 0 ? (
            recentMovies.map((movie) => {
              // Log the IMDb rating if available, else log a fallback message
              if (movie.imdbRating !== "N/A" && movie.imdbRating) {
                console.log("Recent Movie Rating:", movie.imdbRating);
              } else {
                console.log("Recent Movie Rating: Not available");
              }
              return (
                <ProductCard
                  key={movie.imdbID}
                  _id={movie.imdbID}
                  title={movie.Title}
                  image1={movie.Poster}
                  year={movie.Year}
                  addOrRemove={() => {}}
                  buttonLabel="Add to Favorites"
                  iconType="add"
                />
              );
            })
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}

      {/* Top 10 Rated Movies */}
      <h2>Top 10 Rated Movies</h2>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {topRatedMovies.length > 0 ? (
            topRatedMovies.map((movie) => {
              // Log the IMDb rating if available, else log a fallback message
              if (movie.imdbRating !== "N/A" && movie.imdbRating) {
                console.log("Top Rated Movie Rating:", movie.imdbRating);
              } else {
                console.log("Top Rated Movie Rating: Not available");
              }
              return (
                <ProductCard
                  key={movie.imdbID}
                  _id={movie.imdbID}
                  title={movie.Title}
                  image1={movie.Poster}
                  year={movie.Year}
                  addOrRemove={() => {}}
                  buttonLabel="Add to Favorites"
                  iconType="add"
                />
              );
            })
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}
