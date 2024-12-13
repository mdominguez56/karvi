"use client";

import React from "react";
import Link from "next/link";
import CarGrid from "../components/CarGrid";
import { useFavorites } from "../context/FavoritesContext";

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Link
          href="/"
          className="text-blue-500 hover:underline self-start ml-4"
        >
          ← Volver a la Home
        </Link>
        <h1 className="text-2xl font-bold">No tienes autos en favoritos</h1>
        <p className="text-gray-500">
          Agrega autos a tu lista de favoritos para verlos aquí.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/"
        className="text-blue-500 hover:underline self-start ml-4"
      >
        ← Volver a la Home
      </Link>
      <h1 className="text-2xl font-bold mb-4 text-center">Tus Favoritos</h1>
      <CarGrid cars={favorites} viewMode="grid" />
    </div>
  );
};

export default FavoritesPage;