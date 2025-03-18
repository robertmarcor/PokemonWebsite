import { ArrowUp, X, Menu } from "lucide-react";
import { useState } from "react";

function FloatingNav() {
  const [quickRefVisible, setQuickRefVisible] = useState<boolean>(true);

  return (
    <>
      {quickRefVisible ? (
        <nav className="top-5 z-30 sticky bg-black/80 p-4 rounded-md font-mono shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <a
              className="hover:text-blue-400 p-2 flex items-center gap-2 transition-colors"
              href="#top">
              <ArrowUp size={18} />
              <p className="font-semibold">Quick Navigation</p>
            </a>
            <button
              className="bg-red-500/80 hover:bg-red-600/80 p-1.5 rounded-full transition-colors"
              onClick={() => setQuickRefVisible(false)}
              aria-label="Hide navigation">
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className="bg-black hover:bg-gray-800 p-2 rounded-md transition-colors hover:text-blue-400 flex-grow text-center"
              href="#evo-chain">
              Evo Chain
            </a>
            <a
              className="bg-black hover:bg-gray-800 p-2 rounded-md transition-colors hover:text-blue-400 flex-grow text-center"
              href="#abilities">
              Abilities
            </a>
            <a
              className="bg-black hover:bg-gray-800 p-2 rounded-md transition-colors hover:text-blue-400 flex-grow text-center"
              href="#moves">
              Moves
            </a>
            <a
              className="bg-black hover:bg-gray-800 p-2 rounded-md transition-colors hover:text-blue-400 flex-grow text-center"
              href="#type-relations">
              Type Relations
            </a>
            <a
              className="bg-black hover:bg-gray-800 p-2 rounded-md transition-colors hover:text-blue-400 flex-grow text-center"
              href="#egg-group">
              Egg
            </a>
          </div>
        </nav>
      ) : (
        <div className="fixed bottom-5 right-5 z-30">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2 transition-colors"
            onClick={() => setQuickRefVisible(true)}
            aria-label="Show navigation">
            <Menu size={20} />
            <span className="font-medium">Menu</span>
          </button>
        </div>
      )}
    </>
  );
}

export default FloatingNav;
