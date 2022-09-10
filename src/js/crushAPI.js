// Problem que setup
import * as PIXI from "pixi.js";
import Clouds from "../assets/Clouds.png";
import BlueBall from "../assets/BlueBall.png";

import NewBlueBall from "../assets/NewBlueBall.png";
import NewRedBall from "../assets/NewRedBall.png";
import NewGreenBall from "../assets/NewGreenBall.png";
import NewOrangeBall from "../assets/NewOrangeBall.png";
import NewYellowBall from "../assets/NewYellowBall.png";
import NewPurpleBall from "../assets/NewPurpleBall.png";
import NewDarkPurpleBall from "../assets/NewDarkPurpleBall.png";
import NewLightBlueBall from "../assets/NewLightBlueBall.png";
import NewPinkBall from "../assets/NewPinkBall.png";

//import HalfBall from "../assets/HalfBall.png";
import RedSquare from "../assets/Square.png";
import Diamond from "../assets/Diamond.png";
import StartButton from "../assets/GoButton.png";
import Heart from "../assets/Heart.png";
import CrushHelp from "../assets/CrushHelp.png";

import one from "../assets/H1.png";
import two from "../assets/H2.png";
import three from "../assets/H3.png";
import four from "../assets/H4.png";
import five from "../assets/H5.png";
import six from "../assets/H6.png";
import seven from "../assets/H7.png";
import eight from "../assets/H8.png";
import nine from "../assets/H9.png";
import ten from "../assets/H10.png";

import {
  getRandomArray,
  getRandomInt,
  Draggable,
  shuffleArray,
  getNRandomElementsFromArray,
} from "./api.js";
import { Timeline, Tween, Elastic } from "gsap/gsap-core";
import {
  counters,
  levelTypes,
  LEVELS,
  saamiPuzzles,
  assessmentCardCustomCoordinates,
  assessmentProgression,
} from "./crushlevels.js";
import { getWidthAndHeightOfNumberShape, NUMBERSHAPES } from "./numbershapes";

let NUMERALS = [];

let LINE_COLORS = {
  darkpurple: 0x5940ff,
  lightblue: 0x70e0ff,
  pink: 0xff0593,
  yellow: 0xfced0f,
  blue: 0x1191fa,
  red: 0xff4545,
  purple: 0xb407f2,
  orange: 0xff860d,
  green: 0x00c91e,
  rainbow: 0xff2465,
  square: 0x00b30f,
  diamond: 0xff2465,
  black: 0x000000,
};


const initLevel = {
  grid: [2, 2],
  value: 3,
  delta: 2,
  mesh: [2, 2],
};

