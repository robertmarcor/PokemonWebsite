import { Route, Routes } from "react-router";
import NavLinks from "./Header/Header";
import HamburgerMenu from "./Components/menus/hamburger-menu";
import Footer from "./Footer/Footer";
import WhosThatGame from "./WhosThatGame/whos-that-game";
import About from "./About/about";
import Home from "./Home/Home";
import PokdexGame from "./PokedexGame/fill-the-dex-game";
import { PokemonServiceProvider } from "./PokemonServiceProvider";
import { cn } from "./lib/utils";
import GamesPage from "./Games/games";
import PokedexPage from "./Pokedex/pokedex-page";
import PokemonDetailPage from "./Pokedex/pokemon-detail";
import TestPokemon from "./Pokedex/test";
import MenuBar from "./Components/menus/menubar";
import WhosThatPokemon from "./WhosThatPokemon/game";
import { useEffect, useState } from "react";
import Logo from "./Components/logo";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 630);
      setIsLaptop(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <PokemonServiceProvider>
        <div className={cn("min-h-svh flex flex-col")}>
          <div className="absolute w-full bg-red-800 h-px top-[820px]" />
          {!isLaptop && <MenuBar isMobile={isMobile} />}
          {isLaptop && (
            <header className="bg-primary p-2 flex items-center">
              <Logo />
              <NavLinks />
              <HamburgerMenu />
            </header>
          )}
          {/* Main Content */}
          <main className="flex-1 min-w-full">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/who-is-that-pokemon-game" element={<WhosThatGame />} />
              <Route path="/whosthatpokemon" element={<WhosThatPokemon />} />
              <Route path="/pokedex-game" element={<PokdexGame />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/pokedex" element={<PokedexPage />} />
              <Route path="/pokedex/:id" element={<PokemonDetailPage />} />
              <Route path="/test/:id" element={<TestPokemon />} />
            </Routes>
          </main>
          {/* Footer */}
          <footer className="flex justify-center items-center bg-gray-950 text-center">
            <Footer />
          </footer>
        </div>
      </PokemonServiceProvider>
    </>
  );
}

export default App;
