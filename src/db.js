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

export const saami_number_talks = {
  KEY: "CB12",
  ID: "saami_number_talks",
  HEADER: {
    TITLE: "Saami Number Talks",
    SHORT_TEXT: "Number Talks With Saami Puzzles",
  },
  CARD_IMAGE: "https://res.cloudinary.com/numbershapes/image/upload/v1656256571/saami_number_talks_cbnkbj.png",
  EXEMPLAR_TALK: [
    {
      actor: ACTORS.TEACHER,
      text: "Find a pair that add to the same number.",
    },
    {
      actor: ACTORS.STUDENT,
      text: "2,2 and 3 is the same as 3 and 4.",
    },
    {
      actor: ACTORS.TEACHER,
      text: "How do you know?",
    },
    {
      actor: ACTORS.STUDENT,
      text: "2+2 is 4, so 2+2 + 3 is the same as 4 and 3.",
    },
  ],
  INTRO: {
    TEXT: "Saami Number Talks are discussions about the relationships between different Saami cards. The following is an examplar of how a Saami Number Talk may look like in the classroom. Use it as a guide for facilitating the many puzzles that are available. See links at the bottom of page."
  },
  SLIDES: [
    {
      sample_talk: [
        {
          actor: ACTORS.TEACHER,
          text: "Find a pair that add to the same number.",
        },
        {
          actor: ACTORS.STUDENT,
          text: "2,2 and 3 is the same as 3 and 4.",
        },
        {
          actor: ACTORS.TEACHER,
          text: "How do you know?",
        },
        {
          actor: ACTORS.STUDENT,
          text: "2+2 is 4, so 2+2 + 3 is the same as 4 and 3.",
        },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1656256571/saami_number_talks_cbnkbj.png",
    },
    {
      sample_talk: [
        {
          actor: ACTORS.TEACHER,
          text: "Find a pair that add to the same number.",
        },
        {
          actor: ACTORS.STUDENT,
          text: "3 and 4 is the same as 2 and 5.",
        },
        {
          actor: ACTORS.TEACHER,
          text: "How do you know?",
        },
        {
          actor: ACTORS.STUDENT,
          text: "You can borrow from the five to make 3 and 4.",
        },
        {
          actor: ACTORS.TEACHER,
          text: "I see! So you take one from the five and give it to two and that makes 4 and 3?",
        },
        {
          actor: ACTORS.STUDENT,
          text: "Yes because we only moved things around!",
        },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1656261698/Screen_Shot_2022-06-26_at_12.41.25_PM_jbay3s.png",
    },
  ],
  INTERACTIVE: {
    TYPE: CONST.INTERACTIVE_TYPES.SAAMI,
    SETUP: CONST.SETUPS.SAAMI,
  }, // sent to "Interactive Selector"
  QUICK_START: {
    STEPS: [
      {
        meta: "something",
        description: "Launch Saami Number Talk",
      },
      {
        meta: "something",
        description: "Use the Sample Talk as an Exemplar",
      },
      {
        meta: "something",
        description: "Lead a Discussion",
      },
      {
        meta: "something",
        description: "Have Student Play on Their Own (or do this first!)",
      },
    ],
    META: "something",
  },
  LINKS: [
    {
      type: LINK_TYPES.GAME,
      text: "Symbolic Saami Number Talks",
      url: "../interactives/saami/saami_number_talks",
    },
  ],
  INFO: { GRADE: "FirstGrade" },
};


export const saami = {
  KEY: "CB12",
  ID: "saami",
  HEADER: {
    TITLE: "Saami",
    SHORT_TEXT: "Numbers Game",
  },
  CARD_IMAGE: "https://res.cloudinary.com/numbershapes/image/upload/v1654439209/CrushHelp_sjscc5.png",
  EXEMPLAR_TALK: [
    {
      actor: ACTORS.TEACHER,
      text: "Which one is different from the rest?",
    },
    {
      actor: ACTORS.STUDENT,
      text: "Do you mean a different shape?",
    },
    {
      actor: ACTORS.TEACHER,
      text: "Which has a different number when you count them",
    },
  ],
  INTRO: {
    TEXT: "Saami is a numbers game where players search for a number that's different from the rest.",
  },
  SLIDES: [
    {
      sample_talk: [
        {
          actor: ACTORS.TEACHER,
          text: "Which is different?",
        },
        {
          actor: ACTORS.STUDENT,
          text: "All are three except one of them!",
        },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1654439209/CrushHelp_sjscc5.png",
    },
  ],
  INTERACTIVE: {
    TYPE: CONST.INTERACTIVE_TYPES.SAAMI,
    SETUP: CONST.SETUPS.SAAMI,
  }, // sent to "Interactive Selector"
  QUICK_START: {
    STEPS: [
      {
        meta: "something",
        description: "Play Saami!",
      },
    ],
    META: "something",
  },
  LINKS: [
    {
      type: LINK_TYPES.GAME,
      text: "Ten Plus or Minus One",
      url: "../interactives/saami/tenplusorminusone",
    },
    {
      type: LINK_TYPES.GAME,
      text: "Counting Five to Ten",
      url: "../interactives/saami/countingfivetoten",
    },
    {
      type: LINK_TYPES.GAME,
      text: "First Numbers",
      url: "../interactives/saami/firstnumbers",
    },
    {
      type: LINK_TYPES.GAME,
      text: "Early Estimation",
      url: "../interactives/saami/earlyestimation",
    },
    {
      type: LINK_TYPES.IOS_APP,
      text: "App Store Link for NumberShapes Game",
      url: "https://apps.apple.com/us/app/numbershapes/id1444912086",
    },
  ],
  INFO: { GRADE: "FirstGrade" },
};


export const hidden_eggs = {
  KEY: "AB13",
  ID: "hidden_eggs",
  HEADER: {
    TITLE: "Hidden Eggs",
    SHORT_TEXT: "Breaking Numbers Apart",
  },
  CARD_IMAGE: "https://res.cloudinary.com/numbershapes/image/upload/v1652018182/Activities/Hidden%20Eggs/Screen_Shot_2022-05-08_at_9.54.15_AM_i701ut.png",
  EXEMPLAR_TALK: [
    { actor: ACTORS.TEACHER, text: "How many altogether?" },
    { actor: ACTORS.STUDENT, text: "There are eight altogether!" },
    { actor: ACTORS.TEACHER, text: "How many do you think are hidden?" },
    {
      actor: ACTORS.STUDENT,
      text: "I can only see four so that means four more are hidden!",
    },
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
      type: LINK_TYPES.FILE,
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
  CARD_IMAGE: "https://res.cloudinary.com/numbershapes/image/upload/v1653269443/Screen_Shot_2022-05-22_at_6.18.55_PM_tp4y5x.png",
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
  CARD_IMAGE: "https://res.cloudinary.com/numbershapes/image/upload/v1653271866/Screen_Shot_2022-05-22_at_10.09.31_PM_h04klf.png",
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
    {
      type: LINK_TYPES.IOS_APP,
      text: "App Store Link for NumberShapes Game",
      url: "https://apps.apple.com/us/app/numbershapes/id1444912086",
    },
  ],
  INFO: { GRADE: "FirstGrade" },
};

export const multiplication_groups = {
  KEY: "CB12",
  ID: "multiplication_groups",
  HEADER: {
    TITLE: "Multiplication Groups",
    SHORT_TEXT: "Visual Grouping.",
  },
  CARD_IMAGE: "https://res.cloudinary.com/numbershapes/image/upload/v1653841851/Screen_Shot_2022-05-29_at_12.28.48_PM_pbw6r9.png",
  EXEMPLAR_TALK: [
    {
      actor: ACTORS.TEACHER,
      text: "What do the circle buttons do?",
    },
    {
      actor: ACTORS.STUDENT,
      text: "They change how much is in each group!",
    },
    {
      actor: ACTORS.TEACHER,
      text: "What do the square buttons do?",
    },
    {
      actor: ACTORS.STUDENT,
      text: "They change the number of groups.",
    },
  ],
  INTRO: {
    TEXT: "In this activity, students learn how to visualize multiplication as repeated groups.",
  },
  SLIDES: [
    {
      sample_talk: [
        {
          actor: ACTORS.TEACHER,
          text: "What do the circle buttons do?",
        },
        {
          actor: ACTORS.STUDENT,
          text: "They change how many are in each group.",
        },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653937943/Screen_Shot_2022-05-30_at_3.10.36_PM_wsfahs.png",
    },
    {
      sample_talk: [
        { actor: ACTORS.TEACHER, text: "What do the square buttons do?" },
        {
          actor: ACTORS.STUDENT,
          text: "They change the number of groups!",
        },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653937944/Screen_Shot_2022-05-30_at_3.10.28_PM_xumtdw.png",
    },
    {
      sample_talk: [
        { actor: ACTORS.TEACHER, text: "What are two ways to show 6x8?" },
        {
          actor: ACTORS.STUDENT,
          text: "Six groups of eight or eight groups of six!",
        },
      ],
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653842435/Website_Image_Factory_d3majd.png",
    },
  ],
  INTERACTIVE: {
    TYPE: CONST.INTERACTIVE_TYPES.MULTIPLICATION,
    SETUP: CONST.SETUPS.multiplication,
  }, // sent to "Interactive Selector"
  QUICK_START: {
    STEPS: [
      {
        meta: "something",
        description: "Explore the Multiplication Interactive",
      },
      {
        meta: "something",
        description:
          "Discuss the differences between the square buttons and the circle buttons.",
      },
    ],
    META: "something",
  },
  LINKS: [
    {
      type: LINK_TYPES.FILE,
      text: "Multiplication Poster",
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653767740/MultplicationPosterPDF_godt8l.pdf",
    },
    {
      type: LINK_TYPES.IOS_APP,
      text: "App Store Link for Multiplication Fact Game",
      url: "https://apps.apple.com/us/app/multiplication-fact-workout/id1085400375",
    },
    {
      type: LINK_TYPES.FILE,
      text: "Multiplication Search Worksheet.",
      url: "https://res.cloudinary.com/numbershapes/image/upload/v1653620561/Multiplication_l761yo.pdf",
    },
  ],
  INFO: { GRADE: "FirstGrade" },
};


