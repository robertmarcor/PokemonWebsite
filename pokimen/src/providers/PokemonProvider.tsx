import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { BaseClient } from "../client/base";
import { NamedAPIResourceList } from "../models/resources";
import { GetPokemonsByIds } from "../client/pokemon";
import { extractIdFromUrl } from "../utils/utils";
import { PokemonContext } from "../contexts/PokemonContext";

export function PokemonProvider({ children }: { children: ReactNode }) {
  const { data: apiData } = useQuery<NamedAPIResourceList, Error>({
    refetchOnMount: false,
    queryKey: ["pokemon-API"],
    queryFn: () => BaseClient("pokemon?limit=100000"),
  });

  const pokemonIds = apiData?.results.map((result) => extractIdFromUrl(result.url)) || [];

  const {
    data: pokemonData,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
    errors: pokemonError,
  } = GetPokemonsByIds(pokemonIds);

  const value = {
    allPokemonData: pokemonData || [],
    isLoading: isPokemonLoading,
    isError: isPokemonError,
    errors: pokemonError || [],
  };

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
}
