"use client";

import React, { useState } from "react";
import FilterSection from "./FilterSection";
import { Car } from "../types";
import { FaChevronDown } from "react-icons/fa6";

interface FilterProps {
  cars: Car[];
  onFilter?: (filteredCars: Car[], city: string) => void; // Prop para manejar el filtrado
}

const Filter: React.FC<FilterProps> = ({ cars, onFilter }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const citiesWithCounts = cars.reduce((acc: Record<string, number>, car) => {
    acc[car.city] = (acc[car.city] || 0) + 1;
    return acc;
  }, {});

  const handleCityFilter = (city: string) => {
    if (onFilter) {
      const filteredCars = cars.filter((car) => car.city === city);
      onFilter(filteredCars, city);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <button
          onClick={() => toggleSection("Marca")}
          className="w-full flex justify-between items-center text-left font-medium"
        >
          Marca
          <FaChevronDown
            className={`transition-transform ${
              expandedSections.includes("Marca") ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.includes("Marca") && (
          <div className="mt-2 text-sm text-gray-600">Contenido de Marca</div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection("Modelo")}
          className="w-full flex justify-between items-center text-left font-medium"
        >
          Modelo
          <FaChevronDown
            className={`transition-transform ${
              expandedSections.includes("Modelo") ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.includes("Modelo") && (
          <div className="mt-2 text-sm text-gray-600">Contenido de Modelo</div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection("Año")}
          className="w-full flex justify-between items-center text-left font-medium"
        >
          Año
          <FaChevronDown
            className={`transition-transform ${
              expandedSections.includes("Año") ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.includes("Año") && (
          <div className="mt-2 text-sm text-gray-600">Contenido de Año</div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection("Versión")}
          className="w-full flex justify-between items-center text-left font-medium"
        >
          Versión
          <FaChevronDown
            className={`transition-transform ${
              expandedSections.includes("Versión") ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.includes("Versión") && (
          <div className="mt-2 text-sm text-gray-600">Contenido de Versión</div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection("Ciudad")}
          className="w-full flex justify-between items-center text-left font-medium"
        >
          Ciudad
          <FaChevronDown
            className={`transition-transform ${
              expandedSections.includes("Ciudad") ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.includes("Ciudad") && (
          <FilterSection
            items={Object.entries(citiesWithCounts).map(
              ([city, count]) => `${city} (${count})`
            )}
            onClickItem={(item) => handleCityFilter(item.split(" (")[0])}
          />
        )}
      </div>
    </div>
  );
};

export default Filter;