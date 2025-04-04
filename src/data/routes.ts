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
  href: "/",
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
    { label: "WHO IS THAT?", href: "/whosthatpokemon", icon: "/pokedex.webp" },
  ],
};

export const Pokedex: Route = {
  label: "Pokèdex",
  href: "/pokedex",
  icon: ballIcon,
  subroutes: [
    { label: "Pokèmon", href: "/pokemon" },
    { label: "Moves", href: "/move" },
    { label: "Egg Groups", href: "/egg-group" },
    { label: "Items", href: "/item" },
  ],
};
export const DESKTOP_ROUTES = [
  { label: "Games", href: "/games" },
  { label: "Pokedex", href: "/pokedex" },
  { label: "Test", href: "/test" },
];

export const ROUTES: Route[] = [Home, Games, Pokedex];
