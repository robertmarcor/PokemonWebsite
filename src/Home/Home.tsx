import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="relative">
        <img
          className="w-48 lg:w-56 drop-shadow-lg z-20"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
          alt="Pikachu"
        />
        <div className="absolute inset-0 bg-yellow-400 opacity-10 blur-3xl rounded-full -z-50"></div>
      </div>
      <h1 className="text-5xl font-bold mt-6 tracking-wide">Pokémon Guessing Game</h1>
      <div className="mt-8 grid gap-4">
        <p className="text-lg text-gray-300 max-w-lg mt-4">
          Guessing Game - Guess Pokémon based on their silhouette.
        </p>
        <Link to="/guessing-game">
          <button className="px-6 py-3 text-lg font-semibold rounded-md bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50 hover:scale-105 transition-transform">
            Start Guessing
          </button>
        </Link>
        <p className="text-lg text-gray-300 max-w-lg mt-4">
          Pokedex Game - Test your knowledge by filling the dex{" "}
        </p>
        <Link to="/pokedex-game">
          <button className="px-6 py-3 text-lg font-semibold rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50 hover:scale-105 transition-transform">
            Fill the Dex
          </button>
        </Link>
      </div>
    </div>
  );
}
