import { Pokemon, PokemonSpecies } from "../models";
import PokemonHeader from "./components/PokemonHeader";
import PokemonImages from "./components/PokemonImages";
import PokemonBasicInfo from "./components/PokemonBasicInfo";
import PokemonTraining from "./components/PokemonTraining";
import PokemonBreeding from "./components/PokemonBreeding";
import PokemonBaseStats from "./components/PokemonBaseStats";
import TypeBadge from "../Components/ui/type-badge";
import PokemonAbilities from "./abilities";
import CoolSpacer from "../Components/ui/cool-spacer";
import { cn } from "../lib/utils";

type Props = {
  pokemon: Pokemon;
  species: PokemonSpecies;
};

function PokemonDetailCard({ pokemon, species }: Props) {
  return (
    <article className="p-4 max-sm:p-2 transition-colors duration-300 border-t-2">
      {/* Card Header */}
      <header>
        <PokemonHeader className="flex max-sm:flex-col gap-2 items-center">
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

      <CoolSpacer />

      {/* Main content sections */}
      <div className="content-container">
        {/* Images and Basic Info Section */}
        <section aria-labelledby="basic-info-section">
          <h2 id="basic-info-section" className="sr-only">
            Basic Information
          </h2>
          <div className="grid grid-cols-2 gap-4 max-sm:gap-2 max-md:grid-cols-1">
            <PokemonImages pokemon={pokemon} />
            <PokemonBasicInfo pokemon={pokemon} species={species} />
          </div>
        </section>

        <CoolSpacer />

        {/* Stats Section */}
        <section aria-labelledby="stats-section">
          <h2 id="stats-section" className="sr-only">
            Base Stats
          </h2>
          <PokemonBaseStats pokemon={pokemon} />
        </section>

        <CoolSpacer />

        {/* Abilities Section */}
        <section aria-labelledby="abilities-section" className="p-4 rounded-lg bg-black/[0.01]">
          <h2 id="abilities-section" className="sr-only">
            Abilities
          </h2>
          <PokemonAbilities pokemon={pokemon} />
        </section>

        <CoolSpacer />

        {/* Training and Breeding Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section aria-labelledby="training-section" className="p-4 rounded-lg bg-black/[0.01]">
            <h2 id="training-section" className="sr-only">
              Training
            </h2>
            <PokemonTraining pokemon={pokemon} species={species} />
          </section>

          <section aria-labelledby="breeding-section" className="p-4 rounded-lg bg-black/[0.01]">
            <h2 id="breeding-section" className="sr-only">
              Breeding
            </h2>
            <PokemonBreeding species={species} />
          </section>
        </div>
      </div>
    </article>
  );
}

export default PokemonDetailCard;
