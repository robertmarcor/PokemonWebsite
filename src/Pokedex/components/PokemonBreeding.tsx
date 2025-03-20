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
      <a href="#egg-group">
        <DetailedViewInfoHeader title="Breeding" className="text-left" />
      </a>
      <table className="w-full border-collapse text-left">
        <tbody>
          <InfoRow label="Egg Cycle" value={species.hatch_counter} />
          <InfoRow label="Egg Groups" value={eggGroups} />
          <InfoRow label="Gender Rate" value={getGenderRate(species.gender_rate)} />
        </tbody>
      </table>
    </div>
  );
}

export default PokemonBreeding;
