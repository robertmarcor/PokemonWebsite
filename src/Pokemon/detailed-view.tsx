import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client/base";
import { Link, useParams } from "react-router-dom";
import PageWrapper from "../Components/page-wrapper";
import { EvolutionChain, Pokemon, PokemonSpecies } from "../models";
import PokemonTypeRelations from "./pokemon-type-relations-calc";
import DetailedViewSection from "../Components/ui/pokemon-detailed-view-section";
import PokemonEvolutionChain from "./pokemon-evolution-chain";
import PokemonMoves from "./pokemon-moves";
import FloatingNav from "../Components/ui/floating-nav";
import PokemonFormsChain from "./pokemon-form-chain";
import PokemonDetailCard from "./detailed-view-card";
import { useEffect, useState, useRef } from "react";
import PokemonDetailsLoadingSkeleton from "./loading-skeleton";
import { UseGetPokemon } from "@/client/pokemon.client";

function PokemonDetailedView() {
  const { id } = useParams();
  const [pokemonIdentifier, setPokemonIdentifier] = useState<string>(id || "1"); // The id parameter can be either a numeric ID or a name
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [species, setSpecies] = useState<PokemonSpecies>();

  // Create refs for each section
  const topRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const evoChainRef = useRef<HTMLDivElement>(null);
  const formsChainRef = useRef<HTMLDivElement>(null);
  const typeRelationsRef = useRef<HTMLDivElement>(null);
  const movesRef = useRef<HTMLDivElement>(null);
  const eggGroupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (id) {
      setPokemonIdentifier(id);
    }
  }, [id]);

  const sectionRefs = {
    topRef,
    infoRef,
    evoChainRef,
    formsChainRef,
    typeRelationsRef,
    movesRef,
    eggGroupRef,
  };

  // Use the UseGetPokemon hook with the pokemonIdentifier state
  const { data: pokemonData, isLoading: isLoadingPokemon } = UseGetPokemon(pokemonIdentifier);

  useEffect(() => {
    if (pokemonData) setPokemon(pokemonData);
  }, [pokemonData]);

  const { data: speciesData, isLoading: isLoadingSpecies } = useQuery<PokemonSpecies>({
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

  const handleFormChange = (pokemonName: string) => {
    setPokemonIdentifier(pokemonName);
    // No need to manually refetch, the query will automatically refetch when pokemonIdentifier changes
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
          <h1 className="text-2xl font-bold">Pokémon Not Found</h1>
          <Link to="/pokemon" className="text-blue-500 hover:underline">
            Return to Pokédex
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const hasEvolutions = () => {
    if (!evoData) return false;
    if (species.evolves_from_species || evoData.chain.evolves_to.length !== 0) return true;
    return false;
  };

  return (
    <PageWrapper className="*:my-4">
      {/* Back Button */}
      <div ref={topRef}>
        <Link
          to="/pokemon"
          className="flex items-center text-4xl transition-colors hover:underline hover:text-sky-500">
          {"< Back to Pokédex"}
        </Link>
      </div>

      {/* Floating Nav */}
      <FloatingNav sectionRefs={sectionRefs} />

      {/* Pokemon Header */}
      <div className="grid w-full">
        <DetailedViewSection ref={infoRef} heading={"Forms"}>
          <div className="flex translate-y-1 justify-evenly">
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
                  onClick={() => handleFormChange(form.pokemon.name)}>
                  <div className="flex items-center justify-center gap-1">
                    {isSelected && <span className="text-sm text-blue-400">•</span>}
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
        <DetailedViewSection ref={evoChainRef} heading={"Evolution Chain"}>
          <PokemonEvolutionChain evoChain={evoData!} />
        </DetailedViewSection>
      )}

      {/* Form chain */}
      {species.varieties.length > 1 && (
        <DetailedViewSection ref={formsChainRef} heading={"Forms Chain"}>
          <PokemonFormsChain speciesData={species} />
        </DetailedViewSection>
      )}

      {/* Type Relations */}
      <DetailedViewSection ref={typeRelationsRef} heading={"Type relations"}>
        <PokemonTypeRelations pokemon={pokemon} />
      </DetailedViewSection>

      {/* Moves */}
      <DetailedViewSection ref={movesRef} heading={"Moves"}>
        <PokemonMoves currentPokemonId={pokemonIdentifier} />
      </DetailedViewSection>

      <DetailedViewSection ref={eggGroupRef} heading="Egg Groups" img="/egg.png">
        {/* <PokemonEggGroup species={species} /> */}
        <p>Comming soon</p>
      </DetailedViewSection>
    </PageWrapper>
  );
}

export default PokemonDetailedView;
