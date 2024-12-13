import { FilterSectionProps } from "../types";

const FilterSection: React.FC<FilterSectionProps> = ({
  items,
  onClickItem,
  appliedFilters = [],
}) => {
  return (
    <div className="border-b pb-4">
      <ul className="mt-3 text-sm text-gray-600 flex flex-col gap-1"> {/* Usamos gap para espacio vertical */}
        {items?.map((item) => {
          const [value, count] = item.split(" (");
          const isAvailable = parseInt(count.replace(")", ""), 10) > 0;
          const isSelected = appliedFilters.includes(value);

          return (
            <li
              key={value}
              className={`flex justify-between cursor-pointer ${
                isSelected ? "font-bold text-black" : ""
              } ${isAvailable ? "" : "opacity-50 cursor-not-allowed"}`}
              onClick={() => isAvailable && onClickItem?.(item)}
            >
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilterSection;