import { UseGetPokemon } from "../client/pokemon.client";
import { PokemonSpecies } from "../models";
import { extractIdFromUrl } from "../utils/utils";

interface Props {
  speciesData: PokemonSpecies;
}

function PokemonFormsChain({ speciesData }: Props) {
  return (
    <div className="flex justify-center gap-8">
      {speciesData.varieties.map((form) => (
        <PokemonForm name={extractIdFromUrl(form.pokemon.url)} />
      ))}
    </div>
  );
}

const PokemonForm = ({ name }: { name: string }) => {
  const { data, isLoading } = UseGetPokemon(name);
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {data && (
        <div className="flex flex-col items-center">
          <img src={data?.sprites.front_default ?? "/pika.png"} alt="pokemon sprite" />
          <p className="capitalize text-blue-300">{data.name}</p>
        </div>
      )}
    </>
  );
};

export default PokemonFormsChain;
