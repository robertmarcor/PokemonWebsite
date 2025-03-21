import { useQuery } from "@tanstack/react-query";
import { EvolutionChain } from "../models";
import { apiClient } from "./base";

export const UseGetEvolutionChain = (url: string | undefined) => {
  return useQuery<EvolutionChain>({
    queryKey: ["Evolution-chain", url],
    queryFn: async () => apiClient.fetchByUrl(url!),
    enabled: !!url,
  });
};
