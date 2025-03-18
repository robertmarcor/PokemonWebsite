import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";
import { apiClient } from "../client/base";
import { getTypeColor, getDamageClassColor } from "../data/colors";
import { Pokemon } from "../models";

function PokemonMoves() {
  const { id } = useParams<{ id: string }>();
  const pokemonId = parseInt(id || "1");

  const { data: pokemon } = useQuery<Pokemon>({
    queryKey: ["PokemonDetail", pokemonId],
    queryFn: async () => {
      return apiClient.fetchByEndpoint<Pokemon>(`pokemon/${pokemonId}`);
    },
  });

  // Interface for move data with level
  interface MoveData {
    name: string;
    level: number;
    type: string;
    damageClass: string;
  }

  // State to track active tab
  const [activeTab, setActiveTab] = useState<"level-up" | "machine" | "egg" | "tutor">("level-up");

  // Fetch move details
  const { data: moveDetails } = useQuery({
    queryKey: ["MoveDetails", pokemonId],
    queryFn: async () => {
      if (!pokemon || !pokemon.moves) return {};

      // Get moves that are learned by level-up
      const levelUpMoves = pokemon.moves.filter((moveInfo) => {
        return moveInfo.version_group_details.some(
          (detail) => detail.move_learn_method.name === "level-up"
        );
      });

      // Define interface for move data
      interface MoveData {
        type: { name: string };
        damage_class: { name: string };
      }

      // Fetch details for each move (limit to 30 to avoid too many requests)
      const moveDetailsPromises = levelUpMoves.slice(0, 30).map(async (moveInfo) => {
        const moveUrl = moveInfo.move.url;
        const moveId = moveUrl.split("/").filter(Boolean).pop();
        try {
          const moveData = await apiClient.fetchByEndpoint<MoveData>(`move/${moveId}`);
          return {
            name: moveInfo.move.name,
            type: moveData.type.name,
            damageClass: moveData.damage_class.name,
            moveInfo: moveInfo,
          };
        } catch (error) {
          console.error(`Error fetching move details for ${moveInfo.move.name}:`, error);
          return {
            name: moveInfo.move.name,
            type: "unknown",
            damageClass: "unknown",
            moveInfo: moveInfo,
          };
        }
      });

      const results = await Promise.all(moveDetailsPromises);

      // Create a map of move name to details
      const moveDetailsMap: Record<string, { type: string; damageClass: string }> = {};
      results.forEach((result) => {
        moveDetailsMap[result.name] = {
          type: result.type,
          damageClass: result.damageClass,
        };
      });

      return moveDetailsMap;
    },
    enabled: !!pokemon && !!pokemon.moves,
  });

  // Get moves by learning method
  const getMovesByMethod = (pokemon: Pokemon, method: string): MoveData[] => {
    if (!pokemon || !pokemon.moves) return [];

    // Filter moves by the specified learning method
    const filteredMoves = pokemon.moves
      .filter((moveInfo) => {
        return moveInfo.version_group_details.some(
          (detail) => detail.move_learn_method.name === method
        );
      })
      .map((moveInfo) => {
        // Find the latest game version's details for this method
        const versionDetails = moveInfo.version_group_details
          .filter((detail) => detail.move_learn_method.name === method)
          .sort((a, b) => {
            // Sort by version group to get the most recent one
            const versionA = a.version_group.name;
            const versionB = b.version_group.name;
            return versionB.localeCompare(versionA);
          })[0];

        // Get move type and damage class from our fetched details
        const moveDetail = moveDetails?.[moveInfo.move.name] || {
          type: "normal",
          damageClass: "physical",
        };

        return {
          name: moveInfo.move.name,
          level: versionDetails.level_learned_at,
          type: moveDetail.type,
          damageClass: moveDetail.damageClass,
        };
      })
      .sort((a, b) => a.level - b.level); // Sort by level

    return filteredMoves;
  };

  // Get level-up moves
  const getLevelUpMoves = (pokemon: Pokemon): MoveData[] => {
    return getMovesByMethod(pokemon, "level-up");
  };

  // Get egg moves
  const getEggMoves = (pokemon: Pokemon): MoveData[] => {
    return getMovesByMethod(pokemon, "egg");
  };

  // Get machine moves (TM/HM)
  const getMachineMoves = (pokemon: Pokemon): MoveData[] => {
    return getMovesByMethod(pokemon, "machine");
  };

  // Get tutor moves
  const getTutorMoves = (pokemon: Pokemon): MoveData[] => {
    return getMovesByMethod(pokemon, "tutor");
  };

  // Get moves for the active tab
  const getMovesForActiveTab = (pokemon: Pokemon): MoveData[] => {
    switch (activeTab) {
      case "level-up":
        return getLevelUpMoves(pokemon);
      case "egg":
        return getEggMoves(pokemon);
      case "machine":
        return getMachineMoves(pokemon);
      case "tutor":
        return getTutorMoves(pokemon);
      default:
        return getLevelUpMoves(pokemon);
    }
  };

  return (
    <>
      {/* Move learning method tabs */}
      <div className="flex mb-6 border-gray-700 border-b">
        <button
          onClick={() => setActiveTab("level-up")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "level-up"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}>
          Level Up
        </button>
        <button
          onClick={() => setActiveTab("machine")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "machine"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}>
          TM/HM
        </button>
        <button
          onClick={() => setActiveTab("egg")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "egg"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}>
          Egg
        </button>
        <button
          onClick={() => setActiveTab("tutor")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "tutor"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}>
          Tutor
        </button>
      </div>
      {/* Moves table */}
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <table className="divide-y divide-gray-700 min-w-full">
          <thead className="bg-gray-700/50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 font-medium text-gray-300 text-xs text-left uppercase tracking-wider">
                {activeTab === "level-up" ? "Level" : activeTab === "egg" ? "Source" : "Method"}
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-medium text-gray-300 text-xs text-center uppercase tracking-wider">
                Move
              </th>
              <th
                scope="col"
                className="hidden md:table-cell px-4 py-3 font-medium text-gray-300 text-xs text-center uppercase tracking-wider">
                Type
              </th>
              <th
                scope="col"
                className="hidden lg:table-cell px-4 py-3 font-medium text-gray-300 text-xs text-center uppercase tracking-wider">
                Category
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/30 divide-y divide-gray-700">
            {pokemon &&
              getMovesForActiveTab(pokemon).map((moveData, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-black/20" : "bg-black/50"}>
                  <td className="px-4 py-2 font-medium text-white text-sm whitespace-nowrap">
                    {activeTab === "level-up"
                      ? moveData.level === 0
                        ? "Evo"
                        : moveData.level
                      : activeTab === "egg"
                      ? "Breeding"
                      : activeTab === "machine"
                      ? "TM/HM"
                      : "Tutor"}
                  </td>
                  <td className="px-4 py-2 text-white text-sm capitalize whitespace-nowrap">
                    {moveData.name.replace(/-/g, " ")}
                  </td>
                  <td className="hidden md:table-cell px-4 py-2 text-white text-sm whitespace-nowrap">
                    <span
                      className={`${getTypeColor(
                        moveData.type
                      )} px-2 py-1 rounded-full text-xs uppercase font-bold`}>
                      {moveData.type}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-4 py-2 text-white text-sm whitespace-nowrap">
                    <span
                      className={`${getDamageClassColor(
                        moveData.damageClass
                      )} px-2 py-1 rounded-full text-xs uppercase font-bold`}>
                      {moveData.damageClass}
                    </span>
                  </td>
                </tr>
              ))}

            {pokemon && getMovesForActiveTab(pokemon).length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-gray-400 text-sm text-center">
                  No {activeTab.replace("-", " ")} moves found for this Pokémon.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PokemonMoves;
