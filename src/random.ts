import { randomBytes } from "crypto";

// 25 adjectives
const adjectives = ["Amazing", "Beautiful", "Calm", "Dangerous", "Enormous", "Fantastic", "Gentle", "Happy", "Invincible", "Jolly", "Kind", "Lovely", "Marvelous", "Naughty", "Observant", "Powerful", "Quiet", "Ruthless", "Sleepy", "Tremendous", "Unique", "Violent", "Wonderful", "Young", "Zestful"];

// 200 animals
const animals = ["Albatross", "Alligator", "Ant", "Antelope", "Ape", "Baboon", "Barracuda", "Bat", "Bear", "Beaver", "Bee", "Bison", "Boar", "Buffalo", "Butterfly", "Camel", "Cat", "Caterpillar", "Cattle", "Cheetah", "Chicken", "Chimpanzee", "Clam", "Cobra", "Crab", "Crane", "Crocodile", "Crow", "Curlew", "Deer", "Dinosaur", "Dog", "Dolphin", "Donkey", "Dotterel", "Dove", "Dragonfly", "Duck", "Dugong", "Dunlin", "Eagle", "Elephant", "Emu", "Falcon", "Ferret", "Finch", "Fish", "Flamingo", "Fly", "Fox", "Frog", "Gaur", "Gazelle", "Gerbil", "Giraffe", "Gnat", "Gnu", "Goat", "Goldfinch", "Goldfish", "Goose", "Gorilla", "Goshawk", "Grasshopper", "Grouse", "Guanaco", "Gull", "Hamster", "Hare", "Hawk", "Hedgehog", "Heron", "Herring", "Hippopotamus", "Hornet", "Horse", "Human", "Hummingbird", "Hyena", "Ibex", "Ibis", "Jackal", "Jaguar", "Jay", "Jellyfish", "Kangaroo", "Kingfisher", "Koala", "Kookabura", "Kouprey", "Kudu", "Lapwing", "Lark", "Lemur", "Leopard", "Lion", "Llama", "Lobster", "Locust", "Loris", "Louse", "Lyrebird", "Magpie", "Mallard", "Manatee", "Mandrill", "Mantis", "Marten", "Meerkat", "Mink", "Mole", "Mongoose", "Monkey", "Moose", "Mosquito", "Mouse", "Mule", "Narwhal", "Newt", "Nightingale", "Octopus", "Okapi", "Opossum", "Oryx", "Ostrich", "Otter", "Owl", "Oyster", "Panther", "Parrot", "Partridge", "Peafowl", "Pelican", "Penguin", "Pheasant", "Pig", "Pigeon", "Pony", "Porcupine", "Porpoise", "Quail", "Quelea", "Quetzal", "Rabbit", "Raccoon", "Rail", "Ram", "Rat", "Raven", "Red deer", "Red panda", "Reindeer", "Rhinoceros", "Rook", "Salamander", "Salmon", "Sand Dollar", "Sandpiper", "Sardine", "Scorpion", "Seahorse", "Seal", "Shark", "Sheep", "Shrew", "Skunk", "Snail", "Snake", "Sparrow", "Spider", "Spoonbill", "Squid", "Squirrel", "Starling", "Stingray", "Swallow", "Swan", "Termite", "Tiger", "Toad", "Trout", "Turkey", "Turtle", "Viper", "Vulture", "Wallaby", "Walrus", "Wasp", "Weasel", "Whale", "Wildcat", "Wolf", "Wolverine", "Wombat", "Woodcock", "Woodpecker", "Worm", "Wren", "Yak", "Zebra"];

export function random(n: number = 8) {
  n = n & ~0x7f ? (n > 0 ? 127 : 1) : n;
  const bytes = randomBytes(n);
  const maxValue = BigInt(2) ** BigInt(n * 8);
  const value = BigInt("0x" + bytes.toString("hex"));
  return Number(value) / Number(maxValue);
}

export const randomNumber = (min: number = 0, max: number = Number.MAX_SAFE_INTEGER) => min + Math.floor(random() * (max - min + 1));

export function randomElement<T>(array: T[]) {
  return array[randomNumber(0, array.length - 1)];
}

export const randomAdjective = () => randomElement(adjectives);

export const randomAnimal = () => randomElement(animals);

export const randomName = (separator: string = " ") => `${randomAdjective()}${separator}${randomAnimal()}`;

export function generateOTP(digits: number = 4) {
  digits = Math.min(digits, 20);
  const max = +"9".repeat(digits);
  let number = randomNumber(0, max).toString();
  number = "0".repeat(digits - number.length) + number;
  return number;
}
