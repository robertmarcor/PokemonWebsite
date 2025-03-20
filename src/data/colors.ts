// Get type color based on Pokemon type
export const getTypeColor = (type: string) => {
  const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-300",
    psychic: "bg-pink-500",
    bug: "bg-green-400",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  };

  return typeColors[type] || "bg-gray-400";
};

export const getTypeColorDarker = (type: string) => {
  const ringColors: Record<string, string> = {
    normal: "ring-2 ring-gray-600",
    fire: "ring-2 ring-red-700",
    water: "ring-2 ring-blue-700",
    electric: "ring-2 ring-yellow-600",
    grass: "ring-2 ring-green-700",
    ice: "ring-2 ring-blue-400",
    fighting: "ring-2 ring-red-900",
    poison: "ring-2 ring-purple-700",
    ground: "ring-2 ring-yellow-900",
    flying: "ring-2 ring-indigo-500",
    psychic: "ring-2 ring-pink-700",
    bug: "ring-2 ring-green-600",
    rock: "ring-2 ring-yellow-900",
    ghost: "ring-2 ring-purple-900",
    dragon: "ring-2 ring-indigo-900",
    dark: "ring-2 ring-gray-900",
    steel: "ring-2 ring-gray-700",
    fairy: "ring-2 ring-pink-500",
  };

  return ringColors[type] || "gray-600";
};

// Get card gradient based on Pokemon type
export const getCardGradient = (type: string) => {
  const typeGradients: Record<string, string> = {
    normal: "bg-gradient-to-br from-gray-300 to-gray-500",
    fire: "bg-gradient-to-br from-red-400 to-orange-600",
    water: "bg-gradient-to-br from-blue-400 to-blue-700",
    electric: "bg-gradient-to-br from-yellow-300 to-amber-500",
    grass: "bg-gradient-to-br from-green-400 to-emerald-700",
    ice: "bg-gradient-to-br from-blue-100 to-cyan-500",
    fighting: "bg-gradient-to-br from-red-600 to-red-900",
    poison: "bg-gradient-to-br from-purple-400 to-purple-700",
    ground: "bg-gradient-to-br from-yellow-600 to-amber-900",
    flying: "bg-gradient-to-br from-indigo-200 to-indigo-500",
    psychic: "bg-gradient-to-br from-pink-400 to-pink-700",
    bug: "bg-gradient-to-br from-lime-400 to-green-600",
    rock: "bg-gradient-to-br from-yellow-700 to-stone-900",
    ghost: "bg-gradient-to-br from-purple-600 to-indigo-900",
    dragon: "bg-gradient-to-br from-indigo-500 to-purple-900",
    dark: "bg-gradient-to-br from-gray-700 to-gray-900",
    steel: "bg-gradient-to-br from-gray-400 to-slate-600",
    fairy: "bg-gradient-to-br from-pink-300 to-pink-500",
  };

  return typeGradients[type] || "bg-gradient-to-br from-slate-400 to-slate-700";
};

// Get stat color based on stat name
export const getStatColor = (statName: string) => {
  const statColors: Record<string, string> = {
    hp: "bg-gradient-to-r from-red-500 to-red-600",
    attack: "bg-gradient-to-r from-orange-500 to-orange-600",
    defense: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    "special-attack": "bg-gradient-to-r from-blue-500 to-blue-600",
    "special-defense": "bg-gradient-to-r from-green-500 to-green-600",
    speed: "bg-gradient-to-r from-pink-500 to-pink-600",
  };

  return statColors[statName] || "bg-gradient-to-r from-blue-500 to-blue-600";
};

// Get damage class color
export const getDamageClassColor = (damageClass: string) => {
  const damageClassColors: Record<string, string> = {
    physical: "bg-gradient-to-r from-orange-500 to-red-500",
    special: "bg-gradient-to-r from-blue-500 to-purple-500",
    status: "bg-gradient-to-r from-gray-500 to-gray-600",
  };

  return damageClassColors[damageClass] || "bg-gradient-to-r from-gray-500 to-gray-600";
};
