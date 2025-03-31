import H1 from "@/Components/layouts/h1-header";
import { Badge } from "@/Components/ui/badge";
import TypeBadge from "@/Components/ui/type-badge";
import { Pokemon } from "@/models";

type Props = {
  pokemon: Pokemon;
};

function PokemonHeader({ pokemon }: Props) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <Badge variant={"id"}>#{pokemon.id}</Badge>
      <H1 text={pokemon.name} className="my-2" />
      <div className="pokemon-types flex flex-wrap gap-1">
        {pokemon.types.map((type) => (
          <TypeBadge key={type.type.name} type={type.type.name} />
        ))}
      </div>{" "}
    </header>
  );
}

export default PokemonHeader;
