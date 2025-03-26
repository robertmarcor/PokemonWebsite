import { useState, useEffect } from "react";
import { useGetMultiplePokemonById } from "../client/pokemon.client";
import PickGen from "../Components/pick-gen";
import { generations } from "../data/consts";
import Portal from "../Portal";
import PageWrapper from "../Components/page-wrapper";
import Board from "./board";

export type PokemonData = {
  name: string;
  sprite: string | null;
};

export default function PokedexGame() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [gen, setGen] = useState<number>();
  const [list, setList] = useState<number[]>([]);
  const [pokemon, setPokemon] = useState<PokemonData[] | null>(null);
  const [guessedPokemon, setGuessedPokemon] = useState<string[]>([]);
  const [guess, setGuess] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const {
    data: fetchedPokemonData,
    refetch: pokemonRefetch,
    isLoading,
  } = useGetMultiplePokemonById(list, false, (pokemon) => ({
    name: pokemon?.species.name ?? pokemon.name,
    sprite:
      pokemon.sprites.versions["generation-viii"].icons.front_default ??
      pokemon.sprites.front_default,
  }));

  useEffect(() => {
    if (gen != null) {
      const { range } = generations[gen - 1];
      const [start, end] = range;
      const array = Array.from({ length: end - start + 1 }, (_, i) => i + start);
      setList(array);

      setPokemon(null);
    }
  }, [gen]);

  useEffect(() => {
    if (list.length !== 0 && gen != null) {
      const _key = `Generation${gen}_Data`;
      const storedData = localStorage.getItem(_key);

      if (!storedData) {
        console.log("No stored data, fetching");
        pokemonRefetch();
      } else {
        const parsedData: PokemonData[] = JSON.parse(storedData);
        if (parsedData.length === 0) {
          console.log("Stored data is empty, fetching");
          pokemonRefetch();
        } else {
          console.log("Stored Data found, retrieving data");
          setPokemonData();
        }
      }
    }
  }, [list, gen]);

  useEffect(() => {
    const _key = `Generation${gen}_Data`;
    if (!isLoading && fetchedPokemonData && fetchedPokemonData.length !== 0) {
      localStorage.setItem(_key, JSON.stringify(fetchedPokemonData));
      console.log("Data saved to localStorage");
      setPokemonData();
    }
  }, [isLoading]);

  const setPokemonData = () => {
    const _key = `Generation${gen}_Data`;
    const _storedData = localStorage.getItem(_key);
    if (_storedData) {
      setPokemon(JSON.parse(_storedData));
    }
  };

  function handleGuess(input: string) {
    if (!pokemon) return;

    const normalizedInput = input.trim().toLowerCase();
    const found = pokemon.find((poke) => poke.name.toLowerCase() === normalizedInput);

    if (found && !guessedPokemon.includes(found.name)) {
      setGuessedPokemon((prev) => [...prev, found.name]);
    }

    setGuess("");
  }

  function handleInstantSubmit(input: string) {
    setGuess(input);

    if (!pokemon) return;

    const normalizedInput = input.trim().toLowerCase();

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      const found = pokemon.find((poke) => poke.name.toLowerCase() === normalizedInput);

      if (found) {
        handleGuess(input);
      }
    }, 300);

    setTypingTimeout(newTimeout);
  }

  return (
    <PageWrapper>
      <div className="-z-50 fixed inset-0 bg-zinc-500/10 skew-x-[24deg] transform" />
      <div className="-z-40 fixed bg-zinc-500/10"></div>

      <h1 className="my-8 font-extrabold text-5xl text-center tracking-widest">
        UNDER CONSTRUCTION
      </h1>

      {/* Desktop layout with side-by-side panels */}
      <div className="flex md:flex-row flex-col gap-6 w-full">
        {/* Left panel - Controls and info */}
        <div className="flex flex-col gap-4 bg-black/20 p-4 border-2 rounded-lg md:w-1/3">
          <button
            className="bg-black/20 shadow-[0px_2px_5px_5px] shadow-white mx-auto px-4 py-2 border-2"
            onClick={() => setIsModalOpen(!isModalOpen)}>
            Pick Generation
          </button>

          {isModalOpen && (
            <Portal>
              <PickGen toggleModal={() => setIsModalOpen(!isModalOpen)} />
            </Portal>
          )}

          {gen && (
            <>
              <div className="bg-black/30 p-4 rounded-lg">
                <h2 className="mb-2 font-bold text-xl">Generation {gen}</h2>
                <p className="mb-2">
                  There are{" "}
                  <span className="font-bold text-orange-500">
                    {generations[gen - 1].specie_amount}
                  </span>{" "}
                  Pokémon to find
                </p>

                {/* ProgressBar */}
                <div className="bg-gray-700 mb-4 rounded-full w-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 rounded-full h-4 transition-all duration-500"
                    style={{
                      width: `${
                        (guessedPokemon.length / generations[gen - 1].specie_amount) * 100
                      }%`,
                    }}></div>
                </div>

                <p className="font-bold text-center">
                  {guessedPokemon.length} / {generations[gen - 1].specie_amount} found
                </p>
              </div>

              <div className="relative mt-4">
                <label className="block mb-2 font-medium">Enter Pokémon Name:</label>
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => handleInstantSubmit(e.target.value)}
                  placeholder="Guess a Pokémon"
                  className="relative bg-background p-3 border-2 rounded-md outline-none ring-blue-500 focus:ring-2 w-full text-white"
                />
              </div>

              {isLoading && (
                <div className="bg-black/30 mt-4 p-4 rounded-lg text-center">
                  <p className="animate-pulse">Loading Pokémon Data...</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right panel - Board */}
        <div className="md:w-2/3">
          {gen && pokemon && <Board pokemon={pokemon} guessedPokemon={guessedPokemon} />}
        </div>
      </div>
    </PageWrapper>
  );
}
