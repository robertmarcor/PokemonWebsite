import { useEffect, useState } from "react";
import { useGetMultiplePokemonById } from "../client/pokemon.client";
import GenerationSelector from "../Components/generation-dropdown";
import { useGetMultipleGenerationById } from "../client/generation.client";

export default function PokedexGame() {
  const [generation, setGeneration] = useState<number[]>([]);
  const { data: genData, isLoading: genLoading } = useGetMultipleGenerationById(generation);
  const { data, isLoading, refetch } = useGetMultiplePokemonById([1, 2, 3]);

  useEffect(() => {
    if (!genLoading && genData) {
      refetch();
    }
  }, [genLoading, genData, refetch]);

  return (
    <div className="grid w-full gap-4">
      <h1 className="text-5xl font-headings font-extrabold my-8">Fill the Dex</h1>
      <GenerationSelector selectedGenerations={setGeneration} />
      <p>Selected gens: {generation}</p>
      {genData.map((gen) => (
        <li>{gen?.main_region.name}</li>
      ))}

      <div className="w-96 h-96 border p-4 overflow-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data && (
            <ul className="list-disc list-inside">
              {data.map((pokemon) => (
                <li key={pokemon?.id}>{pokemon?.name}</li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
}
