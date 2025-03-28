import React, { memo, useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useGetPokemonById } from "../client/pokemon.client";
import PokemonDisplay from "./pokemon-display";
import GenerationSelector from "../Components/generation-dropdown";
import { getRandomBetweenMinMax } from "../utils/utils";
import ScoreDisplay from "./score-display";
import WhosThatGameInput from "./whos-that-input";
import WhosThatGameTooltips from "./whos-that-tooltips";
import WhosThatGameMobileInput from "./whos-that-mobile-input";
import { SpaceBarIcon } from "../assets/icons";
import ToggleSwitch from "../Components/menus/toggle-switch";
import { cn } from "@/lib/utils";

const ACTION = {
  IDLE: "IDLE",
  START: "START",
  STARTED: "STARTED",
  END: "END",
  SKIPPING: "SKIPPING",
  GUESSING: "GUESSING",
  INCREMENT_SCORE: "INCREMENT_SCORE",
  DECREMENT_SCORE: "DECREMENT_SCORE",
  DECREMENT_HEALTH: "DECREMENT_HEALTH",
  INCREMENT_STREAK: "INCREMENT_STREAK",
  RESET_STREAK: "RESET_STREAK",
  INCREMENT_GUESS: "INCREMENT_GUESS",
};

const initialState: GameState = {
  gameState: "IDLE",
  score: 0,
  health: 5,
  streak: 0,
  correctGuess: 0,
};

type GameState = {
  gameState:
    | "IDLE"
    | "START"
    | "STARTED"
    | "END"
    | "SKIPPING"
    | "GUESSING"
    | "INCREMENT_SCORE"
    | "DECREMENT_SCORE"
    | "DECREMENT_HEALTH"
    | "INCREMENT_STREAK"
    | "RESET_STREAK";
  score: number;
  health: number;
  streak: number;
  correctGuess: number;
};

type GameActions = { type: (typeof ACTION)[keyof typeof ACTION]; payload?: number };

