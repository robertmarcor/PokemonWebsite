import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client/base";
import { Link, useParams } from "react-router";
import PageWrapper from "../Components/page-wrapper";
import { Pokemon, PokemonSpecies } from "../models";
import { ChevronLeft } from "lucide-react";
import PokemonTypeRelations from "./pokemon-type-relations-calc";
import DetailedViewSection from "../Components/ui/pokemon-detailed-view-section";
import PokemonEvolutionChain from "./pokemon-evolution-chain";
import { getCardGradient, getStatColor, getTypeColor } from "../data/colors";
import PokemonAbilities from "./pokemon-abilities";
import PokemonMoves from "./pokemon-moves";
import PokemonEggGroup from "./pokemon-egg-groups";
import FloatingNav from "../Components/ui/floating-nav";
import PokemonFormsChain from "./pokemon-form-chain";

function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const pokemonId = parseInt(id || "1");

  const { data: pokemon, isLoading: isLoadingPokemon } = useQuery<Pokemon>({
    queryKey: ["PokemonDetail", pokemonId],
    queryFn: async () => {
      return apiClient.fetchByEndpoint<Pokemon>(`pokemon/${pokemonId}`);
    },
  });

  const { data: species, isLoading: isLoadingSpecies } = useQuery<PokemonSpecies>({
    queryKey: ["PokemonSpecies", pokemonId],
    queryFn: async () => {
      return apiClient.fetchByEndpoint<PokemonSpecies>(`pokemon-species/${pokemonId}`);
    },
    enabled: !!pokemon,
  });

  // Get English flavor text and clean it up
  const getEnglishFlavorText = () => {
    if (!species) return "";

    const englishEntry = species.flavor_text_entries.find((entry) => entry.language.name === "en");

    if (!englishEntry?.flavor_text) return "missing flavour text";

    // Clean up the flavor text:
    // 1. Replace special characters and control characters with spaces
    // 2. Replace multiple spaces with a single space
    // 3. Fix common issues like missing spaces between words
    return englishEntry.flavor_text
      .replace(/[\n\f\r\t\v]/g, " ") // Replace newlines and other control chars with spaces
      .trim(); // Remove leading/trailing whitespace
  };

  // Check if the Pokemon has evolutions (either evolves from or can evolve into other Pokemon)
  const hasEvolutions = () => {
    if (!species) return false;

    // If it evolves from another Pokemon
    if (species.evolves_from_species) return true;

    // For Pokemon that are the first in their evolution chain, we need to check if they can evolve
    // We'll use a simple heuristic: most Pokemon that can evolve are not legendary or mythical
    if (!species.is_legendary && !species.is_mythical) {
      // Some Pokemon like Eevee, Pikachu, etc. are base forms that can evolve
      // This is a simplified check - in a real app, you might want to fetch the evolution chain data
      return true;
    }

    return false;
  };

  // Loading state
  if (isLoadingPokemon || isLoadingSpecies) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center h-64">
          <div className="border-t-2 border-b-2 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      </PageWrapper>
    );
  }

  // Error state
  if (!pokemon || !species) {
    return (
      <PageWrapper>
        <div className="text-center">
          <h1 className="mb-4 font-bold text-2xl">Pokémon Not Found</h1>
          <Link to="/pokedex" className="text-blue-500 hover:underline">
            Return to Pokédex
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Back Button */}
      <Link
        id="top"
        to="/pokedex"
        className="flex items-center gap-1 bg-black/20 hover:bg-black/30 mb-6 px-4 py-2 rounded-full w-fit text-blue-500 hover:text-blue-400 transition-colors duration-200">
        <ChevronLeft size={16} />
        Back to Pokédex
      </Link>

      {/* Floating Nav */}
      <FloatingNav />
      {/* Pokemon Header */}
      <div className={`${getCardGradient(pokemon.types[0].type.name)} mb-8 p-6 rounded-lg`}>
        <div className="grid">
          {/* Pokemon Info */}
          <div className="">
            <div className="flex justify-between items-center mb-4">
              <h1 className="drop-shadow-md font-bold text-white text-4xl capitalize">
                {pokemon.name}
              </h1>
              <span className="bg-white/20 shadow-md px-3 py-1 rounded-full font-bold text-xl">
                #{pokemon.id}
              </span>
            </div>

            {/* Pokemon Image */}
            <div className="relative flex justify-evenly items-center gap-2">
              <div className="relative">
                <img
                  src={
                    pokemon.sprites.front_default ||
                    pokemon.sprites.other?.["official-artwork"].front_default ||
                    "/pika.png"
                  }
                  alt={pokemon.name}
                  className="z-10 w-64 h-64 object-contain relative"
                />
                {/* Pseudo-element container */}
                <div className="absolute inset-0 bg-white/50 opacity-50 blur-xl m-auto rounded-full size-32"></div>
              </div>

              <div className="relative rounded-lg">
                <img
                  src={pokemon.sprites.front_shiny || pokemon.sprites.front_default || "/pika.png"}
                  alt={pokemon.name}
                  className="z-10 w-64 h-64 object-contain relative"
                />
                {/* Pseudo-element container */}
                <div className="absolute inset-0 bg-white/50 opacity-50 blur-xl m-auto rounded-full size-32"></div>
              </div>
            </div>

            {/* Types */}
            <div className="mb-4">
              <h2 className="mb-2 font-semibold text-white/90 text-lg text-left">Types</h2>
              <div className="flex gap-2">
                {pokemon.types.map((typeInfo) => (
                  <span
                    key={typeInfo.type.name}
                    className={`${getTypeColor(
                      typeInfo.type.name
                    )} px-3 py-1 rounded-2xl text-white font-bold shadow-md`}>
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div className="gap-4 grid grid-cols-2 mb-4">
              <div className="bg-black/20 p-3 rounded-lg">
                <h2 className="mb-2 font-semibold text-white/90 text-lg">Height</h2>
                <p className="font-medium text-white">{(pokemon.height / 10).toFixed(1)} m</p>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <h2 className="mb-2 font-semibold text-white/90 text-lg">Weight</h2>
                <p className="font-medium text-white">{(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <h2 className="mb-2 font-semibold text-white/90 text-lg">Generation</h2>
                <p className="font-medium text-white">
                  {species.generation.name.replace("generation-", "").toUpperCase()}
                </p>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <h2 className="mb-2 font-semibold text-white/90 text-lg">Habitat</h2>
                <p className="font-medium text-white capitalize">
                  {species.habitat?.name || "Unknown"}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-black/20 p-4 rounded-lg">
              <h2 className="mb-2 font-semibold text-white/90 text-lg">Description</h2>
              <p className="font-pixel text-white/80">{getEnglishFlavorText()}</p>
            </div>
          </div>
        </div>

        {/* Base stats */}
        <div className="bg-black/20 my-4 p-4 rounded-lg">
          <h2 className="mb-2 font-semibold text-white/90 text-xl">Base Stats</h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-white/90 capitalize">
                    {stat.stat.name.replace("-", " ")}
                  </span>
                  <span className="font-bold text-white">{stat.base_stat}</span>
                </div>
                <div className="bg-black/20 w-full h-2.5 overflow-hidden">
                  <div
                    className={`${getStatColor(stat.stat.name)} h-2.5`}
                    style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Abilities */}
      <DetailedViewSection id="abilities" heading={"Abilities"}>
        <PokemonAbilities pokemon={pokemon} />
      </DetailedViewSection>

      {/* Evolution chain - only shown if the Pokemon has evolutions */}
      {hasEvolutions() && (
        <DetailedViewSection id="evo-chain" heading={"Evolution Chain"}>
          <PokemonEvolutionChain speciesData={species} />
        </DetailedViewSection>
      )}

      {/* Form chain */}
      {species.varieties.length > 1 ? (
        <DetailedViewSection id="form-chain" heading={"Forms Chain"}>
          <PokemonFormsChain speciesData={species} />
        </DetailedViewSection>
      ) : (
        <div></div>
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
