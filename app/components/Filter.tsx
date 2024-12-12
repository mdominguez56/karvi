"use client";

import React, { useState } from "react";
import FilterSection from "./FilterSection";
import { Car } from "../types";
import { FaChevronDown } from "react-icons/fa6";

interface FilterProps {
  cars: Car[];
  onFilter: (filterType: string, value: string) => void;
  appliedFilters: Record<string, string[]>;
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

const Filter: React.FC<FilterProps> = ({ cars, onFilter, appliedFilters }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const getFilteredValuesWithCounts = (key: keyof Car) => {
    const counts = cars.reduce((acc: Record<string, number>, car) => {
      const isFiltered = Object.entries(appliedFilters).every(([filterKey, values]) => {
        if (filterKey === String(key)) {
          return true;
        }
        return values.includes(String(car[filterKey as keyof Car]));
      });

      if (isFiltered) {
        const value = String(car[key]);
        acc[value] = (acc[value] || 0) + 1;
      }

      return acc;
    }, {});

    if (appliedFilters[String(key)]?.length) {
      const filteredOptions = appliedFilters[String(key)];
      return filteredOptions.map((value) => `${value} (${counts[value] || 0})`);
    }

    return Object.entries(counts).map(([value, count]) => `${value} (${count})`);
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
    </div>
  );
};

export default Filter;