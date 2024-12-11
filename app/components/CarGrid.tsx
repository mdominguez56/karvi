interface Car {
    id: number;
    city: string;
    year: number;
    brand: string;
    model: string;
    version: string;
    price: number;
    mileage: number;
  }
  
  interface CarGridProps {
    cars: Car[];
  }
  
  const CarGrid: React.FC<CarGridProps> = ({ cars }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="p-4 border rounded shadow bg-white">
            <h3 className="text-lg font-bold">
              {car.brand} {car.model}
            </h3>
            <p>Año: {car.year}</p>
            <p>Ciudad: {car.city}</p>
            <p className="text-blue-500 font-semibold">Precio: ${car.price.toLocaleString()}</p>
            <p>Kilometraje: {car.mileage} km</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default CarGrid;