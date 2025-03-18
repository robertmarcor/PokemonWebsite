import { useQuery } from "@tanstack/react-query";
import { EggGroup } from "../models";
import { apiClient } from "./base";

export const UseGetEggGroupByName = (name: string) => {
  return useQuery<EggGroup>({
    queryKey: ["egg-group", name],
    queryFn: async () => apiClient.fetchByEndpoint<EggGroup>(`egg-group/${name}`),
  });
};
