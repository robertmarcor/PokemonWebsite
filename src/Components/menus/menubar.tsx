import { useState } from "react";
import ThemeToggleButton from "./theme-toggler";
import { allPokemon } from "../../data/pokemonList";
import { Link } from "react-router";
import { extractIdFromUrl } from "../../utils/utils";
import NavLinks from "../../Header/Header";
import Logo from "../logo";

function MenuBar({ isMobile }: { isMobile?: boolean }) {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPokemon = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SearchField = () => {
    return (
      <>
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
      </>
    );
  };

  const MobileMenu = () => {
    return <></>;
  };

  const DesktopMenu = () => {
    return (
      <div className="flex bg-menu h-6 z-20">
        <div className="relative bg-menu mx-20 mr-[19rem] border-primary border-b-4 w-full" />
        <div className="absolute bg-menu w-64 h-12 right-0 top-[18px] shadow-[4px_4px_0px_2px] shadow-primary">
          <div className="absolute bg-menu h-12 w-12 skew-x-[45deg] -left-6 shadow-[-6px_4px_0px_2px] shadow-primary" />
        </div>

        <div className="absolute bg-menu w-64 h-12 left-0 top-[18px] shadow-[-4px_4px_0px_2px] shadow-primary">
          <div className="absolute bg-menu h-12 w-12 skew-x-[-45deg] -right-6 shadow-[6px_4px_0px_2px] shadow-primary" />
        </div>

        <div className="absolute left-2 top-3">
          <Logo />
        </div>

        <div className="flex absolute right-0 top-6 items-center z-50 gap-2">
          <SearchField />
          <ThemeToggleButton className="" size={16} />
        </div>
      </div>
    );
  };

  return (
    <>
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
      <div className="w-full bg-primary opacity-80 h-12 flex justify-center items-center text-white font-semibold shadow-[0px_0px_10px_3px] shadow-primary">
        <NavLinks />
      </div>
    </>
  );
}

export default MenuBar;
