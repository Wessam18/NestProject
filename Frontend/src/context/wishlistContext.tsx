import React, { createContext, useState, useContext } from "react";

interface Movie {
  imdbID: string;
  _id: string;
  title: string;
  image1: string;
  year: string;
}

interface WishlistContextType {
  wishlistItems: Movie[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  updateWishlistItem: (id: string, updatedItem: Movie) => void;
}

export const wishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Movie[]>([]);

  const addToWishlist = (movie: Movie) => {
    // Ensure the movie has the imdbID as _id
    setWishlistItems((prevItems) => [
      ...prevItems,
      { ...movie, _id: movie.imdbID }, // Ensure _id is set to imdbID
    ]);
  };
  

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const updateWishlistItem = (id: string, updatedItem: Movie) => {
    setWishlistItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? updatedItem : item))
    );
  };

  return (
    <wishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist, updateWishlistItem }}
    >
      {children}
    </wishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(wishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};
