import { getRandomInt } from "./api";

export const counters = {
  default: "default",
  blue: "blue",
  red: "red",
  square: "square",
  half: "half",
  diamond: "diamond",
  rainbow: "rainbow",
  orange: "orange",
  green: "green",
  darkpurple: "darkpurple",
  yellow: "yellow",
  purple: "purple",
  pink: "pink",
  black: "black",
  lightblue: "lightblue",
};

const puzzleTypes = {
  number: "number",
  abstract: "abstract",
};

export const levelTypes = {
  assessment: "assessment",
};

const ones = {
  one: [1],
};

const twos = {
  two: [2],
  one_one: [1, 1],
};

const threes = {
  one_two: [1, 2],
  one_one_one: [1, 1, 1],
  three: [3],
};

const fours = {
  two_two: [2, 2],
  one_one_two: [1, 1, 2],
  one_three: [1, 3],
  three_one: [3, 1],
  four: [4],
};

const fives = {
  five: [5],
  one_four: [1, 4],
  two_three: [2, 3],
  one_two_two: [1, 2, 2],
  one_one_three: [1, 1, 3],
  one_one_one_two: [1, 1, 1, 2],
};

const sixes = {
  six: [6],
  one_five: [1, 5],
  two_four: [2, 4],
  three_three: [3, 3],
  two_two_two: [2, 2, 2],
  one_two_three: [2, 2, 2],
};

const sevens = {
  seven: [7],
  one_six: [1, 6],
  two_five: [2, 5],
  three_four: [3, 4],
  two_two_three: [2, 2, 3],
  one_three_three: [1, 3, 3],
  one_one_three: [1, 1, 5],
};

const eights = {
  eight: [8],
  one_seven: [1, 7],
  two_six: [2, 6],
  three_five: [3, 5],
  four_four: [4, 4],
  two_two_four: [2, 2, 4],
  two_three_three: [2, 3, 3],
  two_five_one: [2, 5, 1],
  two_two_two_two: [2, 2, 2, 2],
};

const nines = {
  nine: [9],
  one_eight: [1, 8],
  two_seven: [2, 7],
  three_six: [3, 6],
  four_five: [4, 5],
  two_two_five: [2, 2, 5],
  three_three_three: [3, 3, 3],
  two_three_four: [2, 3, 4],
  two_two_five: [2, 2, 5],
  two_two_two_three: [2, 2, 2, 3],
  one_one_three: [2, 2, 2, 3],
};

const tens = {
  ten: [10],
  one_nine: [1, 9],
  two_eight: [2, 8],
  three_seven: [3, 7],
  four_six: [4, 6],
  five_five: [5, 5],
  two_three_five: [2, 3, 5],
  three_three_three: [3, 3, 4],
  two_three_four: [2, 2, 6],
  two_three_four: [2, 4, 4],
  one_one_three: [2, 2, 2, 4],
};

const elevens = {
  eleven: [11],
  one_ten: [1, 10],
  two_nine: [2, 9],
  three_eight: [3, 8],
  four_seven: [4, 7],
  five_six: [5, 6],
};

const twelves = {
  twelve: [12],
  two_ten: [2, 10],
  three_nine: [3, 9],
  four_eight: [4, 8],
  five_seven: [5, 7],
  six_six: [6, 6],
};

const thirteens = {
  thirteen: [13],
  three_ten: [3, 10],
  four_nine: [4, 9],
  five_eight: [5, 8],
  six_seven: [6, 7],
};

const fourteens = {
  fourteen: [14],
  four_ten: [4, 10],
  five_nine: [5, 9],
  six_eight: [6, 8],
  five_nine: [5, 9],
};

const fifteens = {
  fifteen: [15],
  five_ten: [5, 10],
  six_nine: [6, 9],
  seven_eight: [7, 8],
};

const sixteens = {
  sixteen: [16],
  six_ten: [6, 10],
  seven_nine: [7, 9],
  eight_eight: [8, 8],
};

const seventeens = {
  seventeen: [17],
  seven_ten: [7, 10],
  eight_nine: [8, 9],
};

const eighteens = {
  eighteen: [18],
  eight_ten: [8, 10],
  nine_nine: [9, 9],
};

const nineteens = {
  nineteen: [19],
  nine_ten: [9, 10],
};

const twenties = {
  twenty: [20],
  ten_ten: [10, 10],
};

export const PM = {
  1: [[0.5, 0.5]],
  2: [
    [0, 0],
    [1, 1],
  ],
  3: [
    [0.5, 0],
    [0, 1],
    [1, 1],
  ],
  4: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
};

// #region Abstract Pre Assessment

export const PAP1 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: twos.one_one },
    { types: [1, 1], arr: threes.one_two },
    { types: [1, 1], arr: threes.one_two },
    { types: [1, 1, 1], arr: threes.one_one_one },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const PAP1P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: twos.one_one },
    { types: [1, 1], arr: threes.one_two },
    { types: [1, 1], arr: threes.one_two },
    { types: [1], arr: threes.three },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const PAP2 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: fours.one_three },
    { types: [1, 1], arr: threes.one_two },
    { types: [1, 1], arr: threes.one_two },
    { types: [1, 1, 1], arr: threes.one_one_one },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const PAP2P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: fours.two_two },
    { types: [1, 1], arr: threes.one_two },
    { types: [1, 1], arr: threes.one_two },
    { types: [1, 1, 1], arr: threes.one_one_one },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const PAP3 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: fours.one_three },
    { types: [1, 1], arr: fours.two_two },
    { types: [1, 1], arr: fours.one_three },
    { types: [1, 1, 1], arr: threes.one_one_one },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const PAP3P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: fours.one_three },
    { types: [1, 1], arr: fours.two_two },
    { types: [1, 1], arr: fours.one_three },
    { types: [1, 1], arr: threes.one_two },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const PAP4 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: fours.one_three },
    { types: [1, 1], arr: fours.two_two },
    { types: [1, 1], arr: fours.one_three },
    { types: [1, 1], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const PAP4P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: fours.one_three },
    { types: [1, 1], arr: fours.two_two },
    { types: [1, 1], arr: fours.one_three },
    { types: [1, 1], arr: fives.two_three },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const PAP5 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: fours.one_three },
    { types: [1, 1], arr: fives.two_three },
    { types: [1, 1], arr: fives.five },
    { types: [1, 1], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: "number",
  counter: counters.black,
};

export const PAP5P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: fours.three_one },
    { types: [1, 1], arr: fives.two_three },
    { types: [1, 1, 1], arr: fives.one_one_three },
    { types: [1, 1], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: "number",
  counter: counters.black,
};

export const PAP6 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: sixes.three_three },
    { types: [1, 1], arr: fives.two_three },
    { types: [1, 1, 1], arr: fives.one_two_two },
    { types: [1, 1], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: "number",
  counter: counters.black,
};

export const PAP6P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: sixes.two_four },
    { types: [1, 1], arr: fives.two_three },
    { types: [1, 1, 1], arr: fives.one_two_two },
    { types: [1, 1], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: "number",
  counter: counters.black,
};

export const PAP7 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: sixes.three_three },
    { types: [1, 1], arr: sixes.two_four },
    { types: [1, 1, 1], arr: sixes.two_two_two },
    { types: [1, 1], arr: fives.two_three },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP7P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: sixes.three_three },
    { types: [1, 1], arr: sixes.two_four },
    { types: [1, 1, 1], arr: sixes.one_five },
    { types: [1, 1], arr: fives.two_three },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP8 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: sixes.one_five },
    { types: [1, 1], arr: sixes.two_four },
    { types: [1, 1, 1], arr: sixes.two_two_two },
    { types: [1, 1], arr: sevens.three_four },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP8P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: sixes.one_five },
    { types: [1, 1], arr: sixes.two_four },
    { types: [1, 1, 1], arr: sixes.two_two_two },
    { types: [1, 1], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP9 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: sixes.one_five },
    { types: [1, 1, 1], arr: sevens.two_two_three },
    { types: [1, 1, 1], arr: sevens.three_four },
    { types: [1, 1], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: "number",
  counter: counters.black,
};

export const PAP9P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: sixes.three_three },
    { types: [1, 1, 1], arr: sevens.two_two_three },
    { types: [1, 1, 1], arr: sevens.three_four },
    { types: [1, 1], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: "number",
  counter: counters.black,
};

export const PAP10 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: eights.three_five },
    { types: [1, 1, 1], arr: sevens.two_two_three },
    { types: [1, 1, 1], arr: sevens.one_six },
    { types: [1, 1], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: "number",
  counter: counters.black,
};

export const PAP10P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: eights.three_five },
    { types: [1, 1, 1], arr: sevens.two_two_three },
    { types: [1, 1, 1], arr: sevens.three_four },
    { types: [1, 1], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: "number",
  counter: counters.black,
};

export const PAP11 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: eights.three_five },
    { types: [1, 1, 1], arr: eights.two_two_four },
    { types: [1, 1], arr: eights.four_four },
    { types: [1, 1], arr: sevens.three_four },
  ],
  mesh: [2, 2],
  value: 8,
  type: "number",
  counter: counters.black,
};

export const PAP11P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: eights.two_six },
    { types: [1, 1, 1], arr: eights.two_two_four },
    { types: [1, 1], arr: eights.four_four },
    { types: [1, 1], arr: sevens.three_four },
  ],
  mesh: [2, 2],
  value: 8,
  type: "number",
  counter: counters.black,
};

export const PAP12 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: eights.three_five },
    { types: [1, 1, 1], arr: eights.four_four },
    { types: [1, 1, 1], arr: eights.two_two_four },
    { types: [1, 1], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 8,
  type: "number",
  counter: counters.black,
};

export const PAP12P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: eights.three_five },
    { types: [1, 1, 1], arr: eights.four_four },
    { types: [1, 1, 1], arr: eights.two_two_four },
    { types: [1, 1], arr: nines.three_six },
  ],
  mesh: [2, 2],
  value: 8,
  type: "number",
  counter: counters.black,
};

export const PAP13 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: eights.three_five },
    { types: [1, 1, 1], arr: nines.two_two_five },
    { types: [1, 1], arr: nines.three_six },
    { types: [1, 1], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 9,
  type: "number",
  counter: counters.black,
};

export const PAP13P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: eights.four_four },
    { types: [1, 1, 1], arr: nines.two_two_five },
    { types: [1, 1], arr: nines.three_six },
    { types: [1, 1], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 9,
  type: "number",
  counter: counters.black,
};

export const PAP14 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: tens.five_five },
    { types: [1, 1, 1], arr: nines.two_two_five },
    { types: [1, 1], arr: nines.three_six },
    { types: [1, 1], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 9,
  type: "number",
  counter: counters.black,
};

export const PAP14P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: tens.two_eight },
    { types: [1, 1, 1], arr: nines.two_two_five },
    { types: [1, 1], arr: nines.three_six },
    { types: [1, 1], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 9,
  type: "number",
  counter: counters.black,
};

export const PAP15 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: tens.five_five },
    { types: [1, 1, 1], arr: tens.four_six },
    { types: [1, 1, 1], arr: tens.three_seven },
    { types: [1, 1], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const PAP15P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: tens.five_five },
    { types: [1, 1, 1], arr: tens.four_six },
    { types: [1, 1, 1], arr: tens.three_seven },
    { types: [1, 1, 1], arr: nines.two_two_five },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const PAP16 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: tens.one_nine },
    { types: [1, 1, 1], arr: tens.two_eight },
    { types: [1, 1, 1], arr: tens.three_seven },
    { types: [1, 1], arr: elevens.one_ten },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const PAP16P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: tens.five_five },
    { types: [1, 1, 1], arr: tens.two_eight },
    { types: [1, 1, 1], arr: tens.three_seven },
    { types: [1, 1], arr: elevens.one_ten },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const PAP17 = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: tens.four_six },
    { types: [1, 1, 1], arr: elevens.five_six },
    { types: [1, 1, 1], arr: elevens.two_nine },
    { types: [1, 1], arr: elevens.four_seven },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP17P = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: tens.four_six },
    { types: [1, 1, 1], arr: elevens.five_six },
    { types: [1, 1, 1], arr: elevens.three_eight },
    { types: [1, 1], arr: elevens.four_seven },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

// #endregion

// #region Abstract Pre Assessment

export const PAP1V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: twos.one_one },
    { types: [0, 0], arr: threes.one_two },
    { types: [0, 0], arr: threes.one_two },
    { types: [0, 0, 0], arr: threes.one_one_one },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const PAP1VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: twos.one_one },
    { types: [0, 0], arr: threes.one_two },
    { types: [0, 0], arr: threes.one_two },
    { types: [0], arr: threes.three },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const PAP2V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.one_three },
    { types: [0, 0], arr: threes.one_two },
    { types: [0, 0], arr: threes.one_two },
    { types: [0, 0, 0], arr: threes.one_one_one },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const PAP2VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.two_two },
    { types: [0, 0], arr: threes.one_two },
    { types: [0, 0], arr: threes.one_two },
    { types: [0, 0, 0], arr: threes.one_one_one },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const PAP3V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.one_three },
    { types: [0, 0], arr: fours.two_two },
    { types: [0, 0], arr: fours.one_three },
    { types: [0, 0,0], arr: threes.one_one_one },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const PAP3VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.one_three },
    { types: [0, 0], arr: fours.two_two },
    { types: [0, 0], arr: fours.one_three },
    { types: [0, 0], arr: threes.one_two },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const PAP4V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.one_three },
    { types: [0, 0], arr: fours.two_two },
    { types: [0, 0], arr: fours.one_three },
    { types: [0, 0], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const PAP4VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.one_three },
    { types: [0, 0], arr: fours.two_two },
    { types: [0, 0], arr: fours.one_three },
    { types: [0, 0], arr: fives.two_three },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const PAP5V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.one_three },
    { types: [0, 0], arr: fives.two_three },
    { types: [0, 0], arr: fives.five },
    { types: [0, 0], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: "number",
  counter: counters.black,
};

export const PAP5VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.three_one },
    { types: [0, 0], arr: fives.two_three },
    { types: [0, 0,0], arr: fives.one_one_three },
    { types: [0, 0], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: "number",
  counter: counters.black,
};

export const PAP6V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: sixes.three_three },
    { types: [0, 0], arr: fives.two_three },
    { types: [0, 0, 0], arr: fives.one_two_two },
    { types: [0, 0], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: "number",
  counter: counters.black,
};

export const PAP6VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: sixes.two_four },
    { types: [0, 0], arr: fives.two_three },
    { types: [0, 0,0], arr: fives.one_two_two },
    { types: [0, 0], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: "number",
  counter: counters.black,
};

export const PAP7V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: sixes.three_three },
    { types: [0, 0], arr: sixes.two_four },
    { types: [0, 0,0], arr: sixes.two_two_two },
    { types: [0, 0], arr: fives.two_three },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP7VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: sixes.three_three },
    { types: [0, 0], arr: sixes.two_four },
    { types: [0, 0,0], arr: sixes.one_five },
    { types: [0, 0], arr: fives.two_three },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP8V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: sixes.one_five },
    { types: [0, 0], arr: sixes.two_four },
    { types: [0, 0,0], arr: sixes.two_two_two },
    { types: [0, 0], arr: sevens.three_four },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP8VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: sixes.one_five },
    { types: [0, 0], arr: sixes.two_four },
    { types: [0, 0,0], arr: sixes.two_two_two },
    { types: [0, 0], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP9V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: sixes.one_five },
    { types: [0, 0,0], arr: sevens.two_two_three },
    { types: [0, 0, 0], arr: sevens.three_four },
    { types: [0, 0], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: "number",
  counter: counters.black,
};

export const PAP9VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: sixes.three_three },
    { types: [0, 0,0], arr: sevens.two_two_three },
    { types: [0, 0,0], arr: sevens.three_four },
    { types: [0, 0], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: "number",
  counter: counters.black,
};

export const PAP10V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: eights.three_five },
    { types: [0, 0,0], arr: sevens.two_two_three },
    { types: [0, 0,0], arr: sevens.one_six },
    { types: [0, 0], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: "number",
  counter: counters.black,
};

export const PAP10VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: eights.three_five },
    { types: [0, 0,0], arr: sevens.two_two_three },
    { types: [0, 0,0], arr: sevens.three_four },
    { types: [0, 0], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: "number",
  counter: counters.black,
};

export const PAP11V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: eights.three_five },
    { types: [0, 0, 0], arr: eights.two_two_four },
    { types: [0, 0], arr: eights.four_four },
    { types: [0, 0], arr: sevens.three_four },
  ],
  mesh: [2, 2],
  value: 8,
  type: "number",
  counter: counters.black,
};

export const PAP11VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: eights.two_six },
    { types: [0, 0,0], arr: eights.two_two_four },
    { types: [0, 0], arr: eights.four_four },
    { types: [0, 0], arr: sevens.three_four },
  ],
  mesh: [2, 2],
  value: 8,
  type: "number",
  counter: counters.black,
};

export const PAP12V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: eights.three_five },
    { types: [0, 0,0], arr: eights.four_four },
    { types: [0, 0, 0], arr: eights.two_two_four },
    { types: [0, 0], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 8,
  type: "number",
  counter: counters.black,
};

export const PAP12VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: eights.three_five },
    { types: [0, 0,0], arr: eights.four_four },
    { types: [0, 0, 0], arr: eights.two_two_four },
    { types: [0, 0], arr: nines.three_six },
  ],
  mesh: [2, 2],
  value: 8,
  type: "number",
  counter: counters.black,
};

export const PAP13V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: eights.three_five },
    { types: [0, 0, 0], arr: nines.two_two_five },
    { types: [0, 0], arr: nines.three_six },
    { types: [0, 0], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 9,
  type: "number",
  counter: counters.black,
};

