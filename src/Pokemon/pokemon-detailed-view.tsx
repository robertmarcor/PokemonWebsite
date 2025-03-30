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
import TypeBadge from "@/Components/ui/type-badge";
import { cn } from "@/lib/utils";
import PokemonAbilities from "./abilities";
import PokemonBaseStats from "./components/PokemonBaseStats";
import PokemonBasicInfo from "./components/PokemonBasicInfo";
import PokemonBreeding from "./components/PokemonBreeding";
import PokemonHeader from "./components/PokemonHeader";
import PokemonImages from "./components/PokemonImages";
import PokemonTraining from "./components/PokemonTraining";
import H1 from "@/Components/layouts/h1-header";
import PokemonFormSwitcher from "./pokemon-form-switcher";
import Portal from "@/Portal";
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

  const sectionRefs = [
    { label: "Basic Info", ref: infoRef },
    { label: "Evolution Chain", ref: evoChainRef },
    { label: "Forms Chain", ref: formsChainRef },
    { label: "Type Relations", ref: typeRelationsRef },
    { label: "Moves", ref: movesRef },
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
        <PokemonDetailCard species={species} pokemon={pokemon} ref={infoRef}>
          <PokemonFormSwitcher
            species={species}
            pokemon={pokemon}
            handleFormChange={handleFormChange}
          />
          <PokemonHeader pokemon={pokemon} />
          <CoolSpacer />
          {/* Images and Basic Info Section */}
          <section aria-labelledby="basic-info-section">
            <h2 id="basic-info-section" className="sr-only">
              Basic Information
            </h2>
            <div className="grid grid-cols-2 gap-4 max-sm:gap-2 max-md:grid-cols-1">
              {isLoadingPokemon ? <p>Loading...</p> : <PokemonImages pokemon={pokemon} />}
              <PokemonBasicInfo pokemon={pokemon} species={species} />
            </div>
          </section>

          <CoolSpacer />

          <section aria-labelledby="stats-section">
            <h2 id="stats-section" className="sr-only">
              Base Stats
            </h2>
            <PokemonBaseStats pokemon={pokemon} />
          </section>

          <CoolSpacer />

          <section aria-labelledby="abilities-section" className="p-4 rounded-lg bg-foreground/5">
            <h2 id="abilities-section" className="sr-only">
              Abilities
            </h2>
            <PokemonAbilities pokemon={pokemon} />
          </section>

          <CoolSpacer />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section aria-labelledby="training-section" className="p-4 rounded-lg bg-foreground/5">
              <h2 id="training-section" className="sr-only">
                Training
              </h2>
              <PokemonTraining pokemon={pokemon} species={species} />
            </section>

            <section aria-labelledby="breeding-section" className="p-4 rounded-lg bg-foreground/5">
              <h2 id="breeding-section" className="sr-only">
                Breeding
              </h2>
              <PokemonBreeding species={species} />
            </section>
          </div>
        </PokemonDetailCard>

        {/* Evolution chain - only shown if the Pokemon has evolutions */}
        {hasEvolutions() && (
          <PokemonDetailCard
            species={species}
            pokemon={pokemon}
            ref={evoChainRef}
            title="Evolution Chain">
            <PokemonEvolutionChain evoChain={evoData!} />
          </PokemonDetailCard>
        )}

        {/* Form chain */}
        {species.varieties.length > 1 && (
          <PokemonDetailCard species={species} pokemon={pokemon} ref={formsChainRef} title="Forms">
            <PokemonFormsChain speciesData={species} />
          </PokemonDetailCard>
        )}

        {/* Type Relations */}
        <PokemonDetailCard
          species={species}
          pokemon={pokemon}
          ref={typeRelationsRef}
          title="Type Relations">
          <PokemonTypeRelations pokemon={pokemon} />
        </PokemonDetailCard>

        {/* Moves */}
        <PokemonDetailCard species={species} pokemon={pokemon} ref={movesRef} title="Moves">
          <PokemonMoves currentPokemonId={pokemonIdentifier} />
        </PokemonDetailCard>
      </PageWrapper>
    </>
  );
}

export default PokemonDetailedView;
