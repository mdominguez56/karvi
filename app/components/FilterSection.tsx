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
            const isSelected = appliedFilters.includes(item.split(" (")[0]);
            return (
              <li
                key={item}
                className={`flex justify-between cursor-pointer ${
                  isSelected ? "font-bold text-black" : ""
                }`}
                onClick={() => onClickItem?.(item)}
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