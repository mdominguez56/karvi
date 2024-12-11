"use client";

import React, { useState } from "react";

const Filter: React.FC = () => {
  const [filters, setFilters] = useState({
    brand: "",
    city: "",
    year: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Filtrar autos</h2>

      <div>
        <label className="block font-medium">Marca:</label>
        <input
          type="text"
          name="brand"
          value={filters.brand}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Ciudad:</label>
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Año:</label>
        <input
          type="text"
          name="year"
          value={filters.year}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
};

export default Filter;