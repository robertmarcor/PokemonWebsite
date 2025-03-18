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
