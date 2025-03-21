import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client/base";
import { Link } from "react-router-dom";
import PageWrapper from "../Components/page-wrapper";
import { NamedAPIResourceList, Pokemon, PokemonSpecies } from "../models";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getCardGradient } from "../data/colors";
import PokedexPageSkeleton from "./components/page-skeleton";
import TypeBadge from "../Components/ui/type-badge";

interface PokemonWithGeneration extends Partial<Pokemon> {
  generation?: string;
  sprite?: string | null;
}

function PokedexPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonWithGeneration[]>([]);
  const pokemonPerPage = 20;

  // Fetch the list of all Pokemon
  const { data: pokemonList, isLoading: isLoadingList } = useQuery<NamedAPIResourceList>({
    queryKey: ["PokemonList"],
    queryFn: async () => {
      return apiClient.fetchByUrl("https://pokeapi.co/api/v2/pokemon-species?limit=100000");
    },
  });

  // Fetch details for the current page of Pokemon
  const { data: pokemonDetails, isLoading: isLoadingDetails } = useQuery<PokemonWithGeneration[]>({
    queryKey: ["PokemonDetails", currentPage, searchTerm],
    queryFn: async () => {
      if (!pokemonList) return [];

      // Filter Pokemon based on search term
      const filtered = pokemonList.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Calculate pagination
      const startIndex = (currentPage - 1) * pokemonPerPage;
      const endIndex = startIndex + pokemonPerPage;
      const paginatedResults = filtered.slice(startIndex, endIndex);

      // Fetch details for each Pokemon
      const detailsPromises = paginatedResults.map(async (pokemon) => {
        const id = parseInt(pokemon.url.split("/").filter(Boolean).pop() || "0");
        const details = await apiClient.fetchByEndpoint<Pokemon>(`pokemon/${id}`);
        const speciesData = await apiClient.fetchByEndpoint<PokemonSpecies>(
          `pokemon-species/${id}`
        );

        // Get generation
        const generation = speciesData.generation.name.replace("generation-", "").toUpperCase();

        // Create a partial Pokemon object with the properties we need
        return {
          ...details,
          // Add the generation and sprite as custom properties
          generation: generation,
          sprite:
            details.sprites.other?.["official-artwork"].front_default ||
            details.sprites.front_default,
        };
      });

      return Promise.all(detailsPromises);
    },
    enabled: !!pokemonList,
  });

  // Update filtered Pokemon when details change
  useEffect(() => {
    if (pokemonDetails) {
      setFilteredPokemon(pokemonDetails || []);
    }
  }, [pokemonDetails]);

  const totalPokemon =
    pokemonList?.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).length || 0;
  const totalPages = Math.ceil(totalPokemon / pokemonPerPage);

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

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") return;

    const pageNumber = parseInt(value);
    if (!isNaN(pageNumber)) {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      const pageNumber = parseInt(target.value);
      if (!isNaN(pageNumber)) {
        goToPage(pageNumber);
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <PageWrapper>
      <h1 className="bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6 font-bold text-transparent text-4xl text-center">
        Pokédex
      </h1>

      {/* Search Bar */}
      <div className="relative mx-auto mb-8 w-full max-w-md">
        <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-blue-400" />
        </div>
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg py-3 pr-4 pl-10 border-2 focus:border-transparent border-blue-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="right-0 absolute inset-y-0 flex items-center pr-3 pointer-events-none">
          <span className="text-blue-400 text-xs">{totalPokemon} results</span>
        </div>
      </div>

      {/* Loading State */}
      {(isLoadingList || isLoadingDetails) && <PokedexPageSkeleton />}

      {/* Pokemon Grid */}
      {!isLoadingList && !isLoadingDetails && (
        <>
          {/* Pokemon List Card */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mb-8">
            {filteredPokemon.map((pokemon) => (
              <Link
                key={pokemon.id}
                to={`/pokedex/${pokemon.id}`}
                className={`${getCardGradient(
                  pokemon.types && pokemon.types.length > 0 ? pokemon.types[0].type.name : "normal"
                )} shadow-lg hover:shadow-xl rounded-lg hover:ring-2 hover:ring-blue-500 overflow-hidden transition-all duration-300 transform hover:scale-105`}>
                {/* Card Header with ID and Generation */}
                <div className="flex justify-between items-center bg-black/30 p-2">
                  <span className="bg-white/20 px-2 py-1 rounded-full font-bold text-xs">
                    #{pokemon.id}
                  </span>
                  <span className="bg-white/20 px-2 py-1 rounded-full font-bold text-xs">
                    Gen {pokemon.generation}
                  </span>
                </div>

                {/* Pokemon Image */}
                <div className="relative flex justify-center p-4 h-32">
                  <div className="absolute inset-0 bg-white/10 opacity-50 blur-xl m-auto rounded-full w-24 h-24"></div>
                  <img
                    src={pokemon.sprite || "/pika.png"} // Fallback image if sprite is null
                    alt={pokemon.name}
                    className="z-10 h-full object-contain"
                  />
                </div>

                {/* Pokemon Name */}
                <h2 className="text-shadow mb-2 font-bold text-white text-xl text-center capitalize">
                  {pokemon.name}
                </h2>

                {/* Types */}
                <div className="flex justify-center gap-2 bg-black/20 p-3">
                  {pokemon.types?.map((type) => (
                    <TypeBadge key={type.type.name} type={type.type.name} />
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            {/* First Page Button */}
            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg shadow-md transition-all duration-200 ${
                currentPage === 1
                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105"
              }`}
              title="First Page">
              {"<"}
            </button>

            {/* Previous Page Button */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg shadow-md transition-all duration-200 ${
                currentPage === 1
                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105"
              }`}
              title="Previous Page">
              <ChevronLeft size={16} />
            </button>

            {/* Page Input and Total */}
            <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg">
              <span className="font-bold hidden sm:inline">Page</span>
              <input
                type="text"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={handlePageInputChange}
                onKeyDown={handlePageInputKeyDown}
                className="w-12 bg-black/30 border border-blue-500/50 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Enter page number"
              />
              <span className="font-bold">of {totalPages}</span>
            </div>

            {/* Next Page Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg shadow-md transition-all duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105"
              }`}
              title="Next Page">
              <ChevronRight size={16} />
            </button>

            {/* Last Page Button */}
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg shadow-md transition-all duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105"
              }`}
              title="Last Page">
              {">"}
            </button>
          </div>
        </>
      )}
    </PageWrapper>
  );
}

export default PokedexPage;
