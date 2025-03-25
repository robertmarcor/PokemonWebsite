import React, { useState, ReactNode, useMemo, useCallback } from "react";
import {
  GameState,
  UserInputContext,
  TimerContext,
  GameContext,
} from "../contexts/WhosThatPokemonContext";

type WhosThatPokemonProviderProps = {
  children: ReactNode;
};

const WhosThatPokemonProvider = ({ children }: WhosThatPokemonProviderProps) => {
  // Game state
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [gameState, setGameState] = useState<GameState>({ state: "IDLE" });

  // User input state
  const [userInput, setUserInput] = useState("");

  // Timer state
  const [timer, setTimer] = useState("");

  // Memoize setter functions to prevent unnecessary re-renders
  const memoizedSetScore = useCallback((value: number) => setScore(value), []);
  const memoizedSetHealth = useCallback((value: number) => setHealth(value), []);
  const memoizedSetGameState = useCallback((value: GameState) => setGameState(value), []);
  const memoizedSetUserInput = useCallback((value: string) => setUserInput(value), []);
  const memoizedSetTimer = useCallback((value: string) => setTimer(value), []);

  // Memoize the context values to prevent unnecessary re-renders
  const userInputContextValue = useMemo(
    () => ({
      userInput,
      setUserInput: memoizedSetUserInput,
    }),
    [userInput, memoizedSetUserInput]
  );

  const timerContextValue = useMemo(
    () => ({
      timer,
      setTimer: memoizedSetTimer,
    }),
    [timer, memoizedSetTimer]
  );

  const gameContextValue = useMemo(
    () => ({
      score,
      health,
      gameState,
      setScore: memoizedSetScore,
      setHealth: memoizedSetHealth,
      setGameState: memoizedSetGameState,
    }),
    [score, health, gameState, memoizedSetScore, memoizedSetHealth, memoizedSetGameState]
  );

  console.log("Provider rendered");

  // Nest the providers to provide all contexts
  return (
    <GameContext.Provider value={gameContextValue}>
      <UserInputContext.Provider value={userInputContextValue}>
        <TimerContext.Provider value={timerContextValue}>{children}</TimerContext.Provider>
      </UserInputContext.Provider>
    </GameContext.Provider>
  );
};

export default WhosThatPokemonProvider;
