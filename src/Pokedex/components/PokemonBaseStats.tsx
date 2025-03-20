import { Pokemon } from "../../models";
import { cn } from "../../lib/utils";
import DetailedViewInfoHeader from "./detailed-view-info-header";

type Props = {
  pokemon: Pokemon;
};

function PokemonBaseStats({ pokemon }: Props) {
  // Calculate total stats
  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  // Function to get color based on stat value
  const getStatColor = (value: number) => {
    if (value < 50) return "bg-gradient-to-r from-red-500 to-red-400";
    if (value < 80) return "bg-gradient-to-r from-orange-500 to-orange-400";
    if (value < 100) return "bg-gradient-to-r from-yellow-500 to-yellow-400";
    if (value < 120) return "bg-gradient-to-r from-lime-500 to-lime-400";
    return "bg-gradient-to-r from-green-500 to-green-400";
  };

  return (
    <div className="my-4 bg-black/[0.01] p-6 rounded-md">
      <DetailedViewInfoHeader title={"Base Stats"} className="text-left mb-4" />
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        {pokemon.stats.map((stat) => (
          <div key={stat.stat.name} className="mb-3">
            <div className="flex justify-between mb-1">
              <span className={cn("capitalize")}>{stat.stat.name.replace("-", " ")}</span>
              <span className={cn("font-bold")}>{stat.base_stat}</span>
            </div>
            <div className={cn("w-full h-2.5 overflow-hidden bg-black/20")}>
              <div
                className={`${getStatColor(stat.base_stat)} h-2.5 transition-all`}
                style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Stats */}
      <div className="mt-6 pt-4 border-t border-gray-700/30">
        <div className="flex justify-between mb-1">
          <span className={cn("font-bold text-lg")}>Total</span>
          <span className={cn("font-bold text-lg")}>{totalStats}</span>
        </div>
        <div className={cn("w-full h-3 overflow-hidden bg-black/20")}>
          <div
            className={`${getStatColor(totalStats / 6)} h-3 transition-all`}
            style={{ width: `${Math.min(100, (totalStats / 600) * 100)}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default PokemonBaseStats;
