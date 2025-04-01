import React, { useEffect, useState } from "react";

type Props = {
  score: number;
  hp: number;
  streak: number;
  increase: number;
};

function WhosThatPokemonHud({ score, hp, streak, increase }: Props) {
  const [showIncrease, setShowIncrease] = useState(false);

  useEffect(() => {
    if (increase > 0) {
      setShowIncrease(true);
      const timer = setTimeout(() => {
        setShowIncrease(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [increase]);

  return (
    <>
      <div className="font-bold relative">
        {showIncrease && (
          <div className="absolute left-5 top-0 animate-shake text-7xl duration-300 text-green-600 transition-opacity">
            +{increase}
          </div>
        )}
        {score} ⭐
      </div>
      <p className="flex">
        {hp > 0 && Array.from({ length: hp }, (_, i) => <span key={i}>❤️</span>)}
      </p>
      {streak > 0 ? (
        <p>
          {streak}🔥 {streak >= 5 && "🛡️"}
        </p>
      ) : (
        <p>🔥</p>
      )}
    </>
  );
}

export default React.memo(WhosThatPokemonHud);
