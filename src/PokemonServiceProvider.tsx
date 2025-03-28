import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonServiceContext";

export const PokemonServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [isUltraWide, setIsUltraWide] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 630);
      setIsLaptop(window.innerWidth < 1000);
      setIsUltraWide(window.innerWidth > 2560);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PokemonContext.Provider value={{ isMobile, isLaptop, isUltraWide }}>
      {children}
    </PokemonContext.Provider>
  );
};
