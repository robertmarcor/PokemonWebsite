import { cn } from "@/lib/utils";
import { memo, useEffect, useState } from "react";

interface Props {
  pokemonId: number;
  reveal: boolean;
}
const WhosThatPokemonImage = memo(function WhosThatPokemonImage({ pokemonId, reveal }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const spriteUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/official-artwork";

  const makeSpriteUrl = (id: number) => {
    return `${spriteUrl}/${id}.png`;
  };

  useEffect(() => {
    setIsLoading(true);
  }, [pokemonId]);

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="absolute size-full rounded-full bg-radial from-white to-50% to-primary/20 blur-2xl -z-50" />
      {isLoading && <img src="/475x475.png" className="absolute animate-spin" />}
      <img
        src={makeSpriteUrl(pokemonId)}
        alt="silhouette of pokemon"
        className={cn(
          "pointer-events-none cursor-none w-auto z-50",
          `filter ${reveal ? "brightness-100" : "brightness-0"}`
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
});

export default WhosThatPokemonImage;
