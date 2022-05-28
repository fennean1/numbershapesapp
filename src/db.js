import * as CONST from "./const.js";

const { ACTORS } = CONST;
const { LINK_TYPES } = CONST;

const SECTIONS = [
  "Intro",
  "Materials",
  "Steps",
  "Dialog",
  "Interactive",
  "Links",
  "Notes",
  "About",
];

/*
Additional Info:
  - Tags
  - Strategies
  - Standards
  - Practices
*/

//const hidden_eggs_slides =

export const hidden_eggs = {
  KEY: "AB13",
  ID: "hidden_eggs",
  HEADER: {
    TITLE: "Hidden Eggs",
    SHORT_TEXT: "Breaking Numbers Apart",
  },
  EXEMPLAR_TALK: [
    { actor: ACTORS.TEACHER, text: "How many altogether?" },
    { actor: ACTORS.STUDENT, text: "There are eight altogether!" },
    { actor: ACTORS.TEACHER, text: "How many do you think are hidden?" },
    { actor: ACTORS.STUDENT, text: "I can only see four so that means four more are hidden!" },
  ],
  INTRO: {
    TEXT: "In this activity learners use the number of visible eggs and the total to find how many are hidden.",
  },
  SLIDES: [
    {
      sample_talk: [
        {
          actor: ACTORS.TEACHER,
          text: "How many eggs do you see?",
        },
        { actor: ACTORS.STUDENT, text: "I see 4 eggs!" },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1652018182/Activities/Hidden%20Eggs/Screen_Shot_2022-05-08_at_9.54.15_AM_i701ut.png",
    },
    {
      sample_talk: [
        { actor: ACTORS.TEACHER, text: "How many eggs altogether?" },
        { actor: ACTORS.STUDENT, text: "Eight eggs altogether." },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1652018182/Activities/Hidden%20Eggs/Screen_Shot_2022-05-08_at_9.54.15_AM_i701ut.png",
    },
    {
      sample_talk: [
        { actor: ACTORS.TEACHER, text: "How many do you think are hidden?" },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1652018182/Activities/Hidden%20Eggs/Screen_Shot_2022-05-08_at_9.54.15_AM_i701ut.png",
    },
  ],
  INTERACTIVE: {
    TYPE: CONST.INTERACTIVE_TYPES.SUBITIZER,
    SETUP: CONST.SETUPS.hidden_eggs,
  }, // sent to "Interactive Selector"
  QUICK_START: {
    STEPS: [
      { meta: "something", description: "Open the 'hidden eggs' interactive" },
      {
        meta: "something",
        description: "Explore the features and show which eggs are 'hiding' ",
      },
      {
        meta: "something",
        description: "Use the 'chat' as a guide for discussion.",
      },
    ],
    META: "something",
  },
  LINKS: [
    {
      type: LINK_TYPES.PDF,
      text: "Addition Search Worksheet",
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653620561/AdditionSearch_h4ipkd.pdf",
    },
  ],
  INFO: { GRADE: "FirstGrade" },
};

export const subtraction_spheres = {
  KEY: "BB12",
  ID: "subtraction_spheres",
  HEADER: {
    TITLE: "Subtraction Spheres",
    SHORT_TEXT: "Take-Away Subtraction.",
  },
  EXEMPLAR_TALK: [
    { actor: ACTORS.TEACHER, text: "How many are missing?" },
    { actor: ACTORS.STUDENT, text: "I see four that are empty!" },
    { actor: ACTORS.TEACHER, text: "How many were there altogether?" },
    { actor: ACTORS.STUDENT, text: "There were nine altogether." },
    { actor: ACTORS.TEACHER, text: "How many are left?." },
    { actor: ACTORS.STUDENT, text: "There are five left." },
    { actor: ACTORS.TEACHER, text: "So nine take away 4 equals..." },
    { actor: ACTORS.STUDENT, text: "Five!" },
  ],
  INTRO: {
    TEXT: "In this activity, students learn about 'Take-Away' subtraction by intepreting pictures with mising parts. ",
  },
  SLIDES: [
    {
      sample_talk: [
        {
          actor: ACTORS.TEACHER,
          text: "How many are missing?",
        },
        { actor: ACTORS.STUDENT, text: "I see four missing!" },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653269443/Screen_Shot_2022-05-22_at_6.18.55_PM_tp4y5x.png",
    },
    {
      sample_talk: [
        { actor: ACTORS.TEACHER, text: "How were there altogether?" },
        { actor: ACTORS.STUDENT, text: "There were nine altogether!" },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653269443/Screen_Shot_2022-05-22_at_6.18.55_PM_tp4y5x.png",
    },
    {
      sample_talk: [
        { actor: ACTORS.TEACHER, text: "How many are left?" },
        { actor: ACTORS.STUDENT, text: "There are 5 left." },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653269443/Screen_Shot_2022-05-22_at_6.18.55_PM_tp4y5x.png",
    },
    {
      sample_talk: [
        {
          actor: ACTORS.TEACHER,
          text: "Can you write a subtraction sentence from the picture?",
        },
        { actor: ACTORS.STUDENT, text: " 8 - 3 = 5" },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653269443/Screen_Shot_2022-05-22_at_6.18.55_PM_tp4y5x.png",
    },
  ],
  INTERACTIVE: {
    TYPE: CONST.INTERACTIVE_TYPES.SUBITIZER,
    SETUP: CONST.SETUPS.subtraction_spheres,
  }, // sent to "Interactive Selector"
  QUICK_START: {
    STEPS: [
      { meta: "something", description: "Explore the interactive." },
      {
        meta: "something",
        description: "Follow the sample talk in the slides.",
      },
      {
        meta: "something",
        description: "Use the worksheet linked below to practice.",
      },
    ],
    META: "something",
  },
  LINKS: [
    {
      type: LINK_TYPES.FILE,
      text: "Subtraction Search Worksheet",
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1652665719/Subtraction_dh2njv.pdf",
    },
  ],
  INFO: { GRADE: "FirstGrade" },
};

export const card_matching = {
  KEY: "CB12",
  ID: "card_matching",
  HEADER: {
    TITLE: "Card Matching",
    SHORT_TEXT: "Number Recognition & Counting.",
  },
  EXEMPLAR_TALK: [
    {
      actor: ACTORS.TEACHER,
      text: "Can you find a match?",
    },
    { actor: ACTORS.STUDENT, text: "I see two fives!" },
    {
      actor: ACTORS.TEACHER,
      text: "How are they different?",
    },
    {
      actor: ACTORS.STUDENT,
      text: "The red one is in a row and the purple is 2's and 1's",
    },
  ],
  INTRO: {
    TEXT: "In this activity, students play a matching game where they identify numbers arranged in different ways. ",
  },
  SLIDES: [
    {
      sample_talk: [
        {
          actor: ACTORS.TEACHER,
          text: "Can you find a match?",
        },
        { actor: ACTORS.STUDENT, text: "I see two fives!" },
        {
          actor: ACTORS.TEACHER,
          text: "How are they different?",
        },
        {
          actor: ACTORS.STUDENT,
          text: "The red one is in a row and the purple is 2's and 1's",
        },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653271866/Screen_Shot_2022-05-22_at_10.09.31_PM_h04klf.png",
    },
    {
      sample_talk: [
        { actor: ACTORS.TEACHER, text: "How can you count your score?" },
        {
          actor: ACTORS.STUDENT,
          text: "I can count by tens to see how many I collected!",
        },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653526774/Screen_Shot_2022-05-25_at_8.59.01_PM_likal8.png",
    },
  ],
  INTERACTIVE: {
    TYPE: CONST.INTERACTIVE_TYPES.MATCH_GAME,
    SETUP: CONST.SETUPS.card_matching,
  }, // sent to "Interactive Selector"
  QUICK_START: {
    STEPS: [
      { meta: "something", description: "Open the game" },
      {
        meta: "something",
        description: "Find matches until all the cards are gone.",
      },
      { meta: "something", description: "Count how many dots you collected!" },
    ],
    META: "something",
  },
  LINKS: [
    {
      type: LINK_TYPES.GAME,
      text: "Match Game Numbers 2 to 5",
      url: "../interactives/match_game/card_matching_basic",
    },
    {
      type: LINK_TYPES.GAME,
      text: "Match Game Numbers 4 to 7",
      url: "../interactives/match_game/card_matching",
    },
    {
      type: LINK_TYPES.GAME,
      text: "Match Game Numbers 7 to 10",
      url: "../interactives/match_game/card_matching_advanced",
    },
    {
      type: LINK_TYPES.FILE,
      text: "Matching Cards Printout",
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653752139/NumberCards_saoqov.pdf",
    },
  ],
  INFO: { GRADE: "FirstGrade" },
};
