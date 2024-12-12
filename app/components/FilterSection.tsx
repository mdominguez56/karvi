interface FilterSectionProps {
    title?: string;
    items?: string[];
    onClickItem?: (item: string) => void;
    appliedFilters?: string[];
  }
  
  const FilterSection: React.FC<FilterSectionProps> = ({
    items,
    onClickItem,
    appliedFilters = [],
  }) => {
    return (
      <div className="border-b pb-2">
        <ul className="mt-2 text-sm text-gray-600">
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