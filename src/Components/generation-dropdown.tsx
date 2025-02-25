import { useEffect, useState, useMemo } from "react";
import { generations } from "../data/consts";

export default function GenerationSelector({
  className,
  updateSelectedRanges,
  selectedGenerations,
}: {
  className?: string;
  updateSelectedRanges?: (ranges: number[][]) => void;
  selectedGenerations?: (gens: number[] | []) => void;
}) {
  const [activeGenerations, setActiveGenerations] = useState<number[]>([1, 2, 3]);

  const toggleGenerationSelection = (generationId: number) => {
    setActiveGenerations((prevSelected) =>
      prevSelected.includes(generationId)
        ? prevSelected.filter((id) => id !== generationId)
        : [...prevSelected, generationId]
    );
  };

  const selectedRanges = useMemo(() => {
    return generations
      .filter((generation) => activeGenerations.includes(generation.id))
      .map((generation) => generation.range);
  }, [activeGenerations]);

  useEffect(() => {
    if (updateSelectedRanges) {
      updateSelectedRanges(selectedRanges);
    }
    if (selectedGenerations) {
      selectedGenerations(activeGenerations);
    }
  }, [activeGenerations, selectedGenerations, selectedRanges, updateSelectedRanges]);

  return (
    <div className={`${className}`}>
      <p className="font-bold text-center">Select</p>
      {generations.map((generation) => (
        <div
          key={generation.id}
          onClick={() => toggleGenerationSelection(generation.id)}
          className={`cursor-pointer transition-colors select-none my-1
          ${
            activeGenerations.includes(generation.id)
              ? "opacity-100 bg-gradient-to-r from-blue-800 via- to-teal-400 rounded-md text-black font-semibold"
              : "opacity-20 hover:opacity-100 hover:text-blue-400"
          }`}
          role="button"
          aria-selected={activeGenerations.includes(generation.id)}>
          <div className="flex items-center">
            <p className="text-sm w-16">Gen {generation.id}</p>
            {generation.icon && (
              <img
                className="w-8 h-8 scale-[2] pointer-events-none"
                src={generation.icon}
                alt={`${generation.label} icon`}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
