import { wait } from "./time.js";

export type RetryOptions<T> = {
  retries?: number;
  onSuccess?: ((result: T) => any) | null;
  onError?: ((error: Error) => any) | null;
};

export type RetryAsyncOptions<T> = RetryOptions<T> & {
  initialDelay?: number;
  delayIncrement?: number;
};

function assertIsError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) throw error;
}

export function retry<T>(cb: () => T, { retries = 3, ...options }: RetryOptions<T> = {}) {
  const { onSuccess = null, onError = null } = options;
  try {
    const result = cb();
    onSuccess?.(result);
    return result;
  } catch (error) {
    assertIsError(error);
    onError?.(error);
    if (retries) return retry(cb, { retries: retries - 1, ...options });
  }
}

export async function retryAsync<T>(cb: () => T, { retries = 3, initialDelay = 0, ...options }: RetryAsyncOptions<T> = {}) {
  const { delayIncrement = 0, onSuccess = null, onError = null } = options;
  try {
    const result = await cb();
    await onSuccess?.(result);
    return result;
  } catch (error) {
    assertIsError(error);
    onError?.(error);
    if (retries) {
      await wait(initialDelay);
      return await retryAsync(cb, { retries: retries - 1, initialDelay: initialDelay + delayIncrement, ...options });
    }
  }
}
