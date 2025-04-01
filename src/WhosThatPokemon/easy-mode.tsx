import { allSpecies } from "@/data/speciesList";
import { cn } from "@/lib/utils";
import React, { useCallback, useMemo } from "react";

type Props = {
  word: string;
  onGuess: (isCorrect: boolean) => void;
};

function WhosThatPokemonEasyMode({ word, onGuess }: Props) {
  const choices = useMemo(() => {
    const randOne = Math.floor(Math.random() * allSpecies.count);
    const randTwo = Math.floor(Math.random() * allSpecies.count);
    const randThree = Math.floor(Math.random() * allSpecies.count);

    const choicesArray = [
      word,
      allSpecies.results[randOne].name,
      allSpecies.results[randTwo].name,
      allSpecies.results[randThree].name,
    ];

    return [...choicesArray].sort(() => Math.random() - 0.5);
  }, [word]);

  function handleGuess(choice: string) {
    const isCorrect = choice.toLowerCase() === word.toLowerCase();
    onGuess(isCorrect);
    return isCorrect;
  }

  return (
    <section className="grid grid-cols-2 grid-rows-2 gap-4 p-4 bg-background-secondary rounded-2xl">
      {choices.map((choice) => (
        <PickCard key={choice} choice={choice} onClick={handleGuess} />
      ))}
    </section>
  );
}

interface PickCardProps {
  choice: string;
  onClick: (userPick: string) => void;
}
const PickCard = React.memo(function PickCard({ choice, onClick }: PickCardProps) {
  const handleClick = useCallback(() => {
    onClick(choice);
  }, [choice, onClick]);

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-4 rounded-md",
        "hover:from-secondary cursor-pointer",
        "bg-radial from-primary to-primary/80"
      )}>
      {choice}
    </button>
  );
});

export default React.memo(WhosThatPokemonEasyMode);
