import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client/base";
import { Link, useParams, useNavigate } from "react-router";
import PageWrapper from "../Components/page-wrapper";
import { Pokemon, PokemonSpecies } from "../models";
import PokemonTypeRelations from "./pokemon-type-relations-calc";
import DetailedViewSection from "../Components/ui/pokemon-detailed-view-section";
import PokemonEvolutionChain from "./pokemon-evolution-chain";
import PokemonMoves from "./pokemon-moves";
import PokemonEggGroup from "./pokemon-egg-groups";
import FloatingNav from "../Components/ui/floating-nav";
import PokemonFormsChain from "./pokemon-form-chain";
import PokemonDetailCard from "./basic-info";
import { extractIdFromUrl } from "../utils/utils";
import { useEffect, useState, useRef } from "react";
import PokemonDetailsLoadingSkeleton from "./loading-skeleton";

function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const pokemonId = parseInt(id || "1");
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [species, setSpecies] = useState<PokemonSpecies>();
  // Initialize with empty string, will be set after first Pokemon fetch
  const [currentFormUrl, setCurrentFormUrl] = useState<string>("");
  const navigate = useNavigate();

  const { data: pokemonData, isLoading: isLoadingPokemon } = useQuery<Pokemon>({
    queryKey: ["PokemonDetail", pokemonId, currentFormUrl],
    queryFn: async () => {
      if (currentFormUrl) {
        return apiClient.fetchByUrl<Pokemon>(currentFormUrl);
      }
      return apiClient.fetchByEndpoint<Pokemon>(`pokemon/${pokemonId}`);
    },
  });

  // Use a ref to track if we've initialized the form URL
  const initializedRef = useRef(false);

  useEffect(() => {
    if (pokemonData) {
      setPokemon(pokemonData);

      // If this is the initial load, set the current form URL
      if (!initializedRef.current) {
        initializedRef.current = true;
        setCurrentFormUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      }
    }
  }, [pokemonData, pokemonId]);

  const { data: speciesData, isLoading: isLoadingSpecies } = useQuery<PokemonSpecies>({
    queryKey: ["PokemonSpecies", pokemonId, currentFormUrl],
    queryFn: async () => {
      return apiClient.fetchByUrl<PokemonSpecies>(pokemon!.species.url);
    },
    enabled: !!pokemon,
  });

  useEffect(() => {
    if (speciesData) setSpecies(speciesData);
  }, [speciesData]);

  // Handle form change without page reload
  const handleFormChange = (pokemonUrl: string) => {
    // Update URL for bookmarking/sharing without reloading
    const formId = extractIdFromUrl(pokemonUrl);
    navigate(`/pokedex/${formId}`, { replace: true });

    // Set the form URL to trigger a new Pokemon data fetch
    setCurrentFormUrl(pokemonUrl);
  };

  // Loading state with skeleton UI
  if (isLoadingPokemon || isLoadingSpecies) {
    return (
      <PageWrapper className="*:my-4">
        <PokemonDetailsLoadingSkeleton />
      </PageWrapper>
    );
  }

  // Error state
  if (!pokemon || !species) {
    return (
      <PageWrapper>
        <div className="text-center">
          <h1 className="font-bold text-2xl">Pokémon Not Found</h1>
          <Link to="/pokedex" className="text-blue-500 hover:underline">
            Return to Pokédex
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const hasEvolutions = () => {
    if (!species) return false;

    // If it evolves from another Pokémon, it's part of an evolution chain
    if (species.evolves_from_species) return true;
    return false;
  };

  return (
    <PageWrapper className="*:my-4">
      {/* Back Button */}
      <Link
        id="top"
        to="/pokedex"
        className="flex items-center text-4xl hover:underline hover:text-sky-500 transition-colors">
        {"< Back to Pokédex"}
      </Link>

      {/* Floating Nav */}
      <FloatingNav />

      {/* Pokemon Header */}
      <div className="grid w-full">
        <DetailedViewSection id="info" heading={"Forms"}>
          <div className="flex justify-evenly translate-y-1">
            {species.varieties.map((form) => {
              const isSelected = pokemon.name === form.pokemon.name;
              return (
                <button
                  key={form.pokemon.name}
                  className={`border-t p-1.5 m-1 w-full border-x-2 rounded-t-lg capitalize transition-all duration-200 ${
                    isSelected
                      ? "font-bold bg-gradient-to-b from-transparent to-blue-500/20 border-blue-500/50 border-b-2"
                      : "hover:bg-black/5"
                  }`}
                  onClick={() => handleFormChange(form.pokemon.url)}>
                  <div className="flex items-center justify-center gap-1">
                    {isSelected && <span className="text-blue-400 text-sm">•</span>}
                    <span>{form.pokemon.name.replace(/-/g, " ")}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <PokemonDetailCard species={species} pokemon={pokemon} />
        </DetailedViewSection>
      </div>

      {/* Evolution chain - only shown if the Pokemon has evolutions */}
      {hasEvolutions() && (
        <DetailedViewSection id="evo-chain" heading={"Evolution Chain"}>
          <PokemonEvolutionChain speciesData={species} />
        </DetailedViewSection>
      )}

      {/* Form chain */}
      {species.varieties.length > 1 && (
        <DetailedViewSection id="evo-chain" heading={"Forms Chain"}>
          <PokemonFormsChain speciesData={species} />
        </DetailedViewSection>
      )}

      {/* Type Relations */}
      <DetailedViewSection id="type-relations" heading={"Type relations"}>
        <PokemonTypeRelations pokemon={pokemon} />
      </DetailedViewSection>

      {/* Moves */}
      <DetailedViewSection id="moves" heading={"Moves"}>
        <PokemonMoves />
      </DetailedViewSection>

      <DetailedViewSection id="egg-group" heading="Egg Groups" img="/egg.png">
        <PokemonEggGroup species={species} />
      </DetailedViewSection>
    </PageWrapper>
  );
}

export default PokemonDetailPage;
