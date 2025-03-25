import { useState } from "react";
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

  const [selectedGroup, setSelectedGroup] = useState("V-VI");

  const groupSteps: { [key: string]: number } = {
    "II-III": 256,
    IV: 255,
    "V-VI": 257,
    "*": 128,
  };

  const eggCycleSteps = groupSteps[selectedGroup];

  return (
    <div>
      <a href="#egg-group">
        <DetailedViewInfoHeader title="Breeding" className="text-left" />
      </a>
      <table className="w-full border-collapse text-left">
        <tbody className="relative">
          <div className="absolute -top-6 right-0 text-xs font-serif text-secondary-foreground">
            {["II-III", "IV", "V-VI", "*"].map((group) => (
              <button key={group} onClick={() => setSelectedGroup(group)} className="ml-2">
                {`[${group}]`}
              </button>
            ))}
          </div>
          <InfoRow
            label="Egg Cycle"
            value={
              <>
                <span className="text-primary-foreground">{`${species.hatch_counter}`}</span>
                -Cycles,
                <span className="text-primary-foreground">{` ${
                  species.hatch_counter * eggCycleSteps
                }`}</span>
                -Steps
              </>
            }
          />
          <InfoRow label="Egg Groups" value={eggGroups} />
          <InfoRow label="Gender Rate" value={getGenderRate(species.gender_rate)} />
        </tbody>
      </table>
      <p className="text-muted-foreground">
        *Note: Egg cycle steps are 256 for Generations II and III, 255 for Gen IV, 257 for
        Generations V and VI, and 128 for all others.
      </p>
    </div>
  );
}

export default PokemonBreeding;
