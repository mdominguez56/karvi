"use client";

import React from "react";
import FilterSection from "./FilterSection";
import { Car } from "../types";
interface FilterProps {
  cars: Car[];
  onFilter?: (filteredCars: Car[]) => void; 
}

const Filter: React.FC<FilterProps> = ({ cars, onFilter }) => {
  const citiesWithCounts = cars.reduce((acc: Record<string, number>, car) => {
    acc[car.city] = (acc[car.city] || 0) + 1;
    return acc;
  }, {});

  const handleCityFilter = (city: string) => {
    if (onFilter) {
      const filteredCars = cars.filter((car) => car.city === city);
      onFilter(filteredCars);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <FilterSection title="Marca" />
      <FilterSection title="Modelo" />
      <FilterSection title="Año" />
      <FilterSection title="Versión" />
      <FilterSection
        title="Ciudad"
        items={Object.entries(citiesWithCounts).map(
          ([city, count]) => `${city} (${count})`
        )} 
        onClickItem={(item) => handleCityFilter(item.split(" (")[0])} 
      />
    </div>
  );
};

export default Filter;