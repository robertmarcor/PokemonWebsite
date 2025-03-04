import { pokeApiUrl } from "../data/consts";

export class BaseClient {
  protected async fetch<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }
}

export class ApiClient extends BaseClient {
  async fetchByEndpoint<T>(endpoint: string): Promise<T> {
    console.log(`Fetching: ${pokeApiUrl}${endpoint}`);
    return this.fetch<T>(`${pokeApiUrl}${endpoint}`);
  }
  async fetchByUrl<T>(url: string) {
    console.log(`Fetching: ${url}`);

    return this.fetch<T>(url);
  }
}
export const apiClient = new ApiClient();
