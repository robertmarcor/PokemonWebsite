import React from "react";

type Props = {
  name: string;
};

function WhosThatPokemonEasyMode({ name }: Props) {
  return <div></div>;
}

export default React.memo(WhosThatPokemonEasyMode);
