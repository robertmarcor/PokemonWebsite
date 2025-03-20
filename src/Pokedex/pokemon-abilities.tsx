import { Pokemon } from "../models";

function PokemonAbilities({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="flex">
      <p className="text-white">
        Abilities:
        <span className="flex gap-2 ml-1">
          {pokemon.abilities.map((ability) => (
            <span key={ability.ability.name} className="flex items-center">
              <span className="capitalize">{ability.ability.name.replace("-", " ")}</span>
              {ability.is_hidden && (
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm px-2 py-1 rounded-full font-bold text-xs ml-1">
                  Hidden
                </span>
              )}
            </span>
          ))}
        </span>
      </p>
    </div>
  );
}

export default PokemonAbilities;
