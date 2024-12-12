"use client";

import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import CarGrid from "./components/CarGrid";
import { Car } from "./types";

import { IoCloseOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

const Page: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

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

  const handleFilter = (filteredCars: Car[], city: string) => {
    if (!appliedFilters.includes(city)) {
      const newFilters = [...appliedFilters, city];
      setAppliedFilters(newFilters);

      const updatedFilteredCars = cars.filter((car) =>
        newFilters.includes(car.city)
      );
      setFilteredCars(updatedFilteredCars);
    }
  };

  const handleRemoveFilter = (filterToRemove: string) => {
    const newFilters = appliedFilters.filter(
      (filter) => filter !== filterToRemove
    );
    setAppliedFilters(newFilters);

    if (newFilters.length === 0) {
      setFilteredCars(cars);
    } else {
      const updatedFilteredCars = cars.filter((car) =>
        newFilters.includes(car.city)
      );
      setFilteredCars(updatedFilteredCars);
    }
  };

  const handleClearFilters = () => {
    setAppliedFilters([]);
    setFilteredCars(cars);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside className="w-full lg:w-1/4 bg-white p-4">
        <Filter cars={cars} onFilter={handleFilter} />
      </aside>

      <section className="flex-1 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 px-4">
          {appliedFilters.map((filter) => (
            <div
              key={filter}
              className="flex items-center bg-white text-blue-600 border border-blue-500 px-3 py-1 rounded-full shadow-sm"
              style={{
                borderRadius: "64px",
                padding: "4px 12px",
                height: "28px",
                borderWidth: "1px",
                borderColor: "#B4BEF5",
                gap: "8px",
              }}
            >
              <span className="text-sm font-medium">{filter}</span>
              <button
                className="ml-2 text-blue-500 hover:text-blue-700"
                onClick={() => handleRemoveFilter(filter)}
                aria-label={`Remove filter ${filter}`}
              >
                <IoCloseOutline size={16} />
              </button>
            </div>
          ))}
          {appliedFilters.length > 0 && (
            <button
              className="flex items-center bg-transparent text-[#566DED] font-medium"
              style={{
                border: "none",
                gap: "8px",
                fontFamily: "Raleway, sans-serif",
                fontSize: "14px",
                lineHeight: "20px",
              }}
              onClick={handleClearFilters}
            >
              <RiDeleteBin6Line size={16} />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        <CarGrid cars={filteredCars} />
      </section>
    </div>
  );
};

export default Page;