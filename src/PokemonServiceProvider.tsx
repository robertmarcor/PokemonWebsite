import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonServiceContext";

export const PokemonServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 630);
      setIsLaptop(window.innerWidth < 1000);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PokemonContext.Provider value={{ isMobile, isLaptop }}>{children}</PokemonContext.Provider>
  );
};
