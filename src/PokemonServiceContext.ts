import { createContext, useContext } from "react";

type ContextProps = {
  count?: number;
  allNames?: string[];
};

export const PokemonContext = createContext<ContextProps>({});

// Hook to use the Pokemon context
export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemonContext must be used within a PokemonServiceProvider");
  }
  return context;
};
