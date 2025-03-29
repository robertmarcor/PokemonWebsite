import { useQuery } from "@tanstack/react-query";
import { Item } from "../models";
import { apiClient } from "./base";

export function UseGetItem(identifier: string | number) {
  return useQuery<Item>({
    queryKey: ["Item", identifier],
    queryFn: async () => await apiClient.fetchByEndpoint(`item/${identifier}`),
  });
}
