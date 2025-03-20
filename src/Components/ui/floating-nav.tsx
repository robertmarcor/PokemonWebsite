import { ArrowUp, X, Menu } from "lucide-react";
import { useState } from "react";

function FloatingNav() {
  const [quickRefVisible, setQuickRefVisible] = useState<boolean>(true);

  const quickLinks = [
    { label: "Basic Info", href: "#info" },
    { label: "Stats", href: "#stats" },
    { label: "Type Relations", href: "#type-relations" },
    { label: "Evo Chain", href: "#evo-chain" },
    { label: "Abilities", href: "#abilities" },
    { label: "Moves", href: "#moves" },
    { label: "Egg", href: "#egg-group" },
    { label: "Location", href: "#location" },
  ];

  return (
    <>
      {quickRefVisible ? (
        <nav className="p-4 rounded-md font-mono shadow-lg sticky w-full bg-violet-500 top-0 z-40 bg-gradient-to-t from-red-500 to-rose-500">
          <div className="flex justify-between items-center mb-2">
            <button
              className="hover:bg-blue-600/80 p-1.5 rounded-full transition-colors absolute top-2 left-2 size-9 text-white"
              aria-label="scroll top">
              <a href="#top">
                <ArrowUp size={18} className="m-auto" />
              </a>
            </button>
            <button
              className="hover:bg-red-600/80 p-1.5 rounded-full transition-colors absolute top-2 right-2 size-9 text-white"
              onClick={() => setQuickRefVisible(false)}
              aria-label="Hide navigation">
              <X size={18} className="m-auto" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 *:rounded-md ml-9 *:px-2 text-sm *:text-white">
            {quickLinks.map((link, index) => (
              <a key={index} className="hover:black/40 hover:ring-2 ring-white" href={link.href}>
                {link.label}
              </a>
            ))}
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
