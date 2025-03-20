import { Pokemon } from "../../models";

type Props = {
  pokemon: Pokemon;
};

function PokemonImages({ pokemon }: Props) {
  return (
    <div className={`relative flex md:flex-col items-center justify-center gap-2`}>
      <div className="relative w-full max-w-[200px] max-sm:max-w-[150px]">
        <img
          src={
            pokemon.sprites.front_default ||
            pokemon.sprites.other?.["official-artwork"].front_default ||
            "/pika.png"
          }
          alt={pokemon.name}
          className="z-10 object-contain relative w-full h-auto"
        />
        {/* Pseudo-element container */}
        <div className="absolute inset-0 bg-white/50 opacity-50 blur-xl m-auto rounded-full size-24 sm:size-32"></div>
      </div>

      <div className="relative rounded-lg w-full max-w-[200px] max-sm:max-w-[150px]">
        <img
          src={pokemon.sprites.front_shiny || pokemon.sprites.front_default || "/pika.png"}
          alt={pokemon.name}
          className="z-10 w-full h-auto object-contain relative"
        />
        {/* Pseudo-element container */}
        <div className="absolute inset-0 bg-white/50 opacity-50 blur-xl m-auto rounded-full size-24 sm:size-32"></div>
      </div>
    </div>
  );
}

export default PokemonImages;
