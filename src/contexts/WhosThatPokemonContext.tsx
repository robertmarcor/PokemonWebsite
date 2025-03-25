import { createContext, useContext } from "react";

export interface GameState {
  state: "GUESS" | "END" | "SKIP" | "START" | "IDLE";
}

// Split the context into multiple contexts based on which values change together

// Context for user input
type UserInputContextProps = {
  userInput: string;
  setUserInput: (userInput: string) => void;
};

export const UserInputContext = createContext<UserInputContextProps>({
  userInput: "",
  setUserInput: () => {},
});

// Context for timer
type TimerContextProps = {
  timer: string;
  setTimer: (timer: string) => void;
};

export const TimerContext = createContext<TimerContextProps>({
  timer: "",
  setTimer: () => {},
});

// Context for game state
type GameContextProps = {
  score: number;
  health: number;
  gameState: GameState;
  setScore: (score: number) => void;
  setHealth: (health: number) => void;
  setGameState: (gameState: GameState) => void;
};

export const GameContext = createContext<GameContextProps>({
  score: 0,
  health: 0,
  gameState: { state: "IDLE" },
  setScore: () => {},
  setHealth: () => {},
  setGameState: () => {},
});

// Hooks to use each context
export const useUserInputContext = () => {
  const context = useContext(UserInputContext);
  if (context === undefined) {
    throw new Error("useUserInputContext must be used within a UserInputProvider");
  }
  return context;
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

// For backward compatibility
type CombinedContextProps = UserInputContextProps & TimerContextProps & GameContextProps;

export const WhosThatPokemonContext = createContext<CombinedContextProps>({
  userInput: "",
  timer: "",
  score: 0,
  health: 0,
  gameState: { state: "IDLE" },
  setUserInput: () => {},
  setTimer: () => {},
  setScore: () => {},
  setHealth: () => {},
  setGameState: () => {},
});

export const useWhosThatPokemonContext = () => {
  const userInputContext = useUserInputContext();
  const timerContext = useTimerContext();
  const gameContext = useGameContext();

  return {
    ...userInputContext,
    ...timerContext,
    ...gameContext,
  };
};
