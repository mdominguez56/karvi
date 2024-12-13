export interface Car {
    id: number;
    year: number;
    mileage: number;
    brand: string;
    model: string;
    version: string;
    price: number;
    city: string;
  }

export interface CarGridProps {
    cars: Car[];
    viewMode: "grid" | "list";
  }

export interface CarCardProps {
    car: Car;
    viewMode: "grid" | "list";
  }
export interface FilterProps {
    cars: Car[];
    filteredCars: Car[];
    onFilter: (filterType: string, value: string) => void;
    appliedFilters: Record<string, string[]>;
    onPriceFilter: (min: number | "", max: number | "") => void;
    priceFilter: { min: number | ""; max: number | "" };
}

export interface FilterSectionProps {
  title?: string;
  items?: string[];
  onClickItem?: (item: string) => void;
  appliedFilters?: string[];
}

export interface FavoritesContextProps {
  favorites: Car[];
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: number) => void;
}