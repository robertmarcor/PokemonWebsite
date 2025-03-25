import React, { useRef, memo, useCallback } from "react";
import { useUserInputContext } from "../contexts/WhosThatPokemonContext";

// Using memo to prevent re-renders when parent components re-render
const WhosThatPokemonInput = memo(function WhosThatPokemonInput() {
  // Use the specific context for user input
  const { setUserInput } = useUserInputContext();
  const inputRef = useRef<HTMLInputElement>(null);

  // Using useCallback to memoize the handler function
  const handleInput = useCallback(() => {
    if (inputRef.current) setUserInput(inputRef.current.value);
  }, [setUserInput]);

  console.log("Input component rendered");

  return (
    <>
      <input ref={inputRef} onChange={handleInput} />
    </>
  );
});

export default WhosThatPokemonInput;
