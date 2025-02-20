import { useQuery } from "@tanstack/react-query";
import { Item } from "../models";
import { apiClient } from "./base";

export function useGetItemById<T = Item>(id: number, selector?: (item: Item) => T) {
  return useQuery<Item, Error, T>({
    queryKey: ["item", id],
    queryFn: async () => await apiClient.fetchByEndpoint(`item/${id}`),
    select: selector ?? ((item) => item as T),
  });
}
