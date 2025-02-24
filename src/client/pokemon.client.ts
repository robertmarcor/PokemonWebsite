import { useQueries, useQuery } from "@tanstack/react-query";
import { apiClient } from "./base";
import { Pokemon } from "../models";

/**
 * Example usage:
 *
 * const { data: bulba } = useGetPokemonById(1, (pokemon) => pokemon.name);
 * // bulba = "bulbasaur"
 *
 * const { data: bulba } = useGetPokemonById(1, (pokemon) => ({
 *   name: pokemon.name,
 *   id: pokemon.id,
 * }));
 * // bulba = { name: "bulbasaur", id: 1 }
 */

export function useGetPokemonById<T = Pokemon>(
  id: number,
  selector?: (pokemon: Pokemon) => T
) {
  return useQuery<Pokemon, Error, T>({
    queryKey: ["Pokemon", id],
    queryFn: async () => await apiClient.fetchByEndpoint<Pokemon>(`Pokemon/${id}`),
    select: selector as (pokemon: Pokemon) => T,
  });
}

export function useGetMultiplePokemonById<T = Pokemon>(
  ids: number[],
  selector?: (pokemon: Pokemon) => T
) {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["Pokemon", id],
      queryFn: async () => await apiClient.fetchByEndpoint<Pokemon>(`Pokemon/${id}`),
      select: selector ? (pokemon: Pokemon) => selector(pokemon) : undefined,
    })),
  });

  return {
    data: queries.map((q) => q.data).filter(Boolean),
    isLoading: queries.some((q) => q.isLoading),
    error: queries.find((q) => q.error)?.error || null,
  };
}
