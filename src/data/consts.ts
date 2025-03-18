export const pokeApiUrl = "https://pokeapi.co/api/v2/";

// prettier-ignore
export const starterIds = [
    1, 4, 7, // Gen 1
    152, 155, 158, // Gen 2
    252, 255, 258, // Gen 3
    387, 390, 393, // Gen 4
    495, 498, 501, // Gen 5
    650, 653, 656, // Gen 6
    722, 725, 728, // Gen 7
    810, 813, 816, // Gen 8
    906, 909, 912 // Gen 9
  ];

export interface RawGeneration {
  id: number;
  range: [number, number];
  specie_amount: number;
  label: string;
  icon: string;
}

//prettier-ignore
export const generations: RawGeneration[] = [
  { id: 1, range: [1, 151], specie_amount: 151, label: "Generation 1", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
  { id: 2, range: [152, 251], specie_amount: 100, label: "Generation 2", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png" },
  { id: 3, range: [252, 386], specie_amount: 135, label: "Generation 3", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png" },
  { id: 4, range: [387, 493], specie_amount: 107, label: "Generation 4", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/387.png" },
  { id: 5, range: [494, 649], specie_amount: 156, label: "Generation 5", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/498.png" },
  { id: 6, range: [650, 721], specie_amount: 72, label: "Generation 6", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/656.png" },
  { id: 7, range: [722, 809], specie_amount: 88, label: "Generation 7", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/722.png" },
  { id: 8, range: [810, 905], specie_amount: 96, label: "Generation 8", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/813.png" },
  { id: 9, range: [906, 1025], specie_amount: 120, label: "Generation 9", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/912.png" },
];

export const allNames = [
  "Bulbasaur",
  "Charmander",
  "Squirtle",
  "Pidgey",
  "Rattata",
  "Jigglypuff",
  "Meowth",
  "Psyduck",
  "Machop",
  "Magnemite",
  "Onix",
  "Geodude",
  "Eevee",
  "Snorlax",
];
