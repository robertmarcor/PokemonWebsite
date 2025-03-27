export interface DamageRelations {
  [type: string]: {
    doubleDamageFrom: string[];
    doubleDamageTo: string[];
    halfDamageFrom: string[];
    halfDamageTo: string[];
    noDamageFrom: string[];
    noDamageTo: string[];
  };
}

export const pokemonTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export const pokemonDamageRelations: DamageRelations = {
  normal: {
    doubleDamageFrom: ["fighting"],
    doubleDamageTo: [],
    halfDamageFrom: [],
    halfDamageTo: ["rock", "steel"],
    noDamageFrom: ["ghost"],
    noDamageTo: ["ghost"],
  },
  fire: {
    doubleDamageFrom: ["water", "ground", "rock"],
    doubleDamageTo: ["grass", "ice", "bug", "steel"],
    halfDamageFrom: ["fire", "grass", "ice", "bug", "steel", "fairy"],
    halfDamageTo: ["fire", "water", "rock", "dragon"],
    noDamageFrom: [],
    noDamageTo: [],
  },
  water: {
    doubleDamageFrom: ["electric", "grass"],
    doubleDamageTo: ["fire", "ground", "rock"],
    halfDamageFrom: ["fire", "water", "ice", "steel"],
    halfDamageTo: ["water", "grass", "dragon"],
    noDamageFrom: [],
    noDamageTo: [],
  },
  electric: {
    doubleDamageFrom: ["ground"],
    doubleDamageTo: ["water", "flying"],
    halfDamageFrom: ["electric", "flying", "steel"],
    halfDamageTo: ["electric", "grass", "dragon"],
    noDamageFrom: [],
    noDamageTo: ["ground"],
  },
  grass: {
    doubleDamageFrom: ["fire", "ice", "poison", "flying", "bug"],
    doubleDamageTo: ["water", "ground", "rock"],
    halfDamageFrom: ["water", "electric", "grass", "ground"],
    halfDamageTo: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
    noDamageFrom: [],
    noDamageTo: [],
  },
  ice: {
    doubleDamageFrom: ["fire", "fighting", "rock", "steel"],
    doubleDamageTo: ["grass", "ground", "flying", "dragon"],
    halfDamageFrom: ["ice"],
    halfDamageTo: ["fire", "water", "ice", "steel"],
    noDamageFrom: [],
    noDamageTo: [],
  },
  fighting: {
    doubleDamageFrom: ["flying", "psychic", "fairy"],
    doubleDamageTo: ["normal", "ice", "rock", "dark", "steel"],
    halfDamageFrom: ["bug", "rock", "dark"],
    halfDamageTo: ["poison", "flying", "psychic", "bug", "fairy"],
    noDamageFrom: [],
    noDamageTo: ["ghost"],
  },
  poison: {
    doubleDamageFrom: ["ground", "psychic"],
    doubleDamageTo: ["grass", "fairy"],
    halfDamageFrom: ["grass", "fighting", "poison", "bug", "fairy"],
    halfDamageTo: ["poison", "ground", "rock", "ghost"],
    noDamageFrom: [],
    noDamageTo: ["steel"],
  },
  ground: {
    doubleDamageFrom: ["water", "grass", "ice"],
    doubleDamageTo: ["fire", "electric", "poison", "rock", "steel"],
    halfDamageFrom: ["poison", "rock"],
    halfDamageTo: ["grass", "bug"],
    noDamageFrom: ["electric"],
    noDamageTo: ["flying"],
  },
  flying: {
    doubleDamageFrom: ["electric", "ice", "rock"],
    doubleDamageTo: ["grass", "fighting", "bug"],
    halfDamageFrom: ["grass", "fighting", "bug"],
    halfDamageTo: ["electric", "rock", "steel"],
    noDamageFrom: ["ground"],
    noDamageTo: [],
  },
  psychic: {
    doubleDamageFrom: ["bug", "ghost", "dark"],
    doubleDamageTo: ["fighting", "poison"],
    halfDamageFrom: ["fighting", "psychic"],
    halfDamageTo: ["psychic", "steel"],
    noDamageFrom: [],
    noDamageTo: ["dark"],
  },
  bug: {
    doubleDamageFrom: ["fire", "flying", "rock"],
    doubleDamageTo: ["grass", "psychic", "dark"],
    halfDamageFrom: ["grass", "fighting", "ground"],
    halfDamageTo: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"],
    noDamageFrom: [],
    noDamageTo: [],
  },
  rock: {
    doubleDamageFrom: ["water", "grass", "fighting", "ground", "steel"],
    doubleDamageTo: ["fire", "ice", "flying", "bug"],
    halfDamageFrom: ["normal", "fire", "poison", "flying"],
    halfDamageTo: ["fighting", "ground", "steel"],
    noDamageFrom: [],
    noDamageTo: [],
  },
  ghost: {
    doubleDamageFrom: ["ghost", "dark"],
    doubleDamageTo: ["psychic", "ghost"],
    halfDamageFrom: ["poison", "bug"],
    halfDamageTo: ["dark"],
    noDamageFrom: ["normal", "fighting"],
    noDamageTo: ["normal"],
  },
  dragon: {
    doubleDamageFrom: ["ice", "dragon", "fairy"],
    doubleDamageTo: ["dragon"],
    halfDamageFrom: ["fire", "water", "electric", "grass"],
    halfDamageTo: ["steel"],
    noDamageFrom: [],
    noDamageTo: ["fairy"],
  },
  dark: {
    doubleDamageFrom: ["fighting", "bug", "fairy"],
    doubleDamageTo: ["psychic", "ghost"],
    halfDamageFrom: ["ghost", "dark"],
    halfDamageTo: ["fighting", "dark", "fairy"],
    noDamageFrom: ["psychic"],
    noDamageTo: [],
  },
  steel: {
    doubleDamageFrom: ["fire", "fighting", "ground"],
    doubleDamageTo: ["ice", "rock", "fairy"],
    halfDamageFrom: [
      "normal",
      "grass",
      "ice",
      "flying",
      "psychic",
      "bug",
      "rock",
      "dragon",
      "steel",
      "fairy",
    ],
    halfDamageTo: ["fire", "water", "electric", "steel"],
    noDamageFrom: ["poison"],
    noDamageTo: [],
  },
  fairy: {
    doubleDamageFrom: ["poison", "steel"],
    doubleDamageTo: ["fighting", "dragon", "dark"],
    halfDamageFrom: ["fighting", "bug", "dark"],
    halfDamageTo: ["fire", "poison", "steel"],
    noDamageFrom: ["dragon"],
    noDamageTo: [],
  },
};
