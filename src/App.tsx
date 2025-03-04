import { Route, Routes } from "react-router";
import Header from "./Header/Header";
import Nav from "./Nav";
import Footer from "./Footer/Footer";
import WhosThatGame from "./WhosThatGame/whos-that-game";
import About from "./About/about";
import Home from "./Home/Home";
import PokdexGame from "./PokedexGame/pokedex-game";
import { PokemonServiceProvider } from "./PokemonServiceProvider";
import { cn } from "./lib/utils";
import GamesPage from "./Games/games";
import PokedexPage from "./Pokedex/pokedex-page";

function App() {
  return (
    <>
      <PokemonServiceProvider>
        <div className={cn("min-h-svh z-50 min-w-[375px] flex flex-col overflow-y-scroll")}>
          {/* Header */}
          <header className="px-2 sticky z-30 top-0 flex items-center min-h-[80px] bg-gradient-to-r from-rose-700 to-rose-400">
            <Header />
            <Nav className="ml-auto" />
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
            </Routes>
          </main>

          {/* Footer */}
          <footer className="flex items-center justify-center text-center bg-gray-950">
            <Footer />
          </footer>
        </div>
      </PokemonServiceProvider>
    </>
  );
}

export default App;
