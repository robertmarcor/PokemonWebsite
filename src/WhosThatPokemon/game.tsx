import React, { useMemo } from "react";
import WhosThatPokemonProvider from "../providers/WhosThatPokemonProvider";
import WhosThatPokemonInput from "./input";
import WhosThatPokemonImage from "./image";
import WhosThatPokemonTimer from "./timer";
import PageWrapper from "../Components/page-wrapper";
import { useUserInputContext, useTimerContext } from "../contexts/WhosThatPokemonContext";

// Main component that sets up the provider
function WhosThatPokemon() {
  return (
    <WhosThatPokemonProvider>
      <WhosThatPokemonGame />
    </WhosThatPokemonProvider>
  );
}

// Game component with separated context consumers
function WhosThatPokemonGame() {
  console.log("Game component rendered");

  // Static content that doesn't depend on any context
  const staticContent = useMemo(() => {
    console.log("Static content memoized");
    return (
      <>
        <div className="absolute top-0 h-full w-full bg-slate-400 -z-50" />
        <h1>Whos That Pokèmon!?</h1>
        <WhosThatPokemonImage />
        <WhosThatPokemonInput />
      </>
    );
  }, []);

  return (
    <PageWrapper>
      {staticContent}
      <WhosThatPokemonTimer />
      <UserInputDisplay />
      <TimerDisplay />
    </PageWrapper>
  );
}

// Separate component that only re-renders when user input changes
const UserInputDisplay = React.memo(() => {
  const { userInput } = useUserInputContext();
  console.log("UserInputDisplay rendered");
  return <p>Current input: {userInput}</p>;
});

// Separate component that only re-renders when timer changes
const TimerDisplay = React.memo(() => {
  const { timer } = useTimerContext();
  console.log("TimerDisplay rendered");
  return <p>Timer value: {timer}</p>;
});

export default WhosThatPokemon;
