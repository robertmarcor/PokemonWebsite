import { Route, Routes } from "react-router";
import Header from "./Header/Header";
import Nav from "./Nav";
import Footer from "./Footer/Footer";
import GuessingGame from "./GuessingGame/guessing-game";
import About from "./About/about";
import Home from "./Home/Home";
import GuessingGameTest from "./GuessingGame/guessing-game copy";

function App() {
  return (
    <>
      <header>
        <Header className="h-16 bg-gradient-to-r from-rose-700 to-rose-400 flex items-center" />
        <Nav className="h-8" />
      </header>
      <div className="grid grid-rows-[1fr] justify-items-center min-w-dvw min-h-svh">
        <main className="sm:mx-10 text-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/guessing-game" element={<GuessingGame />} />
            <Route path="test/guessing-game" element={<GuessingGameTest />} />
          </Routes>
        </main>
      </div>
      <Footer className="bg-emerald-500 flex flex-col justify-center items-center mt-auto" />
    </>
  );
}

export default App;
