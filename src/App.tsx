import { Route, Routes } from "react-router";
import Header from "./Header/Header";
import Nav from "./Nav";
import Footer from "./Footer/Footer";
import WhosThatGame from "./WhosThatGame/whos-that-game";
import About from "./About/about";
import Home from "./Home/Home";
import PokdexGame from "./PokedexGame/pokedex-game";

function App() {
  return (
    <>
      <header>
        <Header className="h-16 bg-gradient-to-r from-rose-700 to-rose-400 flex items-center" />
        <Nav className="h-10" />
      </header>
      <div className="grid grid-rows-[1fr] justify-items-center min-w-dvw min-h-svh">
        <main className="sm:mx-10 text-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/who-is-that-pokemon-game" element={<WhosThatGame />} />
            <Route path="/pokedex-game" element={<PokdexGame />} />
          </Routes>
        </main>
      </div>
      <Footer className="grid place-items-center mt-auto" />
    </>
  );
}

export default App;
