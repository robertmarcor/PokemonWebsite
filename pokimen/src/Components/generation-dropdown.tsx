import { useEffect, useState } from "react";
import { useGetMultiplePokemonById } from "../client/pokemon.client";
import { starterIds } from "../data/consts";

export default function GenerationDropDown({ setGeneration }: { setGeneration: (gens: number[]) => void }) {
  const [selectedGenerations, setSelectedGenerations] = useState<number[]>([]);

  const { data: starters, isLoading } = useGetMultiplePokemonById(starterIds, (pokemon) => ({
    sprite: pokemon.sprites.front_default,
  }));

  // Array of available generations
  const generations = isLoading
    ? []
    : [
        { value: 1, label: "Generation 1", icon: starters?.[0]?.sprite },
        { value: 2, label: "Generation 2", icon: starters?.[4]?.sprite },
        { value: 3, label: "Generation 3", icon: starters?.[8]?.sprite },
        { value: 4, label: "Generation 4", icon: starters?.[9]?.sprite },
        { value: 5, label: "Generation 5", icon: starters?.[12]?.sprite },
        { value: 6, label: "Generation 6", icon: starters?.[15]?.sprite },
        { value: 7, label: "Generation 7", icon: starters?.[18]?.sprite },
        { value: 8, label: "Generation 8", icon: starters?.[21]?.sprite },
        { value: 9, label: "Generation 9", icon: starters?.[24]?.sprite },
      ];

  useEffect(() => {
    setGeneration(selectedGenerations);
  }, [selectedGenerations, setGeneration]);

  const toggleGeneration = (gen: number) => {
    setSelectedGenerations((prev) => (prev.includes(gen) ? prev.filter((n) => n !== gen) : [...prev, gen]));
  };

  return (
    <div className="border-2 rounded-md p-2">
      <p className="font-bold text-center">PICK</p>
      {generations.map((gen) => (
        <div
          key={gen.value}
          onClick={() => toggleGeneration(gen.value)}
          className={`border-b cursor-pointer transition-colors select-none p-2 flex items-center justify-between
            ${selectedGenerations.includes(gen.value) ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
          role="button"
          aria-selected={selectedGenerations.includes(gen.value)}>
          <p className="text-sm w-16">Gen {gen.value}</p>
          {gen.icon && (
            <img className="w-8 h-8 scale-150 pointer-events-none" src={gen.icon} alt={`${gen.label} icon`} />
          )}
        </div>
      ))}
    </div>
  );
}
