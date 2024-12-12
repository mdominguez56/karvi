"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

interface Car {
  id: number;
  year: number;
  mileage: number;
  brand: string;
  model: string;
  version: string;
  price: number;
  city: string;
}

const CarCard: React.FC<Car> = ({
  year,
  mileage,
  brand,
  model,
  version,
  price,
  city,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = ["/car-1.png", "/car-2.png", "/car-3.png"];

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white flex flex-col gap-4 relative">
      <div className="relative w-full h-48 overflow-hidden rounded-lg">
        <Image
          src={images[currentImage]}
          alt={`Imagen ${currentImage + 1} del auto`}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />

        <button
          onClick={handlePrevImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-75 hover:opacity-100"
        >
          <FaAngleLeft size={16} />
        </button>

        <button
          onClick={handleNextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-75 hover:opacity-100"
        >
          <FaAngleRight size={16} />
        </button>
      </div>

      <div className="flex mt-2 text-xs text-gray-600">
        <span className="bg-gray-200 px-2 py-1 rounded font-medium">{year}</span>
        <span className="bg-gray-200 px-2 py-1 rounded font-medium ml-2">
          {mileage.toLocaleString()} km
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">
          {brand} {model}
        </h3>
        <p className="text-sm text-gray-600">{version}</p>
        <p className="text-orange-500 font-bold text-xl">
          R$ {price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">{city}</p>
      </div>

      <button className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition">
        Simular parcelas
      </button>
    </div>
  );
};

export default CarCard;