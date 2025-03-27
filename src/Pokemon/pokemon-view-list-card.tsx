import TypeBadge from "@/Components/ui/type-badge";
import { getTypeGradient } from "@/data/colors";
import { Pokemon } from "@/models";
import React, { memo } from "react";
import { Link } from "react-router";

type Props = {
  pokemon: Pokemon[];
};

function PokemonViewListCard({ pokemon }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3 lg:grid-cols-5">
      {pokemon.map((pokemon) => (
        <Link
          key={pokemon.id}
          to={`/pokemon/${pokemon.id}`}
          className={`${getTypeGradient(
            pokemon.types && pokemon.types.length > 0 ? pokemon.types[0].type.name : "normal"
          )} shadow-lg hover:shadow-xl rounded-lg hover:ring-2 hover:ring-blue-500 overflow-hidden transition-all duration-300 transform hover:scale-105`}>
          {/* Card Header with ID and Generation */}
          <div className="flex flex-col items-center h-full">
            <div className="flex w-full p-2 bg-black/30">
              <h2 className="px-2 py-1 text-xs font-bold text-white capitalize rounded-full bg-white/20">
                {`#${pokemon.id} - ${pokemon.species.name}`}
              </h2>
            </div>

            {/* Pokemon Image */}
            <div className="relative flex justify-center h-32 p-4">
              <div className="absolute inset-0 w-24 h-24 m-auto rounded-full opacity-50 bg-white/10 blur-xl"></div>
              <img
                src={pokemon.sprites.other?.["official-artwork"].front_default || "/pika.png"}
                alt={pokemon.name}
                className="z-10 object-contain h-full"
              />
            </div>

            {/* Pokemon Name */}
            <p className="text-xl font-bold text-center text-white capitalize text-shadow">
              {pokemon.name}
            </p>

            {/* Types */}
            <div className="flex justify-center w-full gap-2 p-3 mt-auto bg-black/20">
              {pokemon.types?.map((type: { type: { name: string } }) => (
                <TypeBadge key={type.type.name} type={type.type.name} className="text-xs" />
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default memo(PokemonViewListCard);
