import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 min-h-screen text-center my-12">
      <img
        className="w-96"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
        alt=""
      />
      <h1 className="text-4xl font-bold mb-4">Welcome to the Pokémon Guessing Game!</h1>
      <p className="text-lg text-slate-400 max-w-lg">
        Test your Pokémon knowledge by guessing the correct Pokémon based on their
        silhouette.
      </p>
      <Link to="/guessing-game">
        <button
          className="px-6 py-3 text-lg font-semibold rounded-md 
          bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-blue-500/50 
          hover:ring transition">
          Start Guessing Game
        </button>
      </Link>
    </div>
  );
}
