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
import { cn } from "../lib/utils";

type Props = {
  pokemon: Pokemon;
  species: PokemonSpecies;
};

function PokemonDetailCard({ pokemon, species }: Props) {
  return (
    <article className="pokemon-card p-4 max-sm:p-2 transition-colors duration-300 border-t-2">
      {/* Card Header */}
      <header className="card-header mb-4">
        <PokemonHeader className="flex max-sm:flex-col gap-2 items-center py-2">
          <span
            className={cn(
              "pokemon-id dark:bg-slate-400 dark:text-shadow shadow-md p-1.5 px-3 rounded-2xl font-bold text-xl max-sm:text-base"
            )}>
            #{pokemon.id}
          </span>
          <h1 className="pokemon-name text-foreground capitalize text-3xl font-bold max-sm:text-2xl">
            {pokemon.name}
          </h1>
          <div className="pokemon-types flex flex-wrap gap-1">
            {pokemon.types.map((type) => (
              <TypeBadge key={type.type.name} type={type.type.name} />
            ))}
          </div>
        </PokemonHeader>
      </header>

      {/* Card Body - First Section */}
      <section className="card-body mb-6">
        <div className="grid grid-cols-2 gap-4 max-sm:gap-2 max-md:grid-cols-1">
          <PokemonImages pokemon={pokemon} />
          <PokemonBasicInfo pokemon={pokemon} species={species} />
        </div>
      </section>

      {/* Spacer */}
      <CoolSpacer />

      {/* Card Body - Second Section */}
      <section className="card-body mt-2">
        <DetailedViewInfoHeader title="General" className="text-left mb-4" />

        {/* Content */}
        <div className="card-content space-y-6">
          {/* Abilities Section */}
          <div className="p-4 rounded-lg bg-black/[0.01]">
            <PokemonAbilities pokemon={pokemon} />
          </div>

          {/* Training & Breeding Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-black/[0.01]">
              <PokemonTraining pokemon={pokemon} species={species} />
            </div>
            <div className="p-4 rounded-lg bg-black/[0.01]">
              <PokemonBreeding species={species} />
            </div>
          </div>

          {/* Base Stats Section */}
          <PokemonBaseStats pokemon={pokemon} />
        </div>
      </section>
    </article>
  );
}

export default PokemonDetailCard;
