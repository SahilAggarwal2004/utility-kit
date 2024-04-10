import { random } from "./random";

export const minimumNumber = (array: number[]) => Math.min(...array);

export const maximumNumber = (array: number[]) => Math.max(...array);

export const probability = (p: number) => !!p && random() <= p;
