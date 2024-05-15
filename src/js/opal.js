// Problem que setup
import * as PIXI from "pixi.js";

// APIS
import {
  getRandomArray,
  getRandomInt,
  shuffleArray,
  getNRandomElementsFromArray,
} from "./api.js";
import { Timeline, Tween, Linear, Sine, Expo, Elastic } from "gsap/gsap-core";
import {
  counters,
  opalLevels,
  assessmentCardCustomCoordinates,
} from "./opallevels.js";
import { getWidthAndHeightOfNumberShape, NUMBERSHAPES } from "./numbershapes";


// GOTO: Local Assets
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
import { duration } from "@mui/material";

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

const TEXTURES = {}

export const init = (app, setup) => {


  const VIEW_WIDTH = setup.width;
  const VIEW_HEIGHT = setup.height;
  const MIN_DIM = Math.min(VIEW_WIDTH, VIEW_HEIGHT);
  const MAX_DIM = Math.max(VIEW_WIDTH, VIEW_HEIGHT);

  const MENU_MARGIN = MIN_DIM * 0.02;

  // TODO: Put the REAL constants here. 

  // PIXI Loader Goes Here

  // GOTO_ASSET Loading

  const optionsExtraLargeAsset = { metadata: { resourceOptions: { width: setup.width * 2 } } }
  const optionsLargeAsset = { metadata: { resourceOptions: { width: setup.width } } }
  const optionsMediumAsset = { metadata: { resourceOptions: { width: setup.width / 2 } } }
  const optionsSmallAsset = { metadata: { resourceOptions: { width: setup.width / 8 } } }



  PIXI.Loader.shared
    .add('ship_opal', "https://res.cloudinary.com/numbershapes/image/upload/v1714524232/Opal/ship_opal_kkmpji.png", optionsExtraLargeAsset)
    .add('particle_rock_1', 'https://res.cloudinary.com/numbershapes/image/upload/v1715625602/Opal/particle_rock_1_haiujp.svg', optionsSmallAsset)
    .add('particle_rock_2', 'https://res.cloudinary.com/numbershapes/image/upload/v1715697608/Opal/particle_rock_2_ma2hcc.svg', optionsSmallAsset)
    .add('planet_pink_fire', 'https://res.cloudinary.com/numbershapes/image/upload/v1714743947/Opal/planet_pink_fire_hgttly.svg', optionsExtraLargeAsset)
    .add('planet_green_bubble', 'https://res.cloudinary.com/numbershapes/image/upload/v1715781752/Opal/planet_green_bubble_b7hyac.svg', optionsExtraLargeAsset)
    .add('planet_green_swirl', 'https://res.cloudinary.com/numbershapes/image/upload/v1714524825/Opal/planet_green_swirl_q8ovc1.svg', optionsLargeAsset)
    .add('planet_orange_carved', 'https://res.cloudinary.com/numbershapes/image/upload/v1715705216/Opal/planet_orange_rocks_s90iu2.svg', optionsLargeAsset)
    .add('planet_blue_carved', 'https://res.cloudinary.com/numbershapes/image/upload/v1715788056/Opal/planet_blue_carved_lnul0v.svg', optionsLargeAsset)
    .add('planet_pink_comet',"https://res.cloudinary.com/numbershapes/image/upload/v1714760192/planet_pink_comet_2_ja0pr0.svg", optionsExtraLargeAsset)
    .add('planet_green_carved',"https://res.cloudinary.com/numbershapes/image/upload/v1715793449/Opal/planet_green_carved_tmmnnd.svg", optionsLargeAsset)
    .add('background_opal', 'https://res.cloudinary.com/numbershapes/image/upload/v1714475090/Opal/background_opal_vbwf4o.svg', optionsLargeAsset)
    .add('button_go', 'https://res.cloudinary.com/numbershapes/image/upload/v1715192866/Opal/go_button_tlksgj_kuobhs.svg', optionsMediumAsset)
    .add('counter_square_pink', 'https://res.cloudinary.com/numbershapes/image/upload/v1715281973/Opal/counter_square_pink_sjlfk0.png', optionsLargeAsset)
    .add('counter_diamond_blue', 'https://res.cloudinary.com/numbershapes/image/upload/v1715784606/Opal/counter_blue_diamond_m7dtxu_norw6w.png', optionsLargeAsset)
    .add('counter_circle_green', 'https://res.cloudinary.com/numbershapes/image/upload/v1715610982/Opal/counter_circle_green_hxk2wz.png', optionsLargeAsset)
    .add('counter_oval_orange', 'https://res.cloudinary.com/numbershapes/image/upload/v1715706392/Opal/counter_oval_orange_cdrwvh.png', optionsSmallAsset)
    .add('small_star', 'https://res.cloudinary.com/numbershapes/image/upload/v1714758952/Opal/Asset_4_4x_sscyrd.png', optionsSmallAsset)
    .add('tile_rock', 'https://res.cloudinary.com/numbershapes/image/upload/v1714486943/Opal/tile_rock_pmvaxp.png', optionsLargeAsset)
    .add('bolt_pink', 'https://res.cloudinary.com/numbershapes/image/upload/v1715192605/Opal/bolt_pink_g3lifx_gpbngm.svg', optionsSmallAsset)
    .add('bolt_green', 'https://res.cloudinary.com/numbershapes/image/upload/v1715782917/Opal/bolt_green_eydext.svg', optionsSmallAsset)
    .add('bolt_blue', 'https://res.cloudinary.com/numbershapes/image/upload/v1715782918/Opal/bolt_blue_m2h8ue.svg', optionsSmallAsset)
    .add('bolt_orange', 'https://res.cloudinary.com/numbershapes/image/upload/v1715782763/Opal/bolt_orange_fqnueq.svg', optionsSmallAsset)
    .add('gauge_crystal_l1', 'https://res.cloudinary.com/numbershapes/image/upload/v1715192237/gauge_crystal_l1_s5y1jl.svg', optionsLargeAsset)
    .add('gem_orange', 'https://res.cloudinary.com/numbershapes/image/upload/v1715784648/Opal/gem_orange_yyaxrc.svg', optionsLargeAsset)
    .add('gem_pink', 'https://res.cloudinary.com/numbershapes/image/upload/v1714505893/Opal/PinkGem_tt9cbw.png', optionsLargeAsset)
    .add('gem_blue', 'https://res.cloudinary.com/numbershapes/image/upload/v1715784649/Opal/gem_blue_pmxanr.svg', optionsLargeAsset)
    .add('gem_green', 'https://res.cloudinary.com/numbershapes/image/upload/v1714484563/Opal/CleanGreenGem_qvxb0h.svg', optionsSmallAsset).load((loader, resource) => {
     
      // Rocks
      TEXTURES['tile_rock'] = resource.tile_rock.texture
      TEXTURES['particle_rock_1'] = resource.particle_rock_1.texture
      TEXTURES['particle_rock_2'] = resource.particle_rock_2.texture

      // Counters
      TEXTURES['counter_circle_green'] = resource.counter_circle_green.texture
      TEXTURES['counter_square_pink'] = resource.counter_square_pink.texture
      TEXTURES['counter_diamond_blue'] = resource.counter_diamond_blue.texture
      TEXTURES['counter_oval_orange'] = resource.counter_oval_orange.texture

      // Background 
      TEXTURES['small_star'] = resource.small_star.texture
      TEXTURES['background_opal'] = resource.background_opal.texture

      // Planets
      TEXTURES['planet_pink_comet'] = resource.planet_pink_comet.texture
      TEXTURES['planet_green_swirl'] = resource.planet_green_swirl.texture
      TEXTURES['planet_pink_fire'] = resource.planet_pink_fire.texture
      TEXTURES['planet_orange_carved'] = resource.planet_orange_carved.texture
      TEXTURES['planet_green_bubble'] = resource.planet_green_bubble.texture
      TEXTURES['planet_blue_carved'] = resource.planet_blue_carved.texture
      TEXTURES['planet_green_carved'] = resource.planet_green_carved.texture


      // Buttons
      TEXTURES['button_go'] = resource.button_go.texture

      // Gems
      TEXTURES['gem_green'] = resource.gem_green.texture
      TEXTURES['gem_pink'] = resource.gem_pink.texture
      TEXTURES['gem_orange'] = resource.gem_orange.texture
      TEXTURES['gem_blue'] = resource.gem_blue.texture

      // Ships
      TEXTURES['ship_opal'] = resource.ship_opal.texture

      // Bolts
      TEXTURES['bolt_pink'] = resource.bolt_pink.texture
      TEXTURES['bolt_green'] = resource.bolt_green.texture
      TEXTURES['bolt_blue'] = resource.bolt_blue.texture
      TEXTURES['bolt_orange'] = resource.bolt_orange.texture  

      // Gauges

      TEXTURES['gauge_crystal_l1'] = resource.gauge_crystal_l1.texture
  
    })


  // GOTO_VARIABLES Declerations

  // Counters
  let puzzleCounter = 0;
  let levelCounter = 0
  let lifeCounter = 9

  // Objects
  let pool;

  // GOTO_STATE Levels/Planets & Puzzles
  let currentLevel = opalLevels[levelCounter]
  let puzzlesForCurrentLevel = currentLevel.puzzles
  let currentLevelLength = puzzlesForCurrentLevel.length;

  const scoreObject = {
    score: 0,
    globalScore: 0,
    timer: 0,
    focusTime: 0,
  }

  setInterval(() => {
    scoreObject.timer += 1
  }, 10)

  let LINE_COLOR = 0x1191fa;
  const ABS_CARD_COLOR = LINE_COLORS.black;

  // ASSETS
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

  // GOTO_DECLARATIONS -  Global UI Declarations
  let bolt_bar;
  let shipOpal;
  let currentPlanet;
  let nextPlanet;
  let startButton;
  let helpButton;
  let endOfGameModal;
  let endOfGameText;
  let helpModal;
  let backGround;
  let bolt;
  let bolt_gauge;
  let stars = []
  let collectableGem;
  let barGraphics = new PIXI.Graphics();
  let blasts = []
  let topLeftCaveBackground
  let topRightCaveBackground
  let bottomLeftCaveBackground
  let bottomRightCaveBackground


  // GOTO_TIMELINES Definitions 
  let shipOpalTimeline = new Timeline({ paused: true });
  let globalTimeline = new Timeline({ paused: true });

  // Game State
  let currentPuzzle;

  const TEXT_COLOR = 0x1191fa;


  // TODO: Clean up this constants stuff. Tbh this should probably all be some type of state class. 
  let isMobileDevice = setup.width / setup.height < 0.75 ? true : false;
  let NEW_CARD_WIDTH = 40;
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

  // GOTO_CONSTANTS Decleration

  let BOLT_BAR_WIDTH = CARD_WIDTH / 1.75

  let COUNTER_TEXTURE;

  let COUNTERS = {}
  let BOLTS = {}

  let originX = VIEW_WIDTH / 2 - GRID_WIDTH / 2;
  let originY = VIEW_HEIGHT / 2 - GRID_HEIGHT / 2;


  const starPosition = {
    span: 0
  }

  function launch() {

    let time = 10
    let distance = 10 * setup.height

    const onComplete = () => {

      bolt.texture = TEXTURES[currentLevel.bolt]
      generateBarTexture()
      Tween.to(bolt, {y: bolt_gauge.y,ease: "bounce",duration: 1})

      // Major Reinitialization Of The Game
      starPosition.span = 0

      let newPuzzle = puzzlesForCurrentLevel[puzzleCounter % currentLevelLength];
      newPuzzle.counter = currentLevel.counter

      pool.loadPuzzle(newPuzzle)
      blasts.forEach(b => b.refresh())
      dealCards(pool)

      stars.forEach((s, i) => {
        s.alpha = 1
        s.x = Math.random() * setup.width
        s.initialPosition = -Math.random() * setup.height
        s.y = s.initialPosition
      })
    }

    const onUpdate = () => {
      stars.forEach((s, i) => {
        s.y = s.initialPosition + starPosition.span % (s.initialPosition - setup.height)
        if (s.y > setup.height) {
          s.x = Math.random() * setup.width
        }
        if (distance - starPosition.span < 1.5 * setup.height) {
          s.alpha = (distance - starPosition.span) / (1.5 * setup.height)
        }
      })
    }


    const swapPlanets = () => {

      // MOO_
      let planet_id = "planet_" + currentLevel.planet
      swapTexture(currentPlanet, TEXTURES[planet_id])
      currentPlanet.y = -setup.height
      Tween.to(currentPlanet, { ease: Expo.easeInOut, duration: 3 * time / 4, y: setup.height + currentPlanet.height / 6 })
    }

    Tween.to(currentPlanet, { ease: Expo.easeInOut, duration: time / 4, y: setup.height + currentPlanet.height, onComplete: swapPlanets })
    Tween.to(starPosition, { ease: Expo.easeInOut, duration: time, span: distance, onComplete: onComplete, onUpdate: onUpdate })
    shipOpalTimeline.restart()
  }

  function calculateScore() {
    const { timer, focusTime } = scoreObject
    const levelScore = 10 + Math.round(Math.pow(2, 11 / (1 + (timer - focusTime) / 1000)) / 30)
    console.log("score", levelScore)
    scoreObject.score += levelScore

    return levelScore
  }

  function moveToTheNextPuzzle(){
     puzzleCounter++;

     // Safely initializing a new Puzzle
     currentPuzzle = puzzlesForCurrentLevel[puzzleCounter % currentLevelLength];
     currentPuzzle.counter = currentLevel.counter
  }

  function moveToTheNextLevel() {
    // Reset the puzzle counter. 
    scoreObject.globalScore += scoreObject.score
    scoreObject.score = 0
    bolt_bar.width = BOLT_BAR_WIDTH * 0.01

    puzzleCounter = 0
    levelCounter++
    currentLevel = opalLevels[levelCounter % opalLevels.length]
    puzzlesForCurrentLevel = currentLevel.puzzles
    currentLevelLength = puzzlesForCurrentLevel.length;
    currentPuzzle = puzzlesForCurrentLevel[0];

  }


  function swapTexture(sprite, texture) {
    let w = sprite.width
    let h = texture.height / texture.width * w
    sprite.width = w
    sprite.height = h
    sprite.texture = texture
  }

  function makeStars() {

    for (let i = 0; i < 75; i++) {
      let star = new PIXI.Sprite(TEXTURES.small_star)
      star.width = MIN_DIM / 300
      star.height = MIN_DIM / 300
      star.x = Math.random() * setup.width
      star.initialPosition = -Math.random() * setup.height
      star.y = star.initialPosition
      app.stage.addChild(star)
      stars.push(star)
    }
  }

  // GOTO_TIMELINE Callbacks 
  function onGemCollected() {
    const onComplete = () => {
      if (scoreObject.score >= 100) {
        app.stage.addChild(shipOpal)
        Tween.to(bolt,{duration: 0.5,x: shipOpal.x+shipOpal.width/2,y: shipOpal.y+shipOpal.height/4,onComplete: ()=>{
          bolt.x = bolt_gauge.x 
          bolt.y = bolt_gauge.y - MIN_DIM / 2
        }})
        moveToTheNextLevel()
        launch()
      } else {
        moveToTheNextPuzzle()
        pool.loadPuzzle(currentPuzzle);
        dealCards(pool);
      }
    }


      collectableGem.alpha = 0
      app.stage.addChild(bolt)
      let to = Math.min(scoreObject.score / 100 * BOLT_BAR_WIDTH, BOLT_BAR_WIDTH)
      Tween.to(bolt_bar, { width: to, ease: "bounce",onComplete: onComplete})
  }

  // GOTO_EVENTS Card Clicked 
  function cardClicked(e) {

    // Learning is when you can manipulate the dots. 
    if (!learning) {
      if (e.target.isOffCard == true) {
        // GOTO: CORRECT

        calculateScore()

        e.target.dropped = true

        e.target.alpha = 0;
        let b = blasts.shift()
        app.stage.addChild(collectableGem)
        app.stage.addChild(b)
        b.x = e.target.x + e.target.width / 2
        b.y = e.target.y + e.target.height / 2
        b.alpha = 1
        b.explode()
        blasts.push(b)
        
      
        const onComplete = () => {

          pool.activeCards.forEach((c, i) => {
            Tween.to(c.balls,{duration: 0,alpha: 0})
          });

            Tween.to(collectableGem, { x: bolt.x + collectableGem.width / 2, y: bolt.y + collectableGem.height / 2, duration: 0.5, ease: Expo.easeIn, onComplete: onGemCollected })

            pool.activeCards.forEach((c, i) => {
              if (c.dropped == false) {
                blasts[i].x = c.x + CARD_WIDTH / 2
                blasts[i].y = c.y + CARD_WIDTH / 2
                blasts[i].alpha = 1
                blasts[i].explode()
                c.bg.alpha = 0
              }
            })   
        };

        pool.activeCards.forEach((c, i) => {
          if (i < pool.activeCards.length - 1) {
            Tween.to(c.balls,{x: collectableGem.x - c.x, y: collectableGem.y - c.y, duration: 0.5, ease: Expo.easeIn})
          } else {
            Tween.to(c.balls,{x: collectableGem.x - c.x, y: collectableGem.y - c.y, duration: 0.5, ease: Expo.easeIn,onComplete: onComplete})
          }
        })

      } else {

        // GOTO: INCORRECT
        pool.activeCards.forEach(c => c.interactive = false);

        const onComplete = () => {
          pool.activeCards.forEach((c) => {
            if (!c.dropped) {
              c.interactive = true
            }
          });
          if (lifeCounter == 0) {
            endGame();
          }
        };

        //app.stage.addChild(e.target.numeral);

        e.target.dropped = true

        /*
        let b = blasts.shift()
        app.stage.addChild(b)
        b.x = e.target.x + e.target.width / 2
        b.y = e.target.y + e.target.height / 2
        b.alpha = 1
        b.explode()
        blasts.push(b)
        */


        e.target.bg.alpha = 0
        Tween.to([e.target.balls], { onComplete: onComplete, duration: 1, y: "-=50", alpha: 0 })

        lifeCounter--;
      }
    }
  }

  function transitionToCave() {
    console.log("transitioning to cave")
    Tween.to(currentPlanet, { width: 4 * MIN_DIM, height: 4 * MIN_DIM, x: setup.width / 2, y: setup.height / 2, duration: 5 })
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
    puzzleCounter = 0;

    const newLevel = puzzlesForCurrentLevel[puzzleCounter % currentLevelLength];
    newLevel.counter = currentLevel.counter
    updateLayoutParams(setup.width, setup.height, newLevel);
    pool.loadLevel(newLevel);

    scoreObject.score = 0
    scoreObject.time = 0
  }

  class Blast extends PIXI.Container {
    constructor() {
      super();
      this.t = 0
      this.particles = []
      this.dt = 50
    }

    h(t, dy) {
      return 2 * t * t - (20 + dy * 10) * t
    }

    w(t, dx) {
      return t / this.dt * dx * setup.width / 2
    }

    cancel() {
      this.tween.pause()
    }

    onUpdate(e) {
      this.particles.forEach((p, i) => {
        p.y = this.h(this.t, p.vector.dy)
        p.x = this.w(this.t, p.vector.dx)
        p.rotation = this.t / (Math.PI * 2) * p.vector.dx
      })

    }

    onComplete() {
      this.t = 0
      this.particles.forEach((p, i) => {
        p.vector = { dx: 1 - 2 * Math.random(), dy: Math.random() }
      })
    }

    explode() {
      this.tween.restart()
    }

    refresh() {
      this.particles.forEach((p, i) => {
        p.width = CARD_WIDTH / 5 + Math.random() * CARD_WIDTH / 10
        p.height = CARD_WIDTH / 5 + Math.random() * CARD_WIDTH / 10
      })
    }

    init() {

      this.tween = Tween.to(this, { duration: 1.75, ease: Linear.easeNone, t: this.dt, onComplete: this.onComplete.bind(this), onUpdate: this.onUpdate.bind(this) })

      for (let i = 0; i < 10; i++) {
        let t = i % 3 == 0 ? TEXTURES.particle_rock_1 : TEXTURES.particle_rock_2
        let s = new PIXI.Sprite(t);
        s.anchor.set(0.5)
        s.width = MIN_DIM / 30 + Math.random() * MIN_DIM / 80;
        s.height = MIN_DIM / 30 + Math.random() * MIN_DIM / 80;
        s.y = 0
        s.x = 0
        s.vector = { dx: 1 - 2 * Math.random(), dy: Math.random() }
        this.particles.push(s)
        this.addChild(s);
      }

      app.stage.addChild(this);
    }

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
      this.indicator = null
      this.pivot.set(0.5)
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

      const c = COUNTERS[this.level.counter];
      LINE_COLOR = c.stroke;
      COUNTER_TEXTURE = c.texture


      // RESET CARD SIZE & TEXTURE
      this.apparentWidth = CARD_WIDTH;
      this.apparentHeight = CARD_WIDTH;

      this.bg.width = CARD_WIDTH;
      this.bg.height = CARD_WIDTH;

      this.bg.texture = CARD_TEXTURE;
      this.bg.alpha = 1

      let shapeHeight = this.mesh[0] * this.unit;
      let shapeWidth = this.mesh[1] * this.unit;

      // Top left offset for drawing. 
      let offsetY = CARD_WIDTH / 2 - shapeWidth / 2;
      let offsetX = CARD_WIDTH / 2 - shapeHeight / 2;


      // RESET BALLS
      this.balls.forEach((b) => {
        this.removeChild(b);
        b.x = 0
        b.y = 0
        b.alpha = 1
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

        if (this.level.customMesh) {

          // Get array from number
          let meshVal = this.level.customMesh.value
          array = NUMBERSHAPES[meshVal](0.5)

          // Get dimensions of array
          const hw = getWidthAndHeightOfNumberShape(array, 0.5)

          // recalculate offset (it appears that the offset calculations needs to be adjusted by a half.)
          offsetY = CARD_WIDTH / 2 - (hw.height + 0.5) * this.unit / 2;
          offsetX = CARD_WIDTH / 2 - (hw.width + 0.5) * this.unit / 2;

          array = getNRandomElementsFromArray(array, value)

          // Clean array (2d array instead of array of objects)
          array = array.map(e => { return [e.x, e.y] })
        } else {
          array = getRandomArray(this.mesh[0], this.mesh[1], value);
        }



        array.forEach((c, i) => {
          let sprite = this.balls[i];
          sprite.texture = COUNTER_TEXTURE;
          sprite.width = this.unit;
          sprite.height = this.unit;
          sprite.x = c[0] * this.unit + offsetX;
          sprite.y = c[1] * this.unit + offsetY;
          this.addChild(sprite);
        });
      }

    }

    init() {
      this.bg = new PIXI.Sprite(TEXTURES.tile_rock)
      this.addChild(this.bg);

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          // Inititalize with green texture. This is arbitrary.
          let s = new PIXI.Sprite(TEXTURES.gem_green)
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

    loadPuzzle(level) {

      if (!level.counter) {
        level.counter = DEFAULT_COUNTER;
      }

      // LOL: This is a hack.
      updateLayoutParams(setup.width, setup.height, level);
      this.activeCards = [];

      this.dim = CARD_WIDTH;
      this.level = level;
      this.cards.forEach((c) => {
        app.stage.removeChild(c);
        c.dropped = false
        c.interactive = false;
        c.inPlay = false;
        c.rotation = 0;
        c.isOffCard = false;
        c.alpha = 1;
      });

      let acc = 0;

      // Random off card index
      let r = getRandomInt(level.grid[0] * level.grid[1]);

      for (let i = 0; i < level.grid[0]; i++) {
        for (let j = 0; j < level.grid[1]; j++) {

          // Used for "points"
          let c = this.cards[acc];


          // Handling offcard
          let potentialValue = level.value;

          // Off card is pre-set in "Number" levels. 
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

          // Deprecating letter indicators.
          /*
          if (level.type == "number") {
            c.indicator = LETTER_CARDS[acc % 4 + 1]
            c.indicator.width = CARD_WIDTH / 8
            c.indicator.height = CARD_WIDTH / 8
            c.indicator.x = c.indicator.height / 5
            c.indicator.y = c.indicator.width / 5
            c.addChild(c.indicator)
          } else {
            c.removeChild(c.indicator)
          }
          */


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

  function inititalizeLevel(level) {
    currentLevel = opalLevels[levelCounter % opalLevels.length]
    puzzlesForCurrentLevel = currentLevel.puzzles
    currentLevelLength = puzzlesForCurrentLevel.length;
  }




  // Should probably define global layout params as S. 
  function updateLayoutParams(width, height, newPuzzle) {
    currentPuzzle = newPuzzle;

    // New Algo

    newPuzzle.counter = currentLevel.counter

    collectableGem.texture = TEXTURES[currentLevel.collectable]

    LINE_COLOR = LINE_COLORS[newPuzzle.counter];

    // Logic for laying out cards in different dimensions
    if (isMobileDevice) {
      let tempM0 = newPuzzle.grid[0];
      let tempM1 = newPuzzle.grid[1];
      newPuzzle.grid = [tempM1, tempM0];
      NEW_CARD_WIDTH = (0.8 * VIEW_WIDTH) / newPuzzle.grid[0];
    } else {
      if (VIEW_HEIGHT < VIEW_WIDTH) {
        NEW_CARD_WIDTH = (0.7 * VIEW_HEIGHT) / newPuzzle.grid[1];
      } else {
        NEW_CARD_WIDTH = (0.85 * VIEW_WIDTH) / newPuzzle.grid[0];
      }
    }

    maxMeshDimension = Math.max(newPuzzle.mesh[0], newPuzzle.mesh[1]);

    const maxGridDim = Math.max(newPuzzle.grid[0], newPuzzle.grid[1]);

    TOP_PADDING = isMobileDevice ? 0.1 * setup.height : 0.02 * setup.height;

    gridUnitsWide = (newPuzzle.mesh[0] + 2) * newPuzzle.grid[0];
    gridUnitsHigh = (newPuzzle.mesh[1] + 2) * newPuzzle.grid[1];
    gridUnitsMax = Math.max(gridUnitsHigh, gridUnitsWide);

    SPACE_BETWEEN_CARDS = MIN_DIM / 50 / (maxGridDim - 1);
    CARD_WIDTH = NEW_CARD_WIDTH;

    let MAX_UNIT = CARD_WIDTH / (maxMeshDimension);
    let PADDED_UNIT = (CARD_WIDTH - 1.2 * MAX_UNIT) / maxMeshDimension;
    UNIT = PADDED_UNIT

    if (newPuzzle.type == "number") {
      UNIT = UNIT * 1.9;
      shuffleArray(newPuzzle.cards);
    }

    GRID_WIDTH =
      CARD_WIDTH * newPuzzle.grid[0] +
      SPACE_BETWEEN_CARDS * (newPuzzle.grid[0] - 1);
    GRID_HEIGHT =
      CARD_WIDTH * newPuzzle.grid[1] +
      SPACE_BETWEEN_CARDS * (newPuzzle.grid[1] - 1);
    delta = CARD_WIDTH + SPACE_BETWEEN_CARDS;

    originX = VIEW_WIDTH / 2 - GRID_WIDTH / 2;
    originY = VIEW_HEIGHT / 2 - GRID_HEIGHT / 2;

    LINE_COLOR = COUNTERS[newPuzzle.counter].stroke;

    CARD_TEXTURE = TEXTURES.tile_rock

    Object.keys(ABSTRACT_CARDS).forEach((k) => {
      let t = ABSTRACT_CARDS[k];
      t.fontSize = CARD_WIDTH / 2;
      //t.anchor.set(0.5,0)
    });
  }

  function startGame(surprise) {

    makeStars()

    if (surprise) {
      puzzleCounter = getRandomInt(puzzlesForCurrentLevel.length)
    }

    const startLevel = puzzlesForCurrentLevel[puzzleCounter % currentLevelLength];

    pool.loadPuzzle(startLevel);

    const onComplete = () => {
      dealCards(pool);
    };

    Tween.to(startButton, { y: -startButton.height, onComplete: onComplete });
  }

  function makeInteractive() {
    blasts.forEach((b) => {
      b.cancel()
    });
    this._targets[0].interactive = true;
    collectableGem.alpha = 1;
  }

  function dealCards(pool) {
    scoreObject.focusTime = scoreObject.timer // There's got to be a better name / place for this. 

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

        if (c.isOffCard == true) {
          collectableGem.x = _x + CARD_WIDTH / 2;
          collectableGem.y = _y + CARD_WIDTH / 2;
          collectableGem.alpha = 0
        }

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

  // GOTO_TIMELINE Functions 
  function buildShipTimeline() {
    app.stage.addChild(shipOpal)
    shipOpalTimeline.to(shipOpal, { y: setup.height / 2 - shipOpal.height / 2, x: setup.width / 2 - shipOpal.width / 2, duration: 4, ease: Expo.easeInOut })
    shipOpalTimeline.to(shipOpal, { duration: 3, y: setup.height - shipOpal.height - MENU_MARGIN, x: MENU_MARGIN }, "+=3")
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


  function generateBarTexture() {
    let colors = {bolt_blue: "0x63dbff", bolt_green: "0x00c91e", bolt_pink: "0xff52e2", bolt_orange: "0xff860d"}

    barGraphics.clear()
    barGraphics.beginFill(colors[currentLevel.bolt])
    barGraphics.drawRoundedRect(0, 0, 500, 50, 20)
    barGraphics.endFill()
    bolt_bar.texture = app.renderer.generateTexture(barGraphics)
  }

  function load() {

    inititalizeLevel()

    COUNTERS = {
      default: {
        texture: TEXTURES.planet_green_swirl,
        stroke: LINE_COLORS.red,
        value: 1,
      },
      circle_green: {
        texture: TEXTURES.counter_circle_green,
        stroke: LINE_COLORS.green,
        value: 1,
      },
      square_pink: {
        texture: TEXTURES.counter_square_pink,
        stroke: LINE_COLORS.pink,
        value: 1,
      },
      diamond_blue: {
        texture: TEXTURES.counter_diamond_blue,
        stroke: LINE_COLORS.blue,
        value: 1,
      },
      oval_orange: {
        texture: TEXTURES.counter_oval_orange,
        stroke: LINE_COLORS.blue,
        value: 1,
      },
    };


    // GOTO_BUILD_TIMELINES



    pool = new CardPool(initLevel);


    // #region GOTO_UI Definitions 

    // GOTO: Initialize Assets Here
    backGround = new PIXI.Sprite(TEXTURES.background_opal);
    backGround.x = 0;
    backGround.y = 0;
    backGround.width = setup.width;
    backGround.height = setup.height;

    app.stage.addChild(backGround)


    collectableGem = new PIXI.Sprite(TEXTURES[currentLevel.collectable]);
    collectableGem.width = MIN_DIM / 10
    collectableGem.height = MIN_DIM / 10
    collectableGem.anchor.set(0.5)
    collectableGem.alpha = 0
    app.stage.addChild(collectableGem)

    startButton = new PIXI.Sprite(TEXTURES.button_go);
    startButton.anchor.set(0.5);
    startButton.interactive = true;
    startButton.x = setup.width / 2;
    startButton.y = setup.height / 2;
    startButton.width = CARD_WIDTH / 1.5;
    startButton.height = TEXTURES.button_go.height / TEXTURES.button_go.width * startButton.width
    startButton.on("pointerdown", () => startGame(false));
    app.stage.addChild(startButton);


    shipOpal = new PIXI.Sprite(TEXTURES.ship_opal);
    shipOpal.aspectRatio = TEXTURES.ship_opal.width / TEXTURES.ship_opal.height
    shipOpal.width = MIN_DIM / 5
    shipOpal.height = shipOpal.width / shipOpal.aspectRatio
    shipOpal.alpha = 1
    shipOpal.y = setup.height - shipOpal.height - MENU_MARGIN
    shipOpal.x = MENU_MARGIN
    app.stage.addChild(shipOpal)

    // GOTO_ENERGY

    bolt_gauge = new PIXI.Sprite(TEXTURES.gauge_crystal_l1);
    bolt_gauge.aspectRatio = TEXTURES.gauge_crystal_l1.width / TEXTURES.gauge_crystal_l1.height
    bolt_gauge.width = CARD_WIDTH / 1.5;
    bolt_gauge.height = bolt_gauge.width / bolt_gauge.aspectRatio
    bolt_gauge.x = MENU_MARGIN
    bolt_gauge.y = MENU_MARGIN

    bolt_bar = new PIXI.Sprite(TEXTURES.progress_bar_pink);
    bolt_bar.anchor.x = 0
    bolt_bar.anchor.y = 0.5
    bolt_bar.width = BOLT_BAR_WIDTH * 0.01
    bolt_bar.height = bolt_gauge.height / 4
    bolt_bar.x = MENU_MARGIN + bolt_bar.height
    bolt_bar.y = MENU_MARGIN + bolt_gauge.height / 2.5

    bolt = new PIXI.Sprite(TEXTURES[currentLevel.bolt]);
    bolt.aspectRatio = TEXTURES.bolt_pink.width / TEXTURES.bolt_pink.height
    bolt.height = bolt_gauge.height
    bolt.width = bolt.height * bolt.aspectRatio
    bolt.x = bolt_gauge.x
    bolt.y = bolt_gauge.y

    app.stage.addChild(bolt_gauge);
    app.stage.addChild(bolt_bar);
    app.stage.addChild(bolt)

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

    helpModal = new PIXI.Sprite.from(TEXTURES.bolt_pink);
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
    helpButton.y = -5 * MENU_MARGIN;
    helpButton.on("pointerdown", help);
    app.stage.addChild(helpButton);


    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        let t = new PIXI.Text("5", {
          fill: "#333333",
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

    function assetTest() {
      Object.keys(TEXTURES).forEach((k, i) => {
        console.log("Creating,", k)
        let a = new PIXI.Sprite(TEXTURES[k])
        a.width = 100
        a.height = 100
        a.x = 100 * (i + 1)
        a.y = 0
        app.stage.addChild(a)
      })
    }

    currentPlanet = new PIXI.Sprite(TEXTURES.planet_pink_fire)
    currentPlanet.aspectRatio = TEXTURES.planet_pink_fire.width / TEXTURES.planet_pink_fire.height
    currentPlanet.anchor.set(0.5)
    currentPlanet.width = setup.width / 1.5
    currentPlanet.height = currentPlanet.width / currentPlanet.aspectRatio
    currentPlanet.x = setup.width / 2
    currentPlanet.y = setup.height + currentPlanet.height / 6
    app.stage.addChild(currentPlanet)

    nextPlanet = new PIXI.Sprite(TEXTURES.planet_green_swirl)
    nextPlanet.aspectRatio = TEXTURES.planet_green_swirl.width / TEXTURES.planet_green_swirl.height
    nextPlanet.anchor.set(0.5)
    nextPlanet.width = setup.width / 1.5
    nextPlanet.height = nextPlanet.width / nextPlanet.aspectRatio
    nextPlanet.x = setup.width / 2
    nextPlanet.y = -5 * setup.height
    app.stage.addChild(nextPlanet)

    bolt.texture = TEXTURES[currentLevel.bolt]
    generateBarTexture()
    let planet_id = "planet_" + currentLevel.planet
    console.log("planet_id", planet_id)
    currentPlanet.texture = TEXTURES[planet_id]

    // #endregion GOTO_UI Definitions

    // GOTO_BLAST


    for (let i = 0; i < 25; i++) {
      let b = new Blast();
      b.init();
      b.x = setup.width / 8 + 100 * i * Math.random()
      b.y = setup.height / 8 + 50 * i * Math.random()
      b.alpha = 0
      blasts.push(b)
    }



    // GOTO_TIMELINE Function Calls 
    buildShipTimeline()

  }

  PIXI.Loader.shared.onComplete.add(load)

};
