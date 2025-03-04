import { Gamepad2 } from "lucide-react";
import { Link } from "react-router";
import PageWrapper from "../Components/page-wrapper";
import { cn } from "../lib/utils";

// Sample game data - replace with your actual games
const games = [
  {
    id: "game1",
    title: "Who's That Pokémon?",
    description:
      "Guess the Pokémon based on its silhouette! Inspired by the classic 'Who's That Pokémon?' segment from the series.",
    image: "/pokedex-game.png",
    link: "/who-is-that-pokemon-game",
  },
  {
    id: "game2",
    title: "Pokèdex Challange",
    description:
      "Test your Pokémon knowledge by naming all the Pokémon from a selected generation. How many can you recall?",
    image: "/guess-game.png",
    link: "/pokedex-game",
  },
];

export default function GamesPage() {
  return (
    <PageWrapper>
      <section>
        <div className="flex items-center gap-2">
          <Gamepad2 className="size-8" />
          <h1 className="font-semibold">Games Collection</h1>
          <Gamepad2 className="size-8" />
        </div>
        <p className="text-xl">Check out the games I developed with the pokeAPI.</p>
      </section>

      <div className="grid gap-8 m-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </PageWrapper>
  );
}

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

function GameCard({ game }: { game: Game }) {
  return (
    <div className="grid grid-rows-[1fr_.5fr] overflow-hidden border-2 rounded-md">
      <div className="w-full overflow-hidden">
        <img src={game.image} alt={game.title} className="w-full object-fit" />
      </div>
      <div className="flex flex-col p-4">
        <h2 className="mb-2 text-lg font-semibold">{game.title}</h2>
        <p className="mb-4 text-sm text-slate-600">{game.description}</p>
        <button
          className={cn(
            "w-full px-4 py-2 mt-auto font-medium",
            "transition-colors duration-200 rounded-lg",
            "bg-gradient-to-tl from-amber-500 to-yellow-400 hover:ring-4 ring-pink-400"
          )}>
          <Link to={game.link} className="flex items-center justify-center">
            {game.title}
          </Link>
        </button>
      </div>
    </div>
  );
}
