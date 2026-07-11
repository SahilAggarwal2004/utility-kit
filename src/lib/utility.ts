import { wait } from "@/lib/time";
import type { Result, RetryAsyncOptions, RetryOptions } from "@/types";

function normalizeError(error: unknown): Error {
  if (error instanceof Error) return error;

  const message = typeof error === "object" && error !== null ? safeStringify(error) : String(error);

  return new Error(message, { cause: error });
}

export function retry<T, E extends Error = Error>(callback: () => T, { retries = 3, ...options }: RetryOptions<T, E> = {}): Result<T, E> {
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

export async function retryAsync<T, E extends Error = Error>(
  callback: () => Promise<T>,
  { retries = 3, initialDelay = 0, ...options }: RetryAsyncOptions<T, E> = {},
): Promise<Result<T, E>> {
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

function safeStringify(value: unknown): string {
  const { success, data } = tryCatch(() => JSON.stringify(value));
  if (success) return data;

  return "[Unserializable error object]";
}

export function tryCatch<T, E extends Error = Error>(callback: () => T): Result<T, E> {
  try {
    const data = callback();
    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, data: null, error: normalizeError(error) as E };
  }
}

export async function tryCatchAsync<T, E extends Error = Error>(callback: () => Promise<T>): Promise<Result<T, E>> {
  try {
    const data = await callback();
    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, data: null, error: normalizeError(error) as E };
  }
}

export function withTimeout<T>(promise: Promise<T>, timeout = 5000): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`Operation timed out after ${timeout}ms`)), timeout);
  });

  return Promise.race([promise.finally(() => clearTimeout(timeoutId)), timeoutPromise]) as Promise<T>;
}
