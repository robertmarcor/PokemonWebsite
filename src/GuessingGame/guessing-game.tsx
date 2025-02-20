import { useEffect, useRef, useState } from "react";
import { useGetPokemonById } from "../client/pokemon.client";
import GenerationDropDown from "../Components/generation-dropdown";

export default function GuessingGame() {
  const [generations, setGenerations] = useState<number[]>([]);
  const [randomNumber, setRandomNumber] = useState<number>(42);
  const pokemonCry = useRef<HTMLAudioElement>(null);

  const { data: randomPkm, isLoading } = useGetPokemonById(randomNumber, (pokemon) => ({
    name: pokemon.name,
    sprite: pokemon.sprites.other?.["official-artwork"].front_default,
    cry: pokemon.cries.latest,
  }));

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 100));
  }, []);

  useEffect(() => {
    if (pokemonCry.current) {
      pokemonCry.current.volume = 0.1;
    }
  }, [randomPkm?.cry]);

  return (
    <div className="grid w-full max-w-full place-items-center py-8">
      <h1 className="text-5xl my-4 font-headings font-extrabold">Who is that Pokémon?</h1>
      <div className="flex">
        {generations.map((gen) => (
          <li>{gen}</li>
        ))}
      </div>
      <PokemonDisplay className="size-96 my-28" />

      <aside className="absolute left-2 top-1/4">
        <GenerationDropDown setGeneration={setGenerations} />
      </aside>
    </div>
  );

  function PokemonDisplay({ className }: { className?: string }) {
    return (
      <div className={`${className} flex justify-center items-center relative`}>
        {isLoading ? (
          <p>Loading...</p>
        ) : randomPkm?.sprite ? (
          <img className="filter brightness-0 z-10" src={randomPkm.sprite} alt={`Image of ${randomPkm.name}`} />
        ) : (
          <p>Missing</p>
        )}
        {/* <audio ref={pokemonCry} src={randomPkm?.cry} autoPlay /> */}
        <div className="absolute size-[28rem] rounded-full bg-gradient-radial from-red-950 blur-2xl"></div>
      </div>
    );
  }
}
