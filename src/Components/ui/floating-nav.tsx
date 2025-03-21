import { ArrowUp, X, Menu } from "lucide-react";
import { useState } from "react";
import { RefObject } from "react";

interface FloatingNavProps {
  sectionRefs: {
    topRef: RefObject<HTMLDivElement | null>;
    infoRef: RefObject<HTMLDivElement | null>;
    evoChainRef: RefObject<HTMLDivElement | null>;
    formsChainRef?: RefObject<HTMLDivElement | null>;
    typeRelationsRef: RefObject<HTMLDivElement | null>;
    movesRef: RefObject<HTMLDivElement | null>;
    eggGroupRef: RefObject<HTMLDivElement | null>;
    locationRef?: RefObject<HTMLDivElement | null>; // Optional as it might not exist in all views
  };
}

function FloatingNav({ sectionRefs }: FloatingNavProps) {
  const [quickRefVisible, setQuickRefVisible] = useState<boolean>(true);

  const scrollToSection = (ref: RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Build quick links array based on available refs
  const quickLinks = [
    { label: "Basic Info", onClick: () => scrollToSection(sectionRefs.infoRef) },
    { label: "Evolution Chain", onClick: () => scrollToSection(sectionRefs.evoChainRef) },
  ];

  // Add Forms Chain link if the ref exists
  if (sectionRefs.formsChainRef) {
    quickLinks.push({
      label: "Forms Chain",
      onClick: () => scrollToSection(sectionRefs.formsChainRef!),
    });
  }

  // Add remaining links
  quickLinks.push(
    { label: "Type Relations", onClick: () => scrollToSection(sectionRefs.typeRelationsRef) },
    { label: "Moves", onClick: () => scrollToSection(sectionRefs.movesRef) },
    { label: "Egg", onClick: () => scrollToSection(sectionRefs.eggGroupRef) }
  );

  // Add Location link if the ref exists
  if (sectionRefs.locationRef) {
    quickLinks.push({
      label: "Location",
      onClick: () => scrollToSection(sectionRefs.locationRef!),
    });
  }

  return (
    <>
      {quickRefVisible ? (
        <nav className="p-4 rounded-md font-mono shadow-lg sticky w-full bg-violet-500 top-0 z-40 bg-gradient-to-t from-red-500 to-rose-500">
          <div className="flex justify-between items-center mb-2">
            <button
              className="hover:bg-blue-600/80 p-1.5 rounded-full transition-colors absolute top-2 left-2 size-9 text-white"
              onClick={() => scrollToSection(sectionRefs.topRef)}
              aria-label="scroll top">
              <ArrowUp size={18} className="m-auto" />
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
              <button
                key={index}
                className="hover:black/40 hover:ring-2 ring-white text-white"
                onClick={link.onClick}>
                {link.label}
              </button>
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
