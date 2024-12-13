import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SelectedFiltersProps } from "../types"

const SelectedFilters: React.FC<SelectedFiltersProps> = ({
  appliedFilters,
  priceFilter,
  handleRemoveFilter,
  handleClearFilters,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between px-4 gap-2">
      <div className="flex flex-wrap items-center gap-2">
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
              onClick={() => handleRemoveFilter("", "")}
              aria-label="Remove price filter"
            >
              <IoCloseOutline size={16} />
            </button>
          </div>
        ) : null}
      </div>
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
  );
};

export default SelectedFilters;