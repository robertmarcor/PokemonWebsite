import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  goToFirstPage: () => void;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  goToLastPage: () => void;
}

const PokemonViewPaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  goToFirstPage,
  goToPrevPage,
  goToNextPage,
  goToLastPage,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
      {/* First Page Button */}
      <button
        onClick={goToFirstPage}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg shadow-md transition-all duration-200 ${
          currentPage === 1
            ? "bg-gray-700 cursor-not-allowed opacity-50"
            : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105"
        }`}
        title="First Page">
        {"<"}
      </button>

      {/* Previous Page Button */}
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg shadow-md transition-all duration-200 ${
          currentPage === 1
            ? "bg-gray-700 cursor-not-allowed opacity-50"
            : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105"
        }`}
        title="Previous Page">
        <ChevronLeft size={16} />
      </button>

      {/* Page Input and Total */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/30">
        <span className="hidden font-bold sm:inline">Page</span>
        <input
          type="text"
          min="1"
          max={totalPages}
          value={currentPage}
          className="w-12 text-center border rounded bg-black/30 border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
          title="Enter page number"
          readOnly
        />
        <span className="font-bold">of {totalPages}</span>
      </div>

      {/* Next Page Button */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg shadow-md transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-gray-700 cursor-not-allowed opacity-50"
            : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105"
        }`}
        title="Next Page">
        <ChevronRight size={16} />
      </button>

      {/* Last Page Button */}
      <button
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg shadow-md transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-gray-700 cursor-not-allowed opacity-50"
            : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105"
        }`}
        title="Last Page">
        {">"}
      </button>
    </div>
  );
};

export default PokemonViewPaginationControls;
