import { cn } from "@/lib/utils";
import { memo } from "react";

interface Props {
  pokemonId: number;
  reveal: boolean;
}
const WhosThatPokemonImage = memo(function WhosThatPokemonImage({ pokemonId, reveal }: Props) {
  const spriteUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/official-artwork";

  const makeSpriteUrl = (id: number) => {
    return `${spriteUrl}/${id}.png`;
  };

  return (
    <>
      <img
        src={makeSpriteUrl(pokemonId)}
        alt="silhouette of pokemon"
        className={cn(
          "pointer-events-none cursor-none",
          `filter ${reveal ? "brightness-100" : "brightness-0"}`
        )}
      />
    </>
  );
});

export default WhosThatPokemonImage;
