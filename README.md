# utility-kit

An easy to use library that provides miscellaneous but very useful functions that are commonly used in most javascript projects.

## Features

- Generate random number
- Pick random element from array
- Generate random name
- Generate OTP
- Probability
- Minimum/Maximum element of an array
- Wait/Sleep function
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

`utility-kit` can be used in almost any javascript project to achieve the above mentioned [features](#Features) with no extra effort. The functions provided by `utility-kit` may be categorised into 4 categories:

#### Random

```js
import { random, randomNumber, randomElement, randomAdjective, randomAnimal, randomName, generateOTP } from "utility-kit";

console.log(random()); // A drop-in and secure replacement for Math.random(), offering truly random numbers generated using cryptographic sources.

console.log(random(16)); // Generates a truly random number using 16 bytes, providing a wider range and higher precision. The number of bytes ranges from 1-127 with 8 being default.

console.log(randomNumber(10, 20)); // Any number between 10 and 20 (both numbers included) will be logged

console.log(randomElement([3, 2, 10, 7, 8])); // Any one random element of the array will be logged

console.log(randomAdjective()); // Any one adjective from a list of 25 adjective will be logged

console.log(randomAnimal()); // Any one animal from a list of 200 animals will be logged

console.log(randomName("-")); // A combination of randomAdjective() and randomAnimal() will be logged with a "-" separator in between. Default separator is " "

console.log(generateOTP(6)); // A 6 digit string OTP will be logged
```

#### Math

```js
import { probability, minimumNumber, maximumNumber } from "utility-kit";

if (probability(0.5)) console.log(true); // There is a 50% chance that true will be logged

const array = [89, 6, 99, 2, 50, 10];
console.log(minimumNumber(array)); // 2
console.log(maximumNumber(array)); // 99
```

#### Time

```js
import { wait } from "utility-kit";

async function test(time) {
  const ref = Date.now();
  await wait(time);
  return Date.now() - ref;
}

test(1000).then((time) => console.log(time)); // ~1000
```

#### Utility

```js
import { probability, retry, retryAsync } from "utility-kit";

// Some error prone callback
function errorProne() {
  if (probability(0.5)) {
    console.log("fail");
    throw new Error("Something went wrong");
  }
  console.log("success");
  return "hurray";
}
retry(errorProne); // "fail" will be logged at most 3 (default) times until "success" is logged
retry(errorProne, { retries: 8 }); // "fail" will be logged at most 8 times until "success" is logged
retry(errorProne, {
  // onSuccess is a function with a single parameter which will have the value that is returned by the callback function and will be invoked only in case on success. Here, "hurray" will also be logged after "success".
  onSuccess: (result) => console.log(result),
  // onError is a function with a single parameter which will contain the information about error that occured in callback function and will be invoked in case of failure. Here, error will be "Something went wrong"
  onError: (error) => console.log(error),
});

// For functions with non-zero parameters
function readChunk(file, chunkNumber);
const chunk = retry(() => readChunk(file, 2));
console.log(chunk); // either 2nd chunk of file in case of success or undefined in case of failure

// For handling asynchronous callbacks or retrying after some incremental delay
async function uploadFile(file); // A function that uploads a file asynchronously, resolving to the file link on success or rejecting on failure.
const link = await retryAsync(async () => await uploadFile(file), { retries: 4 });
console.log(link); // link to the uploaded file if file upload successful in any of the 5(1+4) tries or undefined in case of failure

// In below example, if file upload fails, then retryAsync will wait for 1000ms (initialDelay) before retrying to upload the file and this wait will increase by 500ms (delayIncrement) for every next retry.
await retryAsync(async () => await uploadFile(file), {
  initialDelay: 1000, // In ms, default is 0
  delayIncement: 500, // In ms, default is 0
  onSuccess: console.log,
  onError: console.log,
});
```

## Author

[Sahil Aggarwal](https://www.github.com/SahilAggarwal2004)
