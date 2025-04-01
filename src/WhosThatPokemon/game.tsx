import React, { memo, useCallback, useEffect, useReducer, useRef, useState } from "react";
import WhosThatPokemonInput from "./input";
import WhosThatPokemonImage from "./image";
import WhosThatPokemonTimer, { TimerFunctions } from "./timer";
import WhosTHatPokemonHud from "./hud";
import {
  gameReducer,
  initialGameState,
  GameActionType,
  increaseScore,
  decreaseHealth,
  increaseStreak,
  resetStreak,
  resetScoreIncrease,
} from "./gameReducer";
import WhosTHatPokemonEasyMode from "./easy-mode";
import PageWrapper from "../Components/page-wrapper";
import H1 from "@/Components/layouts/h1-header";
import { cn } from "@/lib/utils";
import { usePokemonContext } from "@/PokemonServiceContext";
import ToggleSwitch from "@/Components/menus/toggle-switch";
import WhosThatTooltips from "@/WhosThatGame/whos-that-tooltips";
import PickGen, { GEN_KEY } from "@/Components/pick-gen";
import { Button } from "@/Components/ui/button";
import Portal from "@/Portal";
import { generations } from "@/data/generation";
import { allSpecies } from "@/data/speciesList";

const GenerationPicker = memo(
  ({
    isModalOpen,
    setIsModalOpen,
  }: {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    return (
      <section>
        <Button onClick={() => setIsModalOpen(!isModalOpen)}>Select Generation</Button>

        {isModalOpen && (
          <Portal>
            <PickGen toggleModal={() => setIsModalOpen(!isModalOpen)} />
          </Portal>
        )}
      </section>
    );
  }
);

function WhosThatPokemon() {
  const { isMobile } = usePokemonContext();
  const [elapseTime, setElapsedTime] = useState<number>(0); //in MS eg.5sec = 5000
  const [reveal, setReveal] = useState(false);
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomId, setRandomId] = useState<number>();
  const [feedback, setFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const gameTimerRef = useRef<TimerFunctions>({
    startTimer: () => {},
    stopTimer: () => {},
    getElapsedTime: () => 0,
  });

  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  const generatePokemon = useCallback(() => {
    const data = localStorage.getItem(GEN_KEY);
    if (data) {
      const selectedGenerations = JSON.parse(data);
      const selectedGenObjects = generations.filter((gen) => selectedGenerations.includes(gen.id));

      if (selectedGenObjects.length === 0) return;

      const randomGenIndex = Math.floor(Math.random() * selectedGenObjects.length);
      const selectedGen = selectedGenObjects[randomGenIndex];

      const [min, max] = selectedGen.range;

      const randomId = Math.floor(Math.random() * (max - min + 1)) + min;

      setRandomId(randomId);
    }
  }, []);

  useEffect(() => {
    generatePokemon();
  }, []);

  const handleTimeUpdate = (time: number) => {
    setElapsedTime(time);
  };

  const handleGuess = (isCorrect: boolean) => {
    console.log(isCorrect);
    if (isCorrect) {
      calculateScore();
      setReveal(true);

      setTimeout(() => {
        setReveal(false);
        generatePokemon();
        gameTimerRef.current?.stopTimer();
        gameTimerRef.current?.startTimer();
      }, 500);
    } else {
      if (gameState.streak <= 5) {
        dispatch(decreaseHealth(1));
      }
      dispatch(resetStreak());
    }
    handleFeedback(isCorrect);
  };
  function calculateGuessScore(elapsedTime) {
    const baseScore = 1000;
    const minimumScore = 100;

    // If under or equal to 3s, return full score.
    if (elapsedTime <= 3000) {
      return baseScore;
    }

    // Otherwise, calculate how many full seconds beyond 3s.
    const secondsOver3 = Math.floor((elapsedTime - 3000) / 1000);

    // Each second over 3 deducts 100 points.
    const penalty = secondsOver3 * 100;

    // Final score can't go below 100
    const finalScore = Math.max(baseScore - penalty, minimumScore);

    return finalScore;
  }

  const calculateScore = () => {
    const elapsedTime = gameTimerRef.current.getElapsedTime();
    let score = gameState.score;

    const basePoints = 1000;
    const minimumPoints = 100;

    if (elapsedTime <= 3000) {
      score += basePoints;
      dispatch(increaseScore(score));
      return;
    } else {
      const secondsOver3 = Math.floor((elapsedTime - 3000) / 1000);
      const penalty = secondsOver3 * 100;
      const penalizedScore = Math.max(basePoints - penalty, minimumPoints);
      dispatch(increaseScore(penalizedScore));
    }
    dispatch(increaseStreak(1));
    setTimeout(() => {
      dispatch(resetScoreIncrease());
    }, 2000);
  };

  const handleFeedback = useCallback((isCorrect: boolean) => {
    setFeedback(true);
    setTimeout(() => setFeedback(false), 5000);
    if (isCorrect) {
      gameTimerRef.current?.stopTimer();
      setFeedbackText(`Great Job! guessed in ${gameTimerRef.current.getElapsedTime()}`);
      setTimeout(() => {
        gameTimerRef.current?.startTimer();
      }, 100);
    } else {
      setFeedbackText("Sucks to suck!");
    }
  }, []);

  const handleStartGame = () => {
    setIsStarted(true);
    gameTimerRef.current?.startTimer();
  };

  return (
    <PageWrapper className="my-4">
      <div className="absolute top-0 w-full h-full bg-black/10 -z-50 bgMask1 " />
      <div className="absolute top-0 w-full h-full bg-black/10 -z-50 bgMask2 " />
      <H1 text="Whos That Pokèmon!?" />
      <article
        className={cn(
          "relative w-full flex flex-col justify-start items-center",
          "2xl:h-3/4 2xl:justify-center"
        )}>
        {/* HUD Section */}
        <section
          className={`text-right p-4 bg-primary/20 ring-2 ring-primary rounded-xl font-mono *:not-last:mb-2 ${
            isMobile ? "" : "absolute right-0 top-0"
          }`}>
          <div className="flex justify-end">
            <p>EZ</p>
            <ToggleSwitch isChecked={isEasyMode} setIsChecked={setIsEasyMode} />
          </div>
          <WhosThatPokemonTimer ref={gameTimerRef} setTime={handleTimeUpdate} />
          <WhosTHatPokemonHud
            score={gameState.score}
            hp={gameState.health}
            streak={gameState.streak}
            increase={gameState.lastScoreIncrease}
          />
        </section>

        <GenerationPicker isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

        {/* Pokemon Image */}
        <section className="max-md:w-64">
          <WhosThatPokemonImage pokemonId={randomId || 1} reveal={reveal} />
        </section>

        {isStarted ? (
          isEasyMode || isMobile ? (
            <WhosTHatPokemonEasyMode
              word={
                randomId && allSpecies.results[randomId - 1]?.name
                  ? allSpecies.results[randomId - 1].name
                  : "Ditto"
              }
              onGuess={handleGuess}
            />
          ) : (
            <>
              <section className="w-full my-12">
                <WhosThatPokemonInput
                  inputRef={inputRef}
                  word={
                    randomId && allSpecies.results[randomId - 1]?.name
                      ? allSpecies.results[randomId - 1].name
                      : "Ditto"
                  }
                  onGuess={handleGuess}
                />
              </section>
              <WhosThatTooltips />
            </>
          )
        ) : (
          <div className="bg-background-secondary rounded-2xl border-4 border-primary p-4">
            <Button onClick={() => handleStartGame()} className="m-4 w-32 text-2xl">
              START
            </Button>
            <p className="mb-2 font-extrabold">
              If only Bulbasaur appears, please select a Pokémon generation.
            </p>
            <p className="mb-2">
              Guess the Pokémon from its silhouette. A wrong guess will cost you
              <span className="text-red-600 font-bold bg-black/10 p-1 px-2 rounded-full">
                1HP ❤️
              </span>
              . Each correct guess awards you
              <span className="text-green-600 font-bold bg-black/10 p-1 px-2 rounded-full">
                1K points
              </span>
              if made within
              <span className="text-green-600 font-bold bg-black/10 p-1 px-2 rounded-full">
                3 sec
              </span>
              ; after that, every additional second will
              <span className="text-red-700 font-bold bg-black/10 p-1 px-2 rounded-full">
                deduct 100 points
              </span>
              (to a minimum of 100).
            </p>
            <p className="mb-2">
              If your streak reaches
              <span className="text-orange-500 font-bold bg-black/10 p-1 px-2 rounded-full">
                5🔥
              </span>
              or more, you'll earn a
              <span className="text-blue-600 font-bold bg-black/10 p-1 px-2 rounded-full">
                1HP SHIELD❤️‍🔥
              </span>
            </p>
            <p>
              <span className="text-cyan-500 font-bold bg-black/10 p-1 px-2 rounded-full">
                EZ MODE
              </span>
              is optimized for mobile devices.
            </p>
          </div>
        )}
        {feedback && (
          <section className="mt-8">
            <p>{feedbackText}</p>
          </section>
        )}
      </article>
    </PageWrapper>
  );
}

export default memo(WhosThatPokemon);
