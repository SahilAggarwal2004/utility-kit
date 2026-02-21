# Changelog

## [0.10.2](https://github.com/SahilAggarwal2004/utility-kit/compare/v0.10.1...v0.10.2) (2026-02-21)

### Bug Fixes

* **types:** Expose declaration files via exports map.  ([1aa1a00](https://github.com/SahilAggarwal2004/utility-kit/commit/1aa1a0016fd3c11dd526925cdd2b0e51cabc93d8))

## [0.10.1](https://github.com/SahilAggarwal2004/utility-kit/compare/v0.10.0...v0.10.1) (2026-02-21)

### Chores

* **deps:** Update @release-it/conventional-changelog, @types/node and release-it.  ([3f220f0](https://github.com/SahilAggarwal2004/utility-kit/commit/3f220f03f5e1fe7a4d16beb42ba8dd89b8b5bd76))

### Build System

* Migrate from tsup to tsdown for library bundling.  ([7aa9ecd](https://github.com/SahilAggarwal2004/utility-kit/commit/7aa9ecd1f88347449bab6df431a006576b8d54ee))

## [0.10.0](https://github.com/SahilAggarwal2004/utility-kit/compare/v0.9.1...v0.10.0) (2026-01-18)

### ⚠ BREAKING CHANGES

* Upgrade tsconfig target from es2016 to es2020

### Chores

* **deps:** Update @types/node and release-it.  ([f28b627](https://github.com/SahilAggarwal2004/utility-kit/commit/f28b627c042f72d560810a02070ab42d44f026fc))
* Upgrade tsconfig target from es2016 to es2020.  ([ae10f3f](https://github.com/SahilAggarwal2004/utility-kit/commit/ae10f3f6456116c92bef634c0df69cc00c33e917))

### Features

* **random:** Add cryptographically secure generateID helper.  ([418dc80](https://github.com/SahilAggarwal2004/utility-kit/commit/418dc80574ad7c29195405090bbdb8eefdc13a69))
* **random:** Support ArrayLike inputs in `randomElement`.  ([dcf96c7](https://github.com/SahilAggarwal2004/utility-kit/commit/dcf96c7ca46c3f4080442e4bb98e162fb0729f62))

## [0.9.1](https://github.com/SahilAggarwal2004/utility-kit/compare/v0.9.0...v0.9.1) (2026-01-04)

### Chores

* Add release-it for automated versioning and changelog.  ([0b0afbb](https://github.com/SahilAggarwal2004/utility-kit/commit/0b0afbba399a659920e9b45143539b3fd2106942))

### Code Refactoring

* Move source files into `src/lib`.  ([c4e3a49](https://github.com/SahilAggarwal2004/utility-kit/commit/c4e3a49fb25f2f63c8469855cb276fdde7d62be9))

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
