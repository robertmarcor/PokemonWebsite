import { PokemonSpecies } from "../../models";
import { getEnglishFlavorText } from "../../utils/utils";
import DetailedViewInfoHeader from "./detailed-view-info-header";

type Props = {
  species: PokemonSpecies;
  className?: string;
};

function PokemonDescription({ species, className }: Props) {
  return (
    <div className={className}>
      <DetailedViewInfoHeader title="Description" className="" />
      <p className={`font-sans dark:text-white text-shadow-xl shadow-black p-2`}>
        {getEnglishFlavorText(species)}
      </p>
    </div>
  );
}

export default PokemonDescription;
