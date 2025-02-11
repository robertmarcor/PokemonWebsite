import { pokeApiUrl } from "../data/consts";

export async function BaseClient<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${pokeApiUrl}${endpoint}`);
  console.log(`${pokeApiUrl}${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
