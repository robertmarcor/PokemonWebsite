import { useQuery } from "@tanstack/react-query";
import { Generation } from "../models";
import { apiClient } from "./base";

export function useGetGenerationById<T>(id: number, selector?: (generation: Generation) => T) {
  return useQuery<Generation, Error, T>({
    queryKey: ["Generation", id],
    queryFn: async () => await apiClient.fetchByEndpoint(`Generation/${id}`),
    select: selector ?? ((generation) => generation as T),
  });
}
