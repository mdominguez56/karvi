"use client";

import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import CarGrid from "./components/CarGrid";
import SelectedFilters from "./components/SelectedFilters";
import Pagination from "./components/Pagination";
import { Car } from "./types";
import { RiSoundModuleLine } from "react-icons/ri";
import { FaTh, FaList } from "react-icons/fa";

const ITEMS_PER_PAGE = 12;

const Page: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({});
  const [priceFilter, setPriceFilter] = useState<{ min: number | ""; max: number | "" }>({
    min: "",
    max: "",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
      } finally {
        setIsLoading(false);
      }
    };

    loadCars();
  }, []);

  const handleFilter = (filterType: string, value: string) => {
    const newFilters = { ...appliedFilters };

    if (newFilters[filterType]?.includes(value)) {
      newFilters[filterType] = newFilters[filterType].filter((item) => item !== value);
      if (newFilters[filterType].length === 0) delete newFilters[filterType];
    } else {
      newFilters[filterType] = [...(newFilters[filterType] || []), value];
    }

    setAppliedFilters(newFilters);

    applyFilters(newFilters, priceFilter);
    setCurrentPage(1);
  };

  const handlePriceFilter = (min: number | "", max: number | "") => {
    const updatedPriceFilter = {
      min: min,
      max: max,
    } as const;

    setPriceFilter(updatedPriceFilter);
    applyFilters(appliedFilters, updatedPriceFilter);
    setCurrentPage(1);
  };

  const applyFilters = (
    filters: Record<string, string[]>,
    price: { min: number | ""; max: number | "" }
  ) => {
    let filtered = cars;

    if (Object.keys(filters).length > 0 || price.min !== "" || price.max !== "") {
      filtered = cars.filter((car) => {
        const matchesFilters = Object.entries(filters).every(([key, values]) =>
          values.includes(String(car[key as keyof Car]))
        );

        const meetsMin = price.min === "" || car.price >= price.min;
        const meetsMax = price.max === "" || car.price <= price.max;

        return matchesFilters && meetsMin && meetsMax;
      });
    }

    setFilteredCars(filtered);
  };

  const handleRemoveFilter = (filterType: string, value: string) => {
    handleFilter(filterType, value);
  };

  const handleClearFilters = () => {
    setAppliedFilters({});
    setPriceFilter({ min: "", max: "" });
    setFilteredCars(cars);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const currentItems = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner border-t-blue-500 border-4 w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex items-center justify-between px-4 lg:hidden">
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <RiSoundModuleLine size={16} />
          <span>{showFilters ? "Ocultar filtros" : "Filtrar"}</span>
        </button>

        <div className="flex gap-2">
          <button
            className={`p-2 rounded-full ${
              viewMode === "grid" ? "bg-blue-100 text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setViewMode("grid")}
            aria-label="Ver como grilla"
          >
            <FaTh />
          </button>
          <button
            className={`p-2 rounded-full ${
              viewMode === "list" ? "bg-blue-100 text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setViewMode("list")}
            aria-label="Ver como lista"
          >
            <FaList />
          </button>
        </div>
      </div>

      <aside
        className={`${
          showFilters || !window.matchMedia("(max-width: 1024px)").matches
            ? "block"
            : "hidden"
        } w-full lg:w-1/4 bg-white p-4`}
      >
        <Filter
          cars={cars}
          filteredCars={filteredCars}
          onFilter={handleFilter}
          appliedFilters={appliedFilters}
          onPriceFilter={handlePriceFilter}
          priceFilter={priceFilter}
        />
      </aside>
      <section className="flex-1 flex flex-col gap-4">
        <SelectedFilters
          appliedFilters={appliedFilters}
          priceFilter={priceFilter}
          handleRemoveFilter={handleRemoveFilter}
          handleClearFilters={handleClearFilters}
        />
        <div className="px-4 text-gray-700 font-medium">
          {filteredCars.length} carro
          {filteredCars.length !== 1 ? "s" : ""} encontrado
          {filteredCars.length !== 1 ? "s" : ""}
        </div>
        <CarGrid cars={currentItems} viewMode={viewMode} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </div>
  );
};

export default Page;