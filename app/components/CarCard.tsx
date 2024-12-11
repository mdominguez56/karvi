import React from "react";

interface CarProps {
  brand: string;
  model: string;
  year: number;
  price: number;
  city: string;
}

const CarCard: React.FC<CarProps> = ({ brand, model, year, price, city }) => {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h3 className="text-lg font-bold">{brand} {model}</h3>
      <p>Año: {year}</p>
      <p>Ciudad: {city}</p>
      <p className="text-blue-500 font-semibold">Precio: ${price.toLocaleString()}</p>
    </div>
  );
};

export default CarCard;