import { EvolutionChain, EvolutionDetail, Pokemon } from "../models";
import { apiClient } from "../client/base";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ChevronDown } from "lucide-react";
import ItemSprite from "../Components/sprites/item-sprite";
import React from "react";
import { Link } from "react-router-dom";
import { extractIdFromUrl } from "../utils/utils";

interface Props {
  evoChain: EvolutionChain;
}

function PokemonevoChain({ evoChain }: Props) {
  interface EvolutionStageProps {
    id: number;
    speciesName: string;
    isBaby?: boolean;
    evolutionDetails?: EvolutionDetail;
  }

  const EvolutionStage = ({
    id,
    speciesName,
    isBaby = false,
    evolutionDetails,
  }: EvolutionStageProps) => {
    const { data: pokemonData } = useQuery<Pokemon>({
      queryKey: ["pokemon", speciesName],
      queryFn: async () => {
        return apiClient.fetchByEndpoint<Pokemon>(`pokemon/${id}`);
      },
    });

    console.log(pokemonData);
    // Format evolution details
    const getEvolutionTriggerText = () => {
      if (!evolutionDetails) return { text: "", icon: null };

      let triggerText = "";
      let itemIdentifier = null;

      // Level-based evolution
      if (evolutionDetails.min_level) {
        triggerText = `Level ${evolutionDetails.min_level}`;
        itemIdentifier = "rare-candy";
      }
      // Item-based evolution
      else if (evolutionDetails.item) {
        triggerText = `Use ${evolutionDetails.item.name.replace("-", " ")}`;
        itemIdentifier = evolutionDetails.item.name;
      }
      // Happiness-based evolution
      else if (evolutionDetails.min_happiness) {
        triggerText = `💞 Happiness > ${evolutionDetails.min_happiness}`;
      }
      // Trade evolution
      else if (evolutionDetails.trigger.name === "trade") {
        triggerText = "Trade";
        if (evolutionDetails.held_item) {
          triggerText += ` holding ${evolutionDetails.held_item.name.replace("-", " ")}`;
          itemIdentifier = evolutionDetails.held_item.name;
        }
      }
      // Time of day evolution
      else if (evolutionDetails.time_of_day) {
        triggerText = `During ${evolutionDetails.time_of_day}time`;
      }
      return { text: triggerText, icon: itemIdentifier };
    };

    return (
      <>
        <EvoCard
          id={pokemonData?.id || 1}
          speciesName={speciesName}
          spriteUrl={
            pokemonData?.sprites.front_default ||
            pokemonData?.sprites.other?.["official-artwork"].front_default ||
            null
          }
          isBaby={isBaby}
          trigger={getEvolutionTriggerText()}
        />
      </>
    );
  };

  return (
    <>
      {evoChain.chain.evolves_to.length < 3 ? (
        <div className="flex justify-center items-center overflow-x-auto">
          {/* Base Pokemon Lowest */}
          <EvolutionStage
            id={parseInt(extractIdFromUrl(evoChain.chain.species.url))}
            speciesName={evoChain.chain.species.name}
            isBaby={evoChain.chain.is_baby}
          />
          {/* First evolution */}
          {evoChain?.chain?.evolves_to?.length > 0 && (
            <>
              <ChevronRight className="text-secondary" size={24} />
              {evoChain.chain.evolves_to.map((evo, index) => (
                <React.Fragment key={`evo-${index}-${evo.species.name}`}>
                  <div className="flex flex-col items-center">
                    <EvolutionStage
                      id={parseInt(extractIdFromUrl(evo.species.url))}
                      speciesName={evo.species.name}
                      isBaby={evo.is_baby}
                      evolutionDetails={evo.evolution_details?.[0] ?? null}
                    />

                    {/* Show additional evolution details if there are more than one */}
                    {evo.evolution_details && evo.evolution_details.length > 1 && (
                      <div className="flex flex-col items-center mt-2">
                        {evo.evolution_details.slice(1).map((detail, detailIndex) => (
                          <div
                            key={`detail-${index}-${detailIndex}`}
                            className="flex flex-col items-center">
                            <ChevronDown className="text-secondary my-1" size={20} />
                            <div className="text-sm text-secondary px-2 py-1 bg-black/5 rounded">
                              {detail.time_of_day
                                ? `During ${detail.time_of_day}time`
                                : detail.min_level
                                ? `Level ${detail.min_level}`
                                : detail.item
                                ? `Use ${detail.item.name.replace("-", " ")}`
                                : detail.trigger?.name === "trade"
                                ? "Trade"
                                : "Special"}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Can evolve further ? */}
                  {evo?.evolves_to?.length > 0 && (
                    <>
                      <ChevronRight className="text-secondary" size={24} />
                      {evo.evolves_to.map((secondEvo, secondIndex) => (
                        <React.Fragment
                          key={`evo-${index}-${secondIndex}-${secondEvo.species.name}`}>
                          <div className="flex flex-col items-center">
                            <EvolutionStage
                              id={parseInt(extractIdFromUrl(secondEvo.species.url))}
                              speciesName={secondEvo.species.name}
                              isBaby={secondEvo.is_baby}
                              evolutionDetails={secondEvo.evolution_details?.[0] ?? null}
                            />

                            {/* Show additional evolution details if there are more than one */}
                            {secondEvo.evolution_details &&
                              secondEvo.evolution_details.length > 1 && (
                                <div className="flex flex-col items-center mt-2">
                                  {secondEvo.evolution_details
                                    .slice(1)
                                    .map((detail, detailIndex) => (
                                      <div
                                        key={`detail-${index}-${secondIndex}-${detailIndex}`}
                                        className="flex flex-col items-center">
                                        <ChevronDown className="text-secondary my-1" size={20} />
                                        <div className="text-sm text-secondary px-2 py-1 bg-black/5 rounded">
                                          {detail.time_of_day
                                            ? `During ${detail.time_of_day}time`
                                            : detail.min_level
                                            ? `Level ${detail.min_level}`
                                            : detail.item
                                            ? `Use ${detail.item.name.replace("-", " ")}`
                                            : detail.trigger?.name === "trade"
                                            ? "Trade"
                                            : "Special"}
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              )}
                          </div>
                          {/* Add OR between final evolutions, but not after the last one */}
                          {secondIndex < evo.evolves_to.length - 1 && (
                            <div className="mx-2 font-medium">OR</div>
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 place-items-center">
          {evoChain.chain.evolves_to.map((evo, index) => (
            <div key={index} className="flex items-center bg-black/10">
              <EvolutionStage
                id={parseInt(extractIdFromUrl(evoChain.chain.species.url))}
                speciesName={evoChain.chain.species.name}
                isBaby={evoChain.chain.is_baby}
              />
              <ChevronRight className="text-secondary mb-20" size={24} />
              <div className="flex flex-col items-center">
                <EvolutionStage
                  key={`evo-${index}-${evo.species.name}`}
                  id={parseInt(extractIdFromUrl(evo.species.url))}
                  speciesName={evo.species.name}
                  isBaby={evo.is_baby}
                  evolutionDetails={evo.evolution_details[0]}
                />

                {/* Show additional evolution details if there are more than one */}
                {evo.evolution_details && evo.evolution_details.length > 1 && (
                  <div className="flex flex-col items-center mt-2">
                    {evo.evolution_details.slice(1).map((detail, detailIndex) => (
                      <div
                        key={`detail-${index}-${detailIndex}`}
                        className="flex flex-col items-center">
                        <ChevronDown className="text-secondary my-1" size={20} />
                        <div className="text-sm text-secondary px-2 py-1 bg-black/5 rounded">
                          {detail.time_of_day
                            ? `During ${detail.time_of_day}time`
                            : detail.min_level
                            ? `Level ${detail.min_level}`
                            : detail.item
                            ? `Use ${detail.item.name.replace("-", " ")}`
                            : detail.trigger?.name === "trade"
                            ? "Trade"
                            : "Special"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

interface EvoCardProps {
  id: number;
  speciesName: string;
  spriteUrl: string | null;
  isBaby: boolean;
  trigger: { text: string; icon: string | null };
}
function EvoCard({ id, spriteUrl, speciesName, isBaby, trigger }: EvoCardProps) {
  return (
    <div className="flex flex-col justify-start items-center h-72">
      <img
        src={spriteUrl || "/pika.png"}
        alt={speciesName}
        className="max-w-24 xl:max-w-52 size-24 xl:size-52"
      />

      {/* Pokemon Name */}
      <div>
        <Link to={`/pokemon/${id}`} className="px-2 hover:underline capitalize">
          {speciesName.replace("-", " ")}
        </Link>
      </div>
      {isBaby && <span className="font-sans text-secondary text-center">Baby</span>}

      {/* Evolution Trigger */}
      <div className="font-sans text-secondary text-center">
        {trigger.text}
        {trigger.icon && <ItemSprite identifier={trigger.icon} className="inline ml-1" />}
      </div>
    </div>
  );
}

export default PokemonevoChain;
