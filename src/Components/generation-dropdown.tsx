import { useEffect, useState, useMemo } from "react";
import { generations } from "../data/consts";

export default function GenerationSelector({
  updateSelectedRanges,
}: {
  updateSelectedRanges: (ranges: number[][]) => void;
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
    updateSelectedRanges(selectedRanges);
  }, [selectedRanges, updateSelectedRanges]);

  return (
    <div className="border-2 rounded-md">
      <p className="font-bold text-center">PICK</p>
      {generations.map((generation) => (
        <div
          key={generation.id}
          onClick={() => toggleGenerationSelection(generation.id)}
          className={`border-b cursor-pointer transition-colors select-none p-2 flex items-center justify-between
            ${
              activeGenerations.includes(generation.id)
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            }`}
          role="button"
          aria-selected={activeGenerations.includes(generation.id)}>
          <p className="text-sm w-16 hover:text-violet-500 hover:underline">
            Gen {generation.id}
          </p>
          {generation.icon && (
            <img
              className="w-8 h-8 scale-150 pointer-events-none"
              src={generation.icon}
              alt={`${generation.label} icon`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
