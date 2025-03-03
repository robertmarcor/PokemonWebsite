const ballIcon =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
type Route = {
  href: string;
  name: string;
  icon?: string;
};

export type Routes = {
  Home: Route;
  WhosThatPokemon: Route;
  PokedexGame: Route;
};

export const ROUTES: Routes = {
  Home: {
    href: "/",
    name: "HOME",
    icon: ballIcon,
  },
  WhosThatPokemon: {
    href: "/who-is-that-pokemon-game",
    name: "WhosThatPokèmon?",
    icon: "/pika-hidden.png",
  },
  PokedexGame: {
    href: "/pokedex-game",
    name: "Pokedex-Game",
    icon: "/pokedex.webp",
  },
};
