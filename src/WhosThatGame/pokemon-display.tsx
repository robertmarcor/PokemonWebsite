import React from "react";

function PokemonDisplay({
  className,
  pokemonName,
  pokemonSprite,
  showSiluette,
}: {
  className?: string;
  pokemonName: string;
  pokemonSprite: string;
  showSiluette: boolean;
}) {
  return (
    <div className={`${className} flex justify-center items-center relative`}>
      <div className="absolute size-[28rem] rounded-full bg-gradient-radial dark:from-primary from-primary blur-2xl -z-50" />
      <img
        src={pokemonSprite}
        alt={`Sprite of ${pokemonName}`}
        className={`filter ${
          showSiluette ? "brightness-0" : "brightness-100"
        } select-none pointer-events-none`}
      />
    </div>
  );
}

export default React.memo(PokemonDisplay);
