import { Route, Routes } from "react-router";
import Header from "./Header/Header";
import MobileNav from "./Nav";
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
import ThemeToggleButton from "./Components/theme-toggler";

function App() {
  return (
    <>
      <PokemonServiceProvider>
        <div className={cn("min-h-svh z-50 min-w-[375px] flex flex-col")}>
          {/* Header */}
          <header
            className={cn(
              "flex items-center justify-between",
              "top-0 z-30 min-h-[80px] text-white px-2",
              "bg-gradient-to-r from-rose-700 to-rose-400"
            )}>
            <Header />
            <div className="flex gap-2 items-center">
              <ThemeToggleButton />
              <MobileNav />
            </div>
          </header>
          {/* Main Content */}
          <main className="flex-1 min-w-full">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/who-is-that-pokemon-game" element={<WhosThatGame />} />
              <Route path="/pokedex-game" element={<PokdexGame />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/pokedex" element={<PokedexPage />} />
              <Route path="/pokedex/:id" element={<PokemonDetailPage />} />
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
