export const minimumNumber = (array: number[]): number => Math.min(...array)

export const maximumNumber = (array: number[]): number => Math.max(...array)

export const probability = (p: number): boolean => !!p && Math.random() <= p