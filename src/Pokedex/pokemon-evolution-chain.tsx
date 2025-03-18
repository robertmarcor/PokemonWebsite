import React from "react";
import { EvolutionChain, EvolutionDetail, PokemonSpecies, Pokemon } from "../models";
import { Link } from "react-router";
import { apiClient } from "../client/base";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import ItemSprite from "../Components/sprites/item-sprite";

interface Props {
  speciesData: PokemonSpecies;
}

function PokemonEvolutionChain({ speciesData }: Props) {
  // Extract evolution chain ID from the species data
  const getEvolutionChainId = (species: PokemonSpecies | undefined): number | null => {
    if (!species || !species.evolution_chain) return null;

    const urlParts = species.evolution_chain.url.split("/");
    const id = urlParts[urlParts.length - 2]; // Get the ID from the URL
    return parseInt(id);
  };

  // Fetch evolution chain data
  const { data: evolutionChain, isLoading: isLoadingEvolutionChain } = useQuery<EvolutionChain>({
    queryKey: ["EvolutionChain", getEvolutionChainId(speciesData)],
    queryFn: async () => {
      const chainId = getEvolutionChainId(speciesData);
      if (!chainId) throw new Error("Evolution chain ID not found");
      return apiClient.fetchByEndpoint<EvolutionChain>(`evolution-chain/${chainId}`);
    },
    enabled: !!speciesData && !!speciesData.evolution_chain,
  });

  // Check if the Pokemon has evolutions or evolves from another Pokemon
  const hasEvolutions = () => {
    if (!evolutionChain) return false;

    // Check if this Pokemon evolves from another Pokemon
    if (speciesData.evolves_from_species) return true;

    // Check if this Pokemon can evolve into other Pokemon
    if (evolutionChain.chain.evolves_to.length > 0) return true;

    return false;
  };

  // Component to display a single evolution stage
  interface EvolutionStageProps {
    speciesName: string;
    isBaby?: boolean;
    evolutionDetails?: EvolutionDetail;
  }

  const EvolutionStage: React.FC<EvolutionStageProps> = ({
    speciesName,
    isBaby = false,
    evolutionDetails,
  }) => {
    const { data: pokemonData } = useQuery<Pokemon>({
      queryKey: ["PokemonEvolution", speciesName],
      queryFn: async () => {
        return apiClient.fetchByEndpoint<Pokemon>(`pokemon/${speciesName}`);
      },
    });

    // Format evolution details
    const getEvolutionTriggerText = () => {
      if (!evolutionDetails) return "";

      let triggerText = "";
      let itemIdentifier = null;

      // Level-based evolution
      if (evolutionDetails.min_level) {
        triggerText = `Level ${evolutionDetails.min_level}`;
      }
      // Item-based evolution
      else if (evolutionDetails.item) {
        triggerText = `Use ${evolutionDetails.item.name.replace("-", " ")}`;
        itemIdentifier = evolutionDetails.item.name;
      }
      // Happiness-based evolution
      else if (evolutionDetails.min_happiness) {
        triggerText = `Happiness ≥ ${evolutionDetails.min_happiness}`;
      }
      // Trade evolution
      else if (evolutionDetails.trigger.name === "trade") {
        triggerText = "Trade";
        if (evolutionDetails.held_item) {
          triggerText += ` holding ${evolutionDetails.held_item.name.replace("-", " ")}`;
          itemIdentifier = evolutionDetails.held_item.name;
        }
      }

      return (
        <div>
          {itemIdentifier && <ItemSprite identifier={itemIdentifier} />}
          <p>{triggerText}</p>
        </div>
      );
    };

    return (
      <div className="flex flex-col justify-start items-center min-h-44">
        {/* Pokemon Image */}
        <div className="">
          {pokemonData ? (
            <img
              src={
                pokemonData.sprites.front_default ||
                pokemonData.sprites.other?.["official-artwork"].front_default ||
                "/pika.png"
              }
              alt={speciesName}
              className="size-24"
            />
          ) : (
            <div></div>
          )}
        </div>

        {/* Pokemon Name */}
        <div>
          <Link to={`/pokedex/${pokemonData?.id}`}>
            <p className="px-2 hover:underline capitalize">{speciesName.replace("-", " ")}</p>
          </Link>
          {isBaby && <span>Baby</span>}
        </div>

        {/* Evolution Trigger */}
        {evolutionDetails && (
          <div className="text-blue-300 text-xs text-center">{getEvolutionTriggerText()}</div>
        )}
      </div>
    );
  };
  return (
    <>
      {isLoadingEvolutionChain ? (
        <div className="flex justify-center items-center h-24">
          <div className="border-t-2 border-b-2 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        </div>
      ) : !evolutionChain ? (
        <div className="text-gray-400 text-center">No evolution data available</div>
      ) : !hasEvolutions() ? (
        <div className="text-gray-400 text-center">This Pokémon does not evolve</div>
      ) : (
        <div className="flex justify-center items-center">
          {/* Base Pokemon */}
          <EvolutionStage
            speciesName={evolutionChain.chain.species.name}
            isBaby={evolutionChain.chain.is_baby}
          />

          {/* First evolution */}
          {evolutionChain.chain.evolves_to.length > 0 && (
            <>
              <ChevronRight className="text-blue-400" size={24} />
              {evolutionChain.chain.evolves_to.map((evo, index) => (
                <div key={index} className="flex items-center">
                  <EvolutionStage
                    speciesName={evo.species.name}
                    isBaby={evo.is_baby}
                    evolutionDetails={evo.evolution_details[0]}
                  />

                  {/* Second evolution */}
                  <ChevronRight className="my-1 text-blue-400" size={24} />
                  {evo.evolves_to.length > 0 && (
                    <div className="flex flex-col items-center">
                      <div className="flex flex-wrap justify-center gap-4">
                        {evo.evolves_to.map((secondEvo, secondIndex) => (
                          <EvolutionStage
                            key={secondIndex}
                            speciesName={secondEvo.species.name}
                            isBaby={secondEvo.is_baby}
                            evolutionDetails={secondEvo.evolution_details[0]}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default PokemonEvolutionChain;