export const PAP13VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: eights.four_four },
    { types: [0, 0, 0], arr: nines.two_two_five },
    { types: [0, 0], arr: nines.three_six },
    { types: [0, 0], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 9,
  type: "number",
  counter: counters.black,
};

export const PAP14V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: tens.five_five },
    { types: [0, 0, 0], arr: nines.two_two_five },
    { types: [0, 0], arr: nines.three_six },
    { types: [0, 0], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 9,
  type: "number",
  counter: counters.black,
};

export const PAP14VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: tens.two_eight },
    { types: [0, 0, 0], arr: nines.two_two_five },
    { types: [0, 0], arr: nines.three_six },
    { types: [0, 0], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 9,
  type: "number",
  counter: counters.black,
};

export const PAP15V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: tens.five_five },
    { types: [0, 0, 0], arr: tens.four_six },
    { types: [0, 0, 0], arr: tens.three_seven },
    { types: [0, 0], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const PAP15VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: tens.five_five },
    { types: [0, 0, 0], arr: tens.four_six },
    { types: [0, 0, 0], arr: tens.three_seven },
    { types: [0, 0, 0], arr: nines.two_two_five },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const PAP16V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: tens.one_nine },
    { types: [0, 0, 0], arr: tens.two_eight },
    { types: [0, 0, 0], arr: tens.three_seven },
    { types: [0, 0], arr: elevens.one_ten },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const PAP16VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: tens.five_five },
    { types: [0, 0, 0], arr: tens.two_eight },
    { types: [0, 0, 0], arr: tens.three_seven },
    { types: [0, 0], arr: elevens.one_ten },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const PAP17V = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: tens.four_six },
    { types: [0, 0, 0], arr: elevens.five_six },
    { types: [0, 0, 0], arr: elevens.two_nine },
    { types: [0, 0], arr: elevens.four_seven },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP17VP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: tens.four_six },
    { types: [0, 0, 0], arr: elevens.five_six },
    { types: [0, 0, 0], arr: elevens.three_eight },
    { types: [0, 0], arr: elevens.four_seven },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

// #endregion


// #region Visual/Abstract




// P.re A.ssessment P.uzzle 1 ,  P.re A.ssessment P.uzzle 1 P.ost

export const PAP1C = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: twos.one_one },
    { types: [1, 0], arr: threes.one_two },
    { types: [0, 1], arr: threes.one_two },
    { types: [0, 0, 0], arr: threes.one_one_one },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const PAP1CP = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: twos.one_one },
    { types: [1, 0], arr: threes.one_two },
    { types: [0, 1], arr: threes.one_two },
    { types: [0], arr: threes.three },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const PAP2C = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: fours.one_three },
    { types: [0, 0], arr: threes.one_two },
    { types: [1, 1], arr: threes.one_two },
    { types: [0, 0, 0], arr: threes.one_one_one },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const PAP2CP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.two_two },
    { types: [0, 1], arr: threes.one_two },
    { types: [0, 1], arr: threes.one_two },
    { types: [1, 1, 1], arr: threes.one_one_one },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const PAP3C = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: fours.one_three },
    { types: [0, 0], arr: fours.two_two },
    { types: [1, 0], arr: fours.one_three },
    { types: [0, 0, 0], arr: threes.one_one_one },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const PAP3CP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.one_three },
    { types: [0, 1], arr: fours.two_two },
    { types: [1, 0], arr: fours.one_three },
    { types: [1, 0], arr: threes.one_two },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const PAP4C = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: fours.one_three },
    { types: [0, 0], arr: fours.two_two },
    { types: [1, 0], arr: fours.one_three },
    { types: [1, 0], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const PAP4CP = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: fours.one_three },
    { types: [0, 0], arr: fours.two_two },
    { types: [0, 1], arr: fours.one_three },
    { types: [0, 1], arr: fives.two_three },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const PAP5C = {
  grid: [2, 2],
  cards: [
    { types: [1, 0], arr: fours.one_three },
    { types: [1, 1], arr: fives.two_three },
    { types: [0], arr: fives.five },
    { types: [1, 0], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: "number",
  counter: counters.black,
};

export const PAP5CP = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: fours.one_three },
    { types: [0, 1], arr: fives.two_three },
    { types: [0, 0, 1], arr: fives.one_one_three },
    { types: [0, 1], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: "number",
  counter: counters.black,
};

export const PAP6C = {
  grid: [2, 2],
  cards: [
    { types: [1, 0], arr: sixes.three_three },
    { types: [1, 0], arr: fives.two_three },
    { types: [0, 0, 0], arr: fives.one_two_two },
    { types: [1, 0], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: "number",
  counter: counters.black,
};

export const PAP6CP = {
  grid: [2, 2],
  cards: [
    { types: [1, 0], arr: sixes.two_four },
    { types: [1, 0], arr: fives.two_three },
    { types: [1, 0, 0], arr: fives.one_two_two },
    { types: [1, 0], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: "number",
  counter: counters.black,
};

export const PAP7C = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: sixes.three_three },
    { types: [1, 1], arr: sixes.two_four },
    { types: [0, 0, 0], arr: sixes.two_two_two },
    { types: [1, 0], arr: fives.two_three },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP7CP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: sixes.three_three },
    { types: [0, 0], arr: sixes.two_four },
    { types: [1, 0], arr: sixes.one_five },
    { types: [0, 0], arr: fives.two_three },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP8C = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: sixes.one_five },
    { types: [0, 1], arr: sixes.two_four },
    { types: [0, 0, 0], arr: sixes.two_two_two },
    { types: [0, 1], arr: sevens.three_four },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP8CP = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: sixes.one_five },
    { types: [0, 0], arr: sixes.two_four },
    { types: [0, 0, 0], arr: sixes.two_two_two },
    { types: [0, 1], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP9C = {
  grid: [2, 2],
  cards: [
    { types: [1, 0], arr: sixes.one_five },
    { types: [0, 0, 1], arr: sevens.two_two_three },
    { types: [1, 0], arr: sevens.three_four },
    { types: [1, 0], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: "number",
  counter: counters.black,
};

export const PAP9CP = {
  grid: [2, 2],
  cards: [
    { types: [1, 0], arr: sixes.three_three },
    { types: [0, 0, 1], arr: sevens.two_two_three },
    { types: [1, 0], arr: sevens.three_four },
    { types: [0, 1], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: "number",
  counter: counters.black,
};

export const PAP10C = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: eights.three_five },
    { types: [1, 1, 0], arr: sevens.two_two_three },
    { types: [0, 1], arr: sevens.one_six },
    { types: [0, 1], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: "number",
  counter: counters.black,
};

export const PAP10CP = {
  grid: [2, 2],
  cards: [
    { types: [1, 0], arr: eights.three_five },
    { types: [0, 0, 0], arr: sevens.two_two_three },
    { types: [1, 0], arr: sevens.three_four },
    { types: [0, 0], arr: sevens.two_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: "number",
  counter: counters.black,
};

export const PAP11C = {
  grid: [2, 2],
  cards: [
    { types: [1, 0], arr: eights.three_five },
    { types: [1, 1, 0], arr: eights.two_two_four },
    { types: [1, 0], arr: eights.four_four },
    { types: [1, 0], arr: sevens.three_four },
  ],
  mesh: [2, 2],
  value: 8,
  type: "number",
  counter: counters.black,
};

export const PAP11CP = {
  grid: [2, 2],
  cards: [
    { types: [1, 0], arr: eights.two_six },
    { types: [1, 0, 0], arr: eights.two_two_four },
    { types: [1, 0], arr: eights.four_four },
    { types: [0, 1], arr: sevens.three_four },
  ],
  mesh: [2, 2],
  value: 8,
  type: "number",
  counter: counters.black,
};

export const PAP12C = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: eights.three_five },
    { types: [1, 1], arr: eights.four_four },
    { types: [0, 0, 0], arr: eights.two_two_four },
    { types: [0, 1], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 8,
  type: "number",
  counter: counters.black,
};

export const PAP12CP = {
  grid: [2, 2],
  cards: [
    { types: [1, 0], arr: eights.three_five },
    { types: [0, 0], arr: eights.four_four },
    { types: [0, 0, 1], arr: eights.two_two_four },
    { types: [1, 0], arr: nines.three_six },
  ],
  mesh: [2, 2],
  value: 8,
  type: "number",
  counter: counters.black,
};

export const PAP13C = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: eights.three_five },
    { types: [0, 0, 1], arr: nines.two_two_five },
    { types: [1, 0], arr: nines.three_six },
    { types: [1, 0], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 9,
  type: "number",
  counter: counters.black,
};

export const PAP13CP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: eights.four_four },
    { types: [0, 0, 1], arr: nines.two_two_five },
    { types: [1, 0], arr: nines.three_six },
    { types: [0, 1], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 9,
  type: "number",
  counter: counters.black,
};

export const PAP14C = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: tens.five_five },
    { types: [0, 0, 1], arr: nines.two_two_five },
    { types: [1, 1], arr: nines.three_six },
    { types: [0, 0], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 9,
  type: "number",
  counter: counters.black,
};

export const PAP14CP = {
  grid: [2, 2],
  cards: [
    { types: [1, 1], arr: tens.two_eight },
    { types: [0, 0, 1], arr: nines.two_two_five },
    { types: [0, 0], arr: nines.three_six },
    { types: [0, 0], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 9,
  type: "number",
  counter: counters.black,
};

export const PAP15C = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: tens.five_five },
    { types: [1, 1], arr: tens.four_six },
    { types: [0, 0], arr: tens.three_seven },
    { types: [0, 1], arr: nines.four_five },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const PAP15CP = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: tens.five_five },
    { types: [0, 1], arr: tens.four_six },
    { types: [0, 1], arr: tens.three_seven },
    { types: [0, 0, 1], arr: nines.two_two_five },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const PAP16C = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: tens.one_nine },
    { types: [1, 1], arr: tens.two_eight },
    { types: [1, 0], arr: tens.three_seven },
    { types: [0, 1], arr: elevens.one_ten },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const PAP16CP = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: tens.five_five },
    { types: [1, 1], arr: tens.two_eight },
    { types: [0, 1], arr: tens.three_seven },
    { types: [1, 1], arr: elevens.one_ten },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const PAP17C = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: tens.four_six },
    { types: [0, 1], arr: elevens.five_six },
    { types: [0, 0], arr: elevens.two_nine },
    { types: [0, 1], arr: elevens.four_seven },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const PAP17CP = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: tens.four_six },
    { types: [0, 1], arr: elevens.five_six },
    { types: [1, 0], arr: elevens.three_eight },
    { types: [1, 0], arr: elevens.four_seven },
  ],
  mesh: [2, 2],
  value: 6,
  type: "number",
  counter: counters.black,
};

