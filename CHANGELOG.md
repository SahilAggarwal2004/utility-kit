# 0.8.0 (20-11-2025)

- **added:** subpath exports for cleaner module imports.
- **improved:** environment check for `crypto.getRandomValues` for broader compatibility.

## 0.7.2 (19-11-2025)

- **fix:** Add missing await for onError in retryAsync error branch.

## 0.7.0 (27-10-2025)

- **breaking:** `retry` and `retryAsync` now return a unified `Result<T, E>` object instead of directly returning the callback’s output. This enables consistent handling of success and failure across all utilities.
- **added:** `tryCatch` and `tryCatchAsync` utilities for safe, structured error handling. See [usage](https://www.npmjs.com/package/utility-kit#utility)

## 0.6.2 (13-09-2025)

- **build:** add `tsup` for unified CJS and ESM build

## 0.6.1 (13-09-2025)

- **changed:** unified implementation of `random` function for consistent behavior across environments. See [usage of random](https://www.npmjs.com/package/utility-kit#random)
- **moved:** `probability` function from `math` module to `random` module. See [usage of probability](https://www.npmjs.com/package/utility-kit#random)

## 0.6.0 (10-09-2025)

- **added:** `memoize` function for caching expensive computations. See [usage of memoize](https://www.npmjs.com/package/utility-kit#cache)
- **added:** `typescript` as a `devDependency`
- **changed:** switched from [bun](https://bun.sh/) to [pnpm](https://pnpm.io/)

## 0.5.0 (27-04-2024)

- **added:** `initialDelay` and `delayIncrement` options in `retryAsync` function. See [usage of retryAsync](https://www.npmjs.com/package/utility-kit#utility)
- **removed:** `showError` option in favour of `onError` callback in `retry` and `retryAsync` functions. See [usage of retry and retryAsync](https://www.npmjs.com/package/utility-kit#utility)

## 0.4.0 (10-04-2024)

- **added:** `random` function. See [usage of random](https://www.npmjs.com/package/utility-kit#random)

## 0.3.9 (05-04-2024)

- **changed:** switched from [pnpm](https://pnpm.io/) to [bun](https://bun.sh/)

## 0.3.5 (17-02-2024)

- **formatting:** improved code formatting for better readability and consistency.

## 0.3.0 (29-12-2023)

- **added:** added separate function `retryAsync` for async callbacks. See [usage of retryAsync](https://www.npmjs.com/package/utility-kit#utility)

## 0.2.2 (28-12-2023)

- **fixed:** improved `types` of `retry` function parameters.

## 0.2.0 (28-12-2023)

- **added:** `onSuccess` parameter in `retry` function. See [usage of retry](https://www.npmjs.com/package/utility-kit#utility)
