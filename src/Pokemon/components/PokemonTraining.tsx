import { InfoRow } from "../../Components/ui/table-info-row";
import { Pokemon, PokemonSpecies } from "../../models";
import DetailedViewInfoHeader from "./detailed-view-info-header";

type Props = {
  pokemon: Pokemon;
  species: PokemonSpecies;
};

function PokemonTraining({ pokemon, species }: Props) {
  const getEV = () => {
    return pokemon.stats.filter((stat) => stat.effort !== 0);
  };

  const evYield = getEV()
    .map((effort) => `${effort.effort} ${effort.stat.name}`)
    .join(", ")
    .replace(/-/g, "")
    .replace(/special/g, "Sp.");

  return (
    <div>
      <DetailedViewInfoHeader title="Training" className="text-left" />
      <table className="w-full border-collapse text-left font-mono">
        <tbody>
          <InfoRow label="EV Yield" value={evYield || "None"} />
          <InfoRow label="Catch Rate" value={species.capture_rate} />
          <InfoRow label="Base Exp" value={pokemon.base_experience} />
          <InfoRow label="Growth Rate" value={species.growth_rate.name} />
        </tbody>
      </table>
    </div>
  );
}

export default PokemonTraining;
