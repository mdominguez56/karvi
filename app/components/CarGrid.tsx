import React from "react";
import CarCard from "./CarCard";
import { CarGridProps } from "../types"


const CarGrid: React.FC<CarGridProps> = ({ cars, viewMode }) => {
  return (
    <div
      className={`${
        viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
      }`}
    >
      {cars.map((car) => (
        <CarCard key={car.id} car={car} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default CarGrid;