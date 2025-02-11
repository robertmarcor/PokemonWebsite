import { useQueries, useQuery } from "@tanstack/react-query";
import { BaseClient } from "./base";
import { Pokemon, PokemonMove, PokemonSpecies } from "../models/Pokemon/pokemon";
import { Generation } from "../models/Pokemon/generation";

/* Get Generations */
export function GetGenerationById(id: string = "1") {
  return useQuery<Generation, Error>({
    queryKey: ["gen", id],
    queryFn: () => BaseClient<Generation>(`generation/${id}`),
  });
}
export function GetGenerationsByIds(ids: string[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ["gen", id],
      queryFn: () => BaseClient<Generation>(`generation/${id}`),
    })),
  });
}
/* Species by Id (Pokedex entry) */
export function GetSpecieById(id: string) {
  return useQuery<PokemonSpecies, Error, string>({
    queryKey: ["pokemon-species", id],
    queryFn: () => BaseClient<PokemonSpecies>(`pokemon-species/${id}`),
    select: (data) => data.color.name,
  });
}
/* Pokemon by Id */
export function GetPokemonById(id: string) {
  return useQuery<Pokemon, Error>({
    queryKey: ["pokemon", id],
    queryFn: () => BaseClient<Pokemon>(`pokemon/${id}`),
  });
}

export function GetPokemonsByIds(ids: string[]) {
  const pokemonQueries = useQueries({
    queries: ids.map((id) => ({
      refetchOnMount: false,
      queryKey: ["pokemon", id],
      queryFn: () => BaseClient<Pokemon>(`pokemon/${id}`),
    })),
  });

  const data = pokemonQueries.map((query) => query.data).filter((pokemon): pokemon is Pokemon => pokemon !== undefined);
  const isLoading = pokemonQueries.some((query) => query.isLoading);
  const isError = pokemonQueries.some((query) => query.isError);
  const errors = pokemonQueries.filter((query) => query.isError).map((query) => query.error);

  return { data, isLoading, isError, errors };
}
/* Pokemon by Name */
export function GetPokemonByName(name: string) {
  return useQuery<Pokemon, Error>({
    queryKey: ["pokemon", name],
    queryFn: () => BaseClient<Pokemon>(`pokemon/${name}`),
  });
}
export function GetPokemonsByNames(names: string[]) {
  return useQueries({
    queries: names.map((name) => ({
      queryKey: ["pokemon", name],
      queryFn: () => BaseClient<Pokemon>(`pokemon/${name}`),
    })),
  });
}

export function GetMoveById(id: string) {
  return useQuery<PokemonMove, Error>({
    queryKey: ["move", id],
    queryFn: () => BaseClient<PokemonMove>(`move/${id}`),
  });
}
export function GetMovesByIds(ids: string[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ["move", id],
      queryFn: () => BaseClient<PokemonMove>(`move/${id}`),
    })),
  });
}
