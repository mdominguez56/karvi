import Filter from "./components/Filter";
import CarGrid from "./components/CarGrid";

const API_URL = "https://ast.prd.karvi.com.ar/challenge/cars/ASST-challenge-01JEVJTR90HVPSS2NRPPG02CJ3.json";

async function fetchCars() {
  const res = await fetch(API_URL, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error("Error fetching cars data");
  }
  const data = await res.json();
  return data.items;
}

export default async function Home() {
  const cars = await fetchCars();

  return (
    <div className="flex flex-col gap-6">
      <Filter />

      <CarGrid cars={cars} />
    </div>
  );
}