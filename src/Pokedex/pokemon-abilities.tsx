import { Pokemon } from "../models";

function PokemonAbilities({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
      {pokemon.abilities.map((ability) => (
        <div
          key={ability.ability.name}
          className="bg-gray-700/50 hover:bg-gray-700 p-3 border border-gray-600/50 rounded-lg transition-colors duration-200">
          <div className="flex justify-between items-center">
            <span className="text-white capitalize">{ability.ability.name.replace("-", " ")}</span>
            {ability.is_hidden && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm px-2 py-1 rounded-full font-bold text-xs">
                Hidden
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonAbilities;
