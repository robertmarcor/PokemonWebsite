import React, { useState, useEffect, useCallback } from "react";
import { toPascalCase } from "../utils/utils";

type Props = {
  word: string;
  handleGuess: (input: string) => void;
};

const allNames = [
  "Bulbasaur",
  "Charmander",
  "Squirtle",
  "Pidgey",
  "Rattata",
  "Jigglypuff",
  "Meowth",
  "Psyduck",
  "Machop",
  "Magnemite",
  "Onix",
  "Geodude",
  "Eevee",
  "Snorlax",
];
function WhosThatGameMobileInput({ word, handleGuess }: Props) {
  const [choices, setChoices] = useState<string[]>([]);

  const generateChoices = useCallback(() => {
    const wrongChoices = allNames
      .filter((name) => name !== word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setChoices([word, ...wrongChoices].sort(() => Math.random() - 0.5));
  }, [word]);

  useEffect(() => {
    generateChoices();
  }, [word, generateChoices]);

  return (
    <div className="grid grid-cols-2 gap-2">
      {choices.map((choice, index) => (
        <button
          key={index}
          className="border-2 border-black p-4 m-2 rounded-md text-center text-lg hover:text-purple-700 active:bg-orange-400
          bg-gradient-to-r from-slate-900 to-slate-700"
          onClick={() => {
            handleGuess(choice);
          }}>
          {toPascalCase(choice)}
        </button>
      ))}
    </div>
  );
}

export default React.memo(WhosThatGameMobileInput);
