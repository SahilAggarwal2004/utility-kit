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
- Retry wrapper
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
```javascript
import { randomNumber, randomElement, randomAdjective, randomAnimal, randomName, generateOTP } from 'utility-kit';

console.log(randomNumber(10, 20)) // Any number between 10 and 20 (both numbers included) will be logged

console.log(randomElement([3, 2, 10, 7, 8])) // Any one random element of the array will be logged

console.log(randomAdjective()) // Any one adjective from a list of 25 adjective will be logged

console.log(randomAnimal()) // Any one animal from a list of 200 animals will be logged

console.log(randomName('-')) // A combination of randomAdjective() and randomAnimal() will be logged with a '-' separator in between. Default separator is ' '

console.log(generateOTP(6)) // A 6 digit string OTP will be logged
```
#### Math
```javascript
import { probability, minimumNumber, maximumNumber } from 'utility-kit';

if (probability(0.5)) console.log(true) // There is a 50% chance that true will be logged

const array = [89, 6, 99, 2, 50, 10]
console.log(minimumNumber(array)) // 2
console.log(maximumNumber(array)) // 99
```
#### Time
```javascript
import { wait } from 'utility-kit';

async function test(time) {
  const ref = Date.now()
  await wait(time)
  return Date.now() - ref
}

test(1000).then(time => console.log(time)) // ~1000
```
#### Utility
```javascript
import { probability, retry } from 'utility-kit';

function errorProne() { // Some error prone callback
  if (probability(0.5)) {
    console.log('fail')
    throw new Error('Something went wrong');
  }
  console.log('success')
}
retry(errorProne) // fail will be logged at most 3 (default) times until success is logged
retry(errorProne, 8) // fail will be logged at most 8 times until success is logged
retry(errorProne, 8, true) // each time failure occurs, the reason for failure will also be logged (here, Something went wrong)

// Handles asynchronous callbacks too
async function uploadFile(file); // A function that uploads a file asynchronously, resolving to the file link on success or rejecting on failure.
let link = await retry(uploadFile, 4, true) // For callbacks with zero parameters
link = await retry(async () => await uploadFile(file), 4, true) // For callbacks with non-zero parameters
console.log(link) // link to the uploaded file if file upload successful in any of the 5(1+4) tries or undefined in case of failure
```
## Author
[Sahil Aggarwal](https://www.github.com/SahilAggarwal2004)