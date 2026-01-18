import { adjectives, animals, characters } from "../constants";

const isCryptoUnavailable = typeof crypto !== "object" || typeof crypto.getRandomValues !== "function";

export function generateID(size: number = 16): string {
  let id = "";

  if (isCryptoUnavailable) {
    for (let i = 0; i < size; i++) id += randomElement(characters);
    return id;
  }

  const max = Math.floor(256 / characters.length) * characters.length;
  const bytes = new Uint8Array(size);

  while (id.length < size) {
    crypto.getRandomValues(bytes);
    for (let i = 0; i < bytes.length && id.length < size; i++) {
      const b = bytes[i];
      if (b < max) id += characters[b % characters.length];
    }
  }

  return id;
}

export function generateOTP(digits: number = 4): string {
  digits = Math.min(digits, 20);
  const max = +"9".repeat(digits);
  let number = randomNumber(0, max).toString();
  number = "0".repeat(digits - number.length) + number;
  return number;
}

export function probability(p: number): boolean {
  return !!p && random() <= p;
}

export function random(n: number = 8): number {
  if (isCryptoUnavailable) return Math.random();

  n = Math.max(1, Math.min(n, 127));
  let value = 0n;
  const max = 1n << BigInt(n * 8);
  const bytes = crypto.getRandomValues(new Uint8Array(n));

  for (const b of bytes) value = (value << 8n) | BigInt(b);

  return Number(value) / Number(max);
}

export function randomAdjective(): string {
  return randomElement(adjectives);
}

export function randomAnimal(): string {
  return randomElement(animals);
}

export function randomElement<T extends ArrayLike<unknown>>(arr: T): T[number] {
  return arr[randomNumber(0, arr.length - 1)];
}

export function randomName(separator: string = " "): string {
  return `${randomAdjective()}${separator}${randomAnimal()}`;
}

export function randomNumber(min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
  return min + Math.floor(random() * (max - min + 1));
}
