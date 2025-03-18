import { useQueries, useQuery } from "@tanstack/react-query";
import { Generation } from "../models";
import { apiClient } from "./base";

export function useGetGenerationById<T = Generation>(
  id: number,
  enabled: boolean = true,
  selector?: (generation: Generation) => T
) {
  return useQuery<Generation, Error, T>({
    queryKey: ["Generation", id],
    queryFn: async () => await apiClient.fetchByEndpoint(`Generation/${id}`),
    select: selector ?? ((generation) => generation as T),
    enabled,
  });
}

export function useGetMultipleGenerationById<T = Generation>(
  ids: number[],
  selector?: (generation: Generation) => T
) {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["Generation", id],
      queryFn: async () => await apiClient.fetchByEndpoint<Generation>(`Generation/${id}`),
      select: selector ? (generation: Generation) => selector(generation) : undefined,
    })),
  });

  return {
    data: queries.map((q) => q.data).filter(Boolean),
    isLoading: queries.some((q) => q.isLoading),
    error: queries.find((q) => q.error)?.error || null,
  };
}
