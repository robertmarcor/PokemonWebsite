import { useQuery } from "@tanstack/react-query";
import { PokemonSpecies } from "../models";
import { apiClient } from "./base";

export const UseGetSpeciesByUrl = (url: string | undefined) => {
  return useQuery<PokemonSpecies>({
    queryKey: ["Pokemon-Species", url],
    queryFn: async () => apiClient.fetchByUrl<PokemonSpecies>(url!),
    enabled: !!url,
  });
};
