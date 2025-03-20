import TypeBadge from "../Components/ui/type-badge";
import { pokemonDamageRelations } from "../data/type-damage-relations";
import { Pokemon } from "../models/Pokemon";

// Interface for storing damage multipliers
interface DamageMultipliers {
  [type: string]: number;
}

const PokemonTypeRelations = ({ pokemon }: { pokemon: Pokemon }) => {
  const pokemonTypes = pokemon.types.map((type) => type.type.name.toLowerCase());

  const calculateDamageMultipliers = (): DamageMultipliers => {
    const multipliers: DamageMultipliers = {};

    // Initialize all types with a multiplier of 1
    const allTypes = Object.keys(pokemonDamageRelations);
    allTypes.forEach((type) => {
      multipliers[type] = 1;
    });

    // Calculate multipliers based on type effectiveness
    pokemonTypes.forEach((pokemonType) => {
      if (!pokemonDamageRelations[pokemonType]) return;

      // Types that deal double damage to this Pokémon
      pokemonDamageRelations[pokemonType].doubleDamageFrom.forEach((type) => {
        multipliers[type] *= 2;
      });

      // Types that deal half damage to this Pokémon
      pokemonDamageRelations[pokemonType].halfDamageFrom.forEach((type) => {
        multipliers[type] *= 0.5;
      });

      // Types that deal no damage to this Pokémon
      pokemonDamageRelations[pokemonType].noDamageFrom.forEach((type) => {
        multipliers[type] = 0;
      });
    });

    return multipliers;
  };

  // Calculate strengths (types that this Pokémon deals double damage to)
  const calculateStrengths = (): string[] => {
    // Start with all types that any of the Pokémon's types are strong against
    let strengths: string[] = [];

    // Add all types that any of the Pokémon's types deal double damage to
    pokemonTypes.forEach((type) => {
      if (pokemonDamageRelations[type]) {
        strengths = [...strengths, ...pokemonDamageRelations[type].doubleDamageTo];
      }
    });

    // Remove duplicates and sort
    return [...new Set(strengths)].sort();
  };

  const multipliers = calculateDamageMultipliers();
  const strengths = calculateStrengths();

  // Get types grouped by their multiplier (for weakness display)
  const getTypesByMultiplier = (multiplierValue: number): string[] => {
    return Object.keys(multipliers)
      .filter((type) => multipliers[type] === multiplierValue)
      .sort();
  };

  // List of multipliers to display, in order of weakness
  const multiplierValues = [4, 2, 1, 0.5, 0.25, 0];

  return (
    <>
      <div>
        {multiplierValues.map((multiplierValue) => {
          const typesWithMultiplier = getTypesByMultiplier(multiplierValue);
          if (typesWithMultiplier.length === 0) return null;

          return (
            <div key={multiplierValue} className="mb-2">
              <p key={multiplierValue} className="py-2 font-semibold text-white text-xl">
                {multiplierValue === 0
                  ? `Immune (x${multiplierValue})`
                  : multiplierValue === 1
                  ? `Normal Damage (x${multiplierValue})`
                  : multiplierValue > 1
                  ? `Weak to (x${multiplierValue})`
                  : `Resistant to (x${multiplierValue})`}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {typesWithMultiplier.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mb-2 font-bold text-white text-xl">{"Strong against (2x)"}</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {strengths.length > 0 ? (
          strengths.map((type) => <TypeBadge key={type} type={type} />)
        ) : (
          <span className="text-gray-500">No specific strengths</span>
        )}
      </div>
    </>
  );
};

export default PokemonTypeRelations;
