import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { generations, RawGeneration } from "../../data/generation";

interface FilterControlsProps {
  selectedGenerations: RawGeneration[];
  onGenerationToggle: (generation: RawGeneration) => void;
  onClearFilters: () => void;
  hasFilters: boolean;
}

const PokemonFilterControls: React.FC<FilterControlsProps> = ({
  selectedGenerations,
  onGenerationToggle,
  onClearFilters,
  hasFilters,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full border border-gray-700 rounded overflow-hidden mb-6">
      {/* Header with toggle */}
      <div
        className="p-3 flex justify-between items-center cursor-pointer bg-gray-800/50"
        onClick={toggleOpen}>
        <h2 className="font-semibold text-lg">Filters</h2>
        <button className="text-gray-300 hover:text-white transition-colors">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Animated content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden">
            <div className="p-4">
              <div className="flex flex-col gap-4">
                {/* Generation Filter */}
                <div>
                  <h3 className="font-semibold mb-2">Generation</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 font-sans">
                    {generations.map((gen) => (
                      <label key={gen.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedGenerations.some((g) => g.id === gen.id)}
                          onChange={() => onGenerationToggle(gen)}
                          className="form-checkbox"
                        />
                        <span>Gen {gen.id}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters Button */}
                {hasFilters && (
                  <button onClick={onClearFilters} className="text-red-500 underline self-start">
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(PokemonFilterControls);
