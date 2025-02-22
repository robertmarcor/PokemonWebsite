import { useEffect, useRef, useState } from "react";
import { useGetPokemonById } from "../client/pokemon.client";
import GenerationDropDown from "../Components/generation-dropdown";
import { getRandomBetweenMinMax } from "../utils/utils";

export default function GuessingGame() {
  const [randomId, setRandomId] = useState<number>(132);
  const [availableIds, setAvailableIds] = useState<number[][]>([[]]);
  const [score, setScore] = useState<number>(0);
  const [scorePopup, setScorePopup] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const pokemonCry = useRef<HTMLAudioElement>(null);

  const { data: randomPkm, isLoading } = useGetPokemonById(randomId, (pokemon) => ({
    name: pokemon.name,
    sprite: pokemon.sprites.other?.["official-artwork"].front_default,
    cry: pokemon.cries.latest,
  }));

  useEffect(() => {
    if (pokemonCry.current) {
      pokemonCry.current.volume = 0.1;
    }
  }, [randomPkm?.cry]);

  useEffect(() => {
    if (scorePopup !== null) {
      const timeout = setTimeout(() => {
        setScorePopup(null);
      }, 1000);

      return () => clearTimeout(timeout);
    }
    setIsCorrect(false);
  }, [scorePopup]);

  const generateNumber = () => {
    const genIds = availableIds[Math.floor(Math.random() * availableIds.length)];
    const randomIdFromGen = getRandomBetweenMinMax(genIds[0], genIds[1]);
    setRandomId(randomIdFromGen);
  };

  return (
    <div className="grid w-full max-w-full place-items-center py-8 relative px-36">
      <h1 className="text-5xl my-4 font-headings font-extrabold">Who is that Pokémon?</h1>
      <PokemonDisplay className="size-96 lg:size-56 my-28" />
      {scorePopup !== null && (
        <div
          className={`absolute top-1/2 text-6xl font-bold animate-score z-50 ${
            scorePopup < 0 ? "text-red-500" : "text-green-500"
          }`}>
          {scorePopup > 0 ? `+${scorePopup}` : scorePopup}
        </div>
      )}
      <aside className="absolute left-2 top-1/4">
        <GenerationDropDown updateSelectedRanges={setAvailableIds} />
      </aside>
      <aside className="absolute right-5 top-1/4 border-2 p-4 font-semibold rounded-lg">
        <h2>Score</h2>
        <p>{score}</p>
      </aside>
      <GuessInput word={randomPkm?.name || ""} />
    </div>
  );

  function PokemonDisplay({ className }: { className?: string }) {
    return (
      <div className={`${className} flex justify-center items-center relative`}>
        {isLoading ? (
          <p>Loading...</p>
        ) : randomPkm?.sprite ? (
          <img
            className={`z-10 transition-all duration-500 ${
              isCorrect ? "brightness-100" : "filter brightness-0"
            }`}
            src={randomPkm.sprite}
            alt={`Image of ${randomPkm.name}`}
          />
        ) : (
          <p>Missing</p>
        )}
        {/* <audio ref={pokemonCry} src={randomPkm?.cry} autoPlay /> */}
        <div className="absolute size-[28rem] rounded-full bg-gradient-radial from-red-950 blur-2xl"></div>
      </div>
    );
  }

  function GuessInput({ className, word }: { className?: string; word: string }) {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const guessStartTime = useRef<number>(Date.now());
    const [timeTaken, setTimeTaken] = useState<number>(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      guessStartTime.current = Date.now();
      setTimeTaken(0);

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimeTaken((prev) => prev + 1);
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [word]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Space" && !isFocused) {
          event.preventDefault();
          inputRef.current?.focus();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isFocused]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        if (inputValue.trim().toLowerCase() === word.toLowerCase()) {
          setIsCorrect(true);
          const baseScore = 200;
          const timeFactor = Math.max(1, 10 - timeTaken);
          const points = baseScore * timeFactor;

          setScore((prev) => prev + points);
          setScorePopup(points);
          setFeedback(`✅ Correct! (${timeTaken}s)`);
          setTimeout(() => generateNumber(), 500);
        } else {
          setFeedback("❌ Incorrect, try again!");
        }
        setInputValue("");
      }

      if (event.key === "Tab") {
        event.preventDefault();

        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        setScore((prev) => prev - 100);
        setScorePopup(-100);
        generateNumber();
        setInputValue("");
        setFeedback(null);
      }
    };

    return (
      <div className={`${className} text-center`}>
        <p className="text-xl font-semibold text-gray-700">⏳ {timeTaken}s</p>

        <h2 className="text-2xl font-bold mb-4">Guess the Pokémon</h2>
        <div className="flex justify-center gap-2 text-4xl font-bold uppercase tracking-widest px-4 h-12">
          {word.split("").map((char, index) => {
            const isCorrect = inputValue[index]?.toLowerCase() === char.toLowerCase();
            const isTyped = index < inputValue.length;

            return (
              <span
                key={index}
                className={`pb-1 ${
                  isCorrect
                    ? "underline underline-green-500 text-green-500"
                    : isTyped
                    ? "underline underline-red-500 text-red-500"
                    : ""
                }`}>
                {isTyped ? inputValue[index] : ""}
              </span>
            );
          })}

          {isFocused && inputValue.length === 0 && (
            <span className="animate-blink absolute">|</span>
          )}
        </div>

        {!isFocused ? (
          <p className="mt-2 text-gray-400 text-4xl animate-pulse">
            Press Space to focus
          </p>
        ) : (
          <>
            <p className="mt-2 text-gray-400 text-xl">Type Then Press Enter to submit</p>
            <p className="mt-2 text-gray-400 text-xl">Tab to SKIP</p>
          </>
        )}

        {feedback && (
          <p
            className={`mt-2 text-lg font-bold ${
              feedback.includes("Correct") ? "text-green-500" : "text-red-500"
            }`}>
            {feedback}
          </p>
        )}

        <input
          ref={inputRef}
          className="absolute left-0 opacity-0"
          type="text"
          value={inputValue}
          maxLength={word.length}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    );
  }
}
