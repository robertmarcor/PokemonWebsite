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
  const [isButtonLocked, setIsButtonLocked] = useState(false);

  const generateChoices = useCallback(() => {
    const wrongChoices = allNames
      .filter((name) => name !== word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setChoices([word, ...wrongChoices].sort(() => Math.random() - 0.5));
    setIsButtonLocked(false);
  }, [word]);

  useEffect(() => {
    generateChoices();
  }, [word, generateChoices]);

  const handleButtonClick = (choice: string) => {
    if (isButtonLocked) return;

    // Immediately lock buttons to prevent multiple clicks
    setIsButtonLocked(true);

    // Call the parent's handleGuess function
    handleGuess(choice);

    // Simple 0.5 second delay before allowing clicks again
    setTimeout(() => {
      setIsButtonLocked(false);
    }, 500);
  };

  return (
    <div className="gap-2 grid grid-cols-2">
      {choices.map((choice, index) => (
        <button
          key={index}
          disabled={isButtonLocked}
          className={`border-2 border-black p-4 m-2 rounded-md text-center text-lg 
          ${
            !isButtonLocked
              ? "hover:text-purple-700 active:bg-orange-400"
              : "opacity-70 cursor-not-allowed"
          }
          bg-gradient-to-r from-slate-900 to-slate-700`}
          onClick={() => handleButtonClick(choice)}>
          {toPascalCase(choice)}
        </button>
      ))}
    </div>
  );
}

export default React.memo(WhosThatGameMobileInput);
