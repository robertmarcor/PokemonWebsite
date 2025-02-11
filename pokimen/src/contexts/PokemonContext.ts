import { createContext } from "react";
import { Pokemon } from "../models/Pokemon/pokemon";

interface PokemonContextType {
  allPokemonData: Pokemon[];
  isLoading: boolean;
  isError: boolean;
  errors: Error[];
}

export const PokemonContext = createContext<PokemonContextType | undefined>(undefined);
