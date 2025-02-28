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
      <div
        className="min-h-screen grid 
      grid-rows-[80px_0px_1fr_100px] 
      sm:grid-rows-[80px_50px_1fr_100px]">
        {/* Header */}
        <header className="">
          <Header className="h-full bg-gradient-to-r from-rose-700 to-rose-400 flex items-center" />
        </header>
        <Nav className="" />
        {/* Main Content */}
        <main className="w-full relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/who-is-that-pokemon-game" element={<WhosThatGame />} />
            <Route path="/pokedex-game" element={<PokdexGame />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="flex justify-center items-center text-center bg-slate-800">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default App;
