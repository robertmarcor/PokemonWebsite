import { Pokemon } from "../models";
import { useQueries } from "@tanstack/react-query";
import { apiClient } from "../client/base";

interface AbilityDetail {
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
  name: string;
}

function PokemonAbilities({ pokemon }: { pokemon: Pokemon }) {
  // Get regular abilities and hidden ability separately
  const regularAbilities = pokemon.abilities.filter((ability) => !ability.is_hidden);
  const hiddenAbility = pokemon.abilities.find((ability) => ability.is_hidden);

  // Fetch ability details for each ability using useQueries
  const abilityQueries = useQueries({
    queries: pokemon.abilities.map((ability) => ({
      queryKey: ["ability", ability.ability.name],
      queryFn: async () => {
        return apiClient.fetchByUrl<AbilityDetail>(ability.ability.url);
      },
    })),
  });

  // Check if all ability queries are loaded
  const isLoading = abilityQueries.some((query) => query.isLoading);

  // Get English effect text for an ability
  const getEnglishEffect = (abilityDetail: AbilityDetail | undefined) => {
    if (!abilityDetail) return "No description available";

    const englishEntry = abilityDetail.effect_entries.find((entry) => entry.language.name === "en");

    return englishEntry?.effect || "No English description available";
  };

  if (isLoading) {
    return <div className="p-4 animate-pulse rounded-lg h-24"></div>;
  }

  return (
    <div className="abilities-container space-y-3">
      {/* Abilities Summary Line */}
      <div className="flex flex-wrap items-center">
        <span className="font-semibold mr-2">Abilities:</span>
        <span className="abilities-list">
          {regularAbilities.map((ability, index) => (
            <span key={ability.ability.name}>
              <span className="capitalize">{ability.ability.name.replace(/-/g, " ")}</span>
              {index < regularAbilities.length - 1 && " - "}
            </span>
          ))}
          {hiddenAbility && (
            <span>
              {regularAbilities.length > 0 && " - "}
              <span className="capitalize">{hiddenAbility.ability.name.replace(/-/g, " ")}</span>
              <span className="text-secondary ml-1">(Hidden Ability)</span>
            </span>
          )}
        </span>
      </div>

      {/* Ability Descriptions */}
      <div className="ability-descriptions space-y-3">
        {/* Regular Abilities */}
        {regularAbilities.map((ability, index) => {
          const abilityDetail = abilityQueries[index].data;
          return (
            <div key={ability.ability.name} className="ability-description">
              <div className="font-medium capitalize">
                {ability.ability.name.replace(/-/g, " ")}:
              </div>
              <div className="text-sm ml-2 font-sans">{getEnglishEffect(abilityDetail)}</div>
            </div>
          );
        })}

        {/* Hidden Ability */}
        {hiddenAbility && (
          <div className="ability-description">
            <div className="font-medium">
              <span className="text-secondary">Hidden Ability:</span>
            </div>
            <div className="ml-2">
              <span className="capitalize font-medium">
                {hiddenAbility.ability.name.replace(/-/g, " ")}:
              </span>
              <div className="text-sm font-sans">
                {getEnglishEffect(
                  abilityQueries[pokemon.abilities.findIndex((a) => a.is_hidden)].data
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonAbilities;
