import React from "react";

type Props = {
  score: number;
  hp: number;
  streak: number;
};

function WhosThatPokemonHud({ score, hp, streak }: Props) {
  return (
    <>
      <p className="font-bold">{score} ⭐</p>
      <p className="flex">
        {hp > 0 && Array.from({ length: hp }, (_, i) => <span key={i}>❤️</span>)}
      </p>
      {streak > 0 ? <p>{streak}🔥</p> : <p>🔥</p>}
    </>
  );
}

export default React.memo(WhosThatPokemonHud);
