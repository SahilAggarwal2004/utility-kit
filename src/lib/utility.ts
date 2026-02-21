import { wait } from "./time";
import type { Result, RetryAsyncOptions, RetryOptions } from "../types";

export function retry<T, E = Error>(callback: () => T, { retries = 3, ...options }: RetryOptions<T, E> = {}): Result<T, E> {
  const { onSuccess, onError } = options;
  const result = tryCatch<T, E>(callback);

  if (result.success) {
    onSuccess?.(result.data);
    return result;
  }

  onError?.(result.error);

  if (retries) return retry(callback, { retries: retries - 1, ...options });

  return result;
}

export async function retryAsync<T, E = Error>(callback: () => Promise<T>, { retries = 3, initialDelay = 0, ...options }: RetryAsyncOptions<T, E> = {}): Promise<Result<T, E>> {
  const { delayIncrement = 0, onSuccess, onError } = options;
  const result = await tryCatchAsync<T, E>(callback);

  if (result.success) {
    await onSuccess?.(result.data);
    return result;
  }

  await onError?.(result.error);

  if (retries) {
    await wait(initialDelay);
    return await retryAsync(callback, { retries: retries - 1, initialDelay: initialDelay + delayIncrement, ...options });
  }

  return result;
}

export function tryCatch<T, E = Error>(callback: () => T): Result<T, E> {
  try {
    const data = callback();
    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, data: null, error: error as E };
  }
}

export async function tryCatchAsync<T, E = Error>(callback: () => Promise<T>): Promise<Result<T, E>> {
  try {
    const data = await callback();
    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, data: null, error: error as E };
  }
}

export function withTimeout<T>(promise: Promise<T>, timeout = 5000): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`Operation timed out after ${timeout}ms`)), timeout);
  });

  return Promise.race([promise.finally(() => clearTimeout(timeoutId)), timeoutPromise]) as Promise<T>;
}
