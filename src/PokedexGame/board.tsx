import React from "react";
import { PokemonData } from "./fill-the-dex-game";

type BoardProps = {
  pokemon: PokemonData[] | null;
  guessedPokemon: string[];
};
const Board = ({ pokemon, guessedPokemon }: BoardProps) => {
  if (!pokemon || pokemon.length === 0) return null;

  return (
    <div className="grid grid-cols-12 gap-2 p-4 border-4 rounded-lg bg-black/50 max-sm:grid-cols-6">
      {pokemon.map((poke) => (
        <div key={poke.name} className="relative">
          {/* Overlay for unguessed Pokémon */}
          {!guessedPokemon.includes(poke.name) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full shadow-lg shadow-white size-4"></div>
            </div>
          )}
          {/* Pokémon Image */}
          <div
            className={`transition-opacity duration-500 filter select-none pointer-events-none 
                          ${guessedPokemon.includes(poke.name) ? "opacity-100" : "brightness-0"}`}>
            <div className="scale-150 size-12">
              <img src={poke.sprite || "/pika.png"} alt={poke.name} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Board);
