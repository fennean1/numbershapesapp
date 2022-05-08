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
  KEY: "H_E_A1",
  HEADER: {
    TITLE: "Hidden Eggs",
    SHORT_TEXT: "Adding and whole/part relationships.",
  },
  INTRO: {
    TEXT: "In this activity learners use the number of visible eggs and the total to find how many are hidden.",
  },
  SLIDES: [
    {
      sample_talk: [
        {
          actor: ACTORS.TEACHER,
          text: "How many eggs do you see? (How do you see them?)",
        },
        { actor: ACTORS.STUDENT, text: "I see 4 eggs!" },
        { actor: ACTORS.TEACHER, text: "How many eggs altogethr?" },
        { actor: ACTORS.STUDENT, text: "Eight eggs altogether." },
        {actor: ACTORS.TEACHER, text: "How many do you think are hidden?"}
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1652018182/Activities/Hidden%20Eggs/Screen_Shot_2022-05-08_at_9.54.15_AM_i701ut.png",
    },
    {
      sample_talk: [
        { actor: ACTORS.TEACHER, text: "Hello!" },
        { actor: ACTORS.TEACHER, text: "Hello!" },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1652018182/Activities/Hidden%20Eggs/Screen_Shot_2022-05-08_at_9.54.15_AM_i701ut.png",
    },
  ],
  INTERACTIVE: { TYPE: CONST.INTERACTIVE_TYPES.SUBITIZER, SETUP: { type: 6 } }, // sent to "Interactive Selector"
  QUCK_START: {
    STEPS: [{ meta: "something", description: "something" }],
    META: "something",
  },
  LINKS: [
    {
      type: LINK_TYPES.IMAGE,
      text: "This is a file",
      url: "https://res.cloudinary.com/duim8wwno/image/upload/v1640540480/HeadShot_pjlf0l.jpg",
    },
    {
      type: LINK_TYPES.FILE,
      text: "This is a file",
      url: "https://res.cloudinary.com/duim8wwno/image/upload/v1640540480/HeadShot_pjlf0l.jpg",
    },
  ],
  INFO: { GRADE: "FirstGrade" },
};
