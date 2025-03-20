import { PokemonSpecies } from "../models";

export const extractIdFromUrl = (url: string) => {
  const parts = url.split("/").filter((part) => part !== "");
  const id = parts[parts.length - 1];
  return id;
};

export const toPascalCase = (str: string) => {
  return str
    .toLowerCase()
    .split(/\s+|_+/) // Split by spaces or underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

export function getRandomBetweenMinMax(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get English flavor text and clean it up
export const getEnglishFlavorText = (species: PokemonSpecies) => {
  if (!species) return "";

  const englishEntry = species.flavor_text_entries.find((entry) => entry.language.name === "en");

  if (!englishEntry?.flavor_text) return "missing flavour text";

  // Clean up the flavor text:
  // 1. Replace special characters and control characters with spaces
  // 2. Replace multiple spaces with a single space
  // 3. Fix common issues like missing spaces between words
  return englishEntry.flavor_text
    .replace(/[\n\f\r\t\v]/g, " ") // Replace newlines and other control chars with spaces
    .trim(); // Remove leading/trailing whitespace
};
