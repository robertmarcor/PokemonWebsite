import React, { useState } from "react";
import ThemeToggleButton from "./theme-toggler";
import { allPokemon } from "../data/pokemonList";
import { Link } from "react-router";
import { extractIdFromUrl } from "../utils/utils";

function MenuBar() {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPokemon = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-menu h-6">
      <div className="relative bg-menu mx-20 mr-24 border-white border-b-4 w-full">
        <div className="top-[17px] -right-[6.5rem] z-50 absolute">
          <svg
            preserveAspectRatio="none"
            className="menu-corner h-12 w-96"
            viewBox="0 0 110 40"
            fill="#141914"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M109 1.5V37.5H41.5C29.5 37.5 23.5 21 23.5 21C19.5 6.5 10.5 1.5 0.5 1.5H109Z"
              stroke="none"
              strokeWidth="4"
            />
          </svg>
        </div>
        <div className="top-[18px] -right-[6.5rem] z-40 absolute">
          <svg
            preserveAspectRatio="none"
            className="menu-corner h-12 w-96"
            viewBox="0 0 110 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M109 1.5V37.5H41.5C29.5 37.5 23.5 21 23.5 21C19.5 6.5 10.5 1.5 0.5 1.5H109Z"
              stroke="white"
              strokeWidth="4"
            />
          </svg>
        </div>
      </div>
      <div className="flex absolute right-0 top-6 items-center z-50 gap-2">
        <p className="text-white">Search</p>

        <div className="">
          <input
            className="rounded-md z-50 w-36 h-6 relative text-black font-sans"
            placeholder="🔎"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchDropdown(!searchDropdown)}
            onBlur={() => {
              setTimeout(() => {
                setSearchDropdown(false);
                setSearchTerm("");
              }, 500);
            }}
          />
          {searchDropdown && (
            <div className="absolute bg-white w-36 border-2 border-black z-10 -translate-y-2 text-left max-h-56 overflow-y-auto">
              {filteredPokemon.map((pokemon) => (
                <li className="p-2 border-t-1 first:border-t-0 border-black hover:bg-black/20">
                  <Link to={`/pokedex/${extractIdFromUrl(pokemon.url)}`}>
                    <p className="text-black capitalize font-sans truncate text-xs ">
                      {pokemon.name} {"Pokemon"}
                    </p>
                  </Link>
                </li>
              ))}
            </div>
          )}
        </div>
        <ThemeToggleButton className="" size={16} />
      </div>
    </div>
  );
}

export default MenuBar;
