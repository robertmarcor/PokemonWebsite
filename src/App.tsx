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
import PokemonDetailPage from "./Pokedex/pokemon-detail";

function App() {
  return (
    <>
      <PokemonServiceProvider>
        <div className={cn("min-h-svh z-50 min-w-[375px] flex flex-col")}>
          {/* Header */}
          <header className="top-0 z-30 flex items-center bg-gradient-to-r from-rose-700 to-rose-400 px-2 min-h-[80px]">
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
