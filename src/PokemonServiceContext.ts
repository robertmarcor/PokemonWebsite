import { createContext, useContext } from "react";

type ContextProps = {
  isMobile: boolean;
  isLaptop: boolean;
  isUltraWide: boolean;
};

export const PokemonContext = createContext<ContextProps>({
  isLaptop: false,
  isMobile: false,
  isUltraWide: false,
});

// Hook to use the Pokemon context
export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemonContext must be used within a PokemonServiceProvider");
  }
  return context;
};
