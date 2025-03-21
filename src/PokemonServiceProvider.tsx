import { useEffect } from "react";
import { useGetPokemonCount } from "./client/pokemon.client";
import { PokemonContext } from "./PokemonServiceContext";

export const PokemonServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, refetch, isError } = useGetPokemonCount();
  const POKEMON_COUNT = "PokemonCount";

  useEffect(() => {
    const loadData = () => {
      const storedCount = localStorage.getItem(POKEMON_COUNT);
      if (storedCount) {
        try {
          JSON.parse(storedCount);
        } catch (error) {
          console.error("Failed to parse stored Pokemon count", error);
          refetch();
        }
      } else {
        refetch();
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      localStorage.setItem(POKEMON_COUNT, JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching Pokemon count from API");
    }
  }, [isError]);

  return <PokemonContext.Provider value={{}}>{children}</PokemonContext.Provider>;
};
