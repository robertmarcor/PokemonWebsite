export const extractIdFromUrl = (url: string) => {
  const parts = url.split("/").filter((part) => part !== "");
  const id = parts[parts.length - 1];
  return id;
};

export function getRandomBetweenMinMax(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getText<T extends { language: { name: string } }>(
  text: T[],
  language: string = "en"
) {
  return text.find((entry) => entry.language.name === language);
}
