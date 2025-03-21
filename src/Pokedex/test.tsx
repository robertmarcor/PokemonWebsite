import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiClient } from "../client/base";
import { Pokemon, PokemonSpecies, EvolutionChain } from "../models";
import { useParams } from "react-router";
import { extractIdFromUrl } from "../utils/utils";

function TestPokemon() {
  const { id } = useParams();
  let pokemonId = parseInt(id || "1");
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [species, setSpecies] = useState<PokemonSpecies>();

  const { data: pokemonData, refetch } = useQuery<Pokemon>({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => apiClient.fetchByEndpoint(`pokemon/${pokemonId}`),
  });

  useEffect(() => {
    if (pokemonData) setPokemon(pokemonData);
  }, [pokemonData]);

  const { data: speciesData } = useQuery<PokemonSpecies>({
    queryKey: ["pokemon-species", pokemon?.species?.url],
    queryFn: () => apiClient.fetchByUrl(pokemon?.species?.url || ""),
    enabled: !!pokemon?.species?.url,
  });

  useEffect(() => {
    if (speciesData) setSpecies(speciesData);
  }, [speciesData]);

  const { data: evoData } = useQuery<EvolutionChain>({
    queryKey: ["evolution-chain", species?.evolution_chain?.url],
    queryFn: () => apiClient.fetchByUrl(species?.evolution_chain?.url || ""),
    enabled: !!species?.evolution_chain?.url,
  });

  const handleFormChange = (url: string) => {
    pokemonId = parseInt(extractIdFromUrl(url));
    refetch();
  };

  return (
    <div className="flex flex-col justify-center items-center capitalize h-screen">
      <div className="grid">
        {species?.varieties.map((form) => (
          <button onClick={() => handleFormChange(form.pokemon.url)}>{form.pokemon.url}</button>
        ))}
      </div>
      <p>{pokemon?.name}</p>
      <p>{evoData?.id}</p>
    </div>
  );
}

export default TestPokemon;
