import { ReactNode, useState } from "react";
import ThemeToggleButton from "./theme-toggler";
import { allPokemon } from "../../data/pokemonList";
import { Link } from "react-router";
import { extractIdFromUrl } from "../../utils/utils";
import NavLinks from "../../Header/Header";
import Logo from "../logo";
import { usePokemonContext } from "@/PokemonServiceContext";
import HamburgerMenu from "./hamburger-menu";
import { cn } from "@/lib/utils";

function MenuBar() {
  const { isMobile, isLaptop } = usePokemonContext();
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPokemon = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SearchField = () => {
    return (
      <>
        {!isMobile && <p className="text-white">Search</p>}
        <div className="">
          <input
            className="rounded-md z-20 w-36 h-6 relative text-black font-sans"
            placeholder={`🔎 ${isMobile ? "Search" : ""}`}
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

  const UI = ({ children }: { children: ReactNode }) => {
    return (
      <div className="flex bg-menu h-6 z-10">
        <div
          className={cn(
            `${isLaptop ? "mx-0 h-[4.4rem]" : "mx-20 mr-[19rem]"}`,
            "relative bg-menu border-primary border-b-4 w-full"
          )}
        />
        <div className="absolute bg-menu w-64 h-12 right-0 top-[18px] shadow-[4px_4px_0px_2px] shadow-primary">
          {!isLaptop && (
            <div className="absolute bg-menu h-12 w-12 skew-x-[45deg] -left-6 shadow-[-6px_4px_0px_2px] shadow-primary" />
          )}
        </div>

        <div className="absolute bg-menu w-64 h-12 left-0 top-[18px] shadow-[-4px_4px_0px_2px] shadow-primary">
          {!isLaptop && (
            <div className="absolute bg-menu h-12 w-12 skew-x-[-45deg] -right-6 shadow-[6px_4px_0px_2px] shadow-primary" />
          )}
        </div>
        {children}
      </div>
    );
  };

  return (
    <>
      <UI>
        <div className="absolute left-2 top-3 flex">
          <HamburgerMenu className="top-12 left-50 z-30 text-white" />

          <Logo />
        </div>
        <div className="flex absolute right-2 top-6 items-center gap-2">
          {!isMobile && <SearchField />}
          <ThemeToggleButton className="-translate-y-[2px]" size={16} />
        </div>
      </UI>
      <div className="bg-primary opacity-80 w-full  h-12 flex justify-center items-center text-white font-semibold shadow-[0px_0px_10px_3px] shadow-primary">
        {!isLaptop && (
          <div className="flex gap-8">
            <NavLinks />
          </div>
        )}
      </div>
    </>
  );
}

export default MenuBar;
