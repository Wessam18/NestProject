import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
  search: () => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const search = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=800bdf56`);
      const apiMovies = response.data.Search || [];
      
      setMovies(apiMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <SearchContext.Provider value={{ query, setQuery, search }}>
      {children}
    </SearchContext.Provider>
  );
};
