// Problem que setup
import * as PIXI from "pixi.js";

// APIS
import {
  getRandomArray,
  getRandomInt,
  shuffleArray,
  getNRandomElementsFromArray,
} from "./api.js";
import { Timeline, Tween, Linear, set, Sine, Expo, Elastic } from "gsap/gsap-core";
import {
  counters,
  opalLevels,
  assessmentCardCustomCoordinates,
  assessmentProgression,
} from "./opallevels.js";
import { getWidthAndHeightOfNumberShape, NUMBER_SHAPES } from "./numbershapes";




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

const BAR_COLORS = { bolt_blue: "0x63dbff", bolt_green: "0x00c91e", plant_icon: "0x00c91e",bolt_yellow: "0xfced0f", bolt_pink: "0xff52e2", bolt_red: "0xf0003c", bolt_orange: "0xff860d" }



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
  const FONT_SIZE_SCORE = MIN_DIM * 0.02;
  const SIZE_CAROUSEL_HEIGHT = MIN_DIM / 5
  const POINT_CAROUSEL_Y = setup.height / 2
  const IS_MOBILE_SIZE = window.innerWidth < 600;
  const IS_MOBILE_RATIO = setup.width / setup.height < 0.75 ? true : false;

  // TODO: Put the REAL constants here. 

  // PIXI Loader Goes Here

  // HOT | GOTO_ASSET | Loading

  const optionsExtraLargeAsset = { metadata: { resourceOptions: { width: setup.width * 2 } } }
  const optionsLargeAsset = { metadata: { resourceOptions: { width: setup.width } } }
  const optionsMediumAsset = { metadata: { resourceOptions: { width: setup.width / 2 } } }
  const optionsSmallAsset = { metadata: { resourceOptions: { width: setup.width / 8 } } }
  const optionsExtraSmallAsset = { metadata: { resourceOptions: { width: setup.width / 16 } } }



  PIXI.Loader.shared
    .add('ship_opal', "https://res.cloudinary.com/numbershapes/image/upload/v1714524232/Opal/ship_opal_kkmpji.png", optionsExtraLargeAsset)
    .add('particle_rock_1', 'https://res.cloudinary.com/numbershapes/image/upload/v1715625602/Opal/particle_rock_1_haiujp.svg', optionsSmallAsset)
    .add('particle_rock_2', 'https://res.cloudinary.com/numbershapes/image/upload/v1715697608/Opal/particle_rock_2_ma2hcc.svg', optionsSmallAsset)
    .add('planet_pink_fire', 'https://res.cloudinary.com/numbershapes/image/upload/v1714743947/Opal/planet_pink_fire_hgttly.svg', optionsExtraLargeAsset)
    .add('plant_icon', "https://res.cloudinary.com/numbershapes/image/upload/v1715894087/Opal/plan_icon_ddukrb.png", optionsMediumAsset)
    .add('planet_green_bubble', 'https://res.cloudinary.com/numbershapes/image/upload/v1715781752/Opal/planet_green_bubble_b7hyac.svg', optionsExtraLargeAsset)
    .add('planet_green_swirl', 'https://res.cloudinary.com/numbershapes/image/upload/v1714524825/Opal/planet_green_swirl_q8ovc1.svg', optionsLargeAsset)
    .add('planet_orange_carved', 'https://res.cloudinary.com/numbershapes/image/upload/v1715705216/Opal/planet_orange_rocks_s90iu2.svg', optionsLargeAsset)
    .add('planet_blue_carved', 'https://res.cloudinary.com/numbershapes/image/upload/v1715788056/Opal/planet_blue_carved_lnul0v.svg', optionsLargeAsset)
    .add('planet_purple_carved', 'https://res.cloudinary.com/numbershapes/image/upload/v1716322683/Opal/planet_purple_carved_gqbh9p.svg', optionsLargeAsset)
    .add('planet_pink_comet', "https://res.cloudinary.com/numbershapes/image/upload/v1714760192/planet_pink_comet_2_ja0pr0.svg", optionsExtraLargeAsset)
    .add('planet_green_carved', "https://res.cloudinary.com/numbershapes/image/upload/v1715793449/Opal/planet_green_carved_tmmnnd.svg", optionsLargeAsset)
    .add('planet_pink_bubble', "https://res.cloudinary.com/numbershapes/image/upload/v1716322686/Opal/planet_pink_bubbles_j0xmtt.svg", optionsLargeAsset)
    .add('planet_red_swirl', "https://res.cloudinary.com/numbershapes/image/upload/v1717013787/Opal/red_swirl_brdisk.svg", optionsLargeAsset)
    .add('background_opal', 'https://res.cloudinary.com/numbershapes/image/upload/v1715867929/Opal/background_opal_vbwf4o_vvggfz.svg', optionsLargeAsset)
    .add('background_cave', "https://res.cloudinary.com/numbershapes/image/upload/v1716027435/Opal/vecteezy_cave-with-blue-crystals_6758386_g0nhu3.png", optionsLargeAsset)
    .add('lava_pink', 'https://res.cloudinary.com/numbershapes/image/upload/v1715873515/Opal/lava_pink_nuxrtf.png', optionsExtraLargeAsset)
    .add('lava_green', 'https://res.cloudinary.com/numbershapes/image/upload/v1716023841/Opal/lava_green_zfoudb.png', optionsExtraLargeAsset)
    .add("lava_yellow", "https://res.cloudinary.com/numbershapes/image/upload/v1717012484/Opal/lava_yellow_ejtkud.svg", optionsExtraLargeAsset)
    .add("lava_red", "https://res.cloudinary.com/numbershapes/image/upload/v1717015098/Lava_Red_vf5cep.svg", optionsExtraLargeAsset)
    .add('lava_blue', 'https://res.cloudinary.com/numbershapes/image/upload/v1716024015/Opal/lava_blue_c99cgr.png', optionsExtraLargeAsset)
    .add('lava_orange', 'https://res.cloudinary.com/numbershapes/image/upload/v1716024323/Opal/lava_orange_enlt0b.png', optionsExtraLargeAsset)
    .add('button_go', 'https://res.cloudinary.com/numbershapes/image/upload/v1716225263/Opal/play_fy7i2k.svg', optionsMediumAsset)
    .add('button_restart', 'https://res.cloudinary.com/numbershapes/image/upload/v1716225254/Opal/replay_ttvflz.svg', optionsMediumAsset)
    .add('counter_square_pink', 'https://res.cloudinary.com/numbershapes/image/upload/v1715281973/Opal/counter_square_pink_sjlfk0.png', optionsLargeAsset)
    .add('counter_diamond_blue', 'https://res.cloudinary.com/numbershapes/image/upload/v1715784606/Opal/counter_blue_diamond_m7dtxu_norw6w.png', optionsLargeAsset)
    .add('counter_circle_green', 'https://res.cloudinary.com/numbershapes/image/upload/v1715610982/Opal/counter_circle_green_hxk2wz.png', optionsLargeAsset)
    .add('counter_triangle_yellow', 'https://res.cloudinary.com/numbershapes/image/upload/v1716324632/Opal/counte_yellow_triangle_wd0p9v.png', optionsLargeAsset)
    .add('counter_stick_red', 'https://res.cloudinary.com/numbershapes/image/upload/v1716395459/Opal/counter_red_stick_ufyai6.png', optionsLargeAsset)
    .add('counter_oval_orange', 'https://res.cloudinary.com/numbershapes/image/upload/v1715706392/Opal/counter_oval_orange_cdrwvh.png', optionsSmallAsset)
    .add('small_star', 'https://res.cloudinary.com/numbershapes/image/upload/v1714758952/Opal/Asset_4_4x_sscyrd.png', optionsExtraSmallAsset)
    .add('tile_rock', 'https://res.cloudinary.com/numbershapes/image/upload/v1714486943/Opal/tile_rock_pmvaxp.png', optionsLargeAsset)
    .add('bolt_pink', 'https://res.cloudinary.com/numbershapes/image/upload/v1716396289/Opal/vial_pink_roid2z.svg', optionsSmallAsset)
    .add('bolt_red', 'https://res.cloudinary.com/numbershapes/image/upload/v1716395589/Opal/vial_red_seeyrx.svg', optionsSmallAsset)
    .add('bolt_yellow', 'https://res.cloudinary.com/numbershapes/image/upload/v1716395589/Opal/vial_yellow_cjglzh.svg', optionsSmallAsset)
    .add('bolt_green', 'https://res.cloudinary.com/numbershapes/image/upload/v1715782917/Opal/bolt_green_eydext.svg', optionsSmallAsset)
    .add('heart_red', 'https://res.cloudinary.com/numbershapes/image/upload/v1716215671/Opal/heart_red_jk6pva.svg', optionsSmallAsset)
    .add('bolt_blue', 'https://res.cloudinary.com/numbershapes/image/upload/v1717007016/vial_blue_g0tck0.svg', optionsSmallAsset)
    .add('bolt_orange', 'https://res.cloudinary.com/numbershapes/image/upload/v1715782763/Opal/bolt_orange_fqnueq.svg', optionsSmallAsset)
    .add('gauge_crystal_l1', 'https://res.cloudinary.com/numbershapes/image/upload/v1715192237/gauge_crystal_l1_s5y1jl.svg', optionsLargeAsset)
    .add('gem_orange', 'https://res.cloudinary.com/numbershapes/image/upload/v1715784648/Opal/gem_orange_yyaxrc.svg', optionsLargeAsset)
    .add('gem_pink', 'https://res.cloudinary.com/numbershapes/image/upload/v1714505893/Opal/PinkGem_tt9cbw.png', optionsLargeAsset)
    .add('gem_red', 'https://res.cloudinary.com/numbershapes/image/upload/v1717002293/gem_red_ywcs1l.svg', optionsLargeAsset)
    .add('gem_blue', 'https://res.cloudinary.com/numbershapes/image/upload/v1715784649/Opal/gem_blue_pmxanr.svg', optionsLargeAsset)
    .add('gem_yellow', 'https://res.cloudinary.com/numbershapes/image/upload/v1717004212/gem_yellow_a37w4u.svg', optionsLargeAsset)
    .add("seed_pink_spotted", "https://res.cloudinary.com/numbershapes/image/upload/v1716022992/Opal/seed_red_spotted_hrsbvh.svg", optionsLargeAsset)
    .add('white', 'https://res.cloudinary.com/numbershapes/image/upload/v1715803187/Opal/White_oearuc.svg', optionsLargeAsset)
    .add('stalagmite', 'https://res.cloudinary.com/numbershapes/image/upload/v1715356279/Opal/stalagmite_one_hyroie.svg', optionsLargeAsset)
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
      TEXTURES['counter_triangle_yellow'] = resource.counter_triangle_yellow.texture
      TEXTURES['counter_stick_red'] = resource.counter_stick_red.texture

      // Background 
      TEXTURES['small_star'] = resource.small_star.texture
      TEXTURES['background_opal'] = resource.background_opal.texture
      TEXTURES['background_cave'] = resource.background_cave.texture

      // Planets
      TEXTURES['planet_pink_comet'] = resource.planet_pink_comet.texture
      TEXTURES['planet_green_swirl'] = resource.planet_green_swirl.texture
      TEXTURES['planet_pink_fire'] = resource.planet_pink_fire.texture
      TEXTURES['planet_orange_carved'] = resource.planet_orange_carved.texture
      TEXTURES['planet_green_bubble'] = resource.planet_green_bubble.texture
      TEXTURES['planet_blue_carved'] = resource.planet_blue_carved.texture
      TEXTURES['planet_green_carved'] = resource.planet_green_carved.texture
      TEXTURES['planet_pink_bubble'] = resource.planet_pink_bubble.texture
      TEXTURES['planet_purple_carved'] = resource.planet_purple_carved.texture
      TEXTURES['planet_red_swirl'] = resource.planet_red_swirl.texture


      // Buttons
      TEXTURES['button_go'] = resource.button_go.texture
      TEXTURES['button_restart'] = resource.button_restart.texture

      // Collectables
      TEXTURES['gem_green'] = resource.gem_green.texture
      TEXTURES['gem_pink'] = resource.gem_pink.texture
      TEXTURES['gem_orange'] = resource.gem_orange.texture
      TEXTURES['gem_blue'] = resource.gem_blue.texture
      TEXTURES['gem_yellow'] = resource.gem_yellow.texture
      TEXTURES['gem_red'] = resource.gem_red.texture
      TEXTURES['seed_pink_spotted'] = resource.seed_pink_spotted.texture

      // Ships
      TEXTURES['ship_opal'] = resource.ship_opal.texture
      TEXTURES['white'] = resource.white.texture

      // Bolts
      TEXTURES['bolt_pink'] = resource.bolt_pink.texture
      TEXTURES['bolt_green'] = resource.bolt_green.texture
      TEXTURES['bolt_blue'] = resource.bolt_blue.texture
      TEXTURES['bolt_orange'] = resource.bolt_orange.texture
      TEXTURES['bolt_yellow'] = resource.bolt_yellow.texture
      TEXTURES['bolt_red'] = resource.bolt_red.texture
      TEXTURES['heart_red'] = resource.heart_red.texture

      // MISC
      TEXTURES['gauge_crystal_l1'] = resource.gauge_crystal_l1.texture
      TEXTURES['stalagmite'] = resource.stalagmite.texture
      TEXTURES['lava_pink'] = resource.lava_pink.texture
      TEXTURES['lava_green'] = resource.lava_green.texture
      TEXTURES['lava_blue'] = resource.lava_blue.texture
      TEXTURES['lava_orange'] = resource.lava_orange.texture
      TEXTURES['lava_yellow'] = resource.lava_yellow.texture
      TEXTURES['lava_red'] = resource.lava_red.texture

      TEXTURES['plant_icon'] = resource.plant_icon.texture

    })


  const TOTAL_LIVES = 10


  // GOTO_VARIABLES Declerations

  // Counters
  let puzzleIndex = 0;
  let levelCounter = 0
  let lives = TOTAL_LIVES

  // Objects
  let pool;

  // GOTO_STATE Levels/Planets & Puzzles
  let currentLevel = opalLevels[levelCounter]
  let puzzlesForCurrentLevel = currentLevel.puzzles
  let currentLevelLength = puzzlesForCurrentLevel.length;

  const scoreObject = {
    score: 0,
    progress: 0,
    globalScore: 0,
    timer: 0,
    focusTime: 0,
  }


  let applicationStates = {
    cave: 'cave',
    space: 'space',
    start: 'start',
    flying: 'flying',
    ended: 'ended',
  }


  let state = {
    gameOver: false,
    collectableTexture: TEXTURES.seed_one,
    starPosition: { span: setup.height },
    applicationState: applicationStates.start
  }

  setInterval(() => {
    scoreObject.timer += 1
  }, 10)

  let LINE_COLOR = 0x1191fa;
  const ABS_CARD_COLOR = LINE_COLORS.black;

  // ASSETS
  const ABSTRACT_CARDS = {
    1: new PIXI.Text("1", {
      fontFamily: "Chalkduster",
      fill: ABS_CARD_COLOR,
      fontSize: 60,
    }),
    2: new PIXI.Text("2", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Chalkduster",
      fontSize: 60,
    }),
    3: new PIXI.Text("3", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Chalkduster",
      fontSize: 60,
    }),
    4: new PIXI.Text("4", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Chalkduster",
      fontSize: 60,
    }),
    5: new PIXI.Text("5", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Chalkduster",
      fontSize: 60,
    }),
    6: new PIXI.Text("6", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Chalkduster",
      fontSize: 60,
    }),
    7: new PIXI.Text("7", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Chalkduster",
      fontSize: 60,
    }),
    8: new PIXI.Text("8", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Chalkduster",
      fontSize: 60,
    }),
    9: new PIXI.Text("9", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Chalkduster",
      fontSize: 60,
    }),
    10: new PIXI.Text("10", {
      fill: ABS_CARD_COLOR,
      fontFamily: "Chalkduster",
      fontSize: 60,
    }),
  };

  const NUMBER_CARDS = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
  };


  // HOT: GOTO_UI_DECLARATIONS -  Global UI Declarations
  let boltBar;
  let livesBar;
  let shipOpal;
  let currentPlanet;
  let scoreText
  let planetCarousel = []
  let startButton;

  let endOfGameModal;

  let backGround;
  let iconCollectable;
  let iconLives;
  let boltGauge;
  let livesGauge;
  let stars = []
  let collectable;
  let barGraphics = new PIXI.Graphics();
  let numbershapeGraphics = new PIXI.Graphics();
  let blasts = []
  let white;
  let topLeftCaveBackground
  let topRightCaveBackground
  let bottomLeftCaveBackground
  let bottomRightCaveBackground
  let lava;
  let generators = [new PIXI.Sprite(),
  new PIXI.Sprite(),
  new PIXI.Sprite(),
  new PIXI.Sprite(),
  new PIXI.Sprite(),
  new PIXI.Sprite(),
  new PIXI.Sprite(),
  new PIXI.Sprite(),
  new PIXI.Sprite(),
  new PIXI.Sprite(),
  ]

  // GOTO_TIMELINES Definitions 
  let flyToNextPlanetTimeline = new Timeline({ paused: true });
  let globalTimeline = new Timeline({ paused: true });
  let gotoCaveTimeline = new Timeline({ paused: true });
  let leavePlanetTimeline = new Timeline({ paused: true });
  let endOfGameTimeline = new Timeline({ paused: true });


  let LAYERS = {}
  let GROUPS = {}
  // Game State
  let currentPuzzle;

  // TODO: Clean up this constants stuff. Tbh this should probably all be some type of state class. 
  let isMobileDevice = setup.width / setup.height < 0.75 ? true : false;
  let NEW_CARD_WIDTH = 40;
  let TOP_PADDING = isMobileDevice ? 0.1 * setup.height : 0.05 * setup.height;


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

  let originX = VIEW_WIDTH / 2 - GRID_WIDTH / 2;
  let originY = VIEW_HEIGHT / 2 - GRID_HEIGHT / 2;


  function launch() {
    layer(applicationStates.space)
    flyToNextPlanetTimeline.clear()
    buildFlyToNextPlanetTimeline()
    flyToNextPlanetTimeline.restart()
  }

  function calculateScore() {
    const { timer, focusTime } = scoreObject
    const levelScore = 10 + Math.round(Math.pow(2, 11 / (1 + (timer - focusTime) / 1000)) / 30)
    console.log("score", levelScore)
    scoreObject.score += levelScore
    scoreObject.globalScore += levelScore

    console.log("score", scoreObject.globalScore)

    return levelScore
  }

  function layer(appState){
    state.applicationState = appState
    LAYERS[appState].forEach(l => { app.stage.addChild(l) })
  }


  function prepareTheNextPuzzle() {

    // Safely initializing a new Puzzle
    puzzleIndex++
    currentPuzzle = puzzlesForCurrentLevel[puzzleIndex % currentLevelLength];
    currentPuzzle.counter = currentLevel.counter


    pool.loadPuzzle(currentPuzzle)
  }

  function prepareTheNextLevel() {
    // Reset the puzzle counter. 
    scoreObject.globalScore += scoreObject.score
    scoreObject.score = 0

    boltBar.width = BOLT_BAR_WIDTH * 0.01

    levelCounter++
    puzzleIndex = 0
    currentLevel = opalLevels[levelCounter % opalLevels.length]
    puzzlesForCurrentLevel = currentLevel.puzzles
    currentLevelLength = puzzlesForCurrentLevel.length;
    collectable.texture = TEXTURES[currentLevel.collectable]

    state.collectableTexture = TEXTURES[currentLevel.collectable]
    boltBar.texture = generateBarTexture(BAR_COLORS[currentLevel.icon])

    prepareTheNextPuzzle()
  }

  function swapTexture(sprite, texture) {
    let wh = texture.width / texture.height
    let w = sprite.width
    let h = sprite.width / wh
    sprite.width = w
    sprite.height = h
    sprite.texture = texture
    sprite.aspectRatio = wh
  }

  function setSpriteSize(sprite, width){
    sprite.width = width
    sprite.height = width / sprite.aspectRatio
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
  function onCollection() {

    // Do right away on collection. 
    collectable.alpha = 0
    app.stage.addChild(iconCollectable)

    // Since the beans rotate. 
    collectable.rotation = 0
    const onComplete = () => {
      if (scoreObject.progress >= currentLevel.puzzles.length) {
        prepareTheNextLevel()

        // Layer / Tween
        app.stage.addChild(shipOpal)
        Tween.to(iconCollectable, { duration: 0.5, x: shipOpal.x + shipOpal.width / 2, y: shipOpal.y + shipOpal.height / 4, onComplete: prepareSceneTransition })
      } else {
        prepareTheNextPuzzle()
        dealCards(pool);
      }
    }

    let to = Math.min(scoreObject.progress / currentLevel.puzzles.length * BOLT_BAR_WIDTH, BOLT_BAR_WIDTH)
    Tween.to(boltBar, { width: to, ease: "bounce", onComplete: onComplete })
  }

  function pop(x, y, r) {
    let tg = this._targets[0]
    let t = tg.t
    let dx = t / 50 * r * setup.width / 4
    tg.y = 2 * t * t - (40) * t + y
    tg.rotation = t / (Math.PI * 2) * r
    tg.x = x + dx
  }

  function onWrongAnswerComplete() {
    pool.activeCards.forEach((c) => {
      if (!c.dropped) {
        c.interactive = true
      }
    });
    if (lives <= 0) {
      endGame();
    } else if (currentLevel.type == "cave") {
      onCollection();
    }
  }


  // GOTO_EVENTS Card Clicked 
  function cardClicked(e) {

    // Learning is when you can manipulate the dots. 
    if (e.target.isOffCard == true) {

      // GOTO: CORRECT
      calculateScore()
      scoreObject.progress++

      e.target.dropped = true
      e.target.alpha = 0;
      e.target.interactive = false

      pool.activeCards.forEach((c, i) => {
        Tween.to(c.balls, { duration: 0, alpha: 0 })
      });

      pool.activeCards.forEach((c, i) => {
        if (c.dropped == false) {
          blasts[i].x = c.x + CARD_WIDTH / 2
          blasts[i].y = c.y + CARD_WIDTH / 2
          blasts[i].alpha = 1
          blasts[i].explode()
          c.bg.alpha = 0
        }
      })

      Tween.to(collectable, { x: iconCollectable.x + collectable.width / 2, y: iconCollectable.y + collectable.height / 2, duration: 0.5, ease: Expo.easeIn, onComplete: onCollection })
    } else {

      // TODO: Add back numeral support inside caves. 
      app.stage.addChild(e.target.numeral);

      // Cave Behavior
      if (currentLevel.type == "cave") {
        let rand = 2 * (Math.random() - 1)
        collectable.t = 0
        pool.activeCards.forEach((c) => {
          if (c.isOffCard == true) {
            c.alpha = 0
          } else {
            Tween.to(c, { alpha: 0, duration: 2 })
          }
        })
        Tween.to(collectable, { duration: 2, t: 50, onUpdateParams: [collectable.x, collectable.y, rand], ease: Linear.easeNone, onUpdate: pop, onComplete: onWrongAnswerComplete })
        // Normal Behavior
      } else {
        e.target.dropped = true
        e.target.bg.alpha = 0
        Tween.to([e.target.balls], { onComplete: onWrongAnswerComplete, duration: 0.5, y: "-=50", alpha: 0 })
      }

      // Handling the lives. 
      lives--;
      Tween.to(livesBar, { duration: 0.5, width: BOLT_BAR_WIDTH * lives / TOTAL_LIVES, ease: "bounce" })
    }
  }

  function prepareSceneTransition() {

    let upcomingLevel = currentLevel 

    Tween.to(GROUPS.gauges, { duration: 0.5, alpha: 0 })

    boltBar.width = 0 

    swapTexture(iconCollectable, TEXTURES[currentLevel.icon])
    iconCollectable.y = -100
    

    puzzleIndex = 0
    scoreObject.progress = 0
    scoreObject.score = 0

    if (upcomingLevel.type == "cave") {
      setSpriteSize(iconCollectable, boltGauge.width/5)
      gotoCaveTimeline.restart()
    } else {
      layer(applicationStates.cave)
      leavePlanetTimeline.restart()
    }

    app.stage.addChild(white)
  }


  function endGame() {

    scoreObject.score = 0
    endOfGameTimeline.clear()
    buildEndOfGameTimeline()
    // Need some type of function to clear the screen of everything 

    if (currentLevel.type == "cave") {
      // Play the cave transition
      caveTearDown(true)
    }

    pool.reset()

    collectable.alpha = 0
    app.stage.addChild(scoreText)
    scoreText.y = POINT_CAROUSEL_Y - SIZE_CAROUSEL_HEIGHT

    scoreObject.progress = 0

    planetCarousel.forEach((p, i) => {
      p.y = POINT_CAROUSEL_Y
      p.x = setup.width + MIN_DIM / 2 * i
      p.alpha = 0
      app.stage.addChild(p)
    })


    endOfGameTimeline.restart()

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
      COUNTER_TEXTURE = c.texture


      // RESET CARD SIZE & TEXTURE
      this.apparentWidth = CARD_WIDTH;
      this.apparentHeight = CARD_WIDTH;

      this.bg.width = CARD_WIDTH;
      this.bg.height = CARD_WIDTH;

      this.bg.texture = TEXTURES.tile_rock;
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
            ac.style.fill = BAR_COLORS[currentLevel.icon]
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
          array = NUMBER_SHAPES[meshVal](0.5)

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
          if (currentLevel.shuffle == "triangle") {
            i % 2 == 0 ? sprite.rotation = Math.PI / 2 : sprite.rotation = -Math.PI / 2
          } else if (currentLevel.shuffle == "stick") {
            i % 2 == 0 ? sprite.rotation = Math.PI / 2 : sprite.rotation = 0
          } else {
            sprite.rotation = 0
          }
          sprite.width = this.unit;
          sprite.height = this.unit;
          sprite.x = c[0] * this.unit + offsetX + this.unit / 2;
          sprite.y = c[1] * this.unit + offsetY + this.unit / 2;
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
          s.anchor.set(0.5);
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
      updateLayoutParams();
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

    reset() {
      this.activeCards.forEach((c) => {
        c.inPlay = false
        c.alpha = 0
        c.x = -CARD_WIDTH
        c.y = -CARD_WIDTH
      })
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

  function initializeGameData() {

    // Level Data
    levelCounter = 0
    puzzleIndex = 0
    currentLevel = opalLevels[levelCounter % opalLevels.length]
    state.collectableTexture = TEXTURES[currentLevel.collectable]
    puzzlesForCurrentLevel = currentLevel.puzzles
    currentLevelLength = puzzlesForCurrentLevel.length;
    currentPuzzle = puzzlesForCurrentLevel[puzzleIndex % currentLevelLength];
    currentPuzzle.counter = currentLevel.counter

  }

  // Should probably define global layout params as S. 
  function updateLayoutParams() {

    // New Algo
    let newPuzzle = currentPuzzle;


    newPuzzle.counter = currentLevel.counter

    collectable.texture = state.collectableTexture

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


    Object.keys(ABSTRACT_CARDS).forEach((k) => {
      let t = ABSTRACT_CARDS[k];
      t.fontSize = CARD_WIDTH / 2;
      //t.anchor.set(0.5,0)
    });

    resetBlasts()
  }

  function resetBlasts() {
    blasts.forEach(b => {
      app.stage.addChild(b)
      b.refresh()
    })
  }


  function startGame() {

    if (state.gameOver) {

      currentPlanet.alpha = 1
      let id = "planet_" + currentLevel.planet
      currentPlanet.texture = TEXTURES[id]
      iconCollectable.texture = TEXTURES[currentLevel.icon]
      state.gameOver = false
      planetCarousel.forEach(p => app.stage.removeChild(p))
      shipOpal.x = shipOpal.originalFrame.x
      shipOpal.y = shipOpal.originalFrame.y
      shipOpal.alpha = 1
      scoreText.alpha = 0

      lives = TOTAL_LIVES
    }


    Tween.to(startButton, {duration: 1, y: -startButton.height });
    Tween.to(shipOpal, {duration: 2, alpha: 1, y: setup.height / 2 - shipOpal.height / 2, x: setup.width / 2 - shipOpal.width / 2})
    launch()

    initializeGameData()
  }

  function makeInteractive() {
    blasts.forEach((b) => {
      b.cancel()
    });
    this._targets[0].interactive = true;
    collectable.alpha = 1;
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
          collectable.x = _x + CARD_WIDTH / 2;
          collectable.y = _y + CARD_WIDTH / 2;
          collectable.alpha = 0
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

  function caveSetup() {
    generateNumberShapeTextures(currentLevel.counter)
    resetBlasts()

    boltBar.width = BOLT_BAR_WIDTH * 0.01

    backGround.texture = TEXTURES.background_cave

    let id = "lava_" + currentLevel.color
    lava.texture = TEXTURES[id]

    layer(applicationStates.cave)
    app.stage.addChild(white)
  }

  function caveTearDown(fade) {

    const removeCaveStuff = () => {
      GROUPS.caveElements.forEach(s => app.stage.removeChild(s))
    }

    // Fading used for when we end the game from within the cave. 
    if (fade) {
      Tween.to(GROUPS.caveElements, { alpha: 0, duration: 1, ease: Expo.easeInOut, onComplete: removeCaveStuff })
    } else {
      removeCaveStuff()
    }


    currentPlanet.width = setup.width / 1.5
    currentPlanet.height = currentPlanet.width / currentPlanet.aspectRatio
    currentPlanet.x = setup.width / 2
    currentPlanet.y = setup.height + currentPlanet.height / 6
    currentPlanet.alpha = 1


    backGround.texture = TEXTURES.background_opal

    layer(applicationStates.space)
    GROUPS.gauges.forEach(g => g.alpha = 0) 
  }

  function endOfGameTimelineComplete() {
    state.gameOver = true
    startButton.width = startButton.originalFrame.width / 2
    startButton.height = startButton.originalFrame.height / 2
    startButton.x = MENU_MARGIN + startButton.width / 2
    startButton.y = MENU_MARGIN + startButton.height / 2
    startButton.texture = TEXTURES.button_restart
    startButton.height = TEXTURES.button_go.height / TEXTURES.button_go.width * startButton.width
    Tween.to(startButton, { alpha: 1 })
    app.stage.addChild(startButton);
  }

  // GOTO_TIMELINE Functions 
  function buildLeavePlanetTimeline() {
    leavePlanetTimeline.to(shipOpal, {ease: Sine.easeOut, duration: 1, x: 3 / 4 * setup.width })
    leavePlanetTimeline.to(shipOpal, { duration: 2, y: 0 }, "<")
    leavePlanetTimeline.to(shipOpal, { duration: 2, width: 0, height: 0 }, "<")
    leavePlanetTimeline.to(white, { duration: 1, alpha: 1 })
    leavePlanetTimeline.call(caveTearDown)
    leavePlanetTimeline.to(white, { duration: 1, alpha: 0 })
    leavePlanetTimeline.to(shipOpal, { duration: 0, height: 1, width: 1, y: setup.height + shipOpal.height })
    leavePlanetTimeline.to(shipOpal, { duration: 1, width: shipOpal.originalFrame.width, height: shipOpal.originalFrame.height, y: setup.height / 2 - shipOpal.height / 2, x: MENU_MARGIN })
    leavePlanetTimeline.to(shipOpal, { ease: Expo.easeInOut, duration: 2, x: setup.width / 2 - shipOpal.width / 2, onComplete: launch }, "<")
  }


  function onArrivedAtNextPlanet() {
    //app.stage.addChild(iconCollectable)
    iconCollectable.height = boltGauge.height
    iconCollectable.anchor.y = 0.5
    iconCollectable.rotation = -Math.PI / 20
    iconCollectable.width = iconCollectable.height * iconCollectable.aspectRatio
    Tween.to(GROUPS.gauges, { duration: 0.5, alpha: 1 })
    Tween.to(iconCollectable,{duration: 0.5, y: boltGauge.y+boltGauge.height/2, x: boltGauge.x, alpha: 1 })
    dealCards(pool)
  }


  function buildEndOfGameTimeline() {

    const onUpdate = () => {
      let tweenVal = scoreObject.score / scoreObject.globalScore
      scoreText.text = Math.round(scoreObject.score)
      scoreText.scale.x = tweenVal * tweenVal
      scoreText.scale.y = tweenVal * tweenVal
      scoreText.alpha = tweenVal * tweenVal
    }
    let toString = "-=" + (setup.width / 2 + MIN_DIM / 2 * (planetCarousel.length - 1))

    endOfGameTimeline.to([currentPlanet, iconLives, iconCollectable, startButton, boltBar, boltGauge, livesBar, livesGauge, white], { duration: 1, alpha: 0 })
    endOfGameTimeline.to(shipOpal, { duration: 1, y: POINT_CAROUSEL_Y + SIZE_CAROUSEL_HEIGHT / 1.5, x: setup.width / 2 - shipOpal.width / 2, ease: Sine.easeInOut })
    endOfGameTimeline.to(planetCarousel, { alpha: 1, duration: 0.5, ease: Sine.easeInOut }, "<")
    endOfGameTimeline.to(scoreObject, { score: scoreObject.globalScore, duration: 5, ease: Sine.easeInOut, onUpdate: onUpdate }, "<")
    endOfGameTimeline.to(planetCarousel, { duration: 5, x: toString }, "<")
    endOfGameTimeline.call(endOfGameTimelineComplete)
  }

  function updateStars() {
    stars.forEach((s, i) => {
      s.y = s.initialPosition + state.starPosition.span % (s.initialPosition - setup.height)
      if (s.y > setup.height) {
        s.x = Math.random() * setup.width
      }
    })
  }

  function buildFlyToNextPlanetTimeline() {

    const swapPlanets = () => {

      // MOO_
      let planet_id = "planet_" + currentLevel.planet
      swapTexture(currentPlanet, TEXTURES[planet_id])
      currentPlanet.y = -setup.height
      Tween.to(currentPlanet, { ease: Expo.easeInOut, duration: 3 * time / 4, y: setup.height + currentPlanet.height / 6 })
      currentPlanet.alpha = 1
    }


    let time = 5
    let distance = 5 * setup.height

    const goTo = state.starPosition.span + distance

    flyToNextPlanetTimeline.to(currentPlanet, { duration: time / 4, y: setup.height + currentPlanet.height, onComplete: swapPlanets })
    flyToNextPlanetTimeline.to(state.starPosition, { ease: Expo.easeInOut, duration: time, span: goTo, onUpdate: updateStars }, "<")
    flyToNextPlanetTimeline.to(shipOpal, { duration: 1, y: setup.height - shipOpal.height - MENU_MARGIN, x: MENU_MARGIN }, "-=1")
    flyToNextPlanetTimeline.call(onArrivedAtNextPlanet)
  }

  function onArrivedAtCave(){
    dealCards(pool)
    Tween.to(GROUPS.gauges, { duration: 0.5, alpha: 1 })
    Tween.to(iconCollectable, { duration: 0.5,rotation: 0,y: boltGauge.y+boltGauge.height/4, x: boltGauge.x, alpha: 1 })
  }

  function buildGoToPlanetTimeline() {
    gotoCaveTimeline.to(shipOpal, { duration: 4, width: 0, height: 0 })
    gotoCaveTimeline.to(shipOpal, { duration: 4, ease: "elastic", x: setup.width / 2, y: setup.height / 2 }, "<")
    gotoCaveTimeline.to(shipOpal, { duration: 0, ease: "elastic", x: 3 / 4 * setup.width, y: MENU_MARGIN * 4 })
    gotoCaveTimeline.to(currentPlanet, { duration: 3, ease: Sine.easeInOut, width: 4 * MIN_DIM, height: 4 * MIN_DIM / currentPlanet.aspectRatio, x: setup.width / 2, y: setup.height / 2, duration: 3 }, "-=3.5")
    gotoCaveTimeline.call(caveSetup)
    gotoCaveTimeline.to(white, { duration: 0.5, alpha: 1 }, "-=2")
    gotoCaveTimeline.to(currentPlanet, { duration: 1, alpha: 0 }, "<0.25")
    gotoCaveTimeline.to(white, { duration: 0.5, alpha: 0 })
    gotoCaveTimeline.to(shipOpal, { duration: 1.5, height: shipOpal.originalFrame.height, width: shipOpal.originalFrame.width, y: setup.height - shipOpal.height },)
    gotoCaveTimeline.to(shipOpal, { duration: 1.5, x: MENU_MARGIN, ease: Sine.easeIn }, "<")
    gotoCaveTimeline.call(onArrivedAtCave)
  }

  function generateNumberShapeTextures(counter) {
    let texture = COUNTERS[counter].texture

    generators.forEach((g, i) => {
      g.texture = texture
    })

    NUMBER_SHAPES.forEach((s, i) => {
      let r = CARD_WIDTH / 10
      let cords = s(r)
      numbershapeGraphics.clear()
      numbershapeGraphics.drawCircle(4 * r, 4 * r, 4 * r)

      generators.forEach((c, j) => {
        numbershapeGraphics.removeChild(c)
      })

      let dim = getWidthAndHeightOfNumberShape(cords, r)
      let offset = { x: 3.5 * r - dim.width / 2, y: 3.5 * r - dim.height / 2 }

      cords.forEach((cord, j) => {
        let counter = generators[j]
        counter.width = CARD_WIDTH / 5
        counter.height = CARD_WIDTH / 5
        counter.x = cord.x + offset.x
        counter.y = cord.y + offset.y
        numbershapeGraphics.addChild(counter)
      })
      NUMBER_CARDS[i] = app.renderer.generateTexture(numbershapeGraphics)
    })
  }

  function generateBarTexture(override) {
    let color = BAR_COLORS[currentLevel.icon]
    if (override) {
      color = override
    }
    barGraphics.clear()
    barGraphics.beginFill(color)
    barGraphics.drawRoundedRect(0, 0, 500, 50, 20)
    barGraphics.endFill()
    return app.renderer.generateTexture(barGraphics)
  }

  function load() {


    // Define dynamically generated assets here.

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
      stick_purple: {
        texture: TEXTURES.counter_stick_purple,
        stroke: LINE_COLORS.purple,
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
      stick_red: {
        texture: TEXTURES.counter_stick_red,
        stroke: LINE_COLORS.red,
        value: 1,
      },
      triangle_yellow: {
        texture: TEXTURES.counter_triangle_yellow,
        stroke: LINE_COLORS.yellow,
        value: 1,
      },
    };



    // Online called on game restart. 
    initializeGameData()


    // Define UI Elements 
    opalLevels.forEach((l, i) => {
      console.log(l)
      if (l.type != "cave") {
        let id = "planet_" + l.planet
        let p = new PIXI.Sprite(TEXTURES[id])
        p.anchor.set(0.5)
        p.aspectRatio = TEXTURES[id].width / TEXTURES[id].height
        p.width = SIZE_CAROUSEL_HEIGHT
        p.height = p.width / p.aspectRatio
        p.alpha = 0
        planetCarousel.push(p)
      }
    })


    // #region GOTO_UI Definitions 

    scoreText = new PIXI.Text("0", {
      fill: "#19d5ff",
      fontFamily: "Silkscreen",
      fontSize: CARD_WIDTH / 2.5,
    });
    scoreText.x = setup.width / 2
    scoreText.y = setup.height / 4
    scoreText.anchor.set(0.5);
    scoreText.alpha = 0

    app.stage.addChild(scoreText)


    endOfGameModal = new PIXI.Container();
    endOfGameModal.x = setup.width / 2;
    endOfGameModal.y = setup.height / 2;
    endOfGameModal.width = setup.width / 2;
    endOfGameModal.height = setup.height / 2;
    endOfGameModal.alpha = 0;
    app.stage.addChild(endOfGameModal);

    // GOTO: Initialize Assets Here
    backGround = new PIXI.Sprite(TEXTURES.background_opal);
    backGround.x = 0;
    backGround.y = 0;
    backGround.width = setup.width;
    backGround.height = setup.height;
    app.stage.addChild(backGround)

    topLeftCaveBackground = new PIXI.Sprite(TEXTURES.stalagmite);
    topLeftCaveBackground.aspectRatio = TEXTURES.stalagmite.width / TEXTURES.stalagmite.height
    topLeftCaveBackground.x = 0;
    topLeftCaveBackground.width = MIN_DIM / 2
    topLeftCaveBackground.height = topLeftCaveBackground.width / topLeftCaveBackground.aspectRatio
    topLeftCaveBackground.y = -topLeftCaveBackground.height * 0.08
    //app.stage.addChild(topLeftCaveBackground)

    let scaleX = topLeftCaveBackground.scale.x
    let scaleY = topLeftCaveBackground.scale.y
    //console.log(scaleX, scaleY)

    bottomLeftCaveBackground = new PIXI.Sprite(TEXTURES.stalagmite);
    bottomLeftCaveBackground.width = MIN_DIM / 2
    bottomLeftCaveBackground.height = topLeftCaveBackground.height
    bottomLeftCaveBackground.x = 0;
    bottomLeftCaveBackground.y = setup.height - topLeftCaveBackground.y
    bottomLeftCaveBackground.scale.y = -scaleY

    topRightCaveBackground = new PIXI.Sprite(TEXTURES.stalagmite);
    topRightCaveBackground.width = MIN_DIM / 2
    topRightCaveBackground.height = topLeftCaveBackground.height
    topRightCaveBackground.x = setup.width
    topRightCaveBackground.y = topLeftCaveBackground.y
    topRightCaveBackground.scale.x = -scaleX

    bottomRightCaveBackground = new PIXI.Sprite(TEXTURES.stalagmite);
    bottomRightCaveBackground.x = setup.width
    bottomRightCaveBackground.y = setup.height - topLeftCaveBackground.y
    bottomRightCaveBackground.width = MIN_DIM / 2
    bottomRightCaveBackground.height = TEXTURES.stalagmite.height / TEXTURES.stalagmite.width * bottomRightCaveBackground.width
    bottomRightCaveBackground.scale.x = -scaleX
    bottomRightCaveBackground.scale.y = -scaleY

    lava = new PIXI.Sprite(TEXTURES.lava_pink);
    lava.width = setup.width
    lava.height = MIN_DIM / 8
    lava.anchor.y = 1
    lava.x = 0
    lava.y = setup.height
    //app.stage.addChild(lava)

    white = new PIXI.Sprite(TEXTURES.white);
    white.width = setup.width
    white.height = setup.height
    white.x = 0
    white.y = 0
    white.interactive = false
    white.alpha = 0
    app.stage.addChild(white)

    collectable = new PIXI.Sprite(state.collectableTexture);
    collectable.width = MIN_DIM / 10
    collectable.height = MIN_DIM / 10
    collectable.anchor.set(0.5)
    collectable.alpha = 0
    app.stage.addChild(collectable)

    startButton = new PIXI.Sprite(TEXTURES.button_go);
    startButton.anchor.set(0.5);
    startButton.interactive = true;
    startButton.x = setup.width / 2;
    startButton.y = setup.height / 2;
    startButton.width = CARD_WIDTH / 1.5;
    startButton.height = TEXTURES.button_go.height / TEXTURES.button_go.width * startButton.width
    startButton.originalFrame = { x: startButton.x, y: startButton.y, width: startButton.width, height: startButton.height }
    startButton.on("pointerdown", () => startGame(false));
    app.stage.addChild(startButton);


    shipOpal = new PIXI.Sprite(TEXTURES.ship_opal);
    shipOpal.aspectRatio = TEXTURES.ship_opal.width / TEXTURES.ship_opal.height
    shipOpal.width = MIN_DIM / 5
    shipOpal.height = shipOpal.width / shipOpal.aspectRatio
    shipOpal.alpha = 1
    shipOpal.y = setup.height + shipOpal.height
    shipOpal.x = setup.width / 2 - shipOpal.width / 2
    shipOpal.originalFrame = { x: shipOpal.x, y: shipOpal.y, width: shipOpal.width, height: shipOpal.height }

    app.stage.addChild(shipOpal)

    // GOTO_GAUGES

    boltGauge = new PIXI.Sprite(TEXTURES.gauge_crystal_l1);
    boltGauge.aspectRatio = TEXTURES.gauge_crystal_l1.width / TEXTURES.gauge_crystal_l1.height
    boltGauge.width = CARD_WIDTH / 1.5;
    boltGauge.height = boltGauge.width / boltGauge.aspectRatio
    boltGauge.x = MENU_MARGIN
    boltGauge.y = MENU_MARGIN
    boltGauge.alpha = 0

    livesGauge = new PIXI.Sprite(TEXTURES.gauge_crystal_l1);
    livesGauge.anchor.x = 1
    livesGauge.aspectRatio = boltGauge.aspectRatio
    livesGauge.width = CARD_WIDTH / 1.5;
    livesGauge.height = boltGauge.width / boltGauge.aspectRatio
    livesGauge.x = setup.width - MENU_MARGIN
    livesGauge.y = MENU_MARGIN
    livesGauge.alpha = 0

    boltBar = new PIXI.Sprite(TEXTURES.progress_bar_pink);
    boltBar.anchor.x = 0
    boltBar.anchor.y = 0.5
    boltBar.width = BOLT_BAR_WIDTH * 0.01
    boltBar.height = boltGauge.height / 4
    boltBar.x = MENU_MARGIN + boltBar.height
    boltBar.y = MENU_MARGIN + boltGauge.height / 2.5
    boltBar.alpha = 0

    livesBar = new PIXI.Sprite(TEXTURES.progress_bar_pink);
    livesBar.anchor.x = 1
    livesBar.anchor.y = 0.5
    livesBar.width = BOLT_BAR_WIDTH;
    livesBar.height = boltGauge.height / 4
    livesBar.x = setup.width - MENU_MARGIN - boltBar.height / 2
    livesBar.y = MENU_MARGIN + boltGauge.height / 2.5
    livesBar.texture = generateBarTexture("0xed0739")
    livesBar.alpha = 0

    iconCollectable = new PIXI.Sprite(TEXTURES[currentLevel.icon]);
    iconCollectable.aspectRatio = TEXTURES.bolt_pink.width / TEXTURES.bolt_pink.height
    iconCollectable.height = boltGauge.height
    iconCollectable.anchor.y = 0.5
    iconCollectable.rotation = -Math.PI / 20
    iconCollectable.width = iconCollectable.height * iconCollectable.aspectRatio
    iconCollectable.x = boltGauge.x
    iconCollectable.y = boltGauge.y
    iconCollectable.alpha = 0

    iconLives = new PIXI.Sprite(TEXTURES.heart_red);
    iconLives.anchor.x = 0.75
    iconLives.anchor.y = 0.35
    iconLives.aspectRatio = TEXTURES.heart_red.width / TEXTURES.heart_red.height
    iconLives.width = iconCollectable.width * 1.5
    iconLives.height = iconLives.width * iconLives.aspectRatio
    iconLives.x = livesGauge.x
    iconLives.y = livesGauge.y + livesGauge.height / 3
    iconLives.alpha = 0




    generateNumberShapeTextures(currentLevel.counter)


    /*
    Object.keys(NUMBER_CARDS).forEach((k, i) => {
      let t = NUMBER_CARDS[k]
      let sp = new PIXI.Sprite(t)
      sp.width = CARD_WIDTH / 10
      sp.height = CARD_WIDTH / 10
      sp.x = i * CARD_WIDTH / 4
      sp.y = CARD_WIDTH / 10
      app.stage.addChild(sp)
    })
    */



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

    currentPlanet = new PIXI.Sprite(TEXTURES.planet_pink_fire)
    currentPlanet.aspectRatio = TEXTURES.planet_pink_fire.width / TEXTURES.planet_pink_fire.height
    currentPlanet.anchor.set(0.5)
    currentPlanet.width = setup.width / 1.5
    currentPlanet.height = currentPlanet.width / currentPlanet.aspectRatio
    currentPlanet.x = setup.width / 2
    currentPlanet.y = setup.height + currentPlanet.height / 6
    currentPlanet.alpha = 0
    app.stage.addChild(currentPlanet)

    boltBar.texture = generateBarTexture()
    let planet_id = "planet_" + currentLevel.planet
    currentPlanet.texture = TEXTURES[planet_id]

    // #endregion GOTO_UI Definitions

    // GOTO_BLAST


    // Create UI Controllers 

    for (let i = 0; i < 25; i++) {
      let b = new Blast();
      b.init();
      b.x = setup.width / 8 + 100 * i * Math.random()
      b.y = setup.height / 8 + 50 * i * Math.random()
      b.alpha = 0
      blasts.push(b)
    }


    // States 
    makeStars()
    state.starPosition.span = setup.height
    updateStars()


    pool = new CardPool(currentPuzzle);
    pool.loadPuzzle(currentPuzzle);


    // GOTO_TIMELINE Function Calls 
    buildGoToPlanetTimeline()
    buildLeavePlanetTimeline()
    buildEndOfGameTimeline()

    updateLayoutParams()

    LAYERS = {
      cave: [backGround, topLeftCaveBackground, boltGauge, boltBar, collectable,...blasts, iconCollectable, lava, bottomLeftCaveBackground, shipOpal,topRightCaveBackground, bottomRightCaveBackground,livesGauge,livesBar,iconLives],
      space: [backGround, ...stars, currentPlanet,...blasts, boltGauge, livesGauge, boltBar, livesBar, collectable,iconCollectable, iconLives,shipOpal],
      start: [backGround,...stars,startButton,shipOpal],
    }

    GROUPS = {caveElements:[lava, topLeftCaveBackground, bottomLeftCaveBackground, topRightCaveBackground, bottomRightCaveBackground], gauges: [boltGauge, livesGauge, boltBar, livesBar, iconCollectable,iconLives]}

    layer(applicationStates.start)
  }

  function wait() {
    setTimeout(load, 2000)
  }

  PIXI.Loader.shared.onComplete.add(load)

};
