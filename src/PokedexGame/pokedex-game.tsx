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
      <div className="fixed -z-50 inset-0 transform skew-x-[24deg] bg-zinc-500/10" />
      <div className="fixed -z-40 bg-zinc-500/10"></div>

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

          <p>
            You have guessed {`${guessedPokemon.length} / ${generations[gen - 1].specie_amount}`}
          </p>

          <div className="relative max-w-2xl">
            {/* Input Field */}
            <input
              type="text"
              value={guess}
              onChange={(e) => handleInstantSubmit(e.target.value)}
              placeholder="Guess a Pokémon"
              className="relative w-full p-2 text-white border-2 rounded-md bg-background"
            />
          </div>

          {isLoading && <p>Loading Data...</p>}
          <Board pokemon={pokemon} guessedPokemon={guessedPokemon} />
        </>
      )}
    </PageWrapper>
  );
}
