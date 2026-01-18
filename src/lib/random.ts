import { adjectives, animals } from "../constants";

export const randomNumber = (min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number => min + Math.floor(random() * (max - min + 1));

export function generateOTP(digits: number = 4): string {
  digits = Math.min(digits, 20);
  const max = +"9".repeat(digits);
  let number = randomNumber(0, max).toString();
  number = "0".repeat(digits - number.length) + number;
  return number;
}

export const probability = (p: number): boolean => !!p && random() <= p;

export function random(n: number = 8): number {
  if (typeof crypto !== "object" || typeof crypto.getRandomValues !== "function") return Math.random();

  n = Math.max(1, Math.min(n, 127));
  let value = 0n;
  const max = 1n << BigInt(n * 8);
  const bytes = crypto.getRandomValues(new Uint8Array(n));

  for (const b of bytes) value = (value << 8n) | BigInt(b);

  return Number(value) / Number(max);
}

export const randomElement = <T extends ArrayLike<unknown>>(arr: T): T[number] => arr[randomNumber(0, arr.length - 1)];

export const randomAdjective = (): string => randomElement(adjectives);

export const randomAnimal = (): string => randomElement(animals);

export const randomName = (separator: string = " "): string => `${randomAdjective()}${separator}${randomAnimal()}`;
