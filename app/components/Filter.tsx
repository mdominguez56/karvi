"use client";

import React, { useState } from "react";
import FilterSection from "./FilterSection";
import { Car } from "../types";
import { FaChevronDown } from "react-icons/fa6";

interface FilterProps {
  cars: Car[];
  filteredCars: Car[];
  onFilter: (filterType: string, value: string) => void;
  appliedFilters: Record<string, string[]>;
  onPriceFilter: (min: number | "", max: number | "") => void;
  priceFilter: { min: number | ""; max: number | "" };
}

const mapSectionToKey = (section: string): keyof Car => {
  switch (section) {
    case "Marca":
      return "brand";
    case "Modelo":
      return "model";
    case "Año":
      return "year";
    case "Versión":
      return "version";
    case "Ciudad":
      return "city";
    default:
      throw new Error(`Sección desconocida: ${section}`);
  }
};

const formatNumber = (value: number | ""): string =>
  value !== "" ? `$${value.toLocaleString("en-US")}` : "";

const parseNumber = (value: string): number | "" =>
  value === "" ? "" : parseInt(value.replace(/[^\d]/g, ""), 10) || "";

const Filter: React.FC<FilterProps> = ({
  cars,
  filteredCars,
  onFilter,
  appliedFilters,
  onPriceFilter,
  priceFilter,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | "">(priceFilter.min || "");
  const [maxPrice, setMaxPrice] = useState<number | "">(priceFilter.max || "");

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const getFilteredValuesWithCounts = (key: keyof Car) => {
    const counts = filteredCars.reduce((acc: Record<string, number>, car) => {
      const value = String(car[key]);
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    const options = cars.reduce((acc: Record<string, number>, car) => {
      const value = String(car[key]);
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(options).map(([value]) => {
      const filteredCount = counts[value] || 0;
      return `${value} (${filteredCount})`;
    });
  };

  const handleApplyPriceFilter = () => {
    onPriceFilter(minPrice, maxPrice);
  };

  return (
    <div className="flex flex-col gap-4">
      {["Marca", "Modelo", "Año", "Versión", "Ciudad"].map((section) => (
        <div key={section}>
          <button
            onClick={() => toggleSection(section)}
            className="w-full flex justify-between items-center text-left font-medium"
          >
            {section}
            <FaChevronDown
              className={`transition-transform ${
                expandedSections.includes(section) ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.includes(section) && (
            <FilterSection
              title={section}
              items={getFilteredValuesWithCounts(mapSectionToKey(section))}
              appliedFilters={appliedFilters[mapSectionToKey(section)]}
              onClickItem={(item) =>
                onFilter(mapSectionToKey(section), item.split(" (")[0])
              }
            />
          )}
        </div>
      ))}

      <div>
        <button
          onClick={() => toggleSection("Precio")}
          className="w-full flex justify-between items-center text-left font-medium"
        >
          Precio
          <FaChevronDown
            className={`transition-transform ${
              expandedSections.includes("Precio") ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.includes("Precio") && (
          <div className="mt-2 flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="$ Mínimo"
                value={formatNumber(minPrice)}
                onChange={(e) => setMinPrice(parseNumber(e.target.value))}
                className="border rounded p-2 flex-1"
              />
              <input
                type="text"
                placeholder="$ Máximo"
                value={formatNumber(maxPrice)}
                onChange={(e) => setMaxPrice(parseNumber(e.target.value))}
                className="border rounded p-2 flex-1"
              />
            </div>
            <button
              onClick={handleApplyPriceFilter}
              className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Aplicar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;