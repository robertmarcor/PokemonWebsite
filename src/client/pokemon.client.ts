import { useQueries, useQuery } from "@tanstack/react-query";
import { apiClient } from "./base";
import { NamedAPIResourceList, Pokemon, PokemonSpecies } from "../models";

export function useGetPokemonCount() {
  return useQuery<NamedAPIResourceList, Error, number>({
    enabled: false,
    queryKey: ["PokemonCount"],
    queryFn: async () => apiClient.fetchByUrl("https://pokeapi.co/api/v2/pokemon"),
    select: (data) => data.count,
  });
}

export function UseGetPokemon(identifier: string | number) {
  return useQuery<Pokemon>({
    queryKey: ["Pokemon", identifier],
    queryFn: async () => apiClient.fetchByEndpoint(`pokemon/${identifier}`),
  });
}

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
  enabled: boolean = true,
  selector?: (pokemon: Pokemon) => T
) {
  return useQuery<Pokemon, Error, T>({
    queryKey: ["Pokemon", id],
    queryFn: async () => await apiClient.fetchByEndpoint<Pokemon>(`pokemon/${id}`),
    select: selector as (pokemon: Pokemon) => T,
    enabled,
  });
}
export function useGetSpeciesById<T = PokemonSpecies>(
  id: number,
  selector?: (specie: PokemonSpecies) => T
) {
  return useQuery<PokemonSpecies, Error, T>({
    queryKey: ["Pokemon-Specie", id],
    queryFn: async () => await apiClient.fetchByEndpoint<PokemonSpecies>(`pokemon-species/${id}`),
    select: selector as (specie: PokemonSpecies) => T,
  });
}

export function useGetMultiplePokemonById<T = Pokemon>(
  ids: number[],
  enabled: boolean = true,
  selector?: (pokemon: Pokemon) => T
) {
  const queries = useQueries({
    queries: ids.map((id) => ({
      enabled,
      queryKey: ["Pokemon", id],
      queryFn: async () => await apiClient.fetchByEndpoint<Pokemon>(`Pokemon/${id}`),
      select: selector ? (pokemon: Pokemon) => selector(pokemon) : undefined,
    })),
  });

  return {
    data: queries.map((q) => q.data).filter(Boolean),
    isLoading: queries.some((q) => q.isLoading),
    error: queries.find((q) => q.error)?.error || null,
    refetch: () => queries.forEach((q) => q.refetch()),
  };
}