export default memo(function WhosThatGame() {
  const [randomPokemonId, setRandomPokemonId] = useState<number>(132);
  const [selectionRange, setSelectionRange] = useState<number[][]>([[]]);
  const [word, setWord] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [guessFeedback, setGuessFeedback] = useState<string>("");
  const [spriteHidden, setSpriteHidden] = useState(true);
  const [scoreChange, setScoreChange] = useState<number | null>(null);
  // const [timeTaken, setTimeTaken] = useState(0);
  const [hotStreak, setHotStreak] = useState<number>(0);

  const [isMobile, setIsMobile] = useState<boolean>(() => window.innerWidth < 768);
  const [isEasyMode, setIsEasyMode] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // const timerRef = useRef<TimerRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: GameState, action: GameActions): GameState {
    switch (action.type) {
      case ACTION.IDLE:
        return { ...state, gameState: "IDLE" };
      case ACTION.START:
        if (state.gameState === ACTION.STARTED) return state;
        else
          return { ...state, gameState: "START", score: 0, health: 5, streak: 0, correctGuess: 0 };
      case ACTION.STARTED:
        return { ...state, gameState: "STARTED" };
      case ACTION.END:
        return { ...state, gameState: "END" };
      case ACTION.SKIPPING:
        return { ...state, gameState: "SKIPPING" };
      case ACTION.GUESSING:
        return { ...state, gameState: "GUESSING" };
      case ACTION.INCREMENT_SCORE:
        return { ...state, score: state.score + (action.payload ?? 0) };
      case ACTION.DECREMENT_SCORE:
        return { ...state, score: state.score - (action.payload ?? 0) };
      case ACTION.DECREMENT_HEALTH:
        return { ...state, health: state.health - 1 };
      case ACTION.INCREMENT_STREAK:
        return { ...state, streak: state.streak + 1 };
      case ACTION.RESET_STREAK:
        return { ...state, streak: 0 };
      case ACTION.INCREMENT_GUESS:
        return { ...state, correctGuess: state.correctGuess + 1 };
      default:
        return state;
    }
  }

  const { data: pokemonData, isLoading } = useGetPokemonById(randomPokemonId, true, (pokemon) => ({
    name: pokemon.species.name,
    sprite: pokemon.sprites.other?.["official-artwork"].front_default,
  }));

  // const { data: specieData } = useGetSpeciesById(randomPokemonId, (species) => ({
  //   variant: species.varieties,
  // }));

  // if (specieData) {
  //   for (let i: number = 0; i < specieData.variant.length; i++)
  //     console.log(extractIdFromUrl(specieData?.variant[i].pokemon.url));
  // }

  const handleFetchPokemon = useCallback(() => {
    const genIds = selectionRange[Math.floor(Math.random() * selectionRange.length)];
    const newId = getRandomBetweenMinMax(genIds[0], genIds[1]);
    // if (state.gameState === ACTION.STARTED) timerRef.current?.startTimer();
    setRandomPokemonId(newId);
  }, [selectionRange]);

  const [isSkipLocked, setIsSkipLocked] = useState(false);

  const skipPokemon = useCallback(() => {
    // Prevent skipping if already locked or not in STARTED state
    if (isSkipLocked || state.gameState !== "STARTED") return;

    // Lock skipping immediately
    setIsSkipLocked(true);
    dispatch({ type: ACTION.SKIPPING });

    setGuessFeedback(`Sucks to suck, it was '${word.toUpperCase()}'`);
    setTimeout(() => setGuessFeedback(""), 5000);
    const skipPenality = 500;
    dispatch({ type: ACTION.DECREMENT_SCORE, payload: skipPenality });
    setScoreChange(-skipPenality);
    dispatch({ type: ACTION.DECREMENT_HEALTH });
    handleFetchPokemon();
    setInputValue("");

    // Unlock skipping after a longer delay to ensure new Pokemon is loaded
    setTimeout(() => {
      setIsSkipLocked(false);
    }, 1000);
  }, [handleFetchPokemon, word, isSkipLocked, state.gameState]);

  const startGame = useCallback(() => {
    if (state.gameState === ACTION.STARTED) return;
    handleFetchPokemon();
    // timerRef.current?.startTimer();
    dispatch({ type: ACTION.STARTED });
    setHotStreak(0);
    setTimeout(() => inputRef.current?.focus(), 200);
  }, [handleFetchPokemon, state.gameState]);

  const calculateScore = useCallback(() => {
    const baseScore = 100;
    // const seconds = _timeTaken / 1000;
    const seconds = 100 / 1000;
    const timeFactor = Math.max(1, 10 - seconds);
    const streakMultiplier = 1.0 + state.streak * 0.1;
    return Math.floor(baseScore * timeFactor * streakMultiplier);
  }, [state.streak]);

  const handleGuess = useCallback(
    (guess: string) => {
      // Prevent guessing if not in STARTED state
      if (state.gameState !== "STARTED") return;

      dispatch({ type: ACTION.GUESSING });

      if (guess === word) {
        const points = calculateScore();
        dispatch({ type: ACTION.INCREMENT_SCORE, payload: points });
        dispatch({ type: ACTION.INCREMENT_STREAK });
        setHotStreak((prev) => prev + 1);
        dispatch({ type: ACTION.INCREMENT_GUESS });
        setScoreChange(points);
        setGuessFeedback(`✅ Correct guess in #⌛`);
        setTimeout(() => setGuessFeedback(""), 5000);
        setSpriteHidden(false);
        setTimeout(handleFetchPokemon, 1000);
      } else if (guess !== word) {
        if (state.streak < 1) dispatch({ type: ACTION.DECREMENT_HEALTH });
        const scorePenalty = 200;
        dispatch({ type: ACTION.DECREMENT_SCORE, payload: scorePenalty });
        setScoreChange(-scorePenalty);
        setGuessFeedback("❌ Incorrect guess, try again!");
        setTimeout(() => setGuessFeedback(""), 2000);
        dispatch({ type: ACTION.RESET_STREAK });

        // Reset to STARTED state after a shorter delay for wrong guesses
        setTimeout(() => {
          dispatch({ type: ACTION.STARTED });
        }, 800);
      }
      setInputValue("");
    },
    [word, calculateScore, handleFetchPokemon, state.streak, state.gameState, dispatch]
  );

  const handleEndGame = useCallback(() => {
    setWord((prev) => prev);
    // timerRef.current?.stopTimer();
  }, []);

  useEffect(() => {
    switch (state.gameState) {
      case ACTION.START:
        startGame();
        break;
      case ACTION.END:
        handleEndGame();
        break;
      default:
        break;
    }
    if (pokemonData) {
      setWord(pokemonData.name);
    }
  }, [calculateScore, handleEndGame, pokemonData, startGame, state.gameState]);

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (state.gameState === "STARTED" && event.key === "Enter") {
        event.preventDefault();
        const guess = inputValue;
        handleGuess(guess);
      }
    },
    [handleGuess, inputValue, state.gameState]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (state.gameState === "STARTED") {
        if (event.key === "Tab") {
          event.preventDefault();
          skipPokemon();
        }

        if (event.key === " ") {
          event.preventDefault();
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      }

      if (state.gameState === "IDLE" && event.key === " ") {
        event.preventDefault();
        startGame();
      }
    },
    [skipPokemon, startGame, state.gameState]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  /* END the Game  */
  useEffect(() => {
    if (state.health <= 0) {
      dispatch({ type: ACTION.END });
    }
  }, [state.health]);

  /* Only visual feedback */
  useEffect(() => {
    if (scoreChange !== null) {
      const timeout = setTimeout(() => {
        setScoreChange(null);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [scoreChange]);

  /* Set sprite back to siluette and reset game state when new Pokemon is loaded */
  useEffect(() => {
    if (pokemonData) {
      setSpriteHidden(true);
      // Ensure we're in STARTED state when new Pokemon is loaded
      if (state.gameState === "SKIPPING" || state.gameState === "GUESSING") {
        dispatch({ type: ACTION.STARTED });
        // Refocus the input after state changes
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  }, [pokemonData, dispatch, state.gameState]);

  return (
    <>
      <div className="relative flex flex-col min-h-full mx-auto max-w-screen-2xl">
        <section className="grid content-center w-full px-4 pb-24 place-items-center">
          <h1 className="my-4 font-extrabold max-sm:text-3xl">{"Who's that Pokémon!?"}</h1>
          <p>Light mode not properly supported</p>
          {/* UI stuff */}
          {!isMobile && (
            <div className="flex justify-start w-full gap-2">
              <ToggleSwitch isChecked={isEasyMode} setIsChecked={setIsEasyMode} />
              <p className={`${isEasyMode && "text-sky-400"} font-mono`}>PussyMode</p>
            </div>
          )}
          <div className="relative w-full my-8">
            <aside className="absolute top-0 left-0 z-40 max-sm:-top-20 max-sm:-left-5">
              <GenerationSelector
                className="max-sm:scale-75"
                updateSelectedRanges={setSelectionRange}
              />
            </aside>
            <aside className="absolute top-0 right-0 max-sm:-top-8">
              <ScoreDisplay
                className="text-2xl"
                score={state.score}
                hp={state.health}
                streak={state.streak}
              />
            </aside>
          </div>
          {/* Image of the Pokemon */}
          {isLoading ? (
            <div className="flex items-center justify-center size-36 sm:size-72 lg:size-96">
              Loading...
            </div>
          ) : (
            <PokemonDisplay
              className="pt-20 size-36 sm:size-72 lg:size-96"
              pokemonName={pokemonData?.name || "Missing"}
              pokemonSprite={
                pokemonData?.sprite ||
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
              }
              showSiluette={spriteHidden}
            />
          )}
          {/* SCORE POPUP ANIM */}
          {scoreChange !== null && <ScorePopupAnim />}
        </section>

        {/* Non-Mobile (Desktop) UI */}
        {!isMobile && !isEasyMode && (
          <section className="relative grid content-start w-full h-full place-items-center">
            <WhosThatGameTooltips />

            {state.gameState === ACTION.STARTED && (
              <GameInput
                inputRef={inputRef}
                inputValue={inputValue}
                setInputValue={setInputValue}
                word={word}
                handleInputKeyDown={handleInputKeyDown}
              />
            )}

            {state.gameState === ACTION.IDLE && (
              <div className="flex items-center justify-center gap-2 mt-8">
                Press
                <SpaceBarIcon color="fill-foreground" />
                to
                <button
                  className="px-4 text-3xl rounded-md ring ring-primary hover:border-blue-400"
                  onClick={() => dispatch({ type: ACTION.START })}>
                  START
                </button>
              </div>
            )}
          </section>
        )}

        <div className="text-center">
          {guessFeedback && <p>{guessFeedback}</p>}
          {state.gameState === ACTION.END && <EndGameFeedback />}
        </div>

        {/* Mobile UI */}
        {(isMobile || isEasyMode) && (
          <section className="relative grid flex-1 w-full h-full place-items-center">
            <div className="grid w-full h-full place-items-center">
              {state.gameState === ACTION.IDLE && (
                <div className="grid gap-2 place-items-center">
                  <p>Finger Pika to Start</p>
                  <button onClick={startGame}>
                    <img className="size-20" src="/pika.png" alt="" />
                  </button>
                </div>
              )}

              {(state.gameState === "STARTED" ||
                state.gameState === "SKIPPING" ||
                state.gameState === "GUESSING") && (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <WhosThatGameMobileInput word={word} handleGuess={handleGuess} />
                  <p>{inputValue}</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );

  function ScorePopupAnim() {
    return (
      <div className={"fixed flex items-center justify-center inset-0 -top-20 z-50"}>
        <p
          className={cn(
            "text-6xl font-semibold animate-ping",
            scoreChange !== null && scoreChange < 0 ? "text-red-500" : "text-green-500"
          )}>
          2000 {scoreChange !== null && (scoreChange > 0 ? `+${scoreChange}` : scoreChange)}
        </p>
      </div>
    );
  }

  function EndGameFeedback() {
    return (
      <div className="mt-4">
        <p>
          You ran out of lives 💔 died to '
          <span className="text-red-500">{word.toUpperCase()}</span>'
        </p>

        <p>
          You managed to guess
          <span className="font-bold text-yellow-500">{state.correctGuess}</span> Pokemon
        </p>
        <p>
          Highest hot streak: <span className="font-bold text-yellow-500">{hotStreak}</span>🔥
        </p>
        <p>Final Score</p>
        <p className="font-bold text-green-500">{state.score}</p>
        <button
          className="px-4 border-2 rounded-md bg-gradient-to-t from-black to-slate-800 hover:border-blue-400 title"
          onClick={() => dispatch({ type: ACTION.START })}>
          Retry
        </button>
      </div>
    );
  }
});

interface GameInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputValue: string;
  setInputValue: (value: string) => void;
  word: string;
  handleInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
function GameInput({
  inputRef,
  inputValue,
  setInputValue,
  word,
  handleInputKeyDown,
}: GameInputProps) {
  return (
    <WhosThatGameInput
      inputRef={inputRef}
      inputValue={inputValue}
      setInputValue={setInputValue}
      word={word}
      handleKeyDown={handleInputKeyDown}
    />
  );
}
