
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
  lightblue: "lightblue"
}


const ones = {
  one: [1]
}

const twos = {
  two: [2],
  one_one: [2]
}

const threes = {
  two_one: [2,1],
  one_one_one: [1,1,1],
  three: [3]
}

const fours = {
  two_two: [2,2],
  one_one_two: [1,1,2],
  three_one: [3,1],
  four: [4]
}

const fives = {
  five: [5],
  one_four: [1,4],
  two_three: [2,3],
  one_two_two: [1,2,2],
  one_one_three: [1,1,3],
  one_one_one_two: [1,1,1,2],
}

const sixes = {
  six: [6],
  one_five: [1,5],
  two_four: [2,4],
  three_three: [3,3],
  two_two_two: [2,2,2],
  one_two_three: [2,2,2],
}

const sevens = {
  seven: [7],
  one_six: [1,6],
  two_five: [2,5],
  three_four: [3,4],
  two_two_three: [2,2,3],
  one_two_three: [1,3,3],
  one_one_three: [1,1,5],
}

const eights = {
  eight: [8],
  one_seven: [1,7],
  two_six: [2,6],
  three_five: [3,5],
  four_four: [4,4],
  two_two_four: [2,2,4],
  two_three_three: [2,3,3],
  two_five_one: [2,5,1],
  two_two_two_two: [2,2,2,2],
}

const nines = {
  nine: [9],
  one_eight: [1,8],
  two_seven: [2,7],
  three_six: [3,6],
  four_five: [4,5],
  two_two_five: [2,2,5],
  three_three_three: [3,3,3],
  two_three_four: [2,3,4],
  two_two_five: [2,2,5],
  two_two_two_three: [2,2,2,3],
  one_one_three: [2,2,2,3],
}

const tens = {
  ten: [10],
  one_nine: [1,9],
  two_eight: [2,8],
  three_seven: [3,6],
  four_six: [4,5],
  five_five: [5,5],
  two_three_five: [2,3,5],
  three_three_three: [3,3,4],
  two_three_four: [2,2,6],
  two_three_four: [2,4,4],
  one_one_three: [2,2,2,4],
}



export const PM = {
  1: [[0.5,0.5]],
  2: [[0,0],[1,1]],
  3: [[0.5,0],[0,1],[1,1]],
  4: [[0,0],[0,1],[1,0],[1,1]]
}




// #region PRE-K

export const PK1 = {
  grid: [2,2],
  value: 2,
  delta: -1,
  mesh: [2,1],
  random: false,
  counter: counters.pink
}

export const PK2 = {
  grid: [2,2],
  value: 1,
  delta: 1,
  mesh: [2,2],
  random: false,
  counter: counters.pink
}

export const PK3 = {
  grid: [2,2],
  value: 2,
  delta: -1,
  mesh: [2,2],
  random: false,
  counter: counters.pink
}

export const PK4 = {
  grid: [2,2],
  value: 3,
  delta: -1,
  mesh: [2,2],
  random: false,
  counter: counters.pink
}

export const PK5 = {
  grid: [2,2],
  value: 2,
  delta: 1,
  mesh: [2,2],
  random: false,
  counter: counters.pink
}

export const PK6 = {
  grid: [2,2],
  value: 2,
  delta: 1,
  mesh: [2,3],
  random: false,
  counter: counters.pink
}

export const PK7 = {
  grid: [2,2],
  value: 2,
  delta: 2,
  mesh: [2,2],
  random: false,
  counter: counters.pink
}

export const PK8 = {
  grid: [2,2],
  value: 3,
  delta: 1,
  mesh: [3,2],
  random: false,
  counter: counters.pink
}


export const PK9 = {
  grid: [2,2],
  value: 3,
  delta: 2,
  mesh: [2,3],
  random: false,
  counter: counters.pink
}

export const PK10 = {
  grid: [2,2],
  value: 4,
  delta: -2,
  mesh: [2,3],
  random: false,
  counter: counters.pink
}


export const PK11 = {
  grid: [2,2],
  value: 5,
  delta: -2,
  mesh: [3,3],
  random: false,
  counter: counters.pink
}

export const FirstNumbers = {
  name: "First Numbers",
  puzzles: [PK1,PK2,PK3,PK4,PK5,PK6,PK7,PK8,PK9,PK10,PK11]
}


// #endregion 

