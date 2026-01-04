const cacheKey = Symbol();

export function memoize<Args extends readonly unknown[], Result>(fn: (...args: Args) => Result): (...args: Args) => Result {
  const cache = new Map();

  return (...args: Args): Result => {
    let current = cache;

    for (const arg of args) {
      if (!current.has(arg)) {
        const nextLevel = typeof arg === "object" && arg !== null ? new WeakMap() : new Map();
        current.set(arg, nextLevel);
      }
      current = current.get(arg);
    }

    if (current.has(cacheKey)) return current.get(cacheKey);

    const result = fn(...args);
    current.set(cacheKey, result);
    return result;
  };
}
