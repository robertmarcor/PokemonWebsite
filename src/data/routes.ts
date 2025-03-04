const ballIcon =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

export type SubRoute = {
  label: string;
  href: string;
  icon?: string;
};

export type Route = {
  label: string;
  href: string;
  icon?: string;
  subroutes?: SubRoute[] | [];
};

export const Home: Route = {
  label: "Home",
  href: "/home",
  icon: ballIcon,
  subroutes: [],
};

export const Games: Route = {
  label: "Games",
  href: "/games",
  icon: ballIcon,
  subroutes: [
    { label: "WhosThatPokèmon?", href: "/who-is-that-pokemon-game", icon: "/pika-hidden.png" },
    { label: "Pokedex Game", href: "/pokedex-game", icon: "/pokedex.webp" },
  ],
};

export const Pokedex: Route = {
  label: "Pokèdex",
  href: "/pokedex",
  icon: ballIcon,
  subroutes: [],
};

export const ROUTES: Route[] = [Home, Games, Pokedex];
