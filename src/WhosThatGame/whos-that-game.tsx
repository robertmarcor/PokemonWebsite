import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useGetPokemonById } from "../client/pokemon.client";
import PokemonDisplay from "./pokemon-display";
import GenerationSelector from "../Components/generation-dropdown";
import { getRandomBetweenMinMax } from "../utils/utils";
import ScoreDisplay from "./score-display";
import { MoonLoader } from "react-spinners";
import GameTimer, { TimerRef } from "./game-timer";
import WhosThatGameInput from "./whos-that-input";
import WhosThatGameTooltips from "./whos-that-tooltips";

const ACTION = {
  IDLE: "IDLE",
  START: "START",
  STARTED: "STARTED",
  END: "END",
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

export default function WhosThatGame() {
  const [randomPokemonId, setRandomPokemonId] = useState<number>(132);
  const [selectionRange, setSelectionRange] = useState<number[][]>([[]]);
  const [word, setWord] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [spriteHidden, setSpriteHidden] = useState(true);
  const [scoreChange, setScoreChange] = useState<number | null>(null);
  // const [timeTaken, setTimeTaken] = useState(0);
  const [hotStreak, setHotStreak] = useState<number>(0);

  const timerRef = useRef<TimerRef>(null);
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

  const { data: pokemonData, isLoading } = useGetPokemonById(randomPokemonId, (pokemon) => ({
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
    if (state.gameState === ACTION.STARTED) timerRef.current?.startTimer();
    setRandomPokemonId(newId);
  }, [selectionRange, state.gameState]);

  const skipPokemon = useCallback(() => {
    setFeedback(`Sucks to suck, it was '${word.toUpperCase()}'`);
    setTimeout(() => setFeedback(""), 5000);
    timerRef.current?.resetTimer();
    const skipPenality = 500;
    dispatch({ type: ACTION.DECREMENT_SCORE, payload: skipPenality });
    setScoreChange(-skipPenality);
    dispatch({ type: ACTION.DECREMENT_HEALTH });
    handleFetchPokemon();
    setInputValue("");
  }, [handleFetchPokemon, word]);

  const startGame = useCallback(() => {
    if (state.gameState === ACTION.STARTED) return;
    handleFetchPokemon();
    timerRef.current?.startTimer();
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
      if (guess === word) {
        const points = calculateScore();
        dispatch({ type: ACTION.INCREMENT_SCORE, payload: points });
        dispatch({ type: ACTION.INCREMENT_STREAK });
        setHotStreak((prev) => prev + 1);
        dispatch({ type: ACTION.INCREMENT_GUESS });
        setScoreChange(points);
        timerRef.current?.resetTimer();
        setFeedback(`✅ Correct guess in #⌛`);
        setTimeout(() => setFeedback(""), 5000);
        setSpriteHidden(false);
        setTimeout(handleFetchPokemon, 1000);
      } else if (guess !== word) {
        if (state.streak < 1) dispatch({ type: ACTION.DECREMENT_HEALTH });
        const scorePenalty = 200;
        dispatch({ type: ACTION.DECREMENT_SCORE, payload: scorePenalty });
        setScoreChange(-scorePenalty);
        setFeedback("❌ Incorrect guess, try again!");
        setTimeout(() => setFeedback(""), 2000);
        dispatch({ type: ACTION.RESET_STREAK });
      }
      setInputValue("");
    },
    [word, calculateScore, handleFetchPokemon, state.streak]
  );

  const handleEndGame = useCallback(() => {
    setWord((prev) => prev);
    timerRef.current?.stopTimer();
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
      if (state.gameState === ACTION.STARTED)
        if (event.key === "Enter") {
          event.preventDefault();
          const guess = inputValue;
          handleGuess(guess);
        } else return;
    },
    [handleGuess, inputValue, state.gameState]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (state.gameState === ACTION.STARTED) {
        if (event.key === "Tab") {
          event.preventDefault();
          skipPokemon();
        }

        if (event.key === " ") {
          event.preventDefault();
          if (state.gameState === ACTION.STARTED)
            if (inputRef.current) {
              inputRef.current.focus();
            }
          if (state.gameState === ACTION.IDLE) startGame();
        }
      }

      if (state.gameState === ACTION.IDLE && event.key === " ") {
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

  /* Set sprite back to siluette */
  useEffect(() => {
    if (pokemonData) {
      setSpriteHidden(true);
    }
  }, [pokemonData]);

  return (
    <>
      <WhosThatGameTooltips />
      <div className="grid w-full max-w-full place-items-center content-start mt-8 relative">
        <button onClick={() => dispatch({ type: ACTION.END })}>END </button>

        <h1 className="text-5xl font-headings font-extrabold">Who is that Pokémon?</h1>
        <div className="relative w-full my-8">
          <aside className="absolute left-0">
            <GenerationSelector updateSelectedRanges={setSelectionRange} />
          </aside>
          <aside className="absolute right-0 top-0">
            <ScoreDisplay
              className="text-2xl"
              score={state.score}
              hp={state.health}
              streak={state.streak}
            />
          </aside>
        </div>

        {isLoading ? (
          <div className="size-96 lg:size-72 flex justify-center items-center">
            <MoonLoader color="#FFF" />
          </div>
        ) : (
          <PokemonDisplay
            className="size-96 lg:size-72"
            pokemonName={pokemonData?.name || "Missing"}
            pokemonSprite={
              pokemonData?.sprite ||
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
            }
            showSiluette={spriteHidden}
          />
        )}

        {scoreChange !== null && (
          <div
            className={`absolute top-1/2 text-6xl font-semibold animate-ping z-50 stroke ${
              scoreChange < 0 ? "text-red-500" : "text-green-500"
            }`}>
            {scoreChange > 0 ? `+${scoreChange}` : scoreChange}
          </div>
        )}
      </div>

      <GameTimer className="justify-end py-2" timerRef={timerRef} />

      <div className="grid w-full place-items-center border-t-2">
        {state.gameState === ACTION.STARTED && (
          <WhosThatGameInput
            inputRef={inputRef}
            inputValue={inputValue}
            setInputValue={setInputValue}
            word={word}
            handleKeyDown={handleInputKeyDown}
          />
        )}

        {state.gameState === ACTION.IDLE && (
          <div className="flex justify-center items-center gap-2 mt-8">
            Press
            <svg
              className="dark fill-foreground size-20"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 122.88 54.99"
              xmlSpace="preserve">
              <path d="M11.61,0h99.65c3.19,0,6.09,1.31,8.2,3.41c2.11,2.11,3.42,5.02,3.42,8.2v31.77c0,3.18-1.31,6.09-3.42,8.19 c-2.11,2.11-5.01,3.42-8.19,3.42H11.61c-3.18,0-6.09-1.31-8.2-3.42c-2.1-2.1-3.41-5-3.41-8.2V11.61c0-3.2,1.31-6.1,3.41-8.2 C5.51,1.31,8.42,0,11.61,0L11.61,0z M29.34,26.85l4.06-0.27c0.09,0.69,0.27,1.23,0.54,1.59c0.44,0.59,1.07,0.89,1.89,0.89 c0.61,0,1.08-0.15,1.41-0.45c0.33-0.3,0.5-0.65,0.5-1.05c0-0.38-0.15-0.72-0.47-1.02c-0.31-0.3-1.04-0.58-2.18-0.85 c-1.87-0.44-3.21-1.03-4-1.77c-0.8-0.74-1.21-1.67-1.21-2.82c0-0.75,0.21-1.46,0.62-2.12c0.41-0.67,1.03-1.19,1.86-1.58 c0.83-0.38,1.96-0.57,3.4-0.57c1.77,0,3.11,0.35,4.04,1.05c0.93,0.69,1.48,1.8,1.65,3.32l-4.02,0.25 c-0.11-0.66-0.33-1.15-0.67-1.45c-0.34-0.3-0.82-0.45-1.42-0.45c-0.5,0-0.87,0.11-1.12,0.33c-0.25,0.22-0.38,0.49-0.38,0.81 c0,0.23,0.1,0.44,0.31,0.63c0.2,0.19,0.67,0.37,1.43,0.54c1.87,0.43,3.2,0.86,4.01,1.29c0.81,0.44,1.4,0.97,1.76,1.62 c0.37,0.64,0.55,1.36,0.55,2.16c0,0.94-0.24,1.8-0.73,2.59c-0.49,0.79-1.17,1.39-2.06,1.8c-0.88,0.41-1.99,0.61-3.32,0.61 c-2.35,0-3.98-0.48-4.88-1.44C29.98,29.54,29.46,28.32,29.34,26.85L29.34,26.85z M43.79,35.71V21.08h3.6v1.56 c0.5-0.66,0.95-1.11,1.37-1.34c0.56-0.31,1.18-0.47,1.86-0.47c1.34,0,2.37,0.54,3.11,1.63c0.73,1.09,1.1,2.43,1.1,4.03 c0,1.77-0.4,3.11-1.2,4.04c-0.8,0.93-1.81,1.39-3.03,1.39c-0.59,0-1.13-0.11-1.62-0.32c-0.49-0.21-0.92-0.53-1.31-0.95v5.04H43.79 L43.79,35.71z M47.64,26.42c0,0.84,0.17,1.47,0.5,1.88c0.33,0.41,0.75,0.61,1.26,0.61c0.44,0,0.82-0.19,1.12-0.59 c0.3-0.39,0.45-1.06,0.45-1.99c0-0.86-0.16-1.5-0.47-1.9c-0.32-0.41-0.7-0.61-1.15-0.61c-0.49,0-0.89,0.2-1.22,0.61 C47.81,24.84,47.64,25.5,47.64,26.42L47.64,26.42z M60.17,24.52l-3.67-0.41c0.14-0.68,0.34-1.22,0.6-1.6 c0.26-0.39,0.63-0.73,1.13-1.01c0.35-0.21,0.83-0.37,1.45-0.48c0.61-0.11,1.28-0.17,2-0.17c1.15,0,2.07,0.07,2.77,0.2 c0.7,0.14,1.28,0.42,1.74,0.85c0.33,0.3,0.59,0.73,0.77,1.27c0.19,0.55,0.28,1.07,0.28,1.57v4.68c0,0.5,0.03,0.89,0.09,1.17 c0.06,0.28,0.19,0.64,0.39,1.08h-3.59c-0.14-0.27-0.24-0.48-0.28-0.62c-0.04-0.14-0.09-0.36-0.13-0.67c-0.5,0.51-1,0.87-1.5,1.09 c-0.68,0.29-1.47,0.44-2.37,0.44c-1.19,0-2.1-0.29-2.72-0.88c-0.62-0.59-0.93-1.31-0.93-2.17c0-0.81,0.22-1.47,0.67-1.99 c0.45-0.52,1.27-0.91,2.47-1.16c1.44-0.31,2.37-0.52,2.8-0.65c0.43-0.12,0.88-0.28,1.36-0.48c0-0.5-0.1-0.85-0.29-1.05 c-0.19-0.2-0.53-0.3-1.02-0.3c-0.63,0-1.1,0.11-1.41,0.32C60.51,23.74,60.32,24.05,60.17,24.52L60.17,24.52z M63.49,26.64 c-0.53,0.2-1.08,0.38-1.65,0.53c-0.78,0.22-1.27,0.44-1.48,0.65c-0.22,0.22-0.32,0.47-0.32,0.76c0,0.32,0.11,0.59,0.32,0.79 c0.21,0.2,0.52,0.31,0.93,0.31c0.43,0,0.83-0.11,1.2-0.33c0.37-0.22,0.63-0.49,0.78-0.81c0.15-0.32,0.23-0.74,0.23-1.25V26.64 L63.49,26.64z M77.01,27.54l3.65,0.43c-0.2,0.81-0.53,1.5-0.99,2.1c-0.46,0.59-1.05,1.05-1.76,1.38c-0.71,0.33-1.62,0.49-2.72,0.49 c-1.06,0-1.95-0.11-2.66-0.31c-0.7-0.21-1.31-0.55-1.82-1.02c-0.51-0.47-0.91-1.02-1.2-1.65c-0.29-0.63-0.43-1.47-0.43-2.52 c0-1.09,0.18-2,0.53-2.72c0.26-0.53,0.61-1.01,1.06-1.43c0.45-0.42,0.9-0.74,1.38-0.94c0.75-0.33,1.71-0.49,2.88-0.49 c1.64,0,2.88,0.31,3.74,0.93c0.86,0.62,1.46,1.52,1.81,2.71l-3.61,0.51c-0.11-0.45-0.32-0.79-0.62-1.02 c-0.3-0.23-0.7-0.34-1.21-0.34c-0.63,0-1.15,0.24-1.54,0.72c-0.39,0.48-0.59,1.21-0.59,2.19c0,0.87,0.2,1.53,0.59,1.98 c0.39,0.45,0.88,0.68,1.49,0.68c0.5,0,0.93-0.14,1.27-0.41C76.58,28.52,76.84,28.1,77.01,27.54L77.01,27.54z M93.54,27.4h-7.7 c0.07,0.65,0.24,1.14,0.5,1.46c0.37,0.46,0.86,0.69,1.45,0.69c0.38,0,0.74-0.1,1.08-0.3c0.21-0.13,0.43-0.35,0.67-0.66l3.78,0.37 c-0.58,1.06-1.28,1.83-2.1,2.29c-0.82,0.46-1.99,0.69-3.52,0.69c-1.33,0-2.37-0.2-3.13-0.6c-0.76-0.39-1.39-1.02-1.89-1.89 c-0.5-0.86-0.75-1.88-0.75-3.04c0-1.66,0.5-3,1.51-4.03c1-1.02,2.39-1.54,4.16-1.54c1.44,0,2.56,0.23,3.4,0.69 c0.83,0.46,1.46,1.12,1.9,2c0.43,0.87,0.65,2.01,0.65,3.41V27.4L93.54,27.4z M89.63,25.46c-0.07-0.79-0.28-1.35-0.6-1.7 c-0.33-0.34-0.75-0.51-1.28-0.51c-0.61,0-1.1,0.26-1.47,0.77c-0.23,0.32-0.38,0.8-0.44,1.43H89.63L89.63,25.46z M2.5,39.07 c0.43,1.63,1.29,3.09,2.45,4.25c1.71,1.71,4.07,2.77,6.66,2.77h99.66c0.1,0,0.21,0,0.31-0.01l0.64-0.04 c2.21-0.22,4.21-1.22,5.71-2.72c1.16-1.16,2.02-2.62,2.45-4.24V11.61c0-2.49-1.03-4.78-2.68-6.43c-1.65-1.65-3.93-2.68-6.43-2.68 H11.61c-2.5,0-4.78,1.03-6.43,2.68C3.53,6.83,2.5,9.11,2.5,11.61V39.07L2.5,39.07z" />
            </svg>{" "}
            to
            <button
              className="text-3xl border-2 rounded-md px-4 bg-gradient-to-t from-black to-slate-800 hover:border-blue-400"
              onClick={() => dispatch({ type: ACTION.START })}>
              START
            </button>
          </div>
        )}

        <p>{feedback}</p>

        {state.gameState === ACTION.END && (
          <div className="mt-4">
            {
              <p>
                You ran out of lives 💔 died to '
                <span className="text-red-500">{word.toUpperCase()}</span>'
              </p>
            }
            <p>
              You managed to guess{" "}
              <span className="font-bold text-yellow-500">{state.correctGuess}</span> Pokemon
            </p>
            <p>
              Highest hot streak: <span className="font-bold text-yellow-500">{hotStreak}</span>🔥
            </p>
            <p>Final Score</p>
            <p className="font-bold text-green-500">{state.score}</p>
            <button
              className="title border-2 rounded-md px-4 bg-gradient-to-t from-black to-slate-800 hover:border-blue-400"
              onClick={() => dispatch({ type: ACTION.START })}>
              Retry
            </button>
          </div>
        )}
      </div>
    </>
  );
}
