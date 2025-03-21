import { Pokemon } from "../models";
import { useQueries } from "@tanstack/react-query";
import { apiClient } from "../client/base";
import DetailedViewInfoHeader from "./components/detailed-view-info-header";

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
    <div className="space-y-3 text-left">
      {/* Abilities Summary Line */}
      <header className="flex items-center gap-4 capitalize flex-wrap">
        <DetailedViewInfoHeader title="Abilities - " className="text-left" />
        <div className="flex flex-wrap items-center gap-4 *:ring-2 *:ring-secondary dark:*:bg-black/30 *:px-2 *:rounded-lg">
          <span>{regularAbilities.map((ability) => ability.ability.name)}</span>
          <span>
            {hiddenAbility?.ability.name}
            <span className="font-sans text-secondary font-bold">{" (Hidden)"}</span>
          </span>
        </div>
      </header>

      {/* Ability Descriptions */}
      <div className="ability-descriptions space-y-3">
        {/* Regular Abilities */}
        {regularAbilities.map((ability, index) => {
          const abilityDetail = abilityQueries[index].data;
          return (
            <div key={ability.ability.name}>
              <div className="font-medium capitalize">
                {ability.ability.name.replace(/-/g, " ")}:
              </div>
              <div className="text-sm ml-2 font-sans">{getEnglishEffect(abilityDetail)}</div>
            </div>
          );
        })}

        {/* Hidden Ability */}
        {hiddenAbility && (
          <div>
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
