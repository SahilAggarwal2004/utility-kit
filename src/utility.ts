import { wait } from "./time.js";

export type Failure<E> = {
  success: false;
  data: null;
  error: E;
};

export type Success<T> = {
  success: true;
  data: T;
  error: null;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

export type RetryOptions<T, E = Error> = {
  retries?: number;
  onSuccess?: ((result: T) => any) | null;
  onError?: ((error: E) => any) | null;
};

export type RetryAsyncOptions<T, E = Error> = RetryOptions<T, E> & {
  initialDelay?: number;
  delayIncrement?: number;
};

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

  onError?.(result.error);

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
