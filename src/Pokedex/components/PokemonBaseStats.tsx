import { Pokemon } from "../../models";
import { getStatColor } from "../../data/colors";

type Props = {
  pokemon: Pokemon;
  isDarkMode?: boolean;
};

function PokemonBaseStats({ pokemon, isDarkMode = true }: Props) {
  return (
    <div className={`my-4 p-4 rounded-lg ${isDarkMode ? "bg-black/20" : "bg-gray-100"}`}>
      <h2
        className={`mb-2 font-semibold text-xl ${isDarkMode ? "text-white/90" : "text-gray-700"}`}>
        Base Stats
      </h2>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        {pokemon.stats.map((stat) => (
          <div key={stat.stat.name} className="mb-2">
            <div className="flex justify-between mb-1">
              <span className={`capitalize ${isDarkMode ? "text-white/90" : "text-gray-700"}`}>
                {stat.stat.name.replace("-", " ")}
              </span>
              <span className={`font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                {stat.base_stat}
              </span>
            </div>
            <div
              className={`w-full h-2.5 overflow-hidden ${
                isDarkMode ? "bg-black/20" : "bg-gray-200"
              }`}>
              <div
                className={`${getStatColor(stat.stat.name)} h-2.5 transition-all`}
                style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonBaseStats;
