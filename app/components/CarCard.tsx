"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaAngleRight, FaAngleLeft, FaCalculator } from "react-icons/fa6";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { useFavorites } from "../context/FavoritesContext";
import { CarCardProps } from "../types";

const CarCard: React.FC<CarCardProps> = ({ car, viewMode }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const images = ["/car-1.png", "/car-2.png", "/car-3.png"];
  const isFavorite = favorites.some((fav) => fav.id === car.id);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  return (
    <div
      className={`p-4 border rounded-lg shadow bg-white ${
        viewMode === "grid" ? "flex flex-col gap-4" : "flex flex-row items-center gap-4"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-lg ${
          viewMode === "grid" ? "w-full h-48" : "w-1/4 h-32"
        }`}
      >
        <Image
          src={images[currentImage]}
          alt={`${car.brand} ${car.model} - Imagen ${currentImage + 1}`}
          fill
          className="object-cover"
        />
        <button
          onClick={handlePrevImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-75 hover:opacity-100"
          aria-label="Imagen anterior"
        >
          <FaAngleLeft size={16} />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-75 hover:opacity-100"
          aria-label="Siguiente imagen"
        >
          <FaAngleRight size={16} />
        </button>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-[12px] text-[#1B2141] font-medium">
            <span className="bg-gray-200 px-2 py-1 rounded-full">{car.year}</span>
            <span className="bg-gray-200 px-2 py-1 rounded-full">
              {car.mileage.toLocaleString()} km
            </span>
          </div>
          <button
            onClick={toggleFavorite}
            className="text-red-500 hover:text-red-700"
          >
            {isFavorite ? <MdOutlineFavorite size={24} /> : <MdFavoriteBorder size={24} />}
          </button>
        </div>
        <h3 className="text-lg font-bold mt-2">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-600">{car.version}</p>
        <p className="text-orange-500 font-bold text-xl mt-2">
          R$ {car.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">{car.city}</p>
        <button
          className="mt-4 flex items-center justify-center bg-[#566DED] text-white font-bold text-[14px] rounded-full py-2 px-6 hover:bg-blue-600 transition"
        >
          <FaCalculator className="mr-2" />
          Simular parcelas
        </button>
      </div>
    </div>
  );
};

export default CarCard;