// lib/utility.ts
export type Failure<E extends Error = Error> = { success: false; data: null; error: E };
export type Success<T> = { success: true; data: T; error: null };
export type Result<T, E extends Error = Error> = Success<T> | Failure<E>;

export type RetryOptions<T, E extends Error = Error> = {
  retries?: number;
  onSuccess?: ((result: T) => any) | null;
  onError?: ((error: E) => any) | null;
};

export type RetryAsyncOptions<T, E extends Error = Error> = RetryOptions<T, E> & {
  initialDelay?: number;
  delayIncrement?: number;
};
