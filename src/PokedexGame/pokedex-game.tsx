import { useState, useEffect } from "react";
import { useGetMultiplePokemonById } from "../client/pokemon.client";
import PickGen from "../Components/pick-gen";
import { generations } from "../data/consts";
import { cn } from "../lib/utils";
import Portal from "../Portal";

type PokemonData = {
  name: string;
  sprite: string;
};

export default function PokedexGame() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [gen, setGen] = useState<number | null>(null);
  const [list, setList] = useState<number[]>([]);
  const [pokemon, setPokemon] = useState<PokemonData[] | null>(null);

  const {
    data: fetchedPokemonData,
    refetch: pokemonRefetch,
    isLoading,
  } = useGetMultiplePokemonById(list, false, (pokemon) => ({
    name: pokemon.species.name,
    sprite: pokemon.sprites.versions["generation-viii"].icons.front_default,
  }));

  // Update list when generation changes and reset stored Pokemon data.
  useEffect(() => {
    if (gen != null) {
      const { range } = generations[gen - 1];
      const [start, end] = range;
      const array = Array.from({ length: end - start + 1 }, (_, i) => i + start);
      setList(array);
      setPokemon(null); // Reset to avoid stale data when generation changes.
    }
  }, [gen]);

  // Check localStorage when generation changes.
  useEffect(() => {
    if (gen != null) {
      const key = `Generation${gen}_Data`;
      const savedData = localStorage.getItem(key);
      if (savedData && savedData.length >= 3) {
        try {
          const parsedData: PokemonData[] = JSON.parse(savedData);
          setPokemon(parsedData);
          console.log("Loaded from storage", parsedData);
        } catch (error) {
          console.error("Error parsing stored data", error);
        }
      } else {
        // No valid saved data, so fetch fresh data.
        pokemonRefetch();
      }
    }
  }, [gen]);

  // Save fetched data to localStorage and update state.
  useEffect(() => {
    if (gen != null && fetchedPokemonData && !isLoading) {
      const key = `Generation${gen}_Data`;
      const savedData = localStorage.getItem(key);
      if (!savedData || savedData.length < 3) {
        localStorage.setItem(key, JSON.stringify(fetchedPokemonData));
        setPokemon(fetchedPokemonData as PokemonData[]);
        console.log("Saved new data", fetchedPokemonData);
      }
    }
  }, [gen, isLoading]);

  const parseData = () => {
    if (gen != null) {
      const key = `Generation${gen}_Data`;
      const savedData = localStorage.getItem(key);
      if (savedData) {
        console.log(JSON.parse(savedData));
      } else {
        console.log("No data found");
      }
    }
  };

  return (
    <div className="grid content-start h-full max-w-2xl gap-4 mx-auto mb-4 overflow-hidden text-center">
      <div className="fixed -z-50 inset-0 transform skew-x-[24deg] bg-zinc-500/10" />
      <div className="fixed -z-40 bg-zinc-500/10"></div>
      <button onClick={parseData}>Parse</button>
      <h1 className="my-8 text-5xl font-extrabold tracking-widest">Fill the Dex</h1>
      <button className="px-4 mx-auto button" onClick={() => setIsModalOpen(!isModalOpen)}>
        Pick Gen
      </button>
      {isModalOpen && (
        <Portal>
          <PickGen setGeneration={setGen} onClose={() => setIsModalOpen(!isModalOpen)} />
        </Portal>
      )}

      {gen && (
        <>
          <h2>You have selected</h2>
          <p>
            Generation: {gen} <br /> There are{" "}
            <span className="font-bold text-orange-500">{generations[gen - 1].specie_amount}</span>{" "}
            Pokémon
          </p>
          <Board />
        </>
      )}
    </div>
  );

  function Board() {
    if (pokemon && pokemon.length > 0) {
      const squares = pokemon.map((poke: PokemonData, index: number) => (
        <div key={poke.name || index} className="border-b-2">
          <div className="scale-150 size-12">
            <img src={poke.sprite || "/pika.png"} alt={poke.name} />
          </div>
        </div>
      ));
      return (
        <div className={cn("grid grid-cols-10 gap-1 p-4 bg-black w-full border-4 rounded-lg")}>
          {squares}
        </div>
      );
    }
    return null;
  }
}
