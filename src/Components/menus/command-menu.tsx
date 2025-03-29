import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/Components/ui/command";
import { allItems } from "@/data/itemsList";
import { allMoves } from "@/data/movesList";
import { allPokemon } from "@/data/pokemonList";
import { extractIdFromUrl } from "@/utils/utils";
import { SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const pokemonSearch = allPokemon.results.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const moveSearch = allMoves.results.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const itemSearch = allItems.results.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getItemType = (item: { url: string }): string => {
    if (item.url.includes("/move/")) return "Move";
    if (item.url.includes("/pokemon/")) return "Pokemon";
    if (item.url.includes("/item/")) return "Item";
    else return "";
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="flex h-9 items-center gap-2 border-b p-4 py-6">
        <SearchIcon className="size-4 shrink-0 opacity-50" />
        <input
          type="text"
          placeholder="Search for Pokemon, Move, Item, etc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="placeholder:text-muted-foreground  w-full rounded-md bg-transparent text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <X size={24} />
        </button>
      </div>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pokemon">
          {pokemonSearch.slice(0, 10).map((pokemon) => {
            const itemType = getItemType(pokemon);
            return (
              <CommandItem key={pokemon.name}>
                <Link to={`/pokemon/${pokemon.name}`} onClick={() => setOpen(false)}>
                  <span className="capitalize mr-1">{pokemon.name}</span>
                  <span className="text-primary">{`(${itemType})`}</span>
                </Link>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandGroup heading="Moves">
          {moveSearch.slice(0, 10).map((move) => {
            const itemType = getItemType(move);
            return (
              <CommandItem key={move.name}>
                <Link to={`/move/${move.name}`} onClick={() => setOpen(false)}>
                  <span className="capitalize mr-1">{move.name} </span>
                  <span className="text-primary">{`(${itemType})`}</span>
                </Link>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandGroup heading="Items">
          {itemSearch.slice(0, 10).map((item) => {
            const itemType = getItemType(item);
            return (
              <CommandItem key={item.name}>
                <Link to={`/item/${item.name}`} onClick={() => setOpen(false)}>
                  <span className="capitalize mr-1">{item.name} </span>
                  <span className="text-primary">{`(${itemType})`}</span>
                </Link>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
