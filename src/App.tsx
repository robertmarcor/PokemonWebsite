import { Route, Routes } from "react-router-dom";
import Footer from "./Footer/Footer";
import WhosThatGame from "./WhosThatGame/whos-that-game";
import Home from "./Home/Home";
import PokdexGame from "./PokedexGame/fill-the-dex-game";
import { PokemonServiceProvider } from "./PokemonServiceProvider";
import GamesPage from "./Games/games";
import PokemonViewPage from "@/Pokemon/pokemon-view-page";
import PokemonDetailedView from "@/Pokemon/detailed-view";
import MenuBar from "./Components/menus/menubar";
import WhosThatPokemon from "./WhosThatPokemon/game";
import DebugLines from "./Components/debug-lines";
import Pokedex from "./Pokedex/pokedex-page";
import EggGroupPage from "./EggGroups/egg-group-page";
import MoveDetailedView from "./Moves/move-detailed-view";
import NotFoundPage from "./not-found-page";
import MovePage from "./Moves/move-view-page";
import PokemonCommandPalette from "./CommandPalette/CommandPalette";

function App() {
  return (
    <>
      <PokemonServiceProvider>
        <PokemonCommandPalette />
        <MenuBar />
        {/* <DebugLines /> */}

        {/* Main Content */}
        <main className="flex-1 min-w-full">
          <Routes>
            <Route index element={<Home />} />
            {/* GAMES */}
            <Route path="/games" element={<GamesPage />} />
            <Route path="/who-is-that-pokemon-game" element={<WhosThatGame />} />
            <Route path="/whosthatpokemon" element={<WhosThatPokemon />} />
            <Route path="/pokedex-game" element={<PokdexGame />} />
            {/* KNOWLEDGE BASES */}
            <Route path="/pokedex" element={<Pokedex />} />
            {/* POKEMON */}
            <Route path="/pokemon" element={<PokemonViewPage />} />
            <Route path="/pokemon/:id" element={<PokemonDetailedView />} />
            {/* MOVES */}
            <Route path="/move" element={<MovePage />} />
            <Route path="/move/:id" element={<MoveDetailedView />} />
            {/* EGG GROUPS */}
            <Route path="/egg-group/:id" element={<EggGroupPage />} />

            <Route path="*" element={<NotFoundPage />} />
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
