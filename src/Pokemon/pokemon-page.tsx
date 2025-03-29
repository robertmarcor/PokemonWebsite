import { useState, useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { apiClient } from "../client/base";
import PageWrapper from "../Components/page-wrapper";
import { Pokemon } from "../models";
import { Search } from "lucide-react";
import PokedexPageSkeleton from "./components/page-skeleton";
import { allPokemon } from "../data/pokemonList";
import { cn } from "../lib/utils";
import { RawGeneration } from "../data/generation";
import PokemonViewPaginationControls from "./components/pokemon-view-pagination-controls";
import PokemonListCard from "./pokemon-view-list-card";
import PokemonFilterControls from "./components/pokemon-filter-controls";
import { usePokemonContext } from "../PokemonServiceContext";
import H1 from "@/Components/layouts/page-header";

function PokemonPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenerations, setSelectedGenerations] = useState<RawGeneration[]>([]);
  const pokemonPerPage = 20;
  const { isUltraWide } = usePokemonContext();

  // Calculate total Pokemon count from selected generations
  const totalSelectedPokemon = selectedGenerations.reduce(
    (total, gen) => total + gen.specie_amount,
    0
  );

  // Filter Pokemon based on name and generations
  const filtered = allPokemon.results.filter((pokemon) => {
    // Filter by name
    const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by generations (if any selected)
    const generationMatch =
      selectedGenerations.length === 0
        ? true
        : selectedGenerations.some((gen) => {
            const pokemonId = parseInt(pokemon.url.split("/")[6]);
            return pokemonId >= gen.range[0] && pokemonId <= gen.range[1];
          });

    return nameMatch && generationMatch;
  });

  // Calculate pagination variables
  const totalPages = Math.ceil(filtered.length / pokemonPerPage);
  const startIndex = (currentPage - 1) * pokemonPerPage;
  const endIndex = startIndex + pokemonPerPage;

  const paginatedPokemons = filtered.slice(startIndex, endIndex);

  // Update current page if it's out of bounds after filtering
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filtered.length, totalPages, currentPage]);

  // Fetch details for the current page of Pokemon
  const pokemonQueries = useQueries({
    queries: paginatedPokemons.map((pokemon) => ({
      queryKey: ["Pokemon", pokemon.name],
      queryFn: async () => {
        return apiClient.fetchByUrl<Pokemon>(pokemon.url);
      },
    })),
  });

  const isLoading = pokemonQueries.some((query) => query.isLoading);
  const pokemonData = pokemonQueries
    .map((query) => query.data)
    .filter((data): data is Pokemon => Boolean(data));

  // Apply search term filtering to include types
  const filteredPokemon = pokemonData.filter(
    (pokemon) =>
      // If no search term, include all
      !searchTerm ||
      // Match by name
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // Match by type
      pokemon.types?.some((type) => type.type.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleGenerationToggle = (generation: RawGeneration) => {
    setSelectedGenerations((prev) => {
      // Check if this generation is already selected
      const isSelected = prev.some((gen) => gen.id === generation.id);

      if (isSelected) {
        // Remove it if already selected
        return prev.filter((gen) => gen.id !== generation.id);
      } else {
        // Add it if not selected
        return [...prev, generation];
      }
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedGenerations([]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <PageWrapper className={cn(isUltraWide && "min-w-full")}>
      <H1 text="Pokémon" />

      {/* Search and Filter Section */}
      <div className="flex flex-col w-full max-w-xl gap-4 mx-auto mb-8">
        {/* Search Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="z-20 w-5 h-5 text-black" />
          </div>
          <input
            type="text"
            placeholder="Search Pokémon..."
            className={cn(
              "relative placeholder:dark:text-neutral-300",
              "dark:bg-gradient-to-r dark:from-primary dark:to-black border-primary",
              "shadow-lg py-3 pr-4 pl-10 border-2 rounded-lg w-full",
              "focus:outline-none focus:border-primary-foreground"
            )}
            value={searchTerm}
            onChange={handleSearch}
          />

          <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-3 pointer-events-none">
            <span className="text-xs font-semibold text-primary">
              {(() => {
                // No search, no generations selected: show total count
                if (!searchTerm && selectedGenerations.length === 0) {
                  return `${allPokemon.results.length} results`;
                }
                // Generations selected, no search: show total from selected generations
                else if (!searchTerm && selectedGenerations.length > 0) {
                  return `${totalSelectedPokemon} Pokémon (${selectedGenerations.length} Gens)`;
                }
                // Search term entered: show filtered results count
                else {
                  return `${filtered.length} results`;
                }
              })()}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <PokemonFilterControls
        selectedGenerations={selectedGenerations}
        onGenerationToggle={handleGenerationToggle}
        onClearFilters={clearFilters}
        hasFilters={selectedGenerations.length > 0 || searchTerm.length > 0}
      />

      {/* Loading State */}
      {isLoading && <PokedexPageSkeleton />}

      {/* Pokemon Grid */}
      {!isLoading && (
        <section className="w-full">
          {/* Pokemon List Card */}
          <PokemonListCard
            pokemon={filteredPokemon}
            className={cn(
              "grid gap-4 mb-8 grid-cols-1 w-full",
              isUltraWide ? "grid-cols-40" : "grid-cols-1 md:grid-cols-3 lg:grid-cols-5"
            )}
          />

          {/* Pagination Controls */}
          <PokemonViewPaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            goToFirstPage={goToFirstPage}
            goToPrevPage={goToPrevPage}
            goToNextPage={goToNextPage}
            goToLastPage={goToLastPage}
          />
        </section>
      )}
    </PageWrapper>
  );
}

export default PokemonPage;
