import { Gamepad2 } from "lucide-react";
import { Link } from "react-router";
import PageWrapper from "../Components/page-wrapper";
import { cn } from "../lib/utils";
import MyButton from "@/Components/ui/myButton";
import H1 from "@/Components/layouts/h1-header";

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
      <div className="flex items-center gap-2">
        <Gamepad2 className="size-8" />
        <H1 text="Games" />
        <Gamepad2 className="size-8" />
      </div>
      <p className="text-xl">Check out the games I developed with the pokeAPI.</p>

      <div className="grid grid-cols-1 gap-8 m-6 md:grid-cols-2">
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
        <h2 className="mb-2 font-semibold">{game.title}</h2>
        <p className="mb-4">{game.description}</p>
        <MyButton
          className={cn(
            "w-full mt-auto font-medium",
            "transition-colors duration-200 rounded-lg",
            "bg-primary hover:bg-primary-foreground"
          )}>
          <Link to={game.link} className="flex items-center justify-center whitespace-nowrap">
            {game.title}
          </Link>
        </MyButton>
      </div>
    </div>
  );
}
