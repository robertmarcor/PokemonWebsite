import { Move } from "@/models";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./base";

export const UseGetMove = (identifier: number | string) => {
  return useQuery<Move>({
    queryKey: ["Move", identifier],
    queryFn: async () => apiClient.fetchByEndpoint(`move/${identifier}`),
  });
};
