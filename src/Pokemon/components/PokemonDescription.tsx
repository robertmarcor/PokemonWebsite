import { getText } from "@/utils/utils";
import { FlavorText, PokemonSpecies } from "@/models";
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
        {getText<FlavorText>(species.flavor_text_entries)?.flavor_text}
      </p>
    </div>
  );
}

export default PokemonDescription;
