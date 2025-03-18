import { UseGetEggGroupByName } from "../client/egg-group";
import { NamedAPIResource, PokemonSpecies } from "../models";

function PokemonEggGroup({ species }: { species: PokemonSpecies }) {
  return (
    <>
      <div className="flex justify-center gap-8">
        {species.egg_groups.map((group) => (
          <EggGroupItem key={group.name} groupName={group.name} />
        ))}
      </div>
    </>
  );
}

function EggGroupItem({ groupName }: { groupName: string }) {
  const { data, isLoading } = UseGetEggGroupByName(groupName);

  if (isLoading) return <div>Loading...</div>;

  console.log(data);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <p className="capitalize">{groupName}</p>
      </div>
      <div className="flex">
        {data?.pokemon_species && (
          <ul>
            {data.pokemon_species.map((specie: NamedAPIResource) => (
              <li key={specie.name}>{specie.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PokemonEggGroup;
