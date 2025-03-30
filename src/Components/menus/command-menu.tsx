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
import { SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Fuse from "fuse.js";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [threshold, setThreshold] = useState<number>(0.4);
  const navigate = useNavigate();

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

  let fuseOptions = {
    threshold: 0.4,
    minMatchCharLength: 4,
    isCaseSensetive: false,
    keys: ["name"],
  };

  const pokemonFuse = new Fuse(allPokemon.results, fuseOptions);
  const moveFuse = new Fuse(allMoves.results, fuseOptions);
  const itemFuse = new Fuse(allItems.results, fuseOptions);

  const pokemonSearch = pokemonFuse.search(searchTerm);
  const moveSearch = moveFuse.search(searchTerm);
  const itemSearch = itemFuse.search(searchTerm);

  const getItemType = (item: { url: string }): string => {
    if (item.url.includes("/move/")) return "Move";
    if (item.url.includes("/pokemon/")) return "Pokemon";
    if (item.url.includes("/item/")) return "Item";
    else return "";
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="flex h-9 items-center gap-2 border-b p-4 py-6 relative">
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
            const itemType = getItemType(pokemon.item);
            return (
              <CommandItem
                key={pokemon.item.name}
                onSelect={() => {
                  navigate(`/pokemon/${pokemon.item.name}`);
                  setOpen(false);
                }}>
                <Link to={`/pokemon/${pokemon.item.name}`} onClick={() => setOpen(false)}>
                  <span className="capitalize mr-1">{pokemon.item.name}</span>
                  <span className="text-primary">{`(${itemType})`}</span>
                </Link>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandGroup heading="Moves">
          {moveSearch.slice(0, 10).map((move) => {
            const itemType = getItemType(move.item);
            return (
              <CommandItem
                key={move.item.name}
                onSelect={() => {
                  navigate(`/move/${move.item.name}`);
                  setOpen(false);
                }}>
                <Link to={`/move/${move.item.name}`} onClick={() => setOpen(false)}>
                  <span className="capitalize mr-1">{move.item.name} </span>
                  <span className="text-primary">{`(${itemType})`}</span>
                </Link>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandGroup heading="Items">
          {itemSearch.slice(0, 10).map((item) => {
            const itemType = getItemType(item.item);
            return (
              <CommandItem
                key={item.item.name}
                onSelect={() => {
                  navigate(`/item/${item.item.name}`);
                  setOpen(false);
                }}>
                <Link to={`/item/${item.item.name}`} onClick={() => setOpen(false)}>
                  <span className="capitalize mr-1">{item.item.name} </span>
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
