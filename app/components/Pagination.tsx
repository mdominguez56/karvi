import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-between items-center px-4 mt-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="text-blue-500 hover:underline disabled:text-gray-400"
      >
        Anterior
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "text-blue-500 hover:bg-blue-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="text-blue-500 hover:underline disabled:text-gray-400"
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;