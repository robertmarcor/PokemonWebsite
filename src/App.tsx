import { Route, Routes } from "react-router";
import Footer from "./Footer/Footer";
import WhosThatGame from "./WhosThatGame/whos-that-game";
import About from "./About/about";
import Home from "./Home/Home";
import PokdexGame from "./PokedexGame/fill-the-dex-game";
import { PokemonServiceProvider } from "./PokemonServiceProvider";
import GamesPage from "./Games/games";
import PokedexPage from "./Pokedex/pokedex-page";
import PokemonDetailPage from "./Pokedex/pokemon-detail";
import TestPokemon from "./Pokedex/test";
import MenuBar from "./Components/menus/menubar";
import WhosThatPokemon from "./WhosThatPokemon/game";
import DebugLines from "./Components/debug-lines";

function App() {
  return (
    <>
      <PokemonServiceProvider>
        <MenuBar />
        <DebugLines />

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
      </PokemonServiceProvider>
    </>
  );
}

export default App;
