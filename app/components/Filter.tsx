"use client";

import React, { useState } from "react";

const Filter: React.FC = () => {
  const [filters, setFilters] = useState({
    brand: "",
    city: "",
    model: "",
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
    <div className="mb-6 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Filtrar autos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      </div>
    </div>
  );
};

export default Filter;