//  #region Early Length Models 

export const LM1 = {
  grid: [2,2],
  value: 3,
  delta: -1,
  random: false,
  mesh: [5,1],
  counter: counters.square
}

export const LM1A = {
  grid: [2,2],
  value: 4,
  delta: -2,
  random: false,
  mesh: [5,1],
  counter: counters.square
}

export const LM1B = {
  grid: [2,2],
  value: 4,
  delta: -2,
  random: false,
  mesh: [5,1],
  counter: counters.square
}

export const LM1C = {
  grid: [2,2],
  value: 4,
  delta: -1,
  random: false,
  mesh: [5,1],
  counter: counters.square
}

export const LM2 = {
  grid: [2,2],
  value: 3,
  delta: 1,
  mesh: [5,1],
  random: false,
  counter: counters.square
}

export const LM3 = {
  grid: [2,2],
  value: 4,
  delta: -2,
  mesh: [5,1],
  random: false,
  counter: counters.square
}

export const LM4 = {
  grid: [2,2],
  value: 3,
  delta: 1,
  mesh: [5,1],
  random: false,
  counter: counters.square
}

export const LM5 = {
  grid: [3,2],
  value: 3,
  delta: 1,
  mesh: [5,1],
  counter: counters.square
}

export const LM6 = {
  grid: [3,2],
  value: 2,
  delta: 1,
  mesh: [5,1],
  counter: counters.square
}

// #endregion


// #region K

export const K1 = {
  grid: [2,2],
  value: 4,
  delta: 1,
  mesh: [3,2],
  random: false,
  counter: counters.blue
}

export const K2 = {
  grid: [2,2],
  value: 5,
  delta: -2,
  mesh: [3,2],
  random: false,
  counter: counters.blue
}

export const K3 = {
  grid: [2,2],
  value: 5,
  delta: -1,
  mesh: [3,2],
  random: false,
  counter: counters.blue
}

export const K4 = {
  grid: [2,2],
  value: 5,
  delta: 1,
  mesh: [3,3],
  counter: counters.blue
}

export const K5 = {
  grid: [2,2],
  value: 5,
  delta: 2,
  mesh: [3,3],
  random: false,
  counter: counters.blue
}

export const K6 = {
  grid: [2,2],
  value: 6,
  delta: 1,
  mesh: [3,3],
  random: false,
  counter: counters.blue
}

export const K7 = {
  grid: [2,2],
  value: 5,
  delta: 2,
  mesh: [3,3],
  random: false,
  counter: counters.blue
}

export const K8 = {
  grid: [2,2],
  value: 5,
  delta: -1,
  mesh: [3,3],
  random: false,
  counter: counters.blue
}

export const K9 = {
  grid: [3,2],
  value: 6,
  delta: 1,
  mesh: [3,3],
  random: false,
  counter: counters.purple
}

export const K10 = {
  grid: [3,3],
  value: 5,
  delta: 3,
  mesh: [4,4],
  random: false,
  counter: counters.purple
}




// #endregion


// #region Grade 1

export const G1A = {
  grid: [2,2],
  value: 4,
  delta: 3,
  mesh: [3,4],
  random: false,
  counter: counters.darkpurple
}

export const G1B = {
  grid: [2,2],
  value: 5,
  delta: 3,
  mesh: [3,4],
  random: false,
  counter: counters.darkpurple
}

export const G1C = {
  grid: [2,2],
  value: 7,
  delta: -3,
  mesh: [3,3],
  random: false,
  counter: counters.darkpurple
}

export const G1D = {
  grid: [2,2],
  value: 7,
  delta: 5,
  mesh: [4,4],
  random: false,
  counter: counters.darkpurple
}


export const G1E = {
  grid: [3,2],
  value: 5,
  delta: 2,
  mesh: [3,3],
  random: false,
  counter: counters.darkpurple
}

export const G1F = {
  grid: [3,2],
  value: 6,
  delta: -2,
  mesh: [3,3],
  random: false,
  counter: counters.darkpurple
}

export const G1G = {
  grid: [3,2],
  value: 6,
  delta: 3,
  mesh: [3,4],
  random: false,
  counter: counters.darkpurple
}



export const R1 = {
  grid: [2,2],
  value: 5,
  delta: 1,
  mesh: [4,4],
  random: false,
  counter: counters.rainbow
}

