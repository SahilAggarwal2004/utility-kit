// lib/utility.ts
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
