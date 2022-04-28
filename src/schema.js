const MATH_PRACTICES = {}

const STANDARDS_CC = {}

const STANDARDS_OTHER = {}

const STEP_TYPES = {
  IMAGE: "icon",
  DISCUSSION: "icon",
  GAME: "icon",
  TEMPERATURE: "icon",
}

const TAGS = {
  FRACTIONS: "Fractions"
}

const SIZES = {SMALL_GROUP: "Small Group",
WHOLE_CLASS: "Whole Class",
}


const MATH_FOR_LOVE_FIELDS = []

const prototype = {
  HEADER: {},
  INTRO: {},
  SLIDES: {},
  INTERACTIVE: {},
  QUCK_START: {},
  SAMPLE_TALK: {},
  LINKS: ["type","text","url"],
  MORE_INFO: ["tags","strategies","standards"]
}

export const PROTOTYPE = {
    ID: "0000",
    GALLERY: ["link.cloudinary","link.cloudinary"], // First link is always thumbnail.
    TITLE: "Multiplication Search",
    OBJECTIVE: "Just have fun!",
    DESCRIPTION: "Students match multiplication facts to pictures.",
    INTRODUCTION: "This is a long form summary providing context, extra details and overall just a lot more things.",
    STEPS: ["Step One","Step Two","Step Three"],
    MATERIALS: "Just a description of the materials needed.",
    ICON_LINKS: {
      interactive: "link.com",
      video: "link.com",
      document: "docsendlink",
      article: "article, reading",
    },
    LINKS: [{title: "Great Link!",address: "www.com"},{title: "Another great link!!",address: "www.net"}],
    GRADES: {kindergarten: "K",first: "1st"},
    STANDARDS: {ID: "Description"},
    TAGS: ["Fractions","Place Value","Rich Task"],
    STRATEGIES: ["Hello"],
    SUMMARY: {assessment: "",consolidation: "", extension: ""},
    TIME: {from: 10,to: 20, unit: "minutes"},
    SIZE: SIZES.SMALL_GROUP,
    DELIVERABLES: "",
    MATH_PRACTICES: [{2: "Reason Abstractly and Quantitatively"}],
    DIALOG: [{actor: "student",text: "says this"},{actor: "teacher",text: "says this"},{actor: "teacher",text: "says this"}],
    META_TEXT: "Any text. Any length. Anything you want.",
}  