import "react-cmdk/dist/cmdk.css";
import CommandPalette from "react-cmdk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allPokemon } from "@/data/pokemonList";
import { allMoves } from "@/data/movesList";
import PalettePage from "./command-palette-page-comp";

const PokemonCommandPalette = () => {
  const [page, setPage] = useState<"root" | "games" | "pokedex" | "pokemon" | "moves">("root");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Setup keyboard shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Navigation page items
  const commandItems = [
    {
      heading: "Navigation",
      id: "navigation",
      items: [
        {
          id: "home",
          children: "Home",
          onClick: () => {
            navigate("/");
            setOpen(false);
          },
        },
        {
          id: "games",
          children: "Games",
          closeOnSelect: false,
          onClick: () => {
            setPage("games");
          },
        },
        {
          id: "pokedex",
          children: "Pokédex",
          closeOnSelect: false,
          onClick: () => {
            setPage("pokedex");
          },
        },
        {
          id: "pokemon",
          children: "Pokémon List",
          closeOnSelect: false,
          onClick: () => {
            setPage("pokemon");
          },
        },
        {
          id: "moves",
          children: "Moves List",
          closeOnSelect: false,
          onClick: () => {
            setPage("moves");
          },
        },
      ],
    },
  ];

  // Games page items
  const gamesItems = [
    {
      heading: "Games",
      id: "games-list",
      items: [
        {
          id: "back-to-root",
          children: "Back",
          closeOnSelect: false,
          onClick: () => setPage("root"),
        },
        {
          id: "whos-that-pokemon",
          children: "Who's That Pokémon?",
          onClick: () => {
            navigate("/who-is-that-pokemon-game");
            setOpen(false);
          },
        },
        {
          id: "pokedex-game",
          children: "Pokédex Game",
          onClick: () => {
            navigate("/pokedex-game");
            setOpen(false);
          },
        },
        {
          id: "who-is-that",
          children: "WHO IS THAT?",
          onClick: () => {
            navigate("/whosthatpokemon");
            setOpen(false);
          },
        },
      ],
    },
  ];

  // Pokedex page items
  const pokedexItems = [
    {
      heading: "Pokédex",
      id: "pokedex-list",
      items: [
        {
          id: "back-to-root",
          children: "Back",
          closeOnSelect: false,
          onClick: () => setPage("root"),
        },
        {
          id: "pokemon-list",
          children: "Pokémon List",
          onClick: () => {
            navigate("/pokemon");
            setOpen(false);
          },
        },
        {
          id: "moves-list",
          children: "Moves List",
          onClick: () => {
            navigate("/move");
            setOpen(false);
          },
        },
        {
          id: "pokedex-main",
          children: "Pokédex Main",
          onClick: () => {
            navigate("/pokedex");
            setOpen(false);
          },
        },
      ],
    },
  ];

  // Pokémon page items
  const pokemonItems = [
    {
      heading: "Pokémon",
      id: "pokemon-list",
      items: [
        {
          id: "back-to-root",
          children: "Back",
          closeOnSelect: false,
          onClick: () => setPage("root"),
        },
        ...allPokemon.map((pokemon) => ({
          id: pokemon.name,
          children: pokemon.name,
          onClick: () => {
            navigate(`/pokemon/${pokemon.name}`);
            setOpen(false);
          },
        })),
      ],
    },
  ];

  // Moves page items
  const movesItems = [
    {
      heading: "Moves",
      id: "moves-list",
      items: [
        {
          id: "back-to-root",
          children: "Back",
          closeOnSelect: false,
          onClick: () => setPage("root"),
        },
        ...allMoves.map((move) => ({
          id: move.name,
          children: move.name,
          onClick: () => {
            navigate(`/move/${move.name}`);
            setOpen(false);
          },
        })),
      ],
    },
  ];

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page={page}>
      {/* Base Nav */}
      <PalettePage id="root" items={commandItems} search={search} />
      <PalettePage id="games" items={gamesItems} search={search} />
      <PalettePage id="pokedex" items={pokedexItems} search={search} />
      {/* Big boys */}
      <PalettePage id="pokemon" items={pokemonItems} search={search} maxItems={50} />
      <PalettePage id="moves" items={movesItems} search={search} maxItems={50} />
    </CommandPalette>
  );
};

export default PokemonCommandPalette;
