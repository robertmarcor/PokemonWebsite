import { useState, useEffect } from "react";
const baseUrl = "https://pokeapi.co/api/v2";

const getPokemonDetails = async (id: string) => {
  const response = await fetch(`${baseUrl}/pokemon/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Not Found");
  }
  return data;
};

const extractIdFromUrl = (url: string) => {
  const parts = url.split("/").filter((part) => part !== "");
  const id = parts[parts.length - 1];
  return id;
};

type Generation = {
  abilities: [];
  id: number;
  main_region: { name: string; url: string } | null;
  moves: [];
  name: string;
  names: [];
  pokemon_species: [{ name: string; url: string }];
  types: [{ type: [name: string] }];
  version_groups: [];
};

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    back_default: string;
    front_default: string;
    versions: [];
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }>;
  types: Array<{
    slot: number;
    type: { name: string; url: string };
  }>;
  weight: number;
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
};

export default function Home() {
  const [gen_Id, setGen_Id] = useState<string>("1");
  const [pokemonDetail, setPokemonDetails] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRegionData() {
      setLoading(true);
      const response = await fetch(`${baseUrl}/generation/${gen_Id}/`);
      const data: Generation = await response.json();
      const speciesUrls = data.pokemon_species.map((specie) => extractIdFromUrl(specie.url));
      speciesUrls.sort((a: string, b: string) => parseInt(a, 10) - parseInt(b, 10));
      const pokemonDetails = await Promise.all(speciesUrls.map((url) => getPokemonDetails(url)));
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
        {pokemonDetail.map((pokemon) => (
          <li key={pokemon.id} className="flex items-center gap-2">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`}</h2>
            <p>Weight: {pokemon.weight}</p>
            <p>Types:</p>
            <div className="flex gap-2">
              {pokemon.types.map((i) => (
                <div className="border rounded-md px-1">{i.type.name}</div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
