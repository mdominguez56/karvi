import Filter from "./components/Filter";
import CarGrid from "./components/CarGrid";

async function fetchCars() {
  const res = await fetch(
    "https://ast.prd.karvi.com.ar/challenge/cars/ASST-challenge-01JEVJTR90HVPSS2NRPPG02CJ3.json",
    { next: { revalidate: 7200 } }
  );
  if (!res.ok) {
    throw new Error("Error fetching cars data");
  }
  const data = await res.json();
  return data.items;
}

export default async function Home() {
  const cars = await fetchCars(); 

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside className="w-full lg:w-1/4 bg-white p-4 ">
        <Filter />
      </aside>

      <section className="flex-1">
        <CarGrid cars={cars} /> 
      </section>
    </div>
  );
}