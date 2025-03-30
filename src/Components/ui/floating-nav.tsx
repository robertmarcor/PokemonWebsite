import { ArrowUp, X, Menu } from "lucide-react";
import { useState } from "react";

interface FloatingNavProps {
  sectionRefs: { label: string; ref: React.RefObject<HTMLDivElement | null> }[];
}

function FloatingNav({ sectionRefs }: FloatingNavProps) {
  const [quickRefVisible, setQuickRefVisible] = useState<boolean>(true);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {quickRefVisible && (
        <nav className="sticky top-0 z-40 w-full p-4 shadow-lg bg-gradient-to-t from-primary/50 via-primary/90 to-primary/50">
          <div className="flex items-center justify-between mb-2">
            <button
              className="absolute top-2 left-2 p-1.5 text-white transition-colors rounded-full hover:bg-blue-600/80 size-9"
              aria-label="scroll top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <ArrowUp size={18} className="m-auto" />
            </button>
            <button
              className="absolute top-2 right-2 p-1.5 text-white transition-colors rounded-full hover:bg-red-600/80 size-9"
              onClick={() => setQuickRefVisible(false)}
              aria-label="Hide navigation">
              <X size={18} className="m-auto" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 ml-9 text-sm *:rounded-md *:px-2 *:text-white">
            {sectionRefs.map((ref, index) => (
              <button
                key={index}
                className="text-white hover:bg-black/10 hover:ring-2 ring-white"
                onClick={() => scrollToSection(ref.ref)}>
                {ref.label}
              </button>
            ))}
          </div>
        </nav>
      )}
      {!quickRefVisible && (
        <div className="fixed bottom-5 right-5 z-30">
          <button
            className="flex items-center gap-2 p-3 text-white transition-colors bg-blue-500 rounded-full shadow-lg hover:bg-blue-600"
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
