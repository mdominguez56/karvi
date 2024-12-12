import React from "react";
import { MdExpandMore } from "react-icons/md";

interface FilterSectionProps {
  title: string; 
  items?: string[]; 
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, items }) => {
  return (
    <div className="border-b pb-2">
      <button
        type="button"
        className="w-full text-left font-medium flex justify-between items-center"
      >
        {title}
        <MdExpandMore />
      </button>

      {items && (
        <ul className="mt-2 text-sm text-gray-600">
          {items.map((item) => (
            <li key={item} className="flex justify-between">
              <span>{item}</span>
              <span className="text-gray-400">(1550)</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterSection;