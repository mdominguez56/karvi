"use client";

import React from "react";
import FilterSection from "./FilterSection";

const Filter: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <FilterSection title="Marca" />
      <FilterSection title="Modelo" />
      <FilterSection title="Año" />
      <FilterSection title="Versión" />
      <FilterSection
        title="Ciudad"
        items={[
          "Barueri",
          "Sao Paulo",
          "Sorocaba",
          "Santo André",
          "Guarulhos",
          "Americana",
          "Votuporanga",
          "Sao Bernardo Do Campo",
          "Barretos",
        ]}
      />
    </div>
  );
};

export default Filter;