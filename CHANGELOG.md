## 0.9.0 (2025-12-02)

* **added:** `withTimeout` utility to reject a promise if it doesn’t resolve within a specified duration. See [usage](https://www.npmjs.com/package/utility-kit#utility)
* **changed:** `wait` function now returns `Promise<void>` instead of `Promise<never>` for improved type consistency.

## 0.8.0 (2025-11-20)

* **added:** subpath exports for cleaner module imports.
* **improved:** environment check for `crypto.getRandomValues` for broader compatibility.

## 0.7.2 (2025-11-19)

* **fix:** Add missing await for onError in retryAsync error branch.

## 0.7.0 (2025-10-27)

* **breaking:** `retry` and `retryAsync` now return a unified `Result<T, E>` object instead of directly returning the callback’s output. This enables consistent handling of success and failure across all utilities.
* **added:** `tryCatch` and `tryCatchAsync` utilities for safe, structured error handling. See [usage](https://www.npmjs.com/package/utility-kit#utility)

## 0.6.2 (2025-09-13)

* **build:** add `tsup` for unified CJS and ESM build

## 0.6.1 (2025-09-13)

* **changed:** unified implementation of `random` function for consistent behavior across environments. See [usage of random](https://www.npmjs.com/package/utility-kit#random)
* **moved:** `probability` function from `math` module to `random` module. See [usage of probability](https://www.npmjs.com/package/utility-kit#random)

## 0.6.0 (2025-09-10)

* **added:** `memoize` function for caching expensive computations. See [usage of memoize](https://www.npmjs.com/package/utility-kit#cache)
* **added:** `typescript` as a `devDependency`
* **changed:** switched from [bun](https://bun.sh/) to [pnpm](https://pnpm.io/)

## 0.5.0 (2024-04-27)

* **added:** `initialDelay` and `delayIncrement` options in `retryAsync` function. See [usage of retryAsync](https://www.npmjs.com/package/utility-kit#utility)
* **removed:** `showError` option in favour of `onError` callback in `retry` and `retryAsync` functions. See [usage of retry and retryAsync](https://www.npmjs.com/package/utility-kit#utility)

## 0.4.0 (2024-04-10)

* **added:** `random` function. See [usage of random](https://www.npmjs.com/package/utility-kit#random)

## 0.3.9 (2024-04-05)

* **changed:** switched from [pnpm](https://pnpm.io/) to [bun](https://bun.sh/)

## 0.3.5 (2024-02-17)

* **formatting:** improved code formatting for better readability and consistency.

## 0.3.0 (2023-12-29)

* **added:** added separate function `retryAsync` for async callbacks. See [usage of retryAsync](https://www.npmjs.com/package/utility-kit#utility)

## 0.2.2 (2023-12-28)

* **fixed:** improved `types` of `retry` function parameters.

## 0.2.0 (2023-12-28)

* **added:** `onSuccess` parameter in `retry` function. See [usage of retry](https://www.npmjs.com/package/utility-kit#utility)
