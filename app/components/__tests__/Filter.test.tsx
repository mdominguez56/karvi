import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../Filter";
import { Car } from "../../types";

describe("Filter component", () => {
  const mockCars: Car[] = [
    { id: 1, city: "São Paulo", year: 2023, brand: "Toyota", model: "Corolla", version: "1.8", price: 100000, mileage: 5000 },
    { id: 2, city: "Rio de Janeiro", year: 2022, brand: "Honda", model: "Civic", version: "2.0", price: 120000, mileage: 10000 },
  ];

  const mockFilteredCars = mockCars;

  const mockOnFilter = jest.fn();
  const mockOnPriceFilter = jest.fn();

  const mockAppliedFilters = {
    brand: ["Toyota"],
  };

  const mockPriceFilter = { min: 50000, max: 150000 };

  it("renders correctly", () => {
    render(
      <Filter
        cars={mockCars}
        filteredCars={mockFilteredCars}
        onFilter={mockOnFilter}
        appliedFilters={mockAppliedFilters}
        onPriceFilter={mockOnPriceFilter}
        priceFilter={mockPriceFilter}
      />
    );
    // Check if the filter sections are rendered
    expect(screen.getByText("Marca")).toBeTruthy();
    expect(screen.getByText("Modelo")).toBeTruthy();
    expect(screen.getByText("Año")).toBeTruthy();
    expect(screen.getByText("Versión")).toBeTruthy();
    expect(screen.getByText("Ciudad")).toBeTruthy();
    expect(screen.getByText("Precio")).toBeTruthy();
  });

  it("toggles filter sections when clicked", () => {
    render(
      <Filter
        cars={mockCars}
        filteredCars={mockFilteredCars}
        onFilter={mockOnFilter}
        appliedFilters={mockAppliedFilters}
        onPriceFilter={mockOnPriceFilter}
        priceFilter={mockPriceFilter}
      />
    );

    const brandButton = screen.getByText("Marca");
    fireEvent.click(brandButton);
    // Check if the section expands
    expect(screen.getByText("Toyota (1)")).toBeTruthy();
  });

  // it("calls onFilter when a filter option is clicked", () => {
  //   render(
  //     <Filter
  //       cars={mockCars}
  //       filteredCars={mockFilteredCars}
  //       onFilter={mockOnFilter}
  //       appliedFilters={mockAppliedFilters}
  //       onPriceFilter={mockOnPriceFilter}
  //       priceFilter={mockPriceFilter}
  //     />
  //   );

  //   fireEvent.click(screen.getByText("Toyota (1)"));

  //   // Ensure onFilter is called with the correct arguments
  //   expect(mockOnFilter).toHaveBeenCalledWith("brand", "Toyota");
  // });

  // it("updates price filter when applying price range", () => {
  //   render(
  //     <Filter
  //       cars={mockCars}
  //       filteredCars={mockFilteredCars}
  //       onFilter={mockOnFilter}
  //       appliedFilters={mockAppliedFilters}
  //       onPriceFilter={mockOnPriceFilter}
  //       priceFilter={mockPriceFilter}
  //     />
  //   );

  //   const minInput = screen.getByPlaceholderText("$ Mínimo");
  //   const maxInput = screen.getByPlaceholderText("$ Máximo");
  //   const applyButton = screen.getByText("Aplicar");

  //   fireEvent.change(minInput, { target: { value: "60000" } });
  //   fireEvent.change(maxInput, { target: { value: "140000" } });
  //   fireEvent.click(applyButton);

  //   // Ensure onPriceFilter is called with correct values
  //   expect(mockOnPriceFilter).toHaveBeenCalledWith(60000, 140000);
  // });
});