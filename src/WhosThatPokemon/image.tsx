import React, { memo } from "react";

// Using memo to prevent re-renders when parent components re-render
const WhosThatPokemonImage = memo(function WhosThatPokemonImage() {
  console.log("Image component rendered");

  return (
    <>
      <img src="/pika.png" alt="silhouette of pokemon" />
    </>
  );
});

export default WhosThatPokemonImage;
