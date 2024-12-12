"use client";

import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import CarGrid from "./components/CarGrid";
import { Car } from "./types";

import { IoCloseOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiSoundModuleLine } from "react-icons/ri";
import { FaTh, FaList } from "react-icons/fa";

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
  };

  const handlePriceFilter = (min: number | "", max: number | "") => {
    const updatedPriceFilter = {
      min: min,
      max: max,
    } as const;

    setPriceFilter(updatedPriceFilter);
    applyFilters(appliedFilters, updatedPriceFilter);
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
  };

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
        <div className="flex flex-wrap items-center gap-2 px-4">
          {Object.entries(appliedFilters).flatMap(([filterType, values]) =>
            values.map((value) => (
              <div
                key={`${filterType}-${value}`}
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
                <span className="text-sm font-medium">{value}</span>
                <button
                  className="ml-2 text-blue-500 hover:text-blue-700"
                  onClick={() => handleRemoveFilter(filterType, value)}
                  aria-label={`Remove filter ${value}`}
                >
                  <IoCloseOutline size={16} />
                </button>
              </div>
            ))
          )}
          {priceFilter.min !== "" || priceFilter.max !== "" ? (
            <div
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
              <span className="text-sm font-medium">
                {priceFilter.min !== "" && priceFilter.max !== ""
                  ? `$${priceFilter.min} - $${priceFilter.max}`
                  : priceFilter.min !== ""
                  ? `Min: $${priceFilter.min}`
                  : `Max: $${priceFilter.max}`}
              </span>
              <button
                className="ml-2 text-blue-500 hover:text-blue-700"
                onClick={() => handlePriceFilter("", "")}
                aria-label="Remove price filter"
              >
                <IoCloseOutline size={16} />
              </button>
            </div>
          ) : null}
          {Object.keys(appliedFilters).length > 0 && (
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

        <CarGrid cars={filteredCars} viewMode={viewMode} />
      </section>
    </div>
  );
};

export default Page;