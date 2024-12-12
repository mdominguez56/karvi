"use client";

import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import CarGrid from "./components/CarGrid";

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

const Page: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const res = await fetch("/api/cars"); 
        if (!res.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await res.json();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error("Error loading cars:", error);
      }
    };

    loadCars();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside className="w-full lg:w-1/4 bg-white p-4">
        <Filter cars={cars} onFilter={setFilteredCars} />
      </aside>

      <section className="flex-1">
        <CarGrid cars={filteredCars} />
      </section>
    </div>
  );
};

export default Page;