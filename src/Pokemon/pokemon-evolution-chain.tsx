import { EvolutionChain, EvolutionDetail, Pokemon } from "../models";
import { NamedAPIResource } from "../models/Common";
import { apiClient } from "../client/base";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ChevronDown, ArrowRight } from "lucide-react";
import ItemSprite from "../Components/sprites/item-sprite";
import React from "react";
import { Link } from "react-router";
import { UseGetPokemon } from "@/client/pokemon.client";
import { getEvolutionDetails, getEvolutionTriggerText } from "@/data/evolution-triggers";
import { extractIdFromUrl } from "@/utils/utils";
import CoolSpacer from "@/Components/ui/cool-spacer";

interface Props {
  evoChain: EvolutionChain;
}

function PokemonevoChain({ evoChain }: Props) {
  console.log(evoChain);

  interface EvoCardProps {
    species: NamedAPIResource;
    isBaby?: boolean;
  }

  const EvoCard = ({ species, isBaby }: EvoCardProps) => {
    const { data } = UseGetPokemon(extractIdFromUrl(species.url));
    return (
      <div className="flex flex-col justify-start">
        {data?.sprites.front_default ? (
          <img src={data.sprites.front_default} alt={`Sprite of ${species.name}`} />
        ) : (
          <p>No sprite available</p>
        )}
        <Link
          to={`/pokemon/${species.name}`}
          className="capitalize hover:text-primary hover:underline">
          {species.name}
        </Link>
        {isBaby && <p className="text-secondary text-sm">Baby form</p>}
      </div>
    );
  };

  const EvoTrigger = (details: EvolutionDetail) => {
    let triggerText = getEvolutionTriggerText(details);
    const additionalDetails: { text: string; icon?: string }[] = getEvolutionDetails(details);
    const iconUrl =
      "https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/items/dream-world/";
    const backupUrl =
      "https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/items/";

    return (
      <div className="flex flex-col items-center mt-auto text-secondary">
        <ArrowRight className="text-foreground" />
        <div className="flex flex-col items-center">
          <p>{triggerText}</p>

          {additionalDetails.length > 0 &&
            additionalDetails.map((detail) => (
              <div className="flex items-center gap-1" key={detail.text}>
                <span className="text-sm">{detail.text}</span>
                {detail.icon && (
                  <div className="size-6">
                    <img
                      src={`${iconUrl}/${detail.icon}`}
                      alt={detail.text}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.onerror = null; // Prevent infinite loop
                        img.src = `${backupUrl}/${detail.icon}`;

                        // Change size when using backup URL
                        const parentDiv = img.parentElement;
                        if (parentDiv) {
                          parentDiv.className = "size-8";
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  };

  // Check if there are multiple evolution paths
  const hasMultipleEvoPaths = evoChain.chain.evolves_to.length > 1;

  // Helper function to render a single evolution path
  const renderEvolutionPath = (
    basePokemon: NamedAPIResource,
    isBaby: boolean | undefined,
    evolutionDetails: EvolutionDetail,
    evolvedPokemon: NamedAPIResource
  ) => (
    <div className="flex justify-evenly gap-4 items-center">
      {/* Base Pokémon */}
      <EvoCard species={basePokemon} isBaby={isBaby} />

      {/* Evolution trigger */}
      <EvoTrigger {...evolutionDetails} />

      {/* Evolved Pokémon */}
      <EvoCard species={evolvedPokemon} />
    </div>
  );

  if (hasMultipleEvoPaths) {
    // For Pokémon with multiple evolution paths (like Eevee)
    return (
      <section className="flex flex-col gap-6 w-full">
        {evoChain.chain.evolves_to.map((firstEvo, index, array) => {
          // If this evolution has multiple triggers (like Rockruff), create a row for each trigger
          if (firstEvo.evolution_details.length > 1) {
            return (
              <React.Fragment key={`evo-path-${index}`}>
                {firstEvo.evolution_details.map((detail, detailIndex, detailsArray) => (
                  <React.Fragment key={`evo-detail-${detailIndex}`}>
                    {renderEvolutionPath(
                      evoChain.chain.species,
                      evoChain.chain.is_baby,
                      detail,
                      firstEvo.species
                    )}
                    {/* Add CoolSpacer after each row except the last one */}
                    {detailIndex < detailsArray.length - 1 && <CoolSpacer />}
                  </React.Fragment>
                ))}

                {/* Add CoolSpacer after each evolution group except the last one */}
                {index < array.length - 1 && <CoolSpacer />}
              </React.Fragment>
            );
          }

          // For evolutions with a single trigger
          return (
            <React.Fragment key={`evo-path-${index}`}>
              <div className="flex justify-evenly gap-4 items-center">
                {/* Base Pokémon */}
                <EvoCard species={evoChain.chain.species} isBaby={evoChain.chain.is_baby} />

                {/* Evolution trigger */}
                {firstEvo.evolution_details.length > 0 && (
                  <EvoTrigger {...firstEvo.evolution_details[0]} />
                )}

                {/* First evolution */}
                <EvoCard species={firstEvo.species} />

                {/* Evolution triggers and second evolutions if any */}
                {firstEvo.evolves_to.map((secondEvo, secondIndex) => (
                  <React.Fragment key={`second-evo-${secondIndex}`}>
                    {secondEvo.evolution_details.length > 0 && (
                      <div className="flex flex-col">
                        {secondEvo.evolution_details.map((detail, detailIndex) => (
                          <EvoTrigger key={`second-evo-detail-${detailIndex}`} {...detail} />
                        ))}
                      </div>
                    )}
                    <EvoCard species={secondEvo.species} />
                  </React.Fragment>
                ))}
              </div>

              {/* Add CoolSpacer after each evolution group except the last one */}
              {index < array.length - 1 && <CoolSpacer />}
            </React.Fragment>
          );
        })}
      </section>
    );
  } else {
    // For simple linear evolutions (like Charmander)
    const firstEvo = evoChain.chain.evolves_to[0];

    // If the first evolution has multiple triggers (like Rockruff)
    if (firstEvo && firstEvo.evolution_details.length > 1) {
      return (
        <section className="flex flex-col gap-6 w-full">
          {firstEvo.evolution_details.map((detail, detailIndex, detailsArray) => (
            <React.Fragment key={`first-evo-detail-${detailIndex}`}>
              {renderEvolutionPath(
                evoChain.chain.species,
                evoChain.chain.is_baby,
                detail,
                firstEvo.species
              )}
              {/* Add CoolSpacer after each row except the last one */}
              {detailIndex < detailsArray.length - 1 && <CoolSpacer />}
            </React.Fragment>
          ))}

          {/* If there are second evolutions, show them after a spacer */}
          {firstEvo.evolves_to.length > 0 && <CoolSpacer />}

          {/* Handle second evolutions */}
          {firstEvo.evolves_to.map((secondEvo, secondIndex, secondArray) => (
            <React.Fragment key={`second-evo-${secondIndex}`}>
              {/* If second evolution has multiple triggers */}
              {secondEvo.evolution_details.length > 1 ? (
                // Map each trigger to a separate row
                secondEvo.evolution_details.map((detail, detailIndex, detailsArray) => (
                  <React.Fragment key={`second-evo-detail-${detailIndex}`}>
                    {renderEvolutionPath(firstEvo.species, false, detail, secondEvo.species)}
                    {/* Add CoolSpacer after each row except the last one */}
                    {detailIndex < detailsArray.length - 1 && <CoolSpacer />}
                  </React.Fragment>
                ))
              ) : (
                // Single trigger for second evolution
                <div className="flex justify-evenly gap-4 items-center">
                  {/* First evolution as base */}
                  <EvoCard species={firstEvo.species} />

                  {/* Evolution trigger */}
                  {secondEvo.evolution_details.length > 0 && (
                    <EvoTrigger {...secondEvo.evolution_details[0]} />
                  )}

                  {/* Second evolution */}
                  <EvoCard species={secondEvo.species} />
                </div>
              )}

              {/* Add CoolSpacer after each second evolution except the last one */}
              {secondIndex < secondArray.length - 1 && <CoolSpacer />}
            </React.Fragment>
          ))}
        </section>
      );
    }

    // Standard linear evolution (like Charmander → Charmeleon → Charizard)
    return (
      <section className="flex justify-evenly gap-4 items-center w-full">
        {/* Base Pokemon */}
        <EvoCard species={evoChain.chain.species} isBaby={evoChain.chain.is_baby} />

        {/* First evolution with trigger */}
        {firstEvo && (
          <React.Fragment>
            {/* Evolution trigger */}
            {firstEvo.evolution_details.length > 0 && (
              <EvoTrigger {...firstEvo.evolution_details[0]} />
            )}

            {/* First evolution */}
            <EvoCard species={firstEvo.species} />

            {/* Second evolution with trigger */}
            {firstEvo.evolves_to.map((secondEvo, secondIndex) => (
              <React.Fragment key={`second-evo-${secondIndex}`}>
                {/* Evolution trigger */}
                {secondEvo.evolution_details.length > 0 && (
                  <EvoTrigger {...secondEvo.evolution_details[0]} />
                )}

                {/* Second evolution */}
                <EvoCard species={secondEvo.species} />
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </section>
    );
  }
}

export default PokemonevoChain;
