import React, { memo, useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useGetPokemonById } from "../client/pokemon.client";
import PokemonDisplay from "./pokemon-display";
import GenerationSelector from "../Components/generation-dropdown";
import { getRandomBetweenMinMax } from "../utils/utils";
import ScoreDisplay from "./score-display";
import { MoonLoader } from "react-spinners";
// import GameTimer, { TimerRef } from "./game-timer";
import WhosThatGameInput from "./whos-that-input";
import WhosThatGameTooltips from "./whos-that-tooltips";
import WhosThatGameMobileInput from "./whos-that-mobile-input";
import { SpaceBarIcon } from "../assets/icons";
import ToggleSwitch from "../Components/toggle-switch";

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
    // Prevent skipping if already locked
    if (isSkipLocked) return;

    // Lock skipping immediately
    setIsSkipLocked(true);

    setGuessFeedback(`Sucks to suck, it was '${word.toUpperCase()}'`);
    setTimeout(() => setGuessFeedback(""), 5000);
    // timerRef.current?.resetTimer();
    const skipPenality = 500;
    dispatch({ type: ACTION.DECREMENT_SCORE, payload: skipPenality });
    setScoreChange(-skipPenality);
    dispatch({ type: ACTION.DECREMENT_HEALTH });
    handleFetchPokemon();
    setInputValue("");

    // Unlock skipping after a delay
    setTimeout(() => {
      setIsSkipLocked(false);
    }, 500);
  }, [handleFetchPokemon, word, isSkipLocked]);

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
      // Prevent guessing if already in SKIPPING or GUESSING state
      if (state.gameState === "SKIPPING" || state.gameState === "GUESSING") return;

      dispatch({ type: ACTION.GUESSING });

      if (guess === word) {
        const points = calculateScore();
        dispatch({ type: ACTION.INCREMENT_SCORE, payload: points });
        dispatch({ type: ACTION.INCREMENT_STREAK });
        setHotStreak((prev) => prev + 1);
        dispatch({ type: ACTION.INCREMENT_GUESS });
        setScoreChange(points);
        // timerRef.current?.resetTimer();
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
    [isMobile, skipPokemon, startGame, state.gameState]
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
      }
    }
  }, [pokemonData, dispatch, state.gameState]);

  return (
    <>
      <div className="relative flex flex-col mx-auto max-w-screen-2xl min-h-full">
        <section className="content-center place-items-center grid px-4 pb-24 w-full">
          <h1 className="my-4 font-extrabold max-sm:text-3xl">{"Who's that Pokémon!?"}</h1>
          {/* UI stuff */}
          {!isMobile && (
            <div className="flex justify-start gap-2 w-full">
              <ToggleSwitch isChecked={isEasyMode} setIsChecked={setIsEasyMode} />
              <p className={`${isEasyMode && "text-sky-400"} font-mono`}>PussyMode</p>
            </div>
          )}
          <div className="relative my-8 w-full">
            <aside className="top-0 max-sm:-top-20 left-0 max-sm:-left-5 z-40 absolute">
              <GenerationSelector
                className="max-sm:scale-75"
                updateSelectedRanges={setSelectionRange}
              />
            </aside>
            <aside className="top-0 max-sm:-top-8 right-0 absolute">
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
            <div className="flex justify-center items-center size-36 sm:size-72 lg:size-96">
              <MoonLoader color="#FFF" />
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
          <section className="relative content-start place-items-center grid w-full h-full">
            <WhosThatGameTooltips />

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
                <SpaceBarIcon />
                to
                <button
                  className="bg-gradient-to-t from-black to-slate-800 px-4 border-2 hover:border-blue-400 rounded-md text-3xl"
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
          <section className="relative flex-1 place-items-center grid w-full h-full">
            <div className="place-items-center grid w-full h-full">
              {state.gameState === ACTION.IDLE && (
                <div className="place-items-center gap-2 grid">
                  <p>Finger Pika to Start</p>
                  <button onClick={startGame}>
                    <img className="size-20" src="/pika.png" alt="" />
                  </button>
                </div>
              )}

              {(state.gameState === "STARTED" ||
                state.gameState === "SKIPPING" ||
                state.gameState === "GUESSING") && (
                <div className="flex flex-col justify-center items-center w-full h-full">
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
      <div
        className={`absolute top-1/2 text-6xl font-semibold animate-ping z-50 stroke ${
          scoreChange !== null && scoreChange < 0 ? "text-red-500" : "text-green-500"
        }`}>
        {scoreChange !== null && (scoreChange > 0 ? `+${scoreChange}` : scoreChange)}
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
          className="bg-gradient-to-t from-black to-slate-800 px-4 border-2 hover:border-blue-400 rounded-md title"
          onClick={() => dispatch({ type: ACTION.START })}>
          Retry
        </button>
      </div>
    );
  }
});
