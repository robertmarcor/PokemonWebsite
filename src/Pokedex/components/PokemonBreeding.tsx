import { PokemonSpecies } from "../../models";
import { getGenderRate } from "../../Components/gender-rates/get-gender";
import DetailedViewInfoHeader from "./detailed-view-info-header";
import { InfoRow } from "../../Components/ui/table-info-row";

type Props = {
  species: PokemonSpecies;
  isDarkMode?: boolean;
};

function PokemonBreeding({ species }: Props) {
  const eggGroups = species.egg_groups.map((group) => group.name).join(", ");

  return (
    <div>
      <DetailedViewInfoHeader title="Breeding" className="text-left" />
      <table className="w-full border-collapse text-left font-mono">
        <tbody>
          <InfoRow label="Egg Groups" value={eggGroups} />
          <InfoRow label="Gender Rate" value={getGenderRate(species.gender_rate)} />
          <InfoRow label="Egg Cycle" value={species.hatch_counter} />
        </tbody>
      </table>
    </div>
  );
}

export default PokemonBreeding;
