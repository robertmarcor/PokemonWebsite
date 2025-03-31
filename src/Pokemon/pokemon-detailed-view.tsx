import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client/base";
import { Link, useParams } from "react-router";
import PageWrapper from "../Components/page-wrapper";
import { EvolutionChain, Pokemon, PokemonSpecies } from "../models";
import PokemonTypeRelations from "./pokemon-type-relations-calc";
import PokemonEvolutionChain from "./pokemon-evolution-chain";
import PokemonMoves from "./pokemon-moves";
import FloatingNav from "../Components/ui/floating-nav";
import PokemonFormsChain from "./pokemon-form-chain";
import PokemonDetailCard from "./pokemon-detailed-view-card";
import { useEffect, useState, useRef } from "react";
import { UseGetPokemon } from "@/client/pokemon.client";
import CoolSpacer from "@/Components/ui/cool-spacer";
import PokemonAbilities from "./abilities";
import PokemonBaseStats from "./components/PokemonBaseStats";
import PokemonBasicInfo from "./components/PokemonBasicInfo";
import PokemonBreeding from "./components/PokemonBreeding";
import PokemonHeader from "./components/PokemonHeader";
import PokemonImages from "./components/PokemonImages";
import PokemonTraining from "./components/PokemonTraining";
import PokemonFormSwitcher from "./pokemon-form-switcher";
import PokemonSprites from "./pokemon-sprites";
function PokemonDetailedView() {
  const { slug } = useParams();
  const [pokemonIdentifier, setPokemonIdentifier] = useState<string>(slug || "1"); // The id parameter can be either a numeric ID or a name
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [species, setSpecies] = useState<PokemonSpecies>();

  const topRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const evoChainRef = useRef<HTMLDivElement>(null);
  const formsChainRef = useRef<HTMLDivElement>(null);
  const typeRelationsRef = useRef<HTMLDivElement>(null);
  const movesRef = useRef<HTMLDivElement>(null);
  const spritesRef = useRef<HTMLDivElement>(null);
  const sectionRefs = [
    { label: "Basic Info", ref: infoRef },
    { label: "Evolution Chain", ref: evoChainRef },
    { label: "Forms Chain", ref: formsChainRef },
    { label: "Type Relations", ref: typeRelationsRef },
    { label: "Moves", ref: movesRef },
    { label: "Sprites", ref: spritesRef },
  ];

  useEffect(() => {
    if (slug) {
      setPokemonIdentifier(slug);
    }
  }, [slug]);

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
  };

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
    <>
      <FloatingNav sectionRefs={sectionRefs} />
      <PageWrapper className="*:my-4 px-4">
        <PokemonDetailCard ref={infoRef} title="Basic Info">
          <PokemonFormSwitcher
            species={species}
            pokemon={pokemon}
            handleFormChange={handleFormChange}
          />
          <PokemonHeader pokemon={pokemon} />
          <CoolSpacer />
          {/* Images and Basic Info Section */}
          <section aria-labelledby="basic-info-section">
            <div className="grid grid-cols-2 gap-4 max-sm:gap-2 max-md:grid-cols-1">
              {isLoadingPokemon ? <p>Loading...</p> : <PokemonImages pokemon={pokemon} />}
              <PokemonBasicInfo pokemon={pokemon} species={species} />
            </div>
          </section>

          <CoolSpacer />

          <PokemonBaseStats pokemon={pokemon} />

          <CoolSpacer />

          <PokemonAbilities pokemon={pokemon} />

          <CoolSpacer />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PokemonTraining pokemon={pokemon} species={species} />
            <PokemonBreeding species={species} />
          </section>
        </PokemonDetailCard>

        {/* Evolution chain - only shown if the Pokemon has evolutions */}
        {hasEvolutions() && (
          <PokemonDetailCard ref={evoChainRef} title="Evolution Chain">
            <PokemonEvolutionChain evoChain={evoData!} />
          </PokemonDetailCard>
        )}

        {/* Form chain */}
        {species.varieties.length > 1 && (
          <PokemonDetailCard ref={formsChainRef} title="Forms">
            <PokemonFormsChain speciesData={species} />
          </PokemonDetailCard>
        )}

        {/* Type Relations */}
        <PokemonDetailCard ref={typeRelationsRef} title="Type Relations">
          <PokemonTypeRelations pokemon={pokemon} />
        </PokemonDetailCard>

        {/* Moves */}
        <PokemonDetailCard ref={movesRef} title="Moves">
          <PokemonMoves currentPokemonId={pokemonIdentifier} />
        </PokemonDetailCard>

        <PokemonDetailCard ref={spritesRef} title="Sprites">
          <PokemonSprites pokemon={pokemon} />
        </PokemonDetailCard>
      </PageWrapper>
    </>
  );
}

export default PokemonDetailedView;
