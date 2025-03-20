import { InfoRow } from "../../Components/ui/table-info-row";
import { Genus, Pokemon, PokemonSpecies } from "../../models";
import DetailedViewInfoHeader from "./detailed-view-info-header";
import PokemonDescription from "./PokemonDescription";

type Props = {
  pokemon: Pokemon;
  species: PokemonSpecies;
};

function PokemonBasicInfo({ pokemon, species }: Props) {
  const getEnglishGenus = (genera: Genus[]) => {
    return genera.find((g) => g.language.name === "en");
  };

  return (
    <div className="text-left flex flex-col justify-between gap-4">
      <DetailedViewInfoHeader title="Species Info" />
      <table>
        <tbody>
          <InfoRow label="Color" value={species.color.name} />
          <InfoRow label="Species" value={getEnglishGenus(species.genera)?.genus || "Unknown"} />
          <InfoRow label="Weight" value={pokemon.weight} />
          <InfoRow label="Height" value={pokemon.height} />
          <InfoRow label="Habitat" value={species.habitat.name} />
        </tbody>
      </table>
      <PokemonDescription species={species} className="col-span-2" />
    </div>
  );
}

export default PokemonBasicInfo;
