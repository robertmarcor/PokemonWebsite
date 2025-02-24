import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useGetPokemonById } from "../client/pokemon.client";
import PokemonDisplay from "./pokemon-display";
import GenerationSelector from "../Components/generation-dropdown";
import { getRandomBetweenMinMax } from "../utils/utils";
import ScoreDisplay from "./score-display";
import { MoonLoader } from "react-spinners";
import GameTimer, { TimerRef } from "./game-timer";
import GuessingGameInput from "./guessing-game-input";
import GuessingGameToolTips from "./guessing-game-tooltips";

const ACTION = {
  IDLE: "IDLE",
  START: "START",
  STARTED: "STARTED",
  END: "END",
  INCREASE_SCORE: "INCREMENT_SCORE",
  DECREMENT_SCORE: "DECREMENT_SCORE",
  DECREMENT_HEALTH: "DECREMENT_HEALTH",
  INCREMENT_STREAK: "INCREMENT_STREAK",
  RESET_STREAK: "RESET_STREAK",
};

const initialState: GameState = {
  gameState: "IDLE",
  score: 0,
  health: 5,
  streak: 0,
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
};

type GameActions = { type: (typeof ACTION)[keyof typeof ACTION]; payload?: number };

export default function GuessingGame() {
  const [randomPokemonId, setRandomPokemonId] = useState<number>(132);
  const [selectionRange, setSelectionRange] = useState<number[][]>([[]]);
  const [word, setWord] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [spriteHidden, setSpriteHidden] = useState(true);
  const [scoreChange, setScoreChange] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState(0);

  const timerRef = useRef<TimerRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: GameState, action: GameActions): GameState {
    switch (action.type) {
      case ACTION.IDLE:
        return { ...state, gameState: "IDLE" };
      case ACTION.START:
        if (state.gameState === ACTION.STARTED) return state;
        else return { ...state, gameState: "START", score: 0, health: 5, streak: 0 };
      case ACTION.STARTED:
        return { ...state, gameState: "STARTED" };
      case ACTION.END:
        return { ...state, gameState: "END" };
      case ACTION.INCREASE_SCORE:
        return { ...state, score: state.score + (action.payload ?? 0) };
      case ACTION.DECREMENT_SCORE:
        return { ...state, score: state.score - (action.payload ?? 0) };
      case ACTION.DECREMENT_HEALTH:
        return { ...state, health: state.health - 1 };
      case ACTION.INCREMENT_STREAK:
        return { ...state, streak: state.streak + 1 };
      case ACTION.RESET_STREAK:
        return { ...state, streak: 0 };
      default:
        return state;
    }
  }

  const { data: pokemonData, isLoading } = useGetPokemonById(randomPokemonId, (pokemon) => ({
    name: pokemon.name,
    sprite: pokemon.sprites.other?.["official-artwork"].front_default,
    cry: pokemon.cries.latest,
  }));

  const handleFetchPokemon = useCallback(() => {
    const genIds = selectionRange[Math.floor(Math.random() * selectionRange.length)];
    const newId = getRandomBetweenMinMax(genIds[0], genIds[1]);
    if (state.gameState === ACTION.STARTED) timerRef.current?.startTimer();
    setRandomPokemonId(newId);
  }, [selectionRange, state.gameState]);

  const skipPokemon = useCallback(() => {
    const skipPenality = 500;
    dispatch({ type: ACTION.DECREMENT_SCORE, payload: skipPenality });
    setScoreChange(-skipPenality);
    dispatch({ type: ACTION.DECREMENT_HEALTH });
    handleFetchPokemon();
    timerRef.current?.resetTimer();
    setInputValue("");
  }, [handleFetchPokemon]);

  const startGame = useCallback(() => {
    if (state.gameState === ACTION.STARTED) return;
    handleFetchPokemon();
    timerRef.current?.startTimer();
    dispatch({ type: ACTION.STARTED });
    setTimeout(() => inputRef.current?.focus(), 200);
  }, [handleFetchPokemon, state.gameState]);

  const calculateScore = useCallback(() => {
    const baseScore = 100;
    const seconds = timeTaken / 1000;
    const timeFactor = Math.max(1, 10 - seconds);
    const streakMultiplier = 1.0 + state.streak * 0.1;
    return Math.floor(baseScore * timeFactor * streakMultiplier);
  }, [state.streak, timeTaken]);

  const handleGuess = useCallback(() => {
    if (inputValue === word) {
      const points = calculateScore();
      dispatch({ type: ACTION.INCREASE_SCORE, payload: points });
      dispatch({ type: ACTION.INCREMENT_STREAK });
      setScoreChange(points);
      timerRef.current?.resetTimer();
      setFeedback("✔️ Correct guess");
      setTimeout(() => setFeedback(""), 2000);
      setSpriteHidden(false);
      setTimeout(handleFetchPokemon, 1000);
    } else if (inputValue !== word) {
      const scorePenality = 200;
      dispatch({ type: ACTION.DECREMENT_SCORE, payload: scorePenality });
      setScoreChange(-scorePenality);
      setFeedback("❌ Incorrect guess, try again!");
      setTimeout(() => setFeedback(""), 2000);
      dispatch({ type: ACTION.RESET_STREAK });
    }
    setInputValue("");
  }, [calculateScore, handleFetchPokemon, inputValue, word]);

  const handleEndGame = () => {
    // SAVE SCORE
    timerRef.current?.stopTimer();
  };

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
    if (!isLoading) {
      setSpriteHidden(true);
    }
  }, [calculateScore, isLoading, pokemonData, startGame, state.gameState]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (state.gameState === ACTION.STARTED) {
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
      } else return;
    },
    [skipPokemon, state.gameState]
  );

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (state.gameState === ACTION.STARTED)
      if (event.key === "Enter") {
        event.preventDefault();
        handleGuess();
      } else return;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (state.health <= 0) {
      dispatch({ type: ACTION.END });
    }
  }, [state.health]);

  useEffect(() => {
    if (scoreChange !== null) {
      const timeout = setTimeout(() => {
        setScoreChange(null);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [scoreChange]);

  return (
    <>
      <GuessingGameToolTips />
      <div className="grid w-full max-w-full place-items-center content-start mt-8 relative">
        <button onClick={() => dispatch({ type: ACTION.START })}>START</button>
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
      <h2 className="title">{state.gameState}</h2>
      <GameTimer className="justify-end py-2" timerRef={timerRef} onTimeUpdate={setTimeTaken} />
      <div className="grid w-full place-items-center border-t-2">
        {state.gameState === ACTION.STARTED && (
          <GuessingGameInput
            inputRef={inputRef}
            inputValue={inputValue}
            setInputValue={setInputValue}
            word={word}
            handleKeyDown={handleInputKeyDown}
          />
        )}
        <p>{feedback}</p>
      </div>
    </>
  );
}
