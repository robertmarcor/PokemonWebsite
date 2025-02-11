import { useEffect, useState } from "react";
import GenerationDropDown from "../Components/generation-dropdown";
import { GetGenerationById, GetPokemonById, GetSpecieById } from "../client/pokemon";
import { extractIdFromUrl, toPascalCase } from "../utils/utils";

export default function GuessingGame() {
  const [selectedGeneration, setSelectedGeneration] = useState("1");
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const generations = [
    { value: "1", label: "Generation 1" },
    { value: "2", label: "Generation 2" },
    { value: "3", label: "Generation 3" },
    { value: "4", label: "Generation 4" },
    { value: "5", label: "Generation 5" },
    { value: "6", label: "Generation 6" },
    { value: "7", label: "Generation 7" },
    { value: "8", label: "Generation 8" },
    { value: "9", label: "Generation 9" },
  ];

  const { data: genData, isLoading } = GetGenerationById(selectedGeneration);
  const genList = genData?.pokemon_species.map((specie) => extractIdFromUrl(specie.url)) || [];
  const randomId = genList[randomNumber];
  const { data: specieData, isLoading: specieLoading } = randomId ? GetSpecieById(randomId) : GetSpecieById("1");
  const { data: randomPkm } = randomId ? GetPokemonById(randomId) : GetPokemonById("1");

  useEffect(() => {}, [randomNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim().toLowerCase() === randomPkm?.name.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl my-4">Who is that Pokèmon?</h1>
      <h2>Setup Game</h2>
      <GenerationDropDown
        generations={generations}
        selectedGeneration={selectedGeneration}
        onGenerationChange={setSelectedGeneration}
      />
      <button
        className="border-2 rounded-md p-2 m-4"
        onClick={() => setRandomNumber(Math.floor(Math.random() * 100))}
        disabled={isLoading}>
        Generate Random Pokémon
      </button>
      <div className="border h-96 flex justify-center items-center dark:bg-white">
        {isLoading ? (
          <img
            className="w-full h-full object-cover filter grayscale brightness-0"
            src="https://picsum.photos/200/300"
          />
        ) : randomPkm ? (
          <img
            className="w-full h-full object-cover filter grayscale brightness-0"
            src={randomPkm.sprites.front_default || "../assets/react.svg"}
            alt={randomPkm.name}
          />
        ) : (
          <div className="flex text-black text-9xl">?</div>
        )}
      </div>
      <h2>Hints:</h2>
      <p>Color: {specieLoading ? "Loading..." : toPascalCase(specieData || "missing color")}</p>
      <p>Weight: {randomPkm?.weight}</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center my-4">
        <label htmlFor="name-input" className="text-xl font-semibold text-gray-400 my-4">
          Your Guess
        </label>
        <input
          className="text-black p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          id="name-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a name"
        />
      </form>

      {isCorrect && (
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-green-500">
          <span className="text-9xl text-white">✔️</span>
        </div>
      )}
    </>
  );
}