export const AP_C = [
  [PAP1C, PAP1CP],
  [PAP2C, PAP2CP],
  [PAP3C, PAP3CP],
  [PAP4C, PAP4CP],
  [PAP5C, PAP5CP],
  [PAP6C, PAP6CP],
  [PAP7C, PAP7CP],
  [PAP8C, PAP8CP],
  [PAP9C, PAP9CP],
  [PAP10C, PAP10CP],
  [PAP11C, PAP11CP],
  [PAP12C, PAP12CP],
  [PAP13C, PAP13CP],
  [PAP14C, PAP14CP],
  [PAP15C, PAP15CP],
  [PAP16C, PAP16CP],
  [PAP17C, PAP17CP],
];

export const AP_A = [
  [PAP1, PAP1P],
  [PAP2, PAP2P],
  [PAP3, PAP3P],
  [PAP4, PAP4P],
  [PAP5, PAP5P],
  [PAP6, PAP6P],
  [PAP7, PAP7P],
  [PAP8, PAP8P],
  [PAP9, PAP9P],
  [PAP10, PAP10P],
  [PAP11, PAP11P],
  [PAP12, PAP12P],
  [PAP13, PAP13P],
  [PAP14, PAP14P],
  [PAP15, PAP15P],
  [PAP16, PAP16P],
  [PAP17, PAP17P],
];

export const AP_V = [
  [PAP1V, PAP1VP],
  [PAP2V, PAP2VP],
  [PAP3V, PAP3VP],
  [PAP4V, PAP4VP],
  [PAP5V, PAP5VP],
  [PAP6V, PAP6VP],
  [PAP7V, PAP7VP],
  [PAP8V, PAP8VP],
  [PAP9V, PAP9VP],
  [PAP10V, PAP10VP],
  [PAP11V, PAP11VP],
  [PAP12V, PAP12VP],
  [PAP13V, PAP13VP],
  [PAP14V, PAP14VP],
  [PAP15V, PAP15VP],
  [PAP16V, PAP16VP],
  [PAP17V, PAP17VP],
];



// #endregion


export const Assessment_Visual = {
  type: levelTypes.assessment,
  name: "Visual Assessment",
  puzzles: AP_V
}

export const Assessment_Combined = {
  type: levelTypes.assessment,
  name: "Visual / Abstract Assessment",
  puzzles: AP_C
}

export const Assessment_Abstract = {
  type: levelTypes.assessment,
  name: "Abstract Assessment",
  puzzles: AP_A
}


// #endregion

// #region Eights

export const EP1 = {
  grid: [2, 2],
  value: 6,
  delta: -1,
  mesh: [2, 4],
  random: false,
  counter: counters.orange,
};

export const EP2 = {
  grid: [2, 2],
  value: 7,
  delta: -2,
  mesh: [2, 4],
  random: false,
  counter: counters.orange,
};

export const EP3 = {
  grid: [2, 2],
  value: 7,
  delta: -1,
  mesh: [2, 4],
  random: false,
  counter: counters.orange,
};

export const EP4 = {
  grid: [2, 2],
  value: 6,
  delta: 1,
  mesh: [2, 4],
  random: false,
  counter: counters.orange,
};

export const EP5 = {
  grid: [3, 3],
  value: 7,
  delta: -2,
  mesh: [2, 4],
  random: false,
  counter: counters.orange,
};

export const EP6 = {
  grid: [3, 3],
  value: 6,
  delta: 1,
  mesh: [2, 4],
  random: false,
  counter: counters.orange,
};

export const EP7 = {
  grid: [3, 3],
  value: 7,
  delta: -1,
  mesh: [2, 4],
  random: false,
  counter: counters.orange,
};

export const EA1 = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: eights.two_six },
    { types: [0, 0], arr: eights.four_four },
    { types: [0, 0], arr: sevens.three_four },
    { types: [0, 0], arr: eights.two_two_two_two },
  ],
  mesh: [2, 2],
  value: 8,
  type: puzzleTypes.number,
  counter: counters.black,
};

export const EA2 = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: sevens.two_five },
    { types: [1, 0], arr: eights.four_four },
    { types: [0, 0], arr: eights.two_two_four },
    { types: [0, 0], arr: eights.two_two_two_two },
  ],
  mesh: [2, 2],
  value: 8,
  type: puzzleTypes.number,
  counter: counters.black,
};

export const Eights = {
  name: "All About Eight",
  puzzles: [EP1, EP2, EP3, EP4, EP5, EP6, EP7],
};

// #endregion

// #region Hello

export const TP1 = {
  grid: [2, 2],
  value: 8,
  delta: -2,
  mesh: [5, 2],
  random: false,
  counter: counters.red,
};

export const TP2 = {
  grid: [2, 2],
  value: 8,
  delta: -1,
  mesh: [5, 2],
  random: false,
  counter: counters.red,
};

export const TP3 = {
  grid: [3, 2],
  value: 7,
  delta: 1,
  mesh: [5, 2],
  random: false,
  counter: counters.red,
};

export const TP4 = {
  grid: [3, 3],
  value: 8,
  delta: 1,
  mesh: [5, 2],
  random: false,
  counter: counters.red,
};

export const TP5 = {
  grid: [3, 3],
  value: 8,
  delta: -1,
  mesh: [5, 2],
  random: false,
  counter: counters.red,
};

export const TP6 = {
  grid: [3, 3],
  value: 6,
  delta: -1,
  mesh: [5, 2],
  random: false,
  counter: counters.red,
};

export const TP7 = {
  grid: [3, 3],
  value: 7,
  delta: -1,
  mesh: [5, 2],
  random: false,
  counter: counters.red,
};

export const TP8 = {
  grid: [4, 4],
  value: 5,
  delta: -1,
  mesh: [5, 2],
  random: false,
  counter: counters.red,
};

export const TA1 = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: tens.four_six },
    { types: [0, 0], arr: tens.five_five },
    { types: [0, 0], arr: nines.one_eight },
    { types: [0, 0], arr: tens.three_seven },
  ],
  mesh: [2, 2],
  value: 10,
  counter: counters.black,
  type: puzzleTypes.number,
};

export const TA2 = {
  grid: [2, 2],
  cards: [
    { types: [0, 1], arr: tens.two_eight },
    { types: [0, 0], arr: tens.five_five },
    { types: [0, 0, 0], arr: nines.three_three_three },
    { types: [0, 1], arr: tens.three_seven },
  ],
  mesh: [2, 2],
  value: 10,
  counter: counters.black,
  type: puzzleTypes.number,
};

export const Tens = {
  name: "All About Eight",
  puzzles: [TP1, TP2, TP3, TP4, TP5, TP6, TP7, TP8],
};

// #endregion

// #region Stage One

export const DP1 = {
  grid: [2, 2],
  value: 5,
  delta: 5,
  mesh: [4, 3],
  random: false,
  counter: counters.green,
};

export const DP2 = {
  grid: [2, 2],
  value: 5,
  delta: 5,
  mesh: [5, 4],
  random: false,
  counter: counters.green,
};

export const DP3 = {
  grid: [2, 2],
  value: 10,
  delta: -5,
  mesh: [5, 5],
  random: false,
  counter: counters.green,
};

export const DP4 = {
  grid: [3, 2],
  value: 4,
  delta: 4,
  mesh: [4, 4],
  random: false,
  counter: counters.green,
};

