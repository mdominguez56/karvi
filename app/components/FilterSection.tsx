interface FilterSectionProps {
    title?: string;
    items?: string[];
    onClickItem?: (item: string) => void;
  }
  
  const FilterSection: React.FC<FilterSectionProps> = ({ title, items, onClickItem }) => {
    return (
      <div className="border-b pb-2">
        <button
          type="button"
          className="w-full text-left font-medium flex justify-between items-center"
        >
          {title}
        </button>
  
        {items && (
          <ul className="mt-2 text-sm text-gray-600">
            {items.map((item) => (
              <li
                key={item}
                className="flex justify-between cursor-pointer"
                onClick={() => onClickItem?.(item)}
              >
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default FilterSection;