export const R2 = {
  grid: [2,2],
  value: 5,
  delta: -1,
  mesh: [5,5],
  random: false,
  counter: counters.rainbow
}

export const R3 = {
  grid: [2,2],
  value: 4,
  delta: 2,
  mesh: [5,5],
  random: false,
  counter: counters.rainbow
}

export const R4 = {
  grid: [2,2],
  value: 5,
  delta: 1,
  mesh: [5,5],
  random: false,
  counter: counters.rainbow
}

export const R5 = {
  grid: [2,2],
  value: 6,
  delta: 2,
  mesh: [5,5],
  random: false,
  counter: counters.rainbow
}

export const R6 = {
  grid: [2,2],
  value: 8,
  delta: -2,
  mesh: [5,5],
  random: false,
  counter: counters.rainbow
}

export const R7 = {
  grid: [2,2],
  value: 7,
  delta: -1,
  mesh: [5,5],
  random: false,
  counter: counters.rainbow
}

export const D1 = {
  grid: [2,2],
  value: 8,
  delta: 4,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

export const D1A = {
  grid: [2,2],
  value: 7,
  delta: 3,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

export const D1B = {
  grid: [2,2],
  value: 10,
  delta: -3,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

export const D1C = {
  grid: [2,2],
  value: 14,
  delta: -5,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

export const D1D = {
  grid: [2,2],
  value: 12,
  delta: 5,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

export const D1E = {
  grid: [2,2],
  value: 20,
  delta: -5,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

// #region Early Estimation

export const PKE = {
  grid: [3,3],
  value: 3,
  delta: 4,
  mesh: [3,3],
  random: false,
  counter: counters.lightblue
}

export const PKE1 = {
  grid: [3,3],
  value: 3,
  delta: 3,
  mesh: [3,3],
  random: false,
  counter: counters.lightblue
}

export const PKE2 = {
  grid: [3,3],
  value: 4,
  delta: 3,
  mesh: [3,3],
  random: false,
  counter: counters.lightblue
}

export const PKE3 = {
  grid: [3,3],
  value: 8,
  delta: -3,
  mesh: [3,3],
  random: false,
  counter: counters.lightblue
}

export const PKE4 = {
  grid: [3,3],
  value: 8,
  delta: -2,
  mesh: [3,3],
  random: false,
  counter: counters.lightblue
}

export const PKE5 = {
  grid: [3,3],
  value: 7,
  delta: -1,
  mesh: [3,3],
  random: false,
  counter: counters.lightblue
}

export const EarlyEstimation = {
  name: "Early Estimation",
  puzzles: [PKE1,PKE2,PKE3,PKE4,PKE5]
}

// #endregion


// #region Counting

export const C1 = {
  grid: [3,2],
  value: 5,
  delta: 2,
  mesh: [4,3],
  random: false,
  counter: counters.blue
}

// #region Counting Five to Ten

export const C2 = {
  grid: [2,2],
  value: 5,
  delta: 1,
  mesh: [4,3],
  random: false,
  counter: counters.blue
}

export const C3 = {
  grid: [2,2],
  value: 6,
  delta: -1,
  mesh: [4,3],
  random: false,
  counter: counters.blue
}


export const C4 = {
  grid: [3,2],
  value: 7,
  delta: -2,
  mesh: [4,4],
  random: false,
  counter: counters.blue
}

export const C5 = {
  grid: [3,2],
  value: 7,
  delta: 1,
  mesh: [4,4],
  random: false,
  counter: counters.blue
}

export const C6 = {
  grid: [3,2],
  value: 8,
  delta: -1,
  mesh: [4,4],
  random: false,
  counter: counters.blue
}

export const C7 = {
  grid: [3,2],
  value: 9,
  delta: -1,
  mesh: [4,4],
  random: false,
  counter: counters.blue
}

export const C8 = {
  grid: [3,2],
  value: 8,
  delta: 2,
  mesh: [5,4],
  random: false,
  counter: counters.blue
}

export const CountingFiveToTen = {
  name: "Counting Five to Ten",
  puzzles: [C1,C2,C3,C4,C5,C6,C7,C8]
}


// #endregion

// #region Ten +- 1

export const TF1 = {
  grid: [2,2],
  value: 10,
  delta: 1,
  mesh: [5,3],
  counter: counters.blue
}

export const TF2 = {
  grid: [3,2],
  value: 10,
  delta: 1,
  mesh: [5,3],
  counter: counters.blue
}

export const TF3 = {
  grid: [3,3],
  value: 10,
  delta: 1,
  mesh: [5,3],
  counter: counters.blue
}


// #endregion



export const L2 = {
  grid: [2,2],
  value: 5,
  delta: -3,
  random: false,
  mesh: [3,2],
  counter: counters.pink
}

export const L2A = {
  grid: [2,2],
  value: 4,
  delta: 3,
  random: false,
  mesh: [3,3],
  counter: counters.pink
}

export const L2B = {
  grid: [2,2],
  value: 5,
  delta: 3,
  random: false,
  mesh: [3,3],
  counter: counters.purple
}

export const L2C = {
  grid: [2,2],
  value: 7,
  delta: -4,
  random: false,
  mesh: [4,3],
  counter: counters.pink
}

export const L2D = {
  grid: [2,2],
  value: 8,
  delta: 3,
  mesh: [4,3],
  counter: counters.purple
}


export const L3 = {
  grid: [3,3],
  value: 7,
  delta: -4,
  random: false,
  mesh: [3,3],
  counter: counters.pink
}

export const L3A = {
  grid: [3,3],
  value: 4,
  delta: 4,
  random: false,
  mesh: [3,3],
  counter: counters.pink
}
export const L3B = {
  grid: [3,3],
  value: 5,
  delta: 3,
  random: false,
  mesh: [3,3],
  counter: counters.pink
}

export const L3C = {
  grid: [3,3],
  value: 5,
  delta: -2,
  random: false,
  mesh: [3,3],
  counter: counters.pink
}

export const L3D = {
  grid: [3,3],
  value: 8,
  delta: -3,
  random: false,
  mesh: [3,3],
  counter: counters.pink
}

export const L3E = {
  grid: [3,3],
  value: 10,
  delta: 4,
  random: false,
  mesh: [4,4],
}

export const L4 = {
  grid: [3,2],
  value: 5,
  delta: -1,
  random: false,
  mesh: [3,2]
}

export const L4A = {
  grid: [3,2],
  value: 9,
  delta: 4,
  mesh: [4,4]
}

export const L4B = {
  grid: [3,2],
  value: 8,
  delta: 3,
  mesh: [4,3]
}

export const L4C = {
  grid: [3,2],
  value: 5,
  delta: 1,
  mesh: [4,4]
}

export const L4D = {
  grid: [3,2],
  value: 7,
  delta: 2,
  mesh: [4,4]
}


export const L5 = {
  grid: [3,3],
  value: 6,
  delta: 3,
  mesh: [3,3]
}

// #region Estimation

export const E1A = {
  grid: [3,3],
  value: 10,
  delta: 5,
  mesh: [5,4],
  counter: counters.green
}

export const E1B = {
  grid: [3,3],
  value: 12,
  delta: 6,
  mesh: [5,4],
  counter: counters.green
}

export const E1C = {
  grid: [3,3],
  value: 12,
  delta: 4,
  mesh: [5,4],
  counter: counters.green
}


export const E1D = {
  grid: [3,3],
  value: 16,
  delta: -4,
  random: false,
  mesh: [5,4],
  counter: counters.green
}

export const E1E = {
  grid: [4,3],
  value: 18,
  delta: -4,
  mesh: [5,5],
  random: false,
  counter: counters.orange
}

export const E1F = {
  grid: [4,3],
  value: 15,
  delta: 6,
  mesh: [5,5],
  random: false,
  counter: counters.orange
}

export const E1G = {
  grid: [4,3],
  value: 20,
  delta: -5,
  mesh: [5,5],
  random: false,
  counter: counters.orange
}






export const L6 = {
  grid: [4,4],
  value: 5,
  delta: 3,
  mesh: [4,3],
  counter: counters.red
}

export const L6A = {
  grid: [4,4],
  value: 5,
  delta: 3,
  mesh: [4,3],
 counter: counters.red
}

export const L6B = {
  grid: [4,4],
  value: 6,
  delta: 3,
  mesh: [4,3],
  counter: counters.red
}

export const L6C = {
  grid: [4,4],
  value: 7,
  delta: 3,
  mesh: [4,3],
  counter: counters.red
}

export const L6D = {
  grid: [4,4],
  value: 8,
  delta: 3,
  mesh: [4,3],
  counter: counters.red
}

export const L6E = {
  grid: [4,4],
  value: 9,
  delta: 3,
  mesh: [4,3],
  counter: counters.red
}



export const L7 = {
  grid: [2,2],
  value: 5,
  delta: 2,
  mesh: [5,2],
  counter: counters.purple
}

export const L8 = {
  grid: [2,2],
  value: 5,
  delta: 1,
  mesh: [5,2],
  counter: counters.purple,
}

export const L9 = {
  grid: [2,2],
  value: 7,
  delta: -2,
  random: false,
  mesh: [5,2],
  counter: counters.purple
}

export const L9A = {
  grid: [2,2],
  value: 8,
  delta: -3,
  random: false,
  mesh: [5,2],
  counter: counters.purple
}

export const L9B = {
  grid: [3,2],
  value: 6,
  delta: 2,
  mesh: [5,2]
}

export const L9C = {
  grid: [3,2],
  value: 5,
  delta: 3,
  random: false,
  mesh: [5,3],
  counter: counters.darkpurple
}

export const L9D = {
  grid: [2,2],
  value: 7,
  delta: 4,
  random: false,
  mesh: [5,3],
  counter: counters.darkpurple
}

export const L9E = {
  grid: [3,2],
  value: 8,
  delta: 4,
  mesh: [5,3],
  counter: counters.darkpurple
}

export const L10 = {
  grid: [3,3],
  value: 8,
  delta: 1,
  mesh: [4,3]
}

export const L11 = {
  grid: [3,3],
  value: 5,
  delta: 2,
  mesh: [3,3]
}

export const L12 = {
  grid: [3,3],
  value: 6,
  delta: 2,
  mesh: [3,3]
}

export const L13 = {
  grid: [3,3],
  value: 6,
  delta: 1,
  mesh: [3,3]
}


export const L14 = {
  grid: [3,3],
  value: 5,
  delta: 1,
  mesh: [3,3]
}

export const L15 = {
  grid: [3,3],
  value: 7,
  delta: 1,
  mesh: [3,3]
}

export const L16 = {
  grid: [3,2],
  value: 8,
  delta: 2,
  mesh: [4,3]
}

export const L17 = {
  grid: [3,2],
  value: 9,
  delta: 2,
  mesh: [4,3]
}


export const L18 = {
  grid: [3,3],
  value: 10,
  delta: 2,
  mesh: [4,3]
}


export const L19 = {
  grid: [2,2],
  value: 7,
  delta: 1,
  mesh: [4,4]
}

export const L20 = {
  grid: [2,2],
  value: 8,
  delta: 2,
  mesh: [4,4]
}

export const L21 = {
  grid: [2,2],
  value: 9,
  delta: 3,
  mesh: [5,4]
}

export const L22 = {
  grid: [3,3],
  value: 12,
  delta: -5,
  mesh: [4,4],
  random: false,
  counter: counters.diamond
}

export const L22A = {
  grid: [3,3],
  value: 9,
  delta: 4,
  mesh: [4,4],
  random: false,
  counter: counters.diamond
}
export const L22B = {
  grid: [3,3],
  value: 9,
  delta: 5,
  mesh: [4,4],
  random: false,
  counter: counters.diamond
}

export const L22C = {
  grid: [3,3],
  value: 6,
  delta: 4,
  mesh: [4,4],
  random: false,
  counter: counters.diamond
}

export const L22D = {
  grid: [3,3],
  value: 14,
  delta: -4,
  mesh: [4,4],
  random: false,
  counter: counters.diamond
}

export const L23 = {
  grid: [3,3],
  value: 7,
  delta: 1,
  mesh: [4,4]
}

export const L24 = {
  grid: [3,3],
  value: 6,
  delta: 1,
  mesh: [5,4]
}

export const L25 = {
  grid: [3,3],
  value: 9,
  delta: 2,
  mesh: [5,4]
}

export const L26 = {
  grid: [3,3],
  value: 10,
  delta: 1,
  mesh: [5,4]
}

export const L27 = {
  grid: [3,3],
  value: 11,
  delta: 1,
  mesh: [4,4]
}

export const L28 = {
  grid: [4,3],
  value: 7,
  delta: 1,
  mesh: [4,4]
}

export const L29 = {
  grid: [4,3],
  value: 8,
  delta: 1,
  mesh: [4,4]
}

export const L30 = {
  grid: [4,3],
  value: 9,
  delta: 1,
  mesh: [4,4]
}

export const L31 = {
  grid: [4,4],
  value: 4,
  delta: 1,
  mesh: [4,4]
}

export const L32 = {
  grid: [4,4],
  value: 8,
  delta: 3,
  mesh: [4,4]
}

export const L33 = {
  grid: [4,4],
  value: 7,
  delta: 1,
  mesh: [4,4]
}

export const L34 = {
  grid: [4,4],
  value: 9,
  delta: 4,
  mesh: [4,4]
}

export const L35 = {
  grid: [3,3],
  value: 9,
  delta: 1,
  mesh: [5,5]
}

export const L36 = {
  grid: [3,3],
  value: 10,
  delta: 2,
  mesh: [5,5]
}

export const L37 = {
  grid: [3,3],
  value: 15,
  delta: 3,
  mesh: [5,5],
  counter: counters.diamond
}

export const L38 = {
  grid: [3,4],
  value: 14,
  delta: 4,
  mesh: [5,5],
  counter: counters.diamond
}

export const L39 = {
  grid: [3,4],
  value: 18,
  delta: 4,
  mesh: [5,5],
  counter: counters.diamond
}

export const L40 = {
  grid: [3,3],
  value: 10,
  delta: -3,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

export const L40A = {
  grid: [3,3],
  value: 20,
  delta: -7,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

export const L40B = {
  grid: [3,3],
  value: 18,
  delta: -4,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

export const L40C = {
  grid: [3,3],
  value: 22,
  delta: -6,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

export const L40D = {
  grid: [3,3],
  value: 10,
  delta: 6,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

export const L40E = {
  grid: [3,3],
  value: 12,
  delta: 8,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

export const L40F = {
  grid: [3,3],
  value: 15,
  delta: 5,
  mesh: [5,5],
  random: false,
  counter: counters.diamond
}

export const L41 = {
  grid: [4,4],
  value: 9,
  delta: 2,
  mesh: [5,5],
  counter: counters.diamond
}

export const L42 = {
  grid: [4,4],
  value: 8,
  delta: 1,
  mesh: [4,4]
}

export const L43 = {
  grid: [4,4],
  value: 9,
  delta: 1,
  mesh: [4,4]
}

export const L44 = {
  grid: [4,4],
  value: 10,
  delta: 1,
  mesh: [4,4]
}


// #region Square Levels

export const S1 = {
  grid: [2,2],
  value: 8,
  delta: -3,
  mesh: [3,3],
  random: false,
  counter: counters.square
}

export const S1A = {
  grid: [2,2],
  value: 7,
  delta: -2,
  mesh: [3,3],
  random: false,
  counter: counters.square
}

export const S1B = {
  grid: [2,2],
  value: 6,
  delta: -1,
  mesh: [3,3],
  random: false,
  counter: counters.square
}

export const S1C = {
  grid: [2,2],
  value: 7,
  delta: -2,
  mesh: [3,3],
  random: false,
  counter: counters.square
}

export const S1D = {
  grid: [2,2],
  value: 7,
  delta: 1,
  mesh: [3,3],
  random: false,
  counter: counters.square
}


export const S1E = {
  grid: [2,2],
  value: 8,
  delta: -2,
  mesh: [3,3],
  random: false,
  counter: counters.square
}

export const S1F = {
  grid: [2,2],
  value: 5,
  delta: 3,
  mesh: [3,3],
  random: false,
  counter: counters.square
}

export const S2A = {
  grid: [2,2],
  value: 5,
  delta: 3,
  mesh: [3,3],
  random: false,
  counter: counters.square
}


export const S2 = {
  grid: [3,3],
  value: 9,
  delta: -2,
  mesh: [4,3],
  random: false,
  counter: counters.square
}
export const S3 = {
  grid: [3,3],
  value: 8,
  delta: -2,
  mesh: [3,3],
  random: false,
  counter: counters.square
}
export const S4 = {
  grid: [3,3],
  value: 10,
  delta: -2,
  mesh: [4,3],
  random: false,
  counter: counters.square
}

export const S5 = {
  grid: [4,4],
  value: 13,
  delta: -3,
  mesh: [4,4],
  random: false,
  counter: counters.square
}

// #endregion


// #region Ten Plus or Minus One

export const PMT = {
  grid: [2,2],
  value: 10,
  delta: 1,
  mesh: [4,3],
  counter: counters.blue
}

export const PMT1 = {
  grid: [2,2],
  value: 10,
  delta: 1,
  mesh: [4,4],
  counter: counters.blue
}

export const PMT2 = {
  grid: [2,2],
  value: 10,
  delta: 1,
  mesh: [5,3],
  counter: counters.blue
}

export const PMT3 = {
  grid: [3,2],
  value: 10,
  delta: 1,
  mesh: [4,3],
  counter: counters.blue
}


export const TenPlusOrMinusOne = {
  name: "Ten Plus or Minus One",
  puzzles: [PMT,PMT1,PMT2,PMT3]
}

// #endregion

/* Ideas

  Ten Plus and Minus One
  First Numbers,
  Estimation Under Ten, 
  Counting,

*/

// #region Grouping Puzzles

export const GPThreeA = {
  grid: [2,2],
  cards: [threes.one_one_one,threes.two_one,twos.one_one,threes.two_one],
  mesh: [2,2],
  value: 3,
  type: 'number',
}

export const GPFourA = {
  grid: [2,2],
  cards: [fours.one_one_two,fours.two_two,threes.one_one_one,fours.three_one],
  mesh: [2,2],
  value: 4,
  type: 'number',
}

export const GPFourB = {
  grid: [2,2],
  cards: [fours.one_one_two,fours.three_one,fives.one_four,fours.three_one],
  mesh: [2,2],
  value: 4,
  type: 'number',
}

export const GPFiveA = {
  grid: [2,2],
  cards: [fives.one_four,fives.one_one_three,fives.two_three,fours.one_one_two],
  mesh: [2,2],
  value: 5,
  type: 'number',
}

export const GPEightA= {
  grid: [2,2],
  cards: [eights.eight,eights.three_five,eights.four_four,sevens.three_four],
  mesh: [2,2],
  value: 8,
  type: 'number',
}

export const GPNineA = {
  grid: [2,2],
  cards: [nines.two_two_five,nines.three_three_three,nines.two_two_five,eights.four_four],
  mesh: [2,2],
  value: 9,
  type: 'number',
}

export const GPNineB = {
  grid: [2,2],
  cards: [nines.two_two_five,nines.two_seven,nines.two_three_four,eights.four_four],
  mesh: [2,2],
  value: 9,
  type: 'number',
}

// #endregion





export const L2x = {
  grid: [5,5],
  value: 14,
  delta: 3,
  mesh: [5,5]
}

export const LEVELS = {
  tenplusorminusone: TenPlusOrMinusOne,
  firstnumbers: FirstNumbers,
  earlyestimation: EarlyEstimation,
  countingfivetoten: CountingFiveToTen,
}

export const crushlevels = [...FirstNumbers.puzzles,...EarlyEstimation.puzzles,K1,K2,K3,K4,K5,K6,K7,K8,K9,K10,G1A,G1B,G1C,G1D,G1F,G1G,L3,L3A,L3B,L3C,L3D,L3E,R1,R2,R3,R4,R5,R6,R7,...CountingFiveToTen.puzzles,...TenPlusOrMinusOne.puzzles,L6,L6A,L6B,L6C,L6D,L6E,L4,L4A,L4B,L4C,L4D,LM1,LM1A,LM1B,LM1C,LM2,LM3,LM4,LM5,LM6,E1A,E1B,E1C,E1D,E1E,E1F,E1G,E1A,D1,D1A,D1B,D1C,D1D,D1E,L7,L8,L9,L9A,L9B,L9C,L9D,L9E,L21,L22,L22A,L22B,L22C,L22D,S1A,S1B,S1C,S1D,S1E,S1F,L23,L24,L25,L26,L27,L28,L29,L30,L31,L32,L33,L34,L35,L36,L37,L38,L39,L40,L40A,L40B,L40C,L40E,L40F,L41,L42,L43,L22,L22A,L22B,L22C,L22D]

//export const crushlevels = [L40E,C1,C2,C3,C4,C5,LM1,LM2,LM3,LM4,R1,S1B,D1A,L22,L40E]

//export const crushlevels = [GPThreeA,GPFourA,GPFourB,GPEightA,GPNineA,GPNineB]


console.log("crush levels",crushlevels.length)
