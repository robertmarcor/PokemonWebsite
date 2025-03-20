import { Pokemon, PokemonSpecies } from "../models";
import PokemonHeader from "./components/PokemonHeader";
import PokemonImages from "./components/PokemonImages";
import PokemonBasicInfo from "./components/PokemonBasicInfo";
import PokemonTraining from "./components/PokemonTraining";
import PokemonBreeding from "./components/PokemonBreeding";
import PokemonBaseStats from "./components/PokemonBaseStats";
import TypeBadge from "../Components/ui/type-badge";
import PokemonAbilities from "./pokemon-abilities";
import CoolSpacer from "../Components/ui/cool-spacer";
import DetailedViewInfoHeader from "./components/detailed-view-info-header";

type Props = {
  pokemon: Pokemon;
  species: PokemonSpecies;
};

function BasicInfo({ pokemon, species }: Props) {
  return (
    <div className={`p-4 max-sm:p-2 transition-colors duration-300 border-t-2`}>
      <PokemonHeader className="flex max-sm:flex-col gap-2 items-center py-2">
        <span
          className={`dark:bg-slate-400 dark:text-shadow shadow-md p-1.5 px-3 rounded-2xl font-bold text-xl max-sm:text-base`}>
          #{pokemon.id}
        </span>
        <h1 className="text-foreground capitalize text-3xl font-bold max-sm:text-2xl">
          {pokemon.name}
        </h1>
        {pokemon.types.map((type) => (
          <TypeBadge key={type.type.name} type={type.type.name} />
        ))}
      </PokemonHeader>

      <div className="grid grid-cols-2 gap-4 max-sm:gap-2 max-md:grid-cols-1">
        <PokemonImages pokemon={pokemon} />
        <PokemonBasicInfo pokemon={pokemon} species={species} />
      </div>

      <CoolSpacer />

      <DetailedViewInfoHeader title="General" className="text-left" />
      <PokemonAbilities pokemon={pokemon} />
      <div className="flex max-md:flex-col gap-2">
        <PokemonTraining pokemon={pokemon} species={species} />
        <PokemonBreeding species={species} />
      </div>

      <PokemonBaseStats pokemon={pokemon} />
    </div>
  );
}

export default BasicInfo;
