import { allMoves } from "@/data/movesList";
import { allPokemon } from "@/data/pokemonList";
import { usePokemonContext } from "@/PokemonServiceContext";
import { extractIdFromUrl } from "@/utils/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isMobile } = usePokemonContext();
  const searchAble = [...allPokemon, ...allMoves];
  const filteredSearch = searchAble.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getItemType = (item: { url: string }): string => {
    if (item.url.includes("/move/")) return "Move";
    if (item.url.includes("/pokemon/")) return "Pokemon";
    return "";
  };

  return (
    <>
      {!isMobile && <p className="text-white">Search</p>}
      <div className="relative">
        <input
          className="rounded-md z-[41] w-36 h-6 relative text-black font-sans cursor-text p-4"
          placeholder={`🔎 ${isMobile ? "Search" : ""}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setSearchDropdown(true)}
          onBlur={() => {
            setTimeout(() => {
              setSearchDropdown(false);
            }, 200);
          }}
        />
        {searchDropdown && (
          <div className="absolute bg-white w-36 border-2 border-black z-40 -translate-y-2 text-left max-h-56 overflow-y-auto py-4">
            {filteredSearch.slice(0, 50).map((item) => {
              const itemType = getItemType(item);
              return (
                <li
                  key={item.name}
                  className="p-2 border-t-1 first:border-t-0 border-black hover:bg-black/20">
                  <Link to={`/${itemType}/${extractIdFromUrl(item.url)}`}>
                    <p className="text-black capitalize font-sans truncate text-xs ">
                      {item.name}
                      <span className="text-[.6rem] text-slate-500">{`(${itemType})`}</span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
