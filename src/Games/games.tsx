import { Gamepad2 } from "lucide-react";
import { Link } from "react-router";
import PageWrapper from "../Components/page-wrapper";
import { cn } from "../lib/utils";
import MyButton from "@/Components/ui/myButton";

// Sample game data - replace with your actual games
const games = [
  {
    id: "game1",
    title: "Who's That Pokémon?",
    description:
      "Guess the Pokémon based on its silhouette! Inspired by the classic 'Who's That Pokémon?' segment from the series.",
    image: "/guess-game.png",
    link: "/who-is-that-pokemon-game",
  },
  {
    id: "game2",
    title: "Pokèdex Challange",
    description:
      "Test your Pokémon knowledge by naming all the Pokémon from a selected generation. How many can you recall?",
    image: "/pokedex-game.png",
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

      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 m-6">
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
    <div className="flex flex-col border-2 rounded-md h-[500px] overflow-hidden">
      <div className="w-full h-64 overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="blur-[1px] w-full h-full object-cover filter"
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h2 className="mb-2 font-semibold text-lg">{game.title}</h2>
        <p className="mb-4 text-slate-600 text-sm font-sans">{game.description}</p>
        <MyButton
          className={cn(
            "w-full mt-auto font-medium",
            "transition-colors duration-200 rounded-lg",
            "bg-primary hover:bg-primary-foreground"
          )}>
          <Link to={game.link} className="flex justify-center items-center whitespace-nowrap">
            {game.title}
          </Link>
        </MyButton>
      </div>
    </div>
  );
}