export const init = (app, setup) => {


  // Check for Custom Level (IDEA: no such thing as custom lvl)
  let customLevel = null
  customLevel = LEVELS[setup.level];
  
  let quizEvery = 5

  let progression = assessmentProgression(customLevel)
  let levels = saamiPuzzles;
  
  let mainLevelsMod = levels.length;
  let assessmentMod = progression.length
  
  const NUMBER_OF_LIVES = 9;
  let levelCounter = 0;
  let progressionCounter = 0;
  let lifeCounter = NUMBER_OF_LIVES;


  // UI
  let plusHeart;

  // Vars
  let levelStartedAt = null;

  const scoreObject = {
    score: 0,
    timer: 0,
    focusTime: 0,
  }

  setInterval(()=>{
    scoreObject.timer += 1
  },10)

  // #region Init Levels

  // Check to see if setup represents a custom level.

  // Parse Slug
  const potentialLevel = setup.level.substring(5);
  const prefix = setup.level.substring(0, 5);

  // Level previx is a keyword
  if (prefix === "level") {
    let notNumber = isNaN(potentialLevel);
    // Check to see if valid number was provided.
    if (!notNumber && potentialLevel > 0 && potentialLevel <= mainLevelsMod) {
      levelCounter = potentialLevel - 1;
      levelStartedAt = levelCounter;
    }
  }

  // Check the type of the custom level coming in.
  if (customLevel && customLevel.type == levelTypes.assessment){
    levels = customLevel.puzzles.map(ppArr=>{
      const _mod = ppArr.length
      const int = getRandomInt(100)
      const i = int%_mod
      return ppArr[i]
    })
    mainLevelsMod = levels.length;
  } else if (customLevel) {
    levels = customLevel.puzzles;
    mainLevelsMod = levels.length;
  }

  // #endregion

  let LINE_COLOR = 0x1191fa;
  const ABS_CARD_COLOR = LINE_COLORS.black;

  const ABSTRACT_CARDS = {
    1: new PIXI.Text("1", {
      fontFamily: "Quicksand",
      fill: ABS_CARD_COLOR,
      fontSize: 60,
    }),
    2: new PIXI.Text("2", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Quicksand",
      fontSize: 60,
    }),
    3: new PIXI.Text("3", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Quicksand",
      fontSize: 60,
    }),
    4: new PIXI.Text("4", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Quicksand",
      fontSize: 60,
    }),
    5: new PIXI.Text("5", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Quicksand",
      fontSize: 60,
    }),
    6: new PIXI.Text("6", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Quicksand",
      fontSize: 60,
    }),
    7: new PIXI.Text("7", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Quicksand",
      fontSize: 60,
    }),
    8: new PIXI.Text("8", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Quicksand",
      fontSize: 60,
    }),
    9: new PIXI.Text("9", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Quicksand",
      fontSize: 60,
    }),
    10: new PIXI.Text("10", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Quicksand",
      fontSize: 60,
    }),
  };

  const NUMBER_CARDS = {
    1: new PIXI.Texture.from(one),
    2: new PIXI.Texture.from(two),
    3: new PIXI.Texture.from(three),
    4: new PIXI.Texture.from(four),
    5: new PIXI.Texture.from(five),
    6: new PIXI.Texture.from(six),
    7: new PIXI.Texture.from(seven),
    8: new PIXI.Texture.from(eight),
    9: new PIXI.Texture.from(nine),
    10: new PIXI.Texture.from(ten),
  };

  // Flags
  let helping = false;
  let learning = false;

  let pool;

  let startButton;
  let levelText;
  let helpButton;
  let endOfGameModal;
  let endOfGameText;
  let helpModal;
  let livesHeart;
  let livesText;
  let backGround;

  let currentLevel;

  const TEXT_COLOR = 0x1191fa;

  let cardGraphics = new PIXI.Graphics();

  let tlHeartBeat = new Timeline({ paused: true });

  let isMobileDevice = setup.width / setup.height < 0.75 ? true : false;

  let NEW_CARD_WIDTH = 40;

  let VIEW_WIDTH = setup.width;
  let VIEW_HEIGHT = setup.height;
  let MIN_DIM = Math.min(VIEW_WIDTH, VIEW_HEIGHT);

  let MARGIN_TOP = MIN_DIM * 0.02;

  let TOP_PADDING = isMobileDevice ? 0.1 * setup.height : 0.05 * setup.height;

  let CARD_TEXTURE;

  let maxMeshDimension = Math.max(initLevel.mesh[0], initLevel.mesh[1]);

  let gridUnitsWide = (maxMeshDimension + 2) * initLevel.grid[0];
  let gridUnitsHigh = (maxMeshDimension + 2) * initLevel.grid[1];
  let gridUnitsMax = Math.max(gridUnitsHigh, gridUnitsWide);

  let FONT_SIZE = isMobileDevice ? TOP_PADDING / 2 : TOP_PADDING;

  let DEFAULT_COUNTER = "blue";

  let UNIT = MIN_DIM / gridUnitsMax;
  let SPACE_BETWEEN_CARDS = UNIT / 4;
  let CARD_WIDTH = (maxMeshDimension + 1) * UNIT;
  let GRID_WIDTH =
    CARD_WIDTH * initLevel.grid[0] +
    SPACE_BETWEEN_CARDS * (initLevel.grid[0] - 1);
  let GRID_HEIGHT =
    CARD_WIDTH * initLevel.grid[1] +
    SPACE_BETWEEN_CARDS * (initLevel.grid[1] - 1);
  let delta = CARD_WIDTH + SPACE_BETWEEN_CARDS;

  let RED_SQUARE_COUNTER = new PIXI.Texture.from(RedSquare);
  let DIAMOND_COUNTER = new PIXI.Texture.from(Diamond);

  let NEW_RED_COUNTER = new PIXI.Texture.from(NewRedBall);
  let NEW_PURPLE_COUNTER = new PIXI.Texture.from(NewPurpleBall);
  let NEW_ORANGE_COUNTER = new PIXI.Texture.from(NewOrangeBall);
  let NEW_LIGHT_BLUE_COUNTER = new PIXI.Texture.from(NewLightBlueBall);
  let NEW_YELLOW_COUNTER = new PIXI.Texture.from(NewYellowBall);
  let NEW_DARK_PURPLE_COUNTER = new PIXI.Texture.from(NewDarkPurpleBall);
  let NEW_GREEN_COUNTER = new PIXI.Texture.from(NewGreenBall);
  let NEW_BLUE_COUNTER = new PIXI.Texture.from(NewBlueBall);
  let NEW_PINK_COUNTER = new PIXI.Texture.from(NewPinkBall);

  let RAINBOW = [
    NEW_YELLOW_COUNTER,
    NEW_LIGHT_BLUE_COUNTER,
    NEW_ORANGE_COUNTER,
    NEW_GREEN_COUNTER,
    NEW_BLUE_COUNTER,
    NEW_PINK_COUNTER,
    NEW_PURPLE_COUNTER,
    NEW_RED_COUNTER,
    NEW_DARK_PURPLE_COUNTER,
  ];

  let COUNTER_TEXTURE = NEW_BLUE_COUNTER;

  const C = {
    default: {
      texture: NEW_BLUE_COUNTER,
      stroke: LINE_COLORS.red,
      value: 1,
    },
    square: {
      texture: RED_SQUARE_COUNTER,
      stroke: 0xfc2003,
      value: 1,
    },
    diamond: {
      texture: DIAMOND_COUNTER,
      stroke: LINE_COLORS.blue,
      value: 1,
    },
    blue: {
      texture: NEW_BLUE_COUNTER,
      stroke: LINE_COLORS.blue,
      value: 1,
    },
    red: {
      texture: NEW_RED_COUNTER,
      stroke: LINE_COLORS.red,
      value: 1,
    },
    green: {
      texture: NEW_GREEN_COUNTER,
      stroke: LINE_COLORS.green,
      value: 1,
    },
    yellow: {
      texture: NEW_YELLOW_COUNTER,
      stroke: LINE_COLORS.yellow,
      value: 1,
    },
    pink: {
      texture: NEW_PINK_COUNTER,
      stroke: LINE_COLORS.pink,
      value: 1,
    },
    lightblue: {
      texture: NEW_LIGHT_BLUE_COUNTER,
      stroke: LINE_COLORS.lightblue,
      value: 1,
    },
    orange: {
      texture: NEW_ORANGE_COUNTER,
      stroke: LINE_COLORS.orange,
      value: 1,
    },
    purple: {
      texture: NEW_PURPLE_COUNTER,
      stroke: LINE_COLORS.purple,
      value: 1,
    },
    rainbow: {
      texture: NEW_PINK_COUNTER,
      stroke: LINE_COLORS.pink,
      value: 1,
    },
    darkpurple: {
      texture: NEW_DARK_PURPLE_COUNTER,
      stroke: LINE_COLORS.darkpurple,
      value: 1,
    },
    black: {
      texture: NEW_DARK_PURPLE_COUNTER,
      stroke: LINE_COLORS.black,
      value: 1,
    },
  };

  let originX = VIEW_WIDTH / 2 - GRID_WIDTH / 2;
  let originY = VIEW_HEIGHT / 2 - GRID_HEIGHT / 2;

  function animateHeart() {
    const onComplete = () => {
      updateLives();
      plusHeart.y = VIEW_HEIGHT + plusHeart.height;
      plusHeart.x = livesHeart.x;
    };

    Tween.to(plusHeart, {
      duration: 0.5,
      alpha: 1,
      width: livesHeart.width,
      height: livesHeart.height,
      ease: "power4.in",
      y: livesHeart.y,
      x: livesHeart.x,
      onComplete: onComplete,
    });
  }

  function cardClicked(e) {
    if (!learning) {
      if (e.target.isOffCard == true) {
        if (currentLevel.type == "number") {
          lifeCounter++;
          animateHeart();
        }

        levelCounter++;
        updateLevelDescriptor();

        // Safely initializing to initLevel
        let newLevel = levels[levelCounter % mainLevelsMod];

        // MOOOOOOOOOO
        if (levelCounter%quizEvery == 0){
           newLevel = progression[progressionCounter%assessmentMod]
           progressionCounter++
        } 

        // Some new levels don't have a counter specified.
        if (!newLevel.counter) {
          newLevel.counter = DEFAULT_COUNTER;
        }

        backGround.interactive = false;

        updateLayoutParams(setup.width, setup.height, newLevel);

        const onComplete = () => {
          pool.loadLevel(newLevel);
          dealCards(pool);
        };

        Tween.to(pool.activeCards, {
          alpha: 0,
          duration: 0.01,
          ease: "power4.in",
          onComplete: onComplete,
        });
      } else {
        pool.activeCards.forEach((c) => (c.interactive = false));
        backGround.interactive = false;
        const onComplete = () => {
          pool.activeCards.forEach((c) => (c.interactive = true));
          backGround.interactive = true;
          if (lifeCounter == 0) {
            endGame();
          }
        };

        app.stage.addChild(e.target.numeral);
        Tween.fromTo(e.target.numeral, { alpha: 1 }, { duration: 3, alpha: 0 });
        Tween.to(e.target, {
          onComplete: onComplete,
          rotation: 1,
          y: setup.height * 2,
        });
        lifeCounter--;
        updateLives();
      }
    }
  }

  function endGame() {
    const onComplete = () => {
      endOfGameModal.interactive = true;
    };

    // Interactivity
    endOfGameModal.interactive = false;
    backGround.interactive = false;
    pool.cards.forEach((c) => {
      c.interactive = false;
    });

    Tween.to(endOfGameModal, {
      y: 0,
      duration: 2,
      ease: "elastic",
      onComplete: onComplete,
    });
    Tween.to(endOfGameText, {
      y: setup.height / 2,
      duration: 2,
      ease: "elastic",
    });

    endOfGameText.text = scoreObject.score + " Points!"

    app.stage.addChild(endOfGameModal);
    app.stage.addChild(endOfGameText);
  }

  function restartGame() {
    const onComplete = () => {
      app.stage.removeChild(endOfGameModal);
      dealCards(pool);
    };
    Tween.to(endOfGameModal, {
      duration: 1,
      y: 1.1 * setup.height,
      onComplete: onComplete,
      ease: "elastic",
    });
    Tween.to(endOfGameText, {
      duration: 1,
      y: 1.1 * setup.height,
      ease: "elastic",
    });
    levelCounter = 0;
    progressionCounter = 0;
    lifeCounter = NUMBER_OF_LIVES;

    livesText.text = lifeCounter;
    updateLevelDescriptor(0);
    const newLevel = levels[levelCounter % mainLevelsMod];
    updateLayoutParams(setup.width, setup.height, newLevel);
    pool.loadLevel(newLevel);

    scoreObject.score = 0 
    scoreObject.time = 0
  }

  class Card extends PIXI.Container {
    constructor(level) {
      super();
      this.level = level;
      this.value = level.value;
      this.balls = [];
      this.dim = CARD_WIDTH;
      this.mesh = level.mesh;
      this.maxMeshDim = Math.max(this.mesh[0], this.mesh[1]);
      this.unit = CARD_WIDTH / (this.maxMeshDim + 1);
      this.init();
    }

    draw(level, mesh, value, acc) {
      this.dim = CARD_WIDTH;
      this.level = level;
      this.mesh = mesh;
      this.value = value;
      this.maxMeshDim = Math.max(mesh[0], mesh[1]);
      this.unit = UNIT;

      if (!this.level.counter) {
        this.level.counter = counters.default;
      }

      const c = C[this.level.counter];
      LINE_COLOR = c.stroke;
      COUNTER_TEXTURE = c.texture;

      this.apparentWidth = CARD_WIDTH;
      this.apparentHeight = CARD_WIDTH;

      this.bg.width = CARD_WIDTH;
      this.bg.height = CARD_WIDTH;

      this.bg.texture = CARD_TEXTURE;

      let shapeHeight = this.mesh[0] * this.unit;
      let shapeWidth = this.mesh[1] * this.unit;


      let offsetY = CARD_WIDTH / 2 - shapeWidth / 2;
      let offsetX = CARD_WIDTH / 2 - shapeHeight / 2;


      this.balls.forEach((b) => {
        this.removeChild(b);
        b.texture = COUNTER_TEXTURE;
        b.width = this.unit;
        b.height = this.unit;
      });


      // We probably want to have different "card types"
      if (this.level.type == "number") {

        const card = this.level.cards[acc];
        const { arr, types } = card;
        const coords = assessmentCardCustomCoordinates[arr.length];

        shuffleArray(coords);

        const sum = arr.reduce((a, b) => {
          return a + b;
        });

        this.value = sum;

        if (sum != this.level.value) {
          this.isOffCard = true;
        }

        arr.forEach((c, i) => {
          let sprite = this.balls[i];

          let t;

          if (types[i] == 1) {
            let ac = ABSTRACT_CARDS[c];

            ac.updateText();
            t = ac.texture;
          } else {
            t = NUMBER_CARDS[c];
          }

          sprite.height = this.unit;
          sprite.width = (this.unit * t.width) / t.height;

          sprite.texture = t;

          sprite.x =
            coords[i][0] * this.unit +
            offsetX +
            this.unit / 2 -
            sprite.width / 2;
          sprite.y = coords[i][1] * this.unit + offsetY;

          this.addChild(sprite);
        });
      } else {

        // Switch to Array Type Here 
        let array = getRandomArray(this.mesh[0], this.mesh[1], value);

        if (this.level.customMesh){
          
            // Get array from number
          let meshVal = this.level.customMesh.value
          array = NUMBERSHAPES[meshVal](0.5)

          // Get dimensions of array
          const hw = getWidthAndHeightOfNumberShape(array,0.5)
 
          // recalculate offset (it appears that the offset calculations needs to be adjusted by a half.)
          offsetY = CARD_WIDTH / 2 - (hw.height+0.5)*this.unit/2;
          offsetX = CARD_WIDTH / 2 - (hw.width+0.5)*this.unit/2;  
          
          array = getNRandomElementsFromArray(array,value)

          // Clean array (2d array instead of array of objects)
          array = array.map(e=> {return [e.x,e.y]})
        } else {
          array = getRandomArray(this.mesh[0], this.mesh[1], value);
        }
       


        array.forEach((c, i) => {
          let sprite = this.balls[i];

          if (this.level.counter == "rainbow") {
            sprite.texture = RAINBOW[i % 9];
          } else {
            sprite.texture = COUNTER_TEXTURE;
          }

          sprite.width = this.unit;
          sprite.height = this.unit;
          sprite.x = c[0] * this.unit + offsetX;
          sprite.y = c[1] * this.unit + offsetY;
          this.addChild(sprite);
        });
      }
    }

    init() {
      this.bg = new PIXI.Sprite.from(BlueBall);
      this.addChild(this.bg);

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          let s = new Draggable();
          s.interactive = false;
          this.balls.push(s);
          this.addChild(s);
        }
      }

      this.draw(this.level, this.mesh, this.value);
    }
  }

  class CardPool {
    constructor(level) {
      this.cards = [];
      this.activeCards = [];
      this.dim = CARD_WIDTH;
      this.level = level;
      this.init();
    }

    loadLevel(level) {
      this.activeCards = [];

      this.dim = CARD_WIDTH;
      this.level = level;
      this.cards.forEach((c) => {
        app.stage.removeChild(c);
        c.interactive = false;
        c.inPlay = false;
        c.rotation = 0;
        c.isOffCard = false;
        c.alpha = 1;
      });

      let acc = 0;

      let r = getRandomInt(level.grid[0] * level.grid[1]);

      for (let i = 0; i < level.grid[0]; i++) {
        for (let j = 0; j < level.grid[1]; j++) {
          let c = this.cards[acc];

          // Handling offcard
          let potentialValue = level.value;

          if (acc == r && level.type != "number") {
            const randMod = getRandomInt(20);

            if (level.random == false) {
              potentialValue = potentialValue + level.delta;
            } else if (randMod % 2 == 0) {
              potentialValue = potentialValue - level.delta;
            } else {
              potentialValue = potentialValue + level.delta;
            }
            c.isOffCard = true;
          }
          c.draw(level, level.mesh, potentialValue, acc);

          c.y = -1.1 * CARD_WIDTH;
          c.x = originX + (i % level.grid[0]) * CARD_WIDTH;
          c.inPlay = true;
          c.i = i;
          c.j = j;
          app.stage.addChild(c);
          this.activeCards.push(c);
          acc++;
        }
      }
    }

    init() {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          let card = new Card(this.level);
          card.interactive = true;
          card.on("pointerdown", (e) => cardClicked(e));
          this.cards.push(card);
        }
      }
    }
  }

  function backgroundPointerDown() {
    learning = !learning;
    if (learning) {
      this.alpha = 0.6;
      app.renderer.backgroundColor = 0x000000;
      pool.activeCards.forEach((c) => {
        c.balls.forEach((b) => {
          b.interactive = true;
          b.wiggle();
        });
      });
    } else {
      this.alpha = 1;
      pool.activeCards.forEach((c) => {
        c.balls.forEach((b) => (b.interactive = false));
      });
    }
  }


  function updateLayoutParams(width, height, newLevel) {
    currentLevel = newLevel;

    VIEW_WIDTH = width;
    VIEW_HEIGHT = height;

    // New Algo

    if (!newLevel.counter) {
      newLevel.counter = DEFAULT_COUNTER;
    }

    LINE_COLOR = LINE_COLORS[newLevel.counter];

    // Logic for laying out cards in different dimensions
    if (isMobileDevice) {
      let tempM0 = newLevel.grid[0];
      let tempM1 = newLevel.grid[1];
      newLevel.grid = [tempM1, tempM0];
      NEW_CARD_WIDTH = (0.8 * VIEW_WIDTH) / newLevel.grid[0];
    } else {
      if (VIEW_HEIGHT < VIEW_WIDTH) {
        NEW_CARD_WIDTH = (0.7 * VIEW_HEIGHT) / newLevel.grid[1];
      } else {
        NEW_CARD_WIDTH = (0.85 * VIEW_WIDTH) / newLevel.grid[0];
      }
    }

    MIN_DIM = Math.min(VIEW_WIDTH, VIEW_HEIGHT);

    maxMeshDimension = Math.max(newLevel.mesh[0], newLevel.mesh[1]);

    MARGIN_TOP = MIN_DIM * 0.02;

    const maxGridDim = Math.max(newLevel.grid[0], newLevel.grid[1]);

    TOP_PADDING = isMobileDevice ? 0.1 * setup.height : 0.02 * setup.height;

    gridUnitsWide = (newLevel.mesh[0] + 2) * newLevel.grid[0];
    gridUnitsHigh = (newLevel.mesh[1] + 2) * newLevel.grid[1];
    gridUnitsMax = Math.max(gridUnitsHigh, gridUnitsWide);

    SPACE_BETWEEN_CARDS = MIN_DIM / 50 / (maxGridDim - 1);
    CARD_WIDTH = NEW_CARD_WIDTH;
    UNIT = CARD_WIDTH / maxMeshDimension;
    UNIT = (CARD_WIDTH - UNIT) / maxMeshDimension;

    if (newLevel.type == "number") {
      UNIT = UNIT * 1.9;
      shuffleArray(newLevel.cards);
    }

    GRID_WIDTH =
      CARD_WIDTH * newLevel.grid[0] +
      SPACE_BETWEEN_CARDS * (newLevel.grid[0] - 1);
    GRID_HEIGHT =
      CARD_WIDTH * newLevel.grid[1] +
      SPACE_BETWEEN_CARDS * (newLevel.grid[1] - 1);
    delta = CARD_WIDTH + SPACE_BETWEEN_CARDS;

    originX = VIEW_WIDTH / 2 - GRID_WIDTH / 2;
    originY = VIEW_HEIGHT / 2 - GRID_HEIGHT / 2;

    LINE_COLOR = C[newLevel.counter].stroke;

    cardGraphics.clear();
    cardGraphics.beginFill(0xffffff);
    cardGraphics.lineStyle(CARD_WIDTH / 50, LINE_COLOR);
    cardGraphics.drawRoundedRect(0, 0, CARD_WIDTH, CARD_WIDTH, CARD_WIDTH / 10);
    CARD_TEXTURE = app.renderer.generateTexture(cardGraphics);

    Object.keys(ABSTRACT_CARDS).forEach((k) => {
      let t = ABSTRACT_CARDS[k];
      t.fontSize = CARD_WIDTH / 2;
      //t.anchor.set(0.5,0)
    });
  }

  function startGame() {
    const startLevel = levels[levelCounter % mainLevelsMod];

    updateLayoutParams(setup.width, setup.height, startLevel);

    pool.loadLevel(startLevel);

    const onComplete = () => {
      dealCards(pool);
    };

    Tween.to(livesText, { duration: 2, alpha: 1, ease: "elastic" });
    Tween.to(livesHeart, { duration: 2, alpha: 1, ease: "elastic" });
    Tween.to(levelText, { duration: 2, alpha: 1, ease: "elastic" });
    Tween.to(helpButton, { delay: 2, duration: 1, y: MARGIN_TOP, ease: "elastic" });

    livesText.text = NUMBER_OF_LIVES;
    helpButton.text = "?";

    Tween.to(this, { y: -this.height, onComplete: onComplete });
  }

  function makeInteractive() {
    this._targets[0].interactive = true;
  }

  function dealCards(pool) {
    scoreObject.focusTime = scoreObject.timer
    setTimeout(() => {
      backGround.interactive = true;
    }, 2000);


    // Blue numerals behind the cards that show the value. 
    NUMERALS.forEach((n) => {
      n.x = -CARD_WIDTH;
      n.alpha = 0;
      app.stage.removeChild(n);
    });

    pool.cards.forEach((c, i) => {
      if (c.inPlay == true) {
        let _x = originX + delta * c.i;
        let _y = originY + delta * c.j;
        let n = NUMERALS[i];

        n.x = _x + CARD_WIDTH / 2;
        n.y = _y + CARD_WIDTH / 2;

        n.fill = LINE_COLOR;
        n.text = c.value;

        c.numeral = n;

        app.stage.addChild(c);
        Tween.to(c, {
          duration: 0.65,
          x: _x,
          y: _y,
          ease: Elastic.easeOut.config(0.8, 0.5),
          callBackScope: this,
          onComplete: makeInteractive,
        });
      } else {
        app.stage.removeChild(c);
      }
    });
  }

  function updateLevelDescriptor(val) {
    if (val != null){
      levelText.text = "Score: " + val
    } else {
      const {timer,focusTime } = scoreObject

      const levelScore = Math.round(Math.pow(2,11/(1+(timer-focusTime)/1000))/30)

      scoreObject.score += levelScore
      levelText.text = "Score: " + scoreObject.score
    }
  }

  function updateLives() {
    livesText.text = lifeCounter;
    tlHeartBeat.restart();
    tlHeartBeat.pause();
    tlHeartBeat.play();
  }

  function help() {
    app.stage.addChild(helpModal);

    const onHelp = () => {
      helping = true;
    };

    const onHelpLeave = () => {
      helping = false;
    };

    if (!helping) {
      Tween.to(helpModal, {
        x: setup.width / 2,
        y: setup.height / 2,
        onComplete: onHelp,
      });
    } else {
      Tween.to(helpModal, { x: 2 * setup.width, onComplete: onHelpLeave });
    }
  }

  function load() {
    pool = new CardPool(initLevel);

    backGround = new PIXI.Sprite.from(Clouds);
    backGround.on("pointerdown", backgroundPointerDown);
    backGround.x = 0;
    backGround.y = 0;
    backGround.width = setup.width;
    backGround.height = setup.height;
    app.stage.addChild(backGround);

    startButton = new PIXI.Sprite.from(StartButton);
    startButton.anchor.set(0.5);
    startButton.interactive = true;
    startButton.x = setup.width / 2;
    startButton.y = setup.height / 2;
    startButton.width = CARD_WIDTH * 1.5;
    startButton.height = CARD_WIDTH * 1.5;
    startButton.on("pointerdown", startGame);
    app.stage.addChild(startButton);

    livesText = new PIXI.Text("b", {
      fontWeight: "bold",
      fontFamily: "Quicksand",
      fontSize: FONT_SIZE,
    });
    livesText.style.fill = TEXT_COLOR;
    livesText.x = MARGIN_TOP;
    livesText.y = MARGIN_TOP;
    app.stage.addChild(livesText);

    livesHeart = new PIXI.Sprite.from(Heart);
    livesHeart.width = FONT_SIZE;
    livesHeart.height = FONT_SIZE;
    livesHeart.anchor.set(0.5, 0.5);
    app.stage.addChild(livesHeart);
    livesHeart.y = MARGIN_TOP + livesHeart.height / 2;
    livesHeart.x = livesText.x + livesText.width * 2.5;

    plusHeart = new PIXI.Sprite.from(Heart);
    plusHeart.width = MIN_DIM / 2;
    plusHeart.height = MIN_DIM / 2;
    app.stage.addChild(plusHeart);
    plusHeart.anchor.set(0.5, 0.5);
    plusHeart.alpha = 0;
    plusHeart.x = livesHeart.x;
    plusHeart.y = VIEW_HEIGHT + livesHeart.height;

    levelText = new PIXI.Text("0", {
      fontWeight: "bold",
      fontFamily: "Quicksand",
      fontSize: FONT_SIZE,
    });
    levelText.anchor.x = 0.5;
    levelText.style.fill = TEXT_COLOR;
    levelText.x = setup.width / 2;
    levelText.y = MARGIN_TOP;
    app.stage.addChild(levelText);

    let heartWidth = livesHeart.width;

    tlHeartBeat.to(livesHeart, {
      width: heartWidth * 0.5,
      height: heartWidth * 1.1,
      duration: 0.25,
    });
    tlHeartBeat.to(livesHeart, {
      width: heartWidth * 1.1,
      height: heartWidth * 0.5,
      duration: 0.25,
    });
    tlHeartBeat.to(livesHeart, {
      width: heartWidth,
      height: heartWidth,
      duration: 0.5,
      ease: "elastic",
    });

    endOfGameModal = new PIXI.Graphics();
    endOfGameModal.beginFill(0xffffff);
    endOfGameModal.drawRoundedRect(0, 0, setup.width, setup.height);
    endOfGameModal.y = setup.height * 1.1;
    endOfGameModal.interactive = true;
    endOfGameModal.on("pointerdown", () => restartGame());

    endOfGameText = new PIXI.Text("blank", {
      fontWeight: "bold",
      fontFamily: "Quicksand",
      fontSize: setup.height / 15,
    });
    endOfGameText.style.fill = TEXT_COLOR;
    endOfGameText.y = setup.height;
    endOfGameText.x = setup.width / 2;
    endOfGameText.anchor.set(0.5);

    helpModal = new PIXI.Sprite.from(CrushHelp);
    helpModal.width = MIN_DIM;
    helpModal.height = MIN_DIM;
    helpModal.anchor.set(0.5);
    helpModal.x = 2 * setup.width;
    helpModal.interactive = true;
    helpModal.y = setup.height / 2;
    helpModal.on("pointerdown", help);
    app.stage.addChild(helpModal);

    helpButton = new PIXI.Text("b", {
      fontWeight: "bold",
      fontFamily: "Quicksand",
      fontSize: FONT_SIZE,
    });
    helpButton.style.fill = 0xff1f5e; 
    helpButton.anchor.set(0);
    helpButton.interactive = true;
    helpButton.x = setup.width - 2 * helpButton.width;
    helpButton.y = -5*MARGIN_TOP;
    helpButton.on("pointerdown", help);
    app.stage.addChild(helpButton);

    levelText.alpha = 0;
    livesHeart.alpha = 0;
    livesText.alpha = 0;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        let t = new PIXI.Text("5", {
          fill: LINE_COLORS.blue,
          fontWeight: "bold",
          fontFamily: "Quicksand",
          fontSize: CARD_WIDTH / 2.5,
        });
        t.x = originX + delta * i + CARD_WIDTH / 2;
        t.y = originY + delta * j + CARD_WIDTH / 2;
        t.anchor.set(0.5);
        NUMERALS.push(t);
        //app.stage.addChild(t)
      }
    }
  }

  load();
};
