import { Route, Routes } from "react-router";
import Footer from "./Footer/Footer";
import WhosThatGame from "./WhosThatGame/whos-that-game";
import Home from "./Home/Home";
import PokdexGame from "./PokedexGame/fill-the-dex-game";
import { PokemonServiceProvider } from "./PokemonServiceProvider";
import GamesPage from "./Games/games";
import PokemonPage from "@/Pokemon/pokemon-page";
import PokemonDetailedView from "@/Pokemon/pokemon-detailed-view";
import MenuBar from "./Components/menus/menubar";
import WhosThatPokemon from "./WhosThatPokemon/game";
import DebugLines from "./Components/debug-lines";
import Pokedex from "./Pokedex/pokedex-page";
import EggGroupPage from "./EggGroups/egg-group-page";
import NotFoundPage from "./not-found-page";
import MovePage from "@/Moves/move-page";
import { CommandMenu } from "@/Components/menus/command-menu";
import WavyBg from "./Components/layouts/backgrounds";
import ItemPage from "./Item/item-page";
import MoveDetailedView from "@/Moves/slug/move-detailed-view";
import Test from "./__test__/test";
function App() {
  return (
    <>
      <PokemonServiceProvider>
        <MenuBar />
        <CommandMenu />
        {/*         <DebugLines />
         */}
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
            <Route path="/pokemon" element={<PokemonPage />} />
            <Route path="/pokemon/:slug" element={<PokemonDetailedView />} />
            {/* MOVES */}
            <Route path="/move" element={<MovePage />} />
            <Route path="/move/:slug" element={<MoveDetailedView />} />
            {/* ITEMS */}
            <Route path="/item" element={<ItemPage />} />
            <Route path="/item/:slug" element={<ItemPage />} />
            {/* EGG GROUPS */}
            <Route path="/egg-group/:slug" element={<EggGroupPage />} />

            <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {/* Footer */}
        <footer className="flex items-center justify-center text-center bg-gray-950">
          <Footer />
        </footer>
        <WavyBg />
      </PokemonServiceProvider>
    </>
  );
}

export default App;