export const DP5 = {
  grid: [3, 3],
  value: 4,
  delta: -2,
  mesh: [4, 4],
  random: false,
  counter: counters.green,
};

export const DP6 = {
  grid: [4, 3],
  value: 2,
  delta: 2,
  mesh: [4, 4],
  random: false,
  counter: counters.green,
};

export const DP7 = {
  grid: [4, 4],
  value: 2,
  delta: -1,
  mesh: [4, 4],
  random: false,
  counter: counters.green,
};

export const DP8 = {
  grid: [5, 5],
  value: 4,
  delta: -2,
  mesh: [3, 3],
  random: false,
  counter: counters.green,
};

export const DP9 = {
  grid: [4, 4],
  value: 6,
  delta: -3,
  mesh: [3, 3],
  random: false,
  counter: counters.green,
};

export const DP10 = {
  grid: [3, 3],
  value: 8,
  delta: -4,
  mesh: [4, 4],
  random: false,
  counter: counters.green,
};

export const DA1 = {
  type: puzzleTypes.number,
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.two_two },
    { types: [0], arr: twos.two },
    { types: [0], arr: fours.four },
    { types: [0, 0], arr: fours.three_one },
  ],
  mesh: [2, 2],
  value: 4,
  counter: counters.black,
};

export const DA2 = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.two_two },
    { types: [0], arr: threes.three },
    { types: [0], arr: fours.three_one },
    { types: [0, 1], arr: fours.three_one },
  ],
  mesh: [2, 2],
  value: 4,
  type: "number",
  counter: counters.black,
};

export const Doubles = {
  name: "Doubles",
  puzzles: [DP1, DP2, DP3, DP4, DP5, DP6, DP7, DP8, DP9, DP10],
};

// #endregion Stage One

// #region PRE-K

export const PK1 = {
  grid: [2, 2],
  value: 2,
  delta: -1,
  mesh: [2, 1],
  random: false,
  counter: counters.pink,
};

export const PK2 = {
  grid: [2, 2],
  value: 1,
  delta: 1,
  mesh: [2, 2],
  random: false,
  counter: counters.pink,
};

export const PK3 = {
  grid: [2, 2],
  value: 2,
  delta: -1,
  mesh: [2, 2],
  random: false,
  counter: counters.pink,
};

export const PK4 = {
  grid: [2, 2],
  value: 3,
  delta: -1,
  mesh: [2, 2],
  random: false,
  counter: counters.pink,
};

export const PK5 = {
  grid: [2, 2],
  value: 2,
  delta: 1,
  mesh: [2, 2],
  random: false,
  counter: counters.pink,
};

export const PK6 = {
  grid: [2, 2],
  value: 2,
  delta: 1,
  mesh: [2, 3],
  random: false,
  counter: counters.pink,
};

export const PK7 = {
  grid: [2, 2],
  value: 2,
  delta: 2,
  mesh: [2, 2],
  random: false,
  counter: counters.pink,
};

export const PK8 = {
  grid: [2, 2],
  value: 3,
  delta: 1,
  mesh: [3, 2],
  random: false,
  counter: counters.pink,
};

export const PK9 = {
  grid: [2, 2],
  value: 3,
  delta: 2,
  mesh: [2, 3],
  random: false,
  counter: counters.pink,
};

export const PK10 = {
  grid: [2, 2],
  value: 5,
  delta: -2,
  mesh: [2, 3],
  random: false,
  counter: counters.pink,
};

export const PK11 = {
  grid: [2, 2],
  value: 5,
  delta: -1,
  mesh: [3, 3],
  random: false,
  counter: counters.pink,
};

export const FirstNumbers = {
  name: "First Numbers",
  puzzles: [PK1, PK3, PK5, PK7, PK8, PK9, PK10, PK11],
};

// #endregion

//  #region Early Length Models

export const LM1 = {
  grid: [2, 2],
  value: 3,
  delta: -1,
  random: false,
  mesh: [5, 1],
  counter: counters.square,
};

export const LM1A = {
  grid: [2, 2],
  value: 4,
  delta: -2,
  random: false,
  mesh: [5, 1],
  counter: counters.square,
};

export const LM1B = {
  grid: [2, 2],
  value: 4,
  delta: -2,
  random: false,
  mesh: [5, 1],
  counter: counters.square,
};

export const LM1C = {
  grid: [2, 2],
  value: 4,
  delta: -1,
  random: false,
  mesh: [5, 1],
  counter: counters.square,
};

export const LM2 = {
  grid: [2, 2],
  value: 3,
  delta: 1,
  mesh: [5, 1],
  random: false,
  counter: counters.square,
};

export const LM3 = {
  grid: [2, 2],
  value: 4,
  delta: -2,
  mesh: [5, 1],
  random: false,
  counter: counters.square,
};

export const LM4 = {
  grid: [2, 2],
  value: 3,
  delta: 1,
  mesh: [5, 1],
  random: false,
  counter: counters.square,
};

export const LM5 = {
  grid: [3, 2],
  value: 3,
  delta: 1,
  mesh: [5, 1],
  counter: counters.square,
};

export const LM6 = {
  grid: [3, 2],
  value: 2,
  delta: 1,
  mesh: [5, 1],
  counter: counters.square,
};

export const FiveFrame = {
  name: "Five Frame",
  puzzles: [LM1, LM2, LM3, LM4, LM5, LM6],
};

// #endregion

// #region K

export const K1 = {
  grid: [2, 2],
  value: 4,
  delta: 1,
  mesh: [3, 2],
  random: false,
  counter: counters.blue,
};

export const K2 = {
  grid: [2, 2],
  value: 5,
  delta: -2,
  mesh: [3, 2],
  random: false,
  counter: counters.blue,
};

export const K3 = {
  grid: [2, 2],
  value: 5,
  delta: -1,
  mesh: [3, 2],
  random: false,
  counter: counters.blue,
};

export const K4 = {
  grid: [2, 2],
  value: 5,
  delta: 1,
  mesh: [3, 3],
  counter: counters.blue,
};

export const K5 = {
  grid: [2, 2],
  value: 5,
  delta: 2,
  mesh: [3, 3],
  random: false,
  counter: counters.blue,
};

export const K6 = {
  grid: [2, 2],
  value: 6,
  delta: 1,
  mesh: [3, 3],
  random: false,
  counter: counters.blue,
};

export const K7 = {
  grid: [2, 2],
  value: 5,
  delta: 2,
  mesh: [3, 3],
  random: false,
  counter: counters.blue,
};

export const K8 = {
  grid: [2, 2],
  value: 5,
  delta: -1,
  mesh: [3, 3],
  random: false,
  counter: counters.blue,
};

export const K9 = {
  grid: [3, 2],
  value: 6,
  delta: 1,
  mesh: [3, 3],
  random: false,
  counter: counters.purple,
};

export const K10 = {
  grid: [3, 3],
  value: 5,
  delta: 3,
  mesh: [4, 4],
  random: false,
  counter: counters.purple,
};

export const KindergartenOpener = {
  name: "Intro to First Grade Numbers",
  puzzles: [K1, K2, K3, K4, K5, K6, K7],
};

// #endregion

// #region Grade 1

export const G1A = {
  grid: [2, 2],
  value: 4,
  delta: 1,
  mesh: [3, 4],
  random: false,
  counter: counters.darkpurple,
};

export const G1B = {
  grid: [2, 2],
  value: 5,
  delta: -1,
  mesh: [3, 4],
  random: false,
  counter: counters.darkpurple,
};

export const G1C = {
  grid: [2, 2],
  value: 6,
  delta: -1,
  mesh: [3, 4],
  random: false,
  counter: counters.darkpurple,
};

export const G1D = {
  grid: [2, 2],
  value: 7,
  delta: 2,
  mesh: [4, 3],
  random: false,
  counter: counters.darkpurple,
};

export const G1E = {
  grid: [3, 3],
  value: 8,
  delta: 2,
  mesh: [4, 3],
  random: false,
  counter: counters.darkpurple,
};

export const G1F = {
  grid: [3, 3],
  value: 7,
  delta: -1,
  mesh: [4, 4],
  random: false,
  counter: counters.darkpurple,
};

export const G1G = {
  grid: [3, 2],
  value: 8,
  delta: 1,
  mesh: [3, 4],
  counter: counters.darkpurple,
};

export const GradeOneOpener = {
  name: "Intro to First Grade Numbers",
  puzzles: [G1A, G1B, G1C, G1D, G1E, G1F, G1G],
};

// #endregion

// #region Rainbows

export const R1 = {
  grid: [2, 2],
  value: 5,
  delta: 1,
  mesh: [4, 4],
  random: false,
  counter: counters.rainbow,
};

export const R2 = {
  grid: [2, 2],
  value: 5,
  delta: -1,
  mesh: [5, 5],
  random: false,
  counter: counters.rainbow,
};

export const R3 = {
  grid: [2, 2],
  value: 4,
  delta: 2,
  mesh: [5, 5],
  random: false,
  counter: counters.rainbow,
};

