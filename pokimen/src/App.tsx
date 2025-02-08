import { Route, Routes } from "react-router";
import Home from "./routes";
import Header from "./Header/Header";
import Nav from "./Nav";
import Footer from "./Footer/Footer";

function App() {
  return (
    <>
      <header>
        <Header className="h-24 bg-red-400 flex items-center px-4" />
        <Nav />
      </header>
      <div className="grid grid-rows-[1fr] justify-items-center min-w-dvw min-h-svh">
        <main className="sm:mx-10 text-center">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
      <Footer className="bg-emerald-500 flex flex-col justify-center items-center mt-auto" />
    </>
  );
}

export default App;
