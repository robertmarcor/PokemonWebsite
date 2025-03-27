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

export function sanitizeText(input?: string): string | undefined {
  if (!input) return input;

  // Replace control characters (e.g. form feed, newline, etc.) with a space.
  let sanitized = input.replace(/[\x7F-\x9F]/g, " ");

  // Normalize multiple spaces into a single space and trim leading/trailing whitespace.
  sanitized = sanitized.replace(/\s+/g, " ").trim();

  return sanitized;
}