export const R4 = {
  grid: [2, 2],
  value: 5,
  delta: 1,
  mesh: [5, 5],
  random: false,
  counter: counters.rainbow,
};

export const R5 = {
  grid: [2, 2],
  value: 6,
  delta: 2,
  mesh: [5, 5],
  random: false,
  counter: counters.rainbow,
};

export const R6 = {
  grid: [2, 2],
  value: 8,
  delta: -2,
  mesh: [5, 5],
  random: false,
  counter: counters.rainbow,
};

export const R7 = {
  grid: [2, 2],
  value: 7,
  delta: -1,
  mesh: [5, 5],
  random: false,
  counter: counters.rainbow,
};

export const Rainbows = {
  name: "Rainbows",
  puzzles: [R1, R2, R3, R4, R5, R6, R7],
};

// #endregion

export const D1 = {
  grid: [3, 2],
  value: 8,
  delta: 4,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

export const D1A = {
  grid: [3, 2],
  value: 7,
  delta: 3,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

export const D1B = {
  grid: [2, 2],
  value: 10,
  delta: -3,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

export const D1C = {
  grid: [2, 2],
  value: 14,
  delta: -5,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

export const D1D = {
  grid: [2, 2],
  value: 12,
  delta: 5,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

export const D1E = {
  grid: [2, 2],
  value: 20,
  delta: -5,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

// #region Early Estimation

export const PKE = {
  grid: [3, 3],
  value: 3,
  delta: 4,
  mesh: [3, 3],
  random: false,
  counter: counters.lightblue,
};

export const PKE1 = {
  grid: [3, 3],
  value: 3,
  delta: 3,
  mesh: [3, 3],
  random: false,
  counter: counters.lightblue,
};

export const PKE2 = {
  grid: [3, 3],
  value: 4,
  delta: 3,
  mesh: [3, 3],
  random: false,
  counter: counters.lightblue,
};

export const PKE3 = {
  grid: [3, 3],
  value: 8,
  delta: -3,
  mesh: [3, 3],
  random: false,
  counter: counters.lightblue,
};

export const PKE4 = {
  grid: [3, 3],
  value: 8,
  delta: -2,
  mesh: [3, 3],
  random: false,
  counter: counters.lightblue,
};

export const PKE5 = {
  grid: [3, 3],
  value: 7,
  delta: -1,
  mesh: [3, 3],
  random: false,
  counter: counters.lightblue,
};

export const EarlyEstimation = {
  name: "Early Estimation",
  puzzles: [PKE1, PKE2, PKE3, PKE4, PKE5],
};

// #endregion

// #region Counting

export const C1 = {
  grid: [3, 2],
  value: 5,
  delta: 2,
  mesh: [4, 3],
  random: false,
  counter: counters.blue,
};

export const C2 = {
  grid: [2, 2],
  value: 5,
  delta: 1,
  mesh: [4, 3],
  random: false,
  counter: counters.blue,
};

export const C3 = {
  grid: [2, 2],
  value: 6,
  delta: -1,
  mesh: [4, 3],
  random: false,
  counter: counters.blue,
};

export const C4 = {
  grid: [3, 2],
  value: 7,
  delta: -2,
  mesh: [4, 4],
  random: false,
  counter: counters.blue,
};

export const C5 = {
  grid: [3, 2],
  value: 7,
  delta: 1,
  mesh: [4, 4],
  random: false,
  counter: counters.blue,
};

export const C6 = {
  grid: [3, 2],
  value: 8,
  delta: -1,
  mesh: [4, 4],
  random: false,
  counter: counters.blue,
};

export const C7 = {
  grid: [3, 2],
  value: 9,
  delta: -1,
  mesh: [4, 4],
  random: false,
  counter: counters.blue,
};

export const C8 = {
  grid: [3, 2],
  value: 8,
  delta: 2,
  mesh: [5, 4],
  random: false,
  counter: counters.blue,
};

export const CountingFiveToTen = {
  name: "Counting Five to Ten",
  puzzles: [C1, C2, C3, C4, C5, C6, C7, C8],
};

// #endregion

// #region Ten +- 1

export const TF1 = {
  grid: [2, 2],
  value: 10,
  delta: 1,
  mesh: [5, 3],
  counter: counters.blue,
};

export const TF2 = {
  grid: [3, 2],
  value: 10,
  delta: 1,
  mesh: [5, 3],
  counter: counters.blue,
};

export const TF3 = {
  grid: [3, 3],
  value: 10,
  delta: 1,
  mesh: [5, 3],
  counter: counters.blue,
};

// #endregion

export const L2 = {
  grid: [2, 2],
  value: 5,
  delta: -3,
  random: false,
  mesh: [3, 2],
  counter: counters.pink,
};

export const L2A = {
  grid: [2, 2],
  value: 4,
  delta: 3,
  random: false,
  mesh: [3, 3],
  counter: counters.pink,
};

export const L2B = {
  grid: [2, 2],
  value: 5,
  delta: 3,
  random: false,
  mesh: [3, 3],
  counter: counters.purple,
};

export const L2C = {
  grid: [2, 2],
  value: 7,
  delta: -4,
  random: false,
  mesh: [4, 3],
  counter: counters.pink,
};

export const L2D = {
  grid: [2, 2],
  value: 8,
  delta: 3,
  mesh: [4, 3],
  counter: counters.purple,
};

// #region I

export const L3 = {
  grid: [3, 3],
  value: 5,
  delta: -1,
  random: false,
  mesh: [3, 3],
  counter: counters.pink,
};

export const L3A = {
  grid: [3, 3],
  value: 6,
  delta: 1,
  random: false,
  mesh: [3, 3],
  counter: counters.pink,
};
export const L3B = {
  grid: [3, 3],
  value: 7,
  delta: -1,
  random: false,
  mesh: [3, 3],
  counter: counters.pink,
};

export const L3C = {
  grid: [3, 3],
  value: 5,
  delta: 1,
  random: false,
  mesh: [3, 3],
  counter: counters.pink,
};

export const L3D = {
  grid: [3, 3],
  value: 8,
  delta: -1,
  random: false,
  mesh: [3, 3],
  counter: counters.pink,
};

export const L3E = {
  grid: [3, 3],
  value: 10,
  delta: 5,
  random: false,
  mesh: [4, 4],
  counter: counters.red,
};

export const L3F = {
  grid: [3, 3],
  value: 10,
  delta: 4,
  random: false,
  mesh: [4, 4],
  counter: counters.red,
};

export const L3G = {
  grid: [3, 3],
  value: 10,
  delta: 3,
  random: false,
  mesh: [4, 4],
  counter: counters.red,
};

export const ThreeByThreeByThree = {
  name: "Three by Three by Three",
  puzzles: [L3, L3A, L3B, L3C, L3D, L3E, L3F, L3G],
};

// #endregion

// #region  Hello

export const L4 = {
  grid: [3, 2],
  value: 5,
  delta: -1,
  random: false,
  mesh: [3, 2],
};

export const L4A = {
  grid: [3, 2],
  value: 9,
  delta: 4,
  mesh: [4, 4],
};

export const L4B = {
  grid: [3, 2],
  value: 8,
  delta: 3,
  mesh: [4, 3],
};

export const L4C = {
  grid: [3, 2],
  value: 5,
  delta: 1,
  mesh: [4, 4],
};

export const L4D = {
  grid: [3, 2],
  value: 7,
  delta: 2,
  mesh: [4, 4],
};

export const L5 = {
  grid: [3, 3],
  value: 6,
  delta: 3,
  mesh: [3, 3],
};

// #endregion

// #region Estimation

export const E1A = {
  grid: [3, 3],
  value: 10,
  delta: 5,
  mesh: [5, 4],
  counter: counters.green,
};

export const E1B = {
  grid: [3, 3],
  value: 12,
  delta: 6,
  mesh: [5, 4],
  counter: counters.green,
};

export const E1C = {
  grid: [3, 3],
  value: 12,
  delta: 4,
  mesh: [5, 4],
  counter: counters.green,
};

export const E1D = {
  grid: [3, 3],
  value: 16,
  delta: -4,
  random: false,
  mesh: [5, 4],
  counter: counters.green,
};

export const E1E = {
  grid: [4, 3],
  value: 18,
  delta: -4,
  mesh: [5, 5],
  random: false,
  counter: counters.orange,
};

export const E1F = {
  grid: [4, 3],
  value: 15,
  delta: 6,
  mesh: [5, 5],
  random: false,
  counter: counters.orange,
};

export const E1G = {
  grid: [4, 3],
  value: 20,
  delta: -5,
  mesh: [5, 5],
  random: false,
  counter: counters.orange,
};

// #region Dragons Level

export const L6 = {
  grid: [4, 4],
  value: 5,
  delta: 3,
  mesh: [4, 3],
  counter: counters.red,
};

export const L6A = {
  grid: [4, 4],
  value: 5,
  delta: 3,
  mesh: [4, 3],
  counter: counters.red,
};

export const L6B = {
  grid: [4, 4],
  value: 6,
  delta: 3,
  mesh: [4, 3],
  counter: counters.red,
};

export const L6C = {
  grid: [4, 4],
  value: 7,
  delta: 3,
  mesh: [4, 3],
  counter: counters.red,
};

export const L6D = {
  grid: [4, 4],
  value: 8,
  delta: 3,
  mesh: [4, 3],
  counter: counters.red,
};

export const L6E = {
  grid: [4, 4],
  value: 9,
  delta: 3,
  mesh: [4, 3],
  counter: counters.red,
};

export const Dragon = {
  name: "Dragon",
  puzzles: [L6, L6A, L6B, L6C, L6D, L6E],
};

// #endregion

export const L7 = {
  grid: [2, 2],
  value: 5,
  delta: 2,
  mesh: [5, 2],
  counter: counters.purple,
};

export const L8 = {
  grid: [2, 2],
  value: 5,
  delta: 1,
  mesh: [5, 2],
  counter: counters.purple,
};

export const L9 = {
  grid: [2, 2],
  value: 7,
  delta: -2,
  random: false,
  mesh: [5, 2],
  counter: counters.purple,
};

export const L9A = {
  grid: [2, 2],
  value: 8,
  delta: -3,
  random: false,
  mesh: [5, 2],
  counter: counters.purple,
};

export const L9B = {
  grid: [3, 2],
  value: 6,
  delta: 2,
  mesh: [5, 2],
};

export const L9C = {
  grid: [3, 2],
  value: 5,
  delta: 3,
  random: false,
  mesh: [5, 3],
  counter: counters.darkpurple,
};

export const L9D = {
  grid: [2, 2],
  value: 7,
  delta: 4,
  random: false,
  mesh: [5, 3],
  counter: counters.darkpurple,
};

export const L9E = {
  grid: [3, 2],
  value: 8,
  delta: 4,
  mesh: [5, 3],
  counter: counters.darkpurple,
};

export const L10 = {
  grid: [3, 3],
  value: 8,
  delta: 1,
  mesh: [4, 3],
};

export const L11 = {
  grid: [3, 3],
  value: 5,
  delta: 2,
  mesh: [3, 3],
};

export const L12 = {
  grid: [3, 3],
  value: 6,
  delta: 2,
  mesh: [3, 3],
};

export const L13 = {
  grid: [3, 3],
  value: 6,
  delta: 1,
  mesh: [3, 3],
};

export const L14 = {
  grid: [3, 3],
  value: 5,
  delta: 1,
  mesh: [3, 3],
};

export const L15 = {
  grid: [3, 3],
  value: 7,
  delta: 1,
  mesh: [3, 3],
};

export const L16 = {
  grid: [3, 2],
  value: 8,
  delta: 2,
  mesh: [4, 3],
};

export const L17 = {
  grid: [3, 2],
  value: 9,
  delta: 2,
  mesh: [4, 3],
};

export const L18 = {
  grid: [3, 3],
  value: 10,
  delta: 2,
  mesh: [4, 3],
};

export const L19 = {
  grid: [2, 2],
  value: 7,
  delta: 1,
  mesh: [4, 4],
};

export const L20 = {
  grid: [2, 2],
  value: 8,
  delta: 2,
  mesh: [4, 4],
};

export const L21 = {
  grid: [2, 2],
  value: 9,
  delta: 3,
  mesh: [5, 4],
};

export const L22 = {
  grid: [3, 3],
  value: 12,
  delta: -5,
  mesh: [4, 4],
  random: false,
  counter: counters.diamond,
};

export const L22A = {
  grid: [3, 3],
  value: 9,
  delta: 4,
  mesh: [4, 4],
  random: false,
  counter: counters.diamond,
};
export const L22B = {
  grid: [3, 3],
  value: 9,
  delta: 5,
  mesh: [4, 4],
  random: false,
  counter: counters.diamond,
};

export const L22C = {
  grid: [3, 3],
  value: 6,
  delta: 4,
  mesh: [4, 4],
  random: false,
  counter: counters.diamond,
};

export const L22D = {
  grid: [3, 3],
  value: 14,
  delta: -4,
  mesh: [4, 4],
  random: false,
  counter: counters.diamond,
};

export const L23 = {
  grid: [3, 3],
  value: 7,
  delta: 1,
  mesh: [4, 4],
};

export const L24 = {
  grid: [3, 3],
  value: 6,
  delta: 1,
  mesh: [5, 4],
};

export const L25 = {
  grid: [3, 3],
  value: 9,
  delta: 2,
  mesh: [5, 4],
};

export const L26 = {
  grid: [3, 3],
  value: 10,
  delta: 1,
  mesh: [5, 4],
};

export const L27 = {
  grid: [3, 3],
  value: 11,
  delta: 1,
  mesh: [4, 4],
};

export const L28 = {
  grid: [4, 3],
  value: 7,
  delta: 1,
  mesh: [4, 4],
};

export const L29 = {
  grid: [4, 3],
  value: 8,
  delta: 1,
  mesh: [4, 4],
};

export const L30 = {
  grid: [4, 3],
  value: 9,
  delta: 1,
  mesh: [4, 4],
};

export const L31 = {
  grid: [4, 4],
  value: 4,
  delta: 1,
  mesh: [4, 4],
};

export const L32 = {
  grid: [4, 4],
  value: 8,
  delta: 3,
  mesh: [4, 4],
};

export const L33 = {
  grid: [4, 4],
  value: 7,
  delta: 1,
  mesh: [4, 4],
};

export const L34 = {
  grid: [4, 4],
  value: 9,
  delta: 4,
  mesh: [4, 4],
};

export const L35 = {
  grid: [3, 3],
  value: 9,
  delta: 1,
  mesh: [5, 5],
};

export const L36 = {
  grid: [3, 3],
  value: 10,
  delta: 2,
  mesh: [5, 5],
};

export const L37 = {
  grid: [3, 3],
  value: 15,
  delta: 3,
  mesh: [5, 5],
  counter: counters.diamond,
};

export const L38 = {
  grid: [3, 4],
  value: 14,
  delta: 4,
  mesh: [5, 5],
  counter: counters.diamond,
};

export const L39 = {
  grid: [3, 4],
  value: 18,
  delta: 4,
  mesh: [5, 5],
  counter: counters.diamond,
};

export const L40 = {
  grid: [3, 3],
  value: 10,
  delta: -3,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

export const L40A = {
  grid: [3, 3],
  value: 20,
  delta: -7,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

export const L40B = {
  grid: [3, 3],
  value: 18,
  delta: -4,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

export const L40C = {
  grid: [3, 3],
  value: 22,
  delta: -6,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

export const L40D = {
  grid: [3, 3],
  value: 10,
  delta: 6,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

export const L40E = {
  grid: [3, 3],
  value: 12,
  delta: 8,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

export const L40F = {
  grid: [3, 3],
  value: 15,
  delta: 5,
  mesh: [5, 5],
  random: false,
  counter: counters.diamond,
};

export const L41 = {
  grid: [4, 4],
  value: 9,
  delta: 2,
  mesh: [5, 5],
  counter: counters.diamond,
};

export const L42 = {
  grid: [4, 4],
  value: 8,
  delta: 1,
  mesh: [4, 4],
};

export const L43 = {
  grid: [4, 4],
  value: 9,
  delta: 1,
  mesh: [4, 4],
};

export const L44 = {
  grid: [4, 4],
  value: 10,
  delta: 1,
  mesh: [4, 4],
};

// #region Square Levels

export const S1 = {
  grid: [2, 2],
  value: 8,
  delta: -3,
  mesh: [3, 3],
  random: false,
  counter: counters.square,
};

export const S1A = {
  grid: [2, 2],
  value: 7,
  delta: -2,
  mesh: [3, 3],
  random: false,
  counter: counters.square,
};

export const S1B = {
  grid: [2, 2],
  value: 6,
  delta: -1,
  mesh: [3, 3],
  random: false,
  counter: counters.square,
};

export const S1C = {
  grid: [2, 2],
  value: 7,
  delta: -2,
  mesh: [3, 3],
  random: false,
  counter: counters.square,
};

export const S1D = {
  grid: [2, 2],
  value: 7,
  delta: 1,
  mesh: [3, 3],
  random: false,
  counter: counters.square,
};

export const S1E = {
  grid: [2, 2],
  value: 8,
  delta: -2,
  mesh: [3, 3],
  random: false,
  counter: counters.square,
};

export const S1F = {
  grid: [2, 2],
  value: 5,
  delta: 3,
  mesh: [3, 3],
  random: false,
  counter: counters.square,
};

export const S2A = {
  grid: [2, 2],
  value: 5,
  delta: 3,
  mesh: [3, 3],
  random: false,
  counter: counters.square,
};

export const S2 = {
  grid: [3, 3],
  value: 9,
  delta: -2,
  mesh: [4, 3],
  random: false,
  counter: counters.square,
};
export const S3 = {
  grid: [3, 3],
  value: 8,
  delta: -2,
  mesh: [3, 3],
  random: false,
  counter: counters.square,
};
export const S4 = {
  grid: [3, 3],
  value: 10,
  delta: -2,
  mesh: [4, 3],
  random: false,
  counter: counters.square,
};

export const S5 = {
  grid: [4, 4],
  value: 13,
  delta: -3,
  mesh: [4, 4],
  random: false,
  counter: counters.square,
};

// #endregion

// #region Ten Plus or Minus One

export const PMT = {
  grid: [2, 2],
  value: 10,
  delta: 1,
  mesh: [4, 3],
  counter: counters.blue,
};

export const PMT1 = {
  grid: [2, 2],
  value: 10,
  delta: 1,
  mesh: [4, 4],
  counter: counters.blue,
};

export const PMT2 = {
  grid: [2, 2],
  value: 10,
  delta: 1,
  mesh: [5, 3],
  counter: counters.blue,
};

export const PMT3 = {
  grid: [3, 2],
  value: 10,
  delta: 1,
  mesh: [4, 3],
  counter: counters.blue,
};

export const TenPlusOrMinusOne = {
  name: "Ten Plus or Minus One",
  puzzles: [PMT, PMT1, PMT2, PMT3],
};

// #endregion

// #region Four By Four Large Number Estimation

export const LEST1 = {
  grid: [4, 4],
  value: 20,
  delta: -3,
  mesh: [5, 5],
  counter: counters.green,
};

export const LEST2 = {
  grid: [5, 5],
  value: 20,
  delta: -3,
  mesh: [5, 5],
  counter: counters.orange,
};

export const LEST3 = {
  grid: [5, 5],
  value: 15,
  delta: -3,
  mesh: [5, 5],
  counter: counters.orange,
};

// #endregion

/* Ideas

  Ten Plus and Minus One
  First Numbers,
  Estimation Under Ten, 
  Counting,

*/

// #region Grouping Puzzles

export const GPThreeA = {
  grid: [2, 2],
  cards: [
    { types: [1, 0, 1], arr: threes.one_one_one },
    { types: [1, 1], arr: threes.two_one },
    { types: [0, 1], arr: twos.one_one },
    { types: [0, 1], arr: threes.two_one },
  ],
  mesh: [2, 2],
  value: 3,
  type: "number",
  counter: counters.black,
};

export const AP1 = {
  grid: [2, 2],
  cards: [
    { types: [0], arr: twos.two },
    { types: [0], arr: threes.three },
    { types: [0], arr: threes.three },
    { types: [1], arr: threes.three },
  ],
  mesh: [2, 2],
  value: 3,
  type: puzzleTypes.number,
  counter: counters.black,
};

export const AP1A = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.two_two },
    { types: [0], arr: threes.three },
    { types: [1], arr: fours.four },
    { types: [0, 0], arr: fours.three_one },
  ],
  mesh: [2, 2],
  value: 4,
  type: puzzleTypes.number,
  counter: counters.black,
};

export const AP1B = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fives.one_four },
    { types: [1], arr: fives.five },
    { types: [0, 0], arr: fives.two_three },
    { types: [0, 0], arr: fours.two_two },
  ],
  mesh: [2, 2],
  value: 5,
  type: puzzleTypes.number,
  counter: counters.black,
};

export const AP1C = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fours.two_two },
    { types: [1], arr: fives.five },
    { types: [0, 0], arr: fives.two_three },
    { types: [0, 0], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: puzzleTypes.number,
  counter: counters.black,
};

export const AP1D = {
  grid: [2, 2],
  cards: [
    { types: [1, 0], arr: fours.two_two },
    { types: [1], arr: fives.five },
    { types: [0, 1], arr: fives.two_three },
    { types: [0, 0], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: puzzleTypes.number,
  counter: counters.black,
};

export const AP1E = {
  grid: [2, 2],
  cards: [
    { types: [1, 0], arr: sixes.two_four },
    { types: [0], arr: fives.five },
    { types: [0, 1], arr: fives.two_three },
    { types: [1, 0], arr: fives.one_four },
  ],
  mesh: [2, 2],
  value: 5,
  type: puzzleTypes.number,
  counter: counters.black,
};

export const AP1F = {
  grid: [2, 2],
  cards: [
    { types: [0, 0, 0], arr: sevens.one_three_three },
    { types: [0], arr: sixes.one_five },
    { types: [0, 0, 0], arr: sixes.two_two_two },
    { types: [1, 0], arr: sixes.three_three },
  ],
  mesh: [2, 2],
  value: 6,
  type: puzzleTypes.number,
  counter: counters.black,
};

export const AP1G = {
  grid: [2, 2],
  cards: [
    { types: [0, 0, 0], arr: sevens.one_three_three },
    { types: [0], arr: sevens.seven },
    { types: [0, 0, 0], arr: sevens.three_four },
    { types: [1, 0], arr: sixes.one_five },
  ],
  mesh: [2, 2],
  value: 7,
  type: puzzleTypes.number,
  counter: counters.black,
};

export const AP1Z = {
  grid: [2, 2],
  cards: [
    { types: [0], arr: tens.ten },
    { types: [1, 1], arr: nines.three_six },
    { types: [1, 0], arr: tens.five_five },
    { types: [1, 0], arr: tens.two_three_five },
  ],
  mesh: [2, 2],
  value: 10,
  type: "number",
  counter: counters.black,
};

export const AP1Z1 = {
  grid: [2, 2],
  cards: [
    { types: [0, 0], arr: fifteens.five_ten },
    { types: [1, 1], arr: fourteens.five_nine },
    { types: [1, 0], arr: fifteens.seven_eight },
    { types: [1, 0], arr: fifteens.six_nine },
  ],
  mesh: [2, 2],
  value: 15,
  type: "number",
  counter: counters.black,
};

export const AbstractPuzzles = {
  name: "Abstract Puzzles",
  puzzles: [AP1, AP1A, AP1B, AP1C, AP1D, AP1E, AP1F, AP1G],
};

// #endregion

export const LEVELS = {
  tenplusorminusone: TenPlusOrMinusOne,
  firstnumbers: FirstNumbers,
  earlyestimation: EarlyEstimation,
  countingfivetoten: CountingFiveToTen,
  doubles: Doubles,
  eights: Eights,
  tens: Tens,
  abstractpuzzles: AbstractPuzzles,
  assessmentonetoten: Assessment_Abstract,
  saami_number_talks: Assessment_Abstract,
  visualsymbolictoten: Assessment_Combined,
  visualtoten: Assessment_Visual
};

export const test = {
  name: "Ten Plus or Minus One",
  puzzles: [EA1, EP1, EP2, EP3, EP4, EP5, DA1, DA2],
};

export const getRandomElement = (arr)=>{
  let mod = arr.length
  let rand = getRandomInt(10*mod)
  let i = rand%mod
  return arr[i]
}

export const crushProgression = ()=>{
  let prog = []
  // These arrays may change in length but should be roughly the same
  const A = AP_A.length 
  const V = AP_V.length 
  const C = AP_C.length
  const ceil = Math.min(A,V,C)
  for(let n=0;n<ceil;n++){
    let v = getRandomElement(AP_V[n])
    let c = getRandomElement(AP_C[n])
    let a = getRandomElement(AP_A[n])
    prog.push(...[c,a])
  }

  prog.forEach(p=>{
    console.log("p",p.value)
  })

  return prog
}


// #region All Levels

const tstProg = crushProgression()

export const crushlevels = [
  ...FirstNumbers.puzzles,
  ...EarlyEstimation.puzzles,
  ...Doubles.puzzles,
  ...FiveFrame.puzzles,
  ...Eights.puzzles,
  ...Tens.puzzles,
  ...KindergartenOpener.puzzles,
  ...Rainbows.puzzles,
  ...Dragon.puzzles,
  D1,
  D1A,
  D1B,
  D1C,
  D1D,
  D1E,
  ...CountingFiveToTen.puzzles,
  ...ThreeByThreeByThree.puzzles,
  L4,
  L4A,
  L4B,
  L4C,
  L4D,
  ...TenPlusOrMinusOne.puzzles,
  E1A,
  E1B,
  E1C,
  E1D,
  E1E,
  E1F,
  E1G,
  ...GradeOneOpener.puzzles,
  S1A,
  S1B,
  S1C,
  S1D,
  S1E,
  S1F,
  L7,
  L8,
  L9,
  L9A,
  L9B,
  L9C,
  L9D,
  L9E,
  L21,
  L22,
  L22A,
  L22B,
  L22C,
  L22D,
  L23,
  L24,
  L25,
  L26,
  L27,
  L28,
  L29,
  L30,
  L31,
  L32,
  L33,
  L34,
  L35,
  L36,
  L37,
  L38,
  L39,
  L40,
  L40A,
  L40B,
  L40C,
  L40E,
  L40F,
  L41,
  L42,
  L43,
  L22,
  L22A,
  L22B,
  L22C,
  L22D,
];

// #endregion

