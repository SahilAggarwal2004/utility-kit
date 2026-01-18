# utility-kit

An easy to use library that provides miscellaneous but very useful functions that are commonly used in most javascript projects.

## Features

- Function memoization
- Generate random number
- Pick random element from array
- Generate random name
- Generate OTP
- Probability
- Minimum/Maximum element of an array
- Wait/Sleep function
- TryCatch wrappers for safe and structured error handling
- Retry wrapper with incremental delay

## Installation

To install utility-kit

```bash
  # with npm:
  npm install utility-kit --save

  # with yarn:
  yarn add utility-kit

  # with pnpm:
  pnpm add utility-kit

  # with bun:
  bun add utility-kit
```

## Usage

`utility-kit` can be used in almost any javascript project to achieve the above mentioned [features](#Features) with no extra effort. The functions provided by `utility-kit` may be categorised into 5 categories:

#### Cache

```js
import { memoize } from "utility-kit/cache";

// Expensive computation function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Create memoized version that caches results
const memoizedFibonacci = memoize(fibonacci);

console.log(memoizedFibonacci(40)); // Calculated once and cached
console.log(memoizedFibonacci(40)); // Returns cached result instantly

// Works with multiple arguments
function expensiveOperation(a, b, c) {
  console.log("Computing...");
  return a * b + c;
}

const memoizedOperation = memoize(expensiveOperation);
memoizedOperation(2, 3, 4); // "Computing..." logged, returns 10
memoizedOperation(2, 3, 4); // No log, returns cached 10
memoizedOperation(5, 6, 7); // "Computing..." logged, returns 37
```

#### Math

```js
import { maximumNumber, minimumNumber } from "utility-kit/math";

const array = [89, 6, 99, 2, 50, 10];
console.log(minimumNumber(array)); // 2
console.log(maximumNumber(array)); // 99
```

#### Random

```js
import { generateOTP, probability, random, randomAdjective, randomAnimal, randomElement, randomName, randomNumber } from "utility-kit/random";

console.log(random()); // A drop-in and secure replacement for Math.random(), offering truly random numbers generated using cryptographic sources.

console.log(random(16)); // Generates a truly random number using 16 bytes, providing a wider range and higher precision. The number of bytes ranges from 1-127 with 8 being default.

console.log(randomNumber(10, 20)); // Any number between 10 and 20 (both numbers included) will be logged

console.log(randomElement([3, 2, 10, 7, 8])); // Any one random element of the array will be logged
console.log(randomElement("abcdef")); // Randomly picks a character from a string (works with any ArrayLike)

console.log(randomAdjective()); // Any one adjective from a list of 25 adjectives will be logged

console.log(randomAnimal()); // Any one animal from a list of 200 animals will be logged

console.log(randomName("-")); // A combination of randomAdjective() and randomAnimal() will be logged with a "-" separator in between. Default separator is " "

console.log(generateOTP(6)); // A 6 digit string OTP will be logged

if (probability(0.5)) console.log(true); // There is a 50% chance that true will be logged
```

#### Time

```js
import { wait } from "utility-kit/time";

async function test(time) {
  const ref = Date.now();
  await wait(time);
  return Date.now() - ref;
}

test(1000).then((time) => console.log(time)); // ~1000
```

#### Utility

```js
import { retry, retryAsync, tryCatch, tryCatchAsync } from "utility-kit/utility";
import { probability } from "utility-kit/random";

// For safely handling errors without try-catch blocks manually
// Returns a structured Result object with { success, data, error }
const result = tryCatch(() => mightThrow());
if (result.success) console.log("Success:", result.data);
else console.error("Error:", result.error);

// Async version
const asyncResult = await tryCatchAsync(async () => await mightThrowAsync());
if (asyncResult.success) console.log("Async success:", asyncResult.data);
else console.error("Async error:", asyncResult.error);

// Some error-prone callback
function errorProne() {
  if (probability(0.5)) {
    console.log("fail");
    throw new Error("Something went wrong");
  }
  console.log("success");
  return "hurray";
}

// Retry wrapper (returns a structured Result<T, E> object)
const result = retry(errorProne);
if (result.success) console.log("Result:", result.data);
else console.error("Error:", result.error);

retry(errorProne); // "fail" will be logged at most 3 (default) times until "success" is logged

retry(errorProne, { retries: 8 }); // "fail" will be logged at most 8 times until "success" is logged

retry(errorProne, {
  // onSuccess is a function with a single parameter which will have the value returned by the callback and will be invoked only on success. Here, "hurray" will also be logged after "success".
  onSuccess: (result) => console.log(result),
  // onError is a function with a single parameter which will contain the error thrown by the callback function and will be invoked on failure.
  onError: (error) => console.log(error),
});

// Infinite retry mode
// If retries = -1, the function will retry indefinitely until success.
retry(errorProne, { retries: -1 }); // Keeps retrying forever until "success" occurs

// For functions with parameters
function readChunk(file, chunkNumber);

const chunk = retry(() => readChunk(file, 2));
if (chunk.success) console.log("Read:", chunk.data);
else console.error("Failed:", chunk.error);

// For handling asynchronous callbacks or retrying after some incremental delay
async function uploadFile(file); // A function that uploads a file asynchronously, resolving to the file link on success or rejecting on failure.

// retryAsync retries the async function and returns a structured Result<T, E>
const link = await retryAsync(async () => await uploadFile(file), { retries: 4 });
if (link.success) console.log("Uploaded:", link.data);
else console.error("Error:", link.error);

// In below example, if file upload fails, retryAsync will wait for 1000ms (initialDelay) before retrying to upload the file, and this wait will increase by 500ms (delayIncrement) for every next retry.
await retryAsync(async () => await uploadFile(file), {
  initialDelay: 1000, // In ms, default is 0
  delayIncrement: 500, // In ms, default is 0
  onSuccess: console.log,
  onError: console.log,
});

// Infinite retries for async
await retryAsync(async () => await uploadFile(file), {
  retries: -1, // Will keep retrying forever until success
  initialDelay: 1000,
  delayIncrement: 500,
});

// Timeout wrapper for async Promises
// Rejects if the Promise does not resolve within the timeout duration
try {
  const data = await withTimeout(fetch("/api/data"), 3000); // Will timeout after 3000ms
  console.log("Fetched:", data);
} catch (err) {
  console.error("Timeout:", err.message);
}

await withTimeout(fetch("/api/data")); // Default timeout is 5000ms
```

## License

This project is licensed under the [MIT License](LICENSE).
