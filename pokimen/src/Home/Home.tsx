import { useState, useEffect } from "react";

const getPokemonDetails = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Not Found");
  }
  return data;
};

const extractIdFromUrl = (url: string): number => {
  const parts = url.split("/").filter((part) => part !== "");
  const id = parts[parts.length - 1];
  return parseInt(id, 10);
};

type Generation = {
  abilities: [];
  id: number;
  main_region: { name: string; url: string } | null;
  moves: [];
  name: string;
  names: [];
  pokemon_species: [{ name: string; url: string }];
  types: [];
  version_groups: [];
};

type Pokemon = {
  name: string;
  url: string;
};

export default function Home() {
  const baseUrl = "https://pokeapi.co/api/v2";

  const [gen_Id, setGen_Id] = useState<string>("1");
  const [pokemonDetail, setPokemonDetails] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRegionData() {
      setLoading(true);
      const response = await fetch(`${baseUrl}/generation/${gen_Id}/`);
      const data: Generation = await response.json();
      const speciesUrls = data.pokemon_species.map((specie) => specie.url);
      const pokemonDetails = await Promise.all(speciesUrls.map((url) => getPokemonDetails(url)));
      console.log(pokemonDetail);
      setPokemonDetails(pokemonDetails);
      setLoading(false);
    }

    fetchRegionData();
  }, [gen_Id]); // Run when generation changes

  const handleGenerationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGen_Id(event.target.value);
  };

  return (
    <div>
      <h1>Pokémon from Generation {gen_Id}</h1>
      <select value={gen_Id} onChange={handleGenerationChange} className="p-1 border rounded text-black">
        <option value="1">Generation 1</option>
        <option value="2">Generation 2</option>
        <option value="3">Generation 3</option>
        <option value="4">Generation 4</option>
        <option value="5">Generation 5</option>
        <option value="6">Generation 6</option>
        <option value="7">Generation 7</option>
        <option value="8">Generation 8</option>
        <option value="9">Generation 9</option>
      </select>

      {loading ? <p>Loading...</p> : <ul></ul>}
      <ul>
        {pokemonDetail.map((pokemon: any) => (
          <li key={pokemon.id}>
            <h2>
              {pokemon.id} {pokemon.name}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
