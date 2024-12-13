"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Car, FavoritesContextProps } from "../types";

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Car[]>([]);

  const addToFavorites = (car: Car) => {
    if (!favorites.find((fav) => fav.id === car.id)) {
      setFavorites((prev) => [...prev, car]);
    }
  };

  const removeFromFavorites = (carId: number) => {
    setFavorites((prev) => prev.filter((car) => car.id !== carId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};