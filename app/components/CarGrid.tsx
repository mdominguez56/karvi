import React from "react";
import CarCard from "./CarCard";

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

interface CarGridProps {
  cars: Car[];
}

const CarGrid: React.FC<CarGridProps> = ({ cars }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          id={car.id}
          year={car.year}
          mileage={car.mileage}
          brand={car.brand}
          model={car.model}
          version={car.version}
          price={car.price}
          city={car.city}
        />
      ))}
    </div>
  );
};

export default CarGrid;