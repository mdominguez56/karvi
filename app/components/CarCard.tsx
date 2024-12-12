"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { CarCardProps } from "../types"

const CarCard: React.FC<CarCardProps> = ({ car, viewMode }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = ["/car-1.png", "/car-2.png", "/car-3.png"];

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
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
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="bg-gray-200 px-2 py-1 rounded">{car.year}</span>
          <span className="bg-gray-200 px-2 py-1 rounded">
            {car.mileage.toLocaleString()} km
          </span>
        </div>
        <h3 className="text-lg font-bold mt-2">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-600">{car.version}</p>
        <p className="text-orange-500 font-bold text-xl mt-2">
          R$ {car.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">{car.city}</p>
      </div>
    </div>
  );
};

export default CarCard;