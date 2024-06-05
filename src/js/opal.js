import * as PIXI from "pixi.js";
// APIS
// Problem que setup
import {
  getRandomArray,
  getRandomInt,
  shuffleArray,
  getNRandomElementsFromArray,
} from "./api.js";
import { Timeline, Tween, Linear, Circ, Sine, Expo, Elastic } from "gsap/gsap-core";
import {
  counters,
  opalLevels as LEVELS,
  assessmentCardCustomCoordinates,
} from "./opallevels.js";
import { getWidthAndHeightOfNumberShape, NUMBER_SHAPES } from "./numbershapes";


// START HERE: Session Tracking (Metadata for each level) and processing "remainders" as well as puzzle counter. 


// MOOO - Someday remove the init level dependency.
const initLevel = {
  grid: [2, 2],
  value: 3,
  delta: 2,
  mesh: [2, 2],
};

export const init = (app, setup) => {

  // #region Convenience Objects Declarations

  let SESSIONS = []
  let NUMERALS = [];
  let LAYERS = {}
  let GROUPS = {}
  let COUNTERS = {}
  const TEXTURES = {}
  const BAR_COLORS = { bolt_blue: "0x63dbff", bolt_green: "0x00c91e", plant_icon: "0x00c91e", bolt_yellow: "0xfced0f", bolt_pink: "0xff52e2", bolt_red: "0xf0003c", bolt_orange: "0xff860d" }


  // #endregion


  const VIEW_WIDTH = setup.width;
  const VIEW_HEIGHT = setup.height;
  const MIN_DIM = Math.min(VIEW_WIDTH, VIEW_HEIGHT);
  const MAX_DIM = Math.max(VIEW_WIDTH, VIEW_HEIGHT);
  const MENU_MARGIN = MIN_DIM * 0.05;
  const MENU_MARGIN_VERTICAL = MENU_MARGIN * 1.5;
  const MENU_MARGIN_HORIZONTAL = MENU_MARGIN * 1.5
  const PROGRESS_CIRCLE_DIM = MENU_MARGIN_VERTICAL / 4
  const SIZE_CAROUSEL_HEIGHT = MIN_DIM / 5
  const POINT_CAROUSEL_Y = setup.height / 2
  const DEFAULT_COUNTER = "blue";

  // TODO: Clean up this constants stuff. Tbh this should probably all be some type of state class. 
  let isMobileDevice = setup.width / setup.height < 0.75 ? true : false;
  let NEW_CARD_WIDTH = 40;
  let TOP_PADDING = isMobileDevice ? 0.1 * setup.height : 0.05 * setup.height;
  let ICON_ROTATION = -Math.PI / 7


  let maxMeshDimension = Math.max(initLevel.mesh[0], initLevel.mesh[1]);
  let gridUnitsWide = (maxMeshDimension + 2) * initLevel.grid[0];
  let gridUnitsHigh = (maxMeshDimension + 2) * initLevel.grid[1];
  let gridUnitsMax = Math.max(gridUnitsHigh, gridUnitsWide);



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


  let BOLT_BAR_WIDTH = CARD_WIDTH / 1.75

  let COUNTER_TEXTURE;


  let originX = VIEW_WIDTH / 2 - GRID_WIDTH / 2;
  let originY = VIEW_HEIGHT / 2 - GRID_HEIGHT / 2;

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
    .add('gauge_radial', "https://res.cloudinary.com/numbershapes/image/upload/v1717188538/Opal/radial_gauge2_up4uap.png", optionsLargeAsset)
    .add("plant_full", "https://res.cloudinary.com/numbershapes/image/upload/v1717428010/plant_full_jxoqya.png", optionsLargeAsset)
    .add("plant_one", "https://res.cloudinary.com/numbershapes/image/upload/v1717428009/plant_one_mq9vzi.png", optionsLargeAsset)
    .add("plant_two", "https://res.cloudinary.com/numbershapes/image/upload/v1717428010/plant_two_jdjyfw.png", optionsLargeAsset)
    .add("plant_empty", "https://res.cloudinary.com/numbershapes/image/upload/v1717428009/plant_none_wduy6k.png", optionsLargeAsset)
    .add("circle_white", "https://res.cloudinary.com/numbershapes/image/upload/v1717513048/circle_white_zqyw9u.svg", optionsSmallAsset)
    .add('particle_rock_1', 'https://res.cloudinary.com/numbershapes/image/upload/v1715625602/Opal/particle_rock_1_haiujp.svg', optionsSmallAsset)
    .add('particle_rock_2', 'https://res.cloudinary.com/numbershapes/image/upload/v1715697608/Opal/particle_rock_2_ma2hcc.svg', optionsSmallAsset)
    .add('planet_pink_fire', 'https://res.cloudinary.com/numbershapes/image/upload/v1714743947/Opal/planet_pink_fire_hgttly.svg', optionsExtraLargeAsset)
    .add('plant_icon', "https://res.cloudinary.com/numbershapes/image/upload/v1717436178/full_plant_xevl1c.png", optionsMediumAsset)
    .add('planet_green_bubble', 'https://res.cloudinary.com/numbershapes/image/upload/v1715781752/Opal/planet_green_bubble_b7hyac.svg', optionsExtraLargeAsset)
    .add('planet_green_swirl', 'https://res.cloudinary.com/numbershapes/image/upload/v1714524825/Opal/planet_green_swirl_q8ovc1.svg', optionsLargeAsset)
    .add('planet_orange_carved', 'https://res.cloudinary.com/numbershapes/image/upload/v1715705216/Opal/planet_orange_rocks_s90iu2.svg', optionsLargeAsset)
    .add('planet_blue_carved', 'https://res.cloudinary.com/numbershapes/image/upload/v1715788056/Opal/planet_blue_carved_lnul0v.svg', optionsLargeAsset)
    .add('planet_purple_carved', 'https://res.cloudinary.com/numbershapes/image/upload/v1716322683/Opal/planet_purple_carved_gqbh9p.svg', optionsLargeAsset)
    .add('planet_pink_comet', "https://res.cloudinary.com/numbershapes/image/upload/v1714760192/planet_pink_comet_2_ja0pr0.svg", optionsExtraLargeAsset)
    .add('planet_green_carved', "https://res.cloudinary.com/numbershapes/image/upload/v1715793449/Opal/planet_green_carved_tmmnnd.svg", optionsLargeAsset)
    .add('planet_pink_bubble', "https://res.cloudinary.com/numbershapes/image/upload/v1716322686/Opal/planet_pink_bubbles_j0xmtt.svg", optionsLargeAsset)
    .add('planet_mystery', "https://res.cloudinary.com/numbershapes/image/upload/v1717378423/planet_mystery_wzwzfa.png", optionsLargeAsset)
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
    .add('counter_half_circle_red', 'https://res.cloudinary.com/numbershapes/image/upload/v1717093806/counter_half_circle_red_lri518.png', optionsLargeAsset)
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
    .add('bolt_blue', "https://res.cloudinary.com/numbershapes/image/upload/v1717007016/vial_blue_g0tck0.svg", optionsSmallAsset)
    .add('bolt_orange', 'https://res.cloudinary.com/numbershapes/image/upload/v1717263081/Opal/vial_orange_bkurw0.svg', optionsSmallAsset)
    .add('gauge_crystal_l1', 'https://res.cloudinary.com/numbershapes/image/upload/v1717102272/Opal/gauge_u3dctl.svg', optionsLargeAsset)
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
      TEXTURES['counter_half_circle_red'] = resource.counter_half_circle_red.texture

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
      TEXTURES['planet_mystery'] = resource.planet_mystery.texture


      // Plants
      TEXTURES['plant_full'] = resource.plant_full.texture
      TEXTURES['plant_one'] = resource.plant_one.texture
      TEXTURES['plant_two'] = resource.plant_two.texture
      TEXTURES['plant_empty'] = resource.plant_empty.texture

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

      // Circles
      TEXTURES['circle_white'] = resource.circle_white.texture


      // MISC
      TEXTURES['gauge_crystal_l1'] = resource.gauge_crystal_l1.texture
      TEXTURES['gauge_radial'] = resource.gauge_radial.texture
      TEXTURES['stalagmite'] = resource.stalagmite.texture
      TEXTURES['lava_pink'] = resource.lava_pink.texture
      TEXTURES['lava_green'] = resource.lava_green.texture
      TEXTURES['lava_blue'] = resource.lava_blue.texture
      TEXTURES['lava_orange'] = resource.lava_orange.texture
      TEXTURES['lava_yellow'] = resource.lava_yellow.texture
      TEXTURES['lava_red'] = resource.lava_red.texture

      TEXTURES['plant_icon'] = resource.plant_icon.texture

    })


  const TOTAL_LIVES = 3


  // GOTO_VARIABLES Declerations

  // Counters
  let puzzleIndex = 0;
  let levelIndex = 5
  let planetIndex = 0
  let lives = TOTAL_LIVES

  // Objects
  let pool;

  // GOTO_STATE Levels/Planets & Puzzles
  let currentLevel = LEVELS[levelIndex]
  let puzzlesForCurrentLevel = currentLevel.puzzles
  let currentLevelLength = puzzlesForCurrentLevel.length;
  let currentPuzzle;

  const scoreObject = {
    puzzleScore: 0,
    progress: 0,
    totalScore: 0,
    timer: 0,
    focusTime: 0,
  }


  let applicationStates = {
    cave: 'cave',
    space: 'space',
    start: 'start',
    flying: 'flying',
    end: 'end',
  }


  let state = {
    gameOver: false,
    collectableTexture: TEXTURES.seed_one,
    starPosition: { span: setup.height },
    applicationState: applicationStates.start,
  }

  setInterval(() => {
    scoreObject.timer += 1
  }, 10)

  let LINE_COLOR = 0x1191fa;
  const ABS_CARD_COLOR = 0x000000

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

  // #region UI Declarations


  // HOT: GOTO_UI_DECLARATIONS -  Global UI Declarations
  let boltBar;
  let livesBar;
  let shipOpal;
  let currentPlanet;
  let scoreText
  let planetCarousel = []
  let progressCircles = []
  let progressCircleBackGround;
  let startButton;
  let radialProgressBar = new PIXI.Graphics();
  let gaugeRadial;

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
  let generatorGraphics = new PIXI.Graphics();
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

  // #endregion

  // #region Timeline Declarations

  // GOTO_TIMELINES Definitions 
  let flyToNextPlanetTimeline = new Timeline({ paused: true });
  let gotoCaveTimeline = new Timeline({ paused: true });
  let leaveCaveTimeline = new Timeline({ paused: true });
  let endOfGameTimeline = new Timeline({ paused: true });
  let radialProgressBarTimeline = new Timeline({ paused: true, onComplete: onRadialProgressComplete });


  // #endregion


  function launch() {
    layer(applicationStates.space)
    flyToNextPlanetTimeline.clear()
    buildFlyToNextPlanetTimeline()
    flyToNextPlanetTimeline.restart()
  }

  function calculateScore() {
    const { timer, focusTime } = scoreObject
    const levelScore = 10 + Math.round(Math.pow(2, 11 / (1 + (timer - focusTime) / 1000)) / 30)

    return levelScore
  }

  function layer(appState) {
    state.applicationState = appState
    LAYERS[appState].forEach(l => { app.stage.addChild(l) })
  }

  function reveal(appState) {
    state.applicationState = appState
    LAYERS[appState].forEach(l => { l.alpha = 1 })
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
    scoreObject.totalScore += scoreObject.puzzleScore
    scoreObject.puzzleScore = 0
    radialProgressBar.progressAngle = 0

    boltBar.width = BOLT_BAR_WIDTH * 0.01

    levelIndex++
    puzzleIndex = 0
    currentLevel = LEVELS[levelIndex % LEVELS.length]
    puzzlesForCurrentLevel = currentLevel.puzzles
    currentLevelLength = puzzlesForCurrentLevel.length;
    collectable.texture = TEXTURES[currentLevel.collectable]
    currentPuzzle = puzzlesForCurrentLevel[puzzleIndex % currentLevelLength];
    currentPuzzle.counter = currentLevel.counter

    state.collectableTexture = TEXTURES[currentLevel.collectable]
    boltBar.texture = generateBarTexture(BAR_COLORS[currentLevel.icon])
    pool.loadPuzzle(currentPuzzle)
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

  function setSpriteSize(sprite, width) {
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

  function onRadialProgressComplete() {
    // Subtracting one here because it's before it's been incremented.

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
      // MOOO - this is where I"m handling the different behavior for the "cave" levels.
      prepareTheNextPuzzle()
      dealCards(pool);
    }
  }


  // GOTO_EVENTS Card Clicked 
  function cardClicked(e) {

    // Learning is when you can manipulate the dots. 
    if (e.target.isOffCard == true) {

      animateCircles(puzzleIndex + 1)

      // GOTO: CORRECT
      let levelScore = calculateScore()
      scoreObject.puzzleScore = levelScore
      scoreObject.totalScore += levelScore

      SESSIONS[planetIndex].score += levelScore
      console.log("planetIndex,sessionScore",planetIndex,SESSIONS[planetIndex].score)


      buildRadialProgressBarTimeline()
      radialProgressBarTimeline.restart()

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

      collectable.width = collectable.originalSize.width
      collectable.height = collectable.originalSize.height

      let sPercentage = levelScore / 50 + 0.2
      let apparentHeight = collectable.height * sPercentage
      let apparentWidth = collectable.width * sPercentage

      // This vary the size of the gem. 
      if (currentLevel.type != "cave") {
        Tween.fromTo(collectable, { width: apparentWidth * 1.5, height: apparentHeight * 0.5 }, { duration: 1, width: apparentWidth, height: apparentHeight, ease: "elastic" })
      }

      setTimeout(()=>{
        if (puzzleIndex + 1 >= currentLevel.puzzles.length) {
          prepareTheNextLevel()
          prepareSceneTransition()
        } else {
          prepareTheNextPuzzle()
          dealCards(pool);
        }
      },1500)

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
        animateCircles(puzzleIndex + 1)
        // Normal Behavior
      } else {
        e.target.dropped = true
        e.target.bg.alpha = 0
        Tween.to([e.target.balls], { onComplete: onWrongAnswerComplete, duration: 0.5, y: "-=50", alpha: 0 })
      }

      // Handling the lives. 
      lives--;
      let { width, height } = iconLives.originalFrame
      Tween.to(livesBar, { duration: 0.5, width: BOLT_BAR_WIDTH * lives / TOTAL_LIVES, ease: "bounce" })
      Tween.fromTo(iconLives, { width: 0.75 * width, height: 1.15 * height }, { duration: 2, width: width, height: height, ease: "elastic" })
    }
  }

  function prepareSceneTransition() {

    let upcomingLevel = currentLevel

    Tween.to(GROUPS.gauges, { duration: 0.5, alpha: 0 })

    boltBar.width = 0

    swapTexture(iconCollectable, TEXTURES[currentLevel.icon])
    iconCollectable.y = -100


    puzzleIndex = 0
    scoreObject.puzzleScore = 0
    radialProgressBar.progressAngle = 0
    drawRadialProgress()

    if (upcomingLevel.type == "cave") {
      setSpriteSize(iconCollectable, iconCollectable.originalFrameVial.width * 1.5)
      iconCollectable.y = boltGauge.y - boltGauge.height
      gotoCaveTimeline.restart()
    } else {
      iconCollectable.width = iconCollectable.originalFrameVial.width
      iconCollectable.height = iconCollectable.originalFrameVial.height
      layer(applicationStates.cave)
      leaveCaveTimeline.restart()
    }

    app.stage.addChild(white)
  }


  function endGame() {
    layer(applicationStates.end)

    // Need some type of function to clear the screen of everything 

    if (currentLevel.type == "cave") {
      // Play the cave transition - true makes it fade out...probably don't need that. 
      caveTearDown(true)
    } else {
      // Tear down space level
    }

    app.stage.addChild(scoreText)
    scoreText.y = POINT_CAROUSEL_Y - SIZE_CAROUSEL_HEIGHT


    // Prepare Planet Carousel.
    planetCarousel.forEach((p, i) => {
      p.y = POINT_CAROUSEL_Y
      p.x = setup.width + MIN_DIM / 2 * i
      p.alpha = 0
      app.stage.addChild(p)
    })

    // Rebuild Timeline. 
    endOfGameTimeline.clear()
    buildEndOfGameTimeline()
    endOfGameTimeline.restart()
  }

  class PlanetSummary extends PIXI.Container {
    constructor(data) {
      super()
      const fontStyle = {
        fill: "#19d5ff",
        fontFamily: "Silkscreen",
        fontSize: SIZE_CAROUSEL_HEIGHT / 5
      };
      this.planet = data.planet
      this.backGround = new PIXI.Sprite(TEXTURES.rectangle_black_alpha)
      this.plants = data.plants + 1
      this.plasma = data.plasma
      this.seeds = data.seeds
      this.plantText = new PIXI.Text("four", fontStyle);
      this.plasmaText = new PIXI.Text(this.plasma, fontStyle);
      this.plasmaText.y = SIZE_CAROUSEL_HEIGHT / 5
      let id = "planet_" + data.planet
      this.planet = new PIXI.Sprite(TEXTURES[id])
      this.init()
    }

    draw() {
      this.plantText.text = this.plants + 1
      this.plasmaText.text = this.plasma + 1
    }

    init() {
      this.addChild(this.backGround)
      this.addChild(this.plantText)
      this.addChild(this.planet)
      this.addChild(this.plasmaText)
      this.draw()
    }

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
          } else if (currentLevel.shuffle == "half") {
            i % 3 == 0 ? sprite.rotation = Math.PI : sprite.rotation = 0
          }
          else {
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
          card.on("pointerdown", cardClicked);
          this.cards.push(card);
        }
      }
    }
  }

  function initializeGameData() {

    // Levels
    levelIndex = 0
    puzzleIndex = 0
    planetIndex = 0
    currentLevel = LEVELS[levelIndex % LEVELS.length]
    state.collectableTexture = TEXTURES[currentLevel.collectable]
    puzzlesForCurrentLevel = currentLevel.puzzles
    currentLevelLength = puzzlesForCurrentLevel.length;
    currentPuzzle = puzzlesForCurrentLevel[puzzleIndex % currentLevelLength];
    currentPuzzle.counter = currentLevel.counter

    // Scoring & Lives
    lives = TOTAL_LIVES
    scoreObject.totalScore = 0
    scoreObject.puzzleScore = 0
  }

  // Should probably define global layout params as S. 
  function updateLayoutParams() {

    let newPuzzle = currentPuzzle;
    newPuzzle.counter = currentLevel.counter
    collectable.texture = TEXTURES[currentLevel.collectable]

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
    initializeGameData()

    // TODO: Revisit how to ensure that the entire game state is reset. Whe is the level index?
    if (state.gameOver) {

      // Reset Game State
      state.gameOver = false

      // RESET UI 

      // Planet
      currentPlanet.alpha = 1
      let id = "planet_" + currentLevel.planet
      currentPlanet.texture = TEXTURES[id]

      // Collectables
      iconCollectable.texture = TEXTURES[currentLevel.icon]
      collectable.texture = TEXTURES[currentLevel.collectable]


      // Planet Carousel / Cards
      planetCarousel.forEach(p => {
        app.stage.removeChild(p)
        swapTexture(p, p.originalTexture)
      })

      shipOpal.x = shipOpal.originalFrame.x
      shipOpal.y = shipOpal.originalFrame.y
      shipOpal.alpha = 1
      scoreText.alpha = 0


      // progressCircles

      radialProgressBar.progressAngle = 0
      drawRadialProgress()
      drawProgressCircles()
      pool.loadPuzzle(currentPuzzle)
    }



    Tween.to(startButton, { duration: 1, y: -startButton.height });
    Tween.to(shipOpal, { duration: 2, alpha: 1, y: setup.height / 2, x: setup.width / 2 })
    launch()
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


        // GOTO_COLLECTABLE Setting 
        if (c.isOffCard == true) {
          collectable.x = _x + CARD_WIDTH / 2;
          collectable.y = _y + CARD_WIDTH / 2;
          collectable.alpha = 0
          collectable.rotation = 0
          collectable.width = collectable.originalSize.width
          collectable.height = collectable.originalSize.height
        }

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
      /* MOOOOOO - I"m incrementing the planet index here to make
       sure it doesn't get incremented when the game is over.
      */
      planetIndex++
      removeCaveStuff()
    }

    // GOTO_CAROUSEL Planet index incremented here insted of "arrived at next planet" 

    currentPlanet.width = setup.width / 1.5
    currentPlanet.height = currentPlanet.width / currentPlanet.aspectRatio
    currentPlanet.x = setup.width / 2
    currentPlanet.y = setup.height + currentPlanet.height / 6
    currentPlanet.alpha = 1



    backGround.texture = TEXTURES.background_opal


    // Layer the elements
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


  /// Goin
  function buildRadialProgressBarTimeline() {

    let lastOne = puzzleIndex + 1 == currentLevel.puzzles.length

    radialProgressBarTimeline.clear()

    let angleIncrement = 0

    // If it's a cave every increment is the same. 
    if (currentLevel.type == "cave") {
      angleIncrement = 2 * Math.PI / 3
    } else {
      // Otherwise it's mapped to the score. 
      angleIncrement = scoreObject.puzzleScore / 100 * Math.PI * 2
    }

    let to = radialProgressBar.progressAngle + angleIncrement
    let cap = 2 * Math.PI


    // Animation Timings (jenk)
    let tt = 1

    let dt1 = (cap - radialProgressBar.progressAngle) / (2 * Math.PI) * tt
    let dt2 = tt - dt1


    radialProgressBarTimeline.to(collectable, { x: iconCollectable.x + collectable.width / 2, y: iconCollectable.y + collectable.height / 2, duration: 0.5, ease: Expo.easeIn, onComplete: () => collectable.alpha = 0 })

    let leftovers = 0

    if (to > 0.99 * cap) {
      let remainder = to - cap
      leftovers = remainder
      radialProgressBarTimeline.to(radialProgressBar, { progressAngle: cap, duration: dt1, ease: Linear.easeNone, onUpdate: drawRadialProgress, onComplete: onRadialProgressFull })
      radialProgressBarTimeline.to(iconCollectable, { duration: 1, ease: "back.in(0.7)", x: shipOpal.x, y: shipOpal.y, onComplete: onIconDeposit })
      radialProgressBarTimeline.to(shipOpal, { width: shipOpal.originalFrame.width * 0.9, height: shipOpal.originalFrame.height * 1.1, duration: 0.1, ease: Linear.easeNone })
      radialProgressBarTimeline.to(shipOpal, { width: shipOpal.originalFrame.width, height: shipOpal.originalFrame.height , duration: 1, ease: "elastic" })
      radialProgressBarTimeline.to(radialProgressBar, { progressAngle: remainder, duration: dt2, ease: "elastic", onUpdate: drawRadialProgress },"<")
    } else {
      leftovers = to
      radialProgressBarTimeline.to(radialProgressBar, { progressAngle: to, duration: tt, ease: "bounce", onUpdate: drawRadialProgress })
    }

    if (lastOne) {
      if (currentLevel.type == "cave") {
        // Bean Remainder
      } else {
        radialProgressBarTimeline.to(iconCollectable, {height: iconCollectable.originalFrameVial.height*leftovers/(2*Math.PI), duration: 0.1})
        radialProgressBarTimeline.to(iconCollectable, { duration: 1, ease: "back.in(0.7)", x: shipOpal.x, y: shipOpal.y, onComplete: onIconDeposit },"<")
      }
     
    }
  }


  function buildLeaveCaveTimeline() {
    leaveCaveTimeline.to(shipOpal, { ease: Sine.easeOut, duration: 1, x: 3 / 4 * setup.width })
    leaveCaveTimeline.to(shipOpal, { duration: 2, y: 0 }, "<")
    leaveCaveTimeline.to(shipOpal, { duration: 2, width: 0, height: 0 }, "<")
    leaveCaveTimeline.to(white, { duration: 1, alpha: 1 })
    leaveCaveTimeline.call(caveTearDown)
    leaveCaveTimeline.to(white, { duration: 1, alpha: 0 })
    leaveCaveTimeline.to(shipOpal, { duration: 0, height: 1, width: 1, y: setup.height + shipOpal.height })
    leaveCaveTimeline.to(shipOpal, { duration: 1, width: shipOpal.originalFrame.width, height: shipOpal.originalFrame.height, y: setup.height / 2 - shipOpal.height / 2, x: MENU_MARGIN })
    leaveCaveTimeline.to(shipOpal, { ease: Expo.easeInOut, duration: 2, x: setup.width / 2, onComplete: launch }, "<")
  }


  function onArrivedAtNextPlanet() {
    Tween.to(GROUPS.gauges, { duration: 0.5, alpha: 1 })
    Tween.to(iconCollectable, { duration: 0.5, ease: "elastic", rotation: ICON_ROTATION, y: iconCollectable.originalFrameVial.y, x: iconCollectable.originalFrameVial.x, width: iconCollectable.originalFrameVial.width, height: iconCollectable.originalFrameVial.height, alpha: 1 })
    drawProgressCircles()
    dealCards(pool)
  }




  function buildEndOfGameTimeline() {

    scoreObject.levelScore = 0

    planetCarousel.forEach((p, i) => {
      if (i > planetIndex) {
        p.texture = TEXTURES.planet_mystery
      }
    })

    const onUpdate = () => {
      let tweenVal = scoreText.value / scoreObject.totalScore
      scoreText.text = Math.round(scoreText.value)
      scoreText.scale.x = tweenVal * tweenVal
      scoreText.scale.y = tweenVal * tweenVal
      scoreText.alpha = tweenVal * tweenVal
    }
    let toString = "-=" + (setup.width / 2 + MIN_DIM / 2 * (planetIndex))

    endOfGameTimeline.to([currentPlanet, iconLives, iconCollectable, startButton, boltBar, boltGauge, livesBar, livesGauge, white, radialProgressBar, gaugeRadial], { duration: 1, alpha: 0 })
    endOfGameTimeline.to(shipOpal, { duration: 1, y: POINT_CAROUSEL_Y + SIZE_CAROUSEL_HEIGHT*1.2, x: setup.width / 2, ease: Sine.easeInOut })
    endOfGameTimeline.to(planetCarousel, { alpha: 1, duration: 0.5, ease: Sine.easeInOut }, "<")
    endOfGameTimeline.to(scoreText, { value: scoreObject.totalScore, duration: 5, ease: Sine.easeInOut, onUpdate: onUpdate }, "<")
    endOfGameTimeline.to(planetCarousel, { duration: levelIndex, x: toString }, "<")
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
    flyToNextPlanetTimeline.to(shipOpal, { duration: 1, y: setup.height - shipOpal.height / 2 - MENU_MARGIN, x: MENU_MARGIN + shipOpal.width / 2 }, "-=1")
    flyToNextPlanetTimeline.call(onArrivedAtNextPlanet)
  }

  function onIconDeposit() {
    iconCollectable.x = iconCollectable.originalFrameVial.x
    iconCollectable.y = -iconCollectable.originalFrameVial.height
    Tween.to(iconCollectable, { duration: 1, y: iconCollectable.originalFrameVial.y, x: iconCollectable.originalFrameVial.x, alpha: 1 })
  }

  function onRadialProgressFull() {

    app.stage.addChild(shipOpal)

    radialProgressBar.progressAngle = 0
    drawRadialProgress()
    scoreObject.puzzleScore = 0
  }


  function drawProgressCircles() {

    let width = (currentLevel.puzzles.length - 1) * PROGRESS_CIRCLE_DIM * 2

    let t = generateRect(width + PROGRESS_CIRCLE_DIM * 4, PROGRESS_CIRCLE_DIM * 3, PROGRESS_CIRCLE_DIM * 1.5, null)
    progressCircleBackGround.texture = t
    progressCircleBackGround.x = setup.width / 2
    progressCircleBackGround.y = setup.height - MENU_MARGIN_VERTICAL
    app.stage.addChild(progressCircleBackGround)

    progressCircles.forEach((c, i) => {
      if (i < currentLevel.puzzles.length) {
        c.width = i == puzzleIndex ? PROGRESS_CIRCLE_DIM * 2 : PROGRESS_CIRCLE_DIM
        c.height = i == puzzleIndex ? PROGRESS_CIRCLE_DIM * 2 : PROGRESS_CIRCLE_DIM
        c.x = setup.width / 2 - width / 2 + 2 * c.width * i
        c.y = setup.height - MENU_MARGIN_VERTICAL
        app.stage.addChild(c)
      } else {
        app.stage.removeChild(c)
      }
    })

  }

  function drawRadialProgress(reset) {

    let start = 0
    let end = reset ? 0 : radialProgressBar.progressAngle
    radialProgressBar.clear();
    radialProgressBar.lineStyle(MENU_MARGIN / 2, BAR_COLORS[currentLevel.icon]);
    radialProgressBar.arc(0, 0, 2 * MENU_MARGIN, start, end); // cx, cy, radius, startAngle, endAngle/
  }

  function onArrivedAtCave() {
    reveal(applicationStates.cave)
    drawRadialProgress(true)
    drawProgressCircles()
    dealCards(pool)
    Tween.to(GROUPS.gauges, { duration: 0.5, alpha: 1 })
    Tween.to(iconCollectable, { duration: 0.5, rotation: 0, y: boltGauge.y - boltGauge.height / 4, x: boltGauge.x, alpha: 1 })
  }

  function animateCircles(i) {
    let m = (i - 1) % currentLevel.puzzles.length
    let n = i % currentLevel.puzzles.length
    let curr = progressCircles[m]
    let next = progressCircles[n]
    if (n == currentLevel.puzzles.length) {
      Tween.to([...progressCircles, progressCircleBackGround], { duration: 0.5, alpha: 0 })
    } else {
      Tween.to(curr, { duration: 0.5, ease: "elastic", width: PROGRESS_CIRCLE_DIM, height: PROGRESS_CIRCLE_DIM })
      Tween.to(next, { duration: 0.5, ease: "elastic", width: 2 * PROGRESS_CIRCLE_DIM, height: 2 * PROGRESS_CIRCLE_DIM })
    }
  }

  function buildGoToCaveTimeline() {
    gotoCaveTimeline.to(shipOpal, { duration: 4, width: 0, height: 0 })
    gotoCaveTimeline.to(shipOpal, { duration: 4, ease: "elastic", x: setup.width / 2, y: setup.height / 2 }, "<")
    gotoCaveTimeline.to(shipOpal, { duration: 0, ease: "elastic", x: 3 / 4 * setup.width, y: MENU_MARGIN * 4 })
    gotoCaveTimeline.to(currentPlanet, { duration: 3, ease: Sine.easeInOut, width: 4 * MIN_DIM, height: 4 * MIN_DIM / currentPlanet.aspectRatio, x: setup.width / 2, y: setup.height / 2, duration: 3 }, "-=3.5")
    gotoCaveTimeline.call(caveSetup)
    gotoCaveTimeline.to(white, { duration: 0.5, alpha: 1 }, "-=2")
    gotoCaveTimeline.to(currentPlanet, { duration: 1, alpha: 0 }, "<0.25")
    gotoCaveTimeline.to(white, { duration: 0.5, alpha: 0 })
    gotoCaveTimeline.to(shipOpal, { duration: 1.5, height: shipOpal.originalFrame.height, width: shipOpal.originalFrame.width, y: setup.height - shipOpal.height / 2 - MENU_MARGIN },)
    gotoCaveTimeline.to(shipOpal, { duration: 1.5, x: MENU_MARGIN + shipOpal.width / 2, ease: Sine.easeIn }, "<")
    gotoCaveTimeline.call(onArrivedAtCave)
  }

  function generateRect(w, h, r, id) {
    generatorGraphics.clear()
    generatorGraphics.beginFill(0x000000)
    generatorGraphics.alpha = 0.5
    generatorGraphics.drawRoundedRect(0, 0, w, h, r)
    generatorGraphics.endFill()
    let t = app.renderer.generateTexture(generatorGraphics)
    id && (TEXTURES[id] = t);
    return t
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
        value: 1,
      },
      circle_green: {
        texture: TEXTURES.counter_circle_green,
        value: 1,
      },
      square_pink: {
        texture: TEXTURES.counter_square_pink,
        value: 1,
      },
      stick_purple: {
        texture: TEXTURES.counter_stick_purple,
        value: 1,
      },
      diamond_blue: {
        texture: TEXTURES.counter_diamond_blue,
        value: 1,
      },
      oval_orange: {
        texture: TEXTURES.counter_oval_orange,
        value: 1,
      },
      stick_red: {
        texture: TEXTURES.counter_stick_red,
        value: 1,
      },
      triangle_yellow: {
        texture: TEXTURES.counter_triangle_yellow,
        value: 1,
      },
      half_circle_red: {
        texture: TEXTURES.counter_half_circle_red,
        value: 1,
      }
    };



    // Online called on game restart. 
    initializeGameData()




    // Define UI Elements 
    LEVELS.forEach((l, i) => {
      if (l.type != "cave") {
        let d = {
          plants: 0,
          seeds: 0,
          plasma: 0,
          score: 0,
          planet: l.planet,
        }
        SESSIONS.push(d)

        let id = "planet_" + l.planet
        let p = new PIXI.Sprite(TEXTURES[id])
        p.originalTexture = TEXTURES[id]
        p.anchor.set(0.5)
        p.aspectRatio = TEXTURES[id].width / TEXTURES[id].height
        p.width = SIZE_CAROUSEL_HEIGHT
        p.height = p.width / p.aspectRatio
        p.alpha = 0
        planetCarousel.push(p)
      }
    })

    scoreText = new PIXI.Text("0", {
      fill: "#19d5ff",
      fontFamily: "Silkscreen",
      fontSize: CARD_WIDTH / 2.5,
    });
    scoreText.x = setup.width / 2
    scoreText.y = setup.height / 4
    scoreText.anchor.set(0.5);
    scoreText.value = 0
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
    collectable.originalSize = { width: collectable.width, height: collectable.height }
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
    shipOpal.anchor.set(0.5)
    shipOpal.width = MIN_DIM / 5
    shipOpal.height = shipOpal.width / shipOpal.aspectRatio
    shipOpal.alpha = 1
    shipOpal.y = setup.height + shipOpal.height
    shipOpal.x = setup.width / 2
    shipOpal.originalFrame = { x: shipOpal.x, y: shipOpal.y, width: shipOpal.width, height: shipOpal.height }

    app.stage.addChild(shipOpal)

    // GOTO_GAUGES

    boltGauge = new PIXI.Sprite(TEXTURES.gauge_crystal_l1);
    boltGauge.aspectRatio = TEXTURES.gauge_crystal_l1.width / TEXTURES.gauge_crystal_l1.height
    boltGauge.anchor.y = 0.5
    boltGauge.width = CARD_WIDTH / 1.6;
    boltGauge.height = boltGauge.width / boltGauge.aspectRatio
    boltGauge.x = MENU_MARGIN_HORIZONTAL
    boltGauge.y = MENU_MARGIN_VERTICAL
    boltGauge.alpha = 0

    gaugeRadial = new PIXI.Sprite(TEXTURES.gauge_radial);
    gaugeRadial.aspectRatio = TEXTURES.gauge_radial.width / TEXTURES.gauge_radial.height
    gaugeRadial.anchor.set(0.5)
    gaugeRadial.width = 4 * (MENU_MARGIN - MENU_MARGIN / 3)
    gaugeRadial.height = 4 * (MENU_MARGIN - MENU_MARGIN / 3)
    gaugeRadial.x = MENU_MARGIN_HORIZONTAL
    gaugeRadial.y = MENU_MARGIN_VERTICAL
    gaugeRadial.alpha = 0
    app.stage.addChild(gaugeRadial)

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
    boltBar.width = 0
    boltBar.height = boltGauge.height * 0.5
    boltBar.x = MENU_MARGIN_HORIZONTAL + boltBar.height / 2
    boltBar.y = MENU_MARGIN_VERTICAL - boltBar.height / 6
    boltBar.alpha = 0

    livesBar = new PIXI.Sprite(TEXTURES.progress_bar_pink);
    livesBar.anchor.x = 1.05
    livesBar.anchor.y = 0.45
    livesBar.width = BOLT_BAR_WIDTH;
    livesBar.height = boltBar.height
    livesBar.x = setup.width - MENU_MARGIN - boltBar.height / 2
    livesBar.y = MENU_MARGIN + boltGauge.height / 2.5
    livesBar.texture = generateBarTexture("0xed0739")
    livesBar.alpha = 0

    iconCollectable = new PIXI.Sprite(TEXTURES[currentLevel.icon]);
    iconCollectable.aspectRatio = TEXTURES.bolt_pink.width / TEXTURES.bolt_pink.height
    iconCollectable.width = boltGauge.height
    iconCollectable.anchor.set(0.5)
    iconCollectable.rotation = ICON_ROTATION
    iconCollectable.height = iconCollectable.width / iconCollectable.aspectRatio
    iconCollectable.x = boltGauge.x
    iconCollectable.y = boltGauge.y
    iconCollectable.originalFrameVial = { x: iconCollectable.x, y: iconCollectable.y, width: iconCollectable.width, height: iconCollectable.height }
    iconCollectable.alpha = 0

    iconLives = new PIXI.Sprite(TEXTURES.heart_red);
    iconLives.anchor.x = 0.75
    iconLives.anchor.y = 0.35
    iconLives.aspectRatio = TEXTURES.heart_red.width / TEXTURES.heart_red.height
    iconLives.width = iconCollectable.width * 1.5
    iconLives.height = iconLives.width * iconLives.aspectRatio
    iconLives.originalFrame = { x: iconLives.x, y: iconLives.y, width: iconLives.width, height: iconLives.height }
    iconLives.x = livesGauge.x
    iconLives.y = livesGauge.y + livesGauge.height / 3
    iconLives.alpha = 0

    radialProgressBar = new PIXI.Graphics();
    radialProgressBar.position = { x: MENU_MARGIN_HORIZONTAL, y: MENU_MARGIN_VERTICAL }
    radialProgressBar.scale.set(0.55)
    radialProgressBar.rotation = -Math.PI / 2
    radialProgressBar.progressAngle = 0
    app.stage.addChild(radialProgressBar);



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

    // Create Progress Circles
    for (let i = 0; i < 12; i++) {
      let c = new PIXI.Sprite(TEXTURES.circle_white)
      c.anchor.set(0.5)
      progressCircles.push(c)
      app.stage.addChild(c)
    }

    // Create Progress Circle BackGround

    progressCircleBackGround = new PIXI.Sprite(TEXTURES.circle_white)
    progressCircleBackGround.anchor.x = 0.5
    progressCircleBackGround.anchor.y = 0.5
    drawProgressCircles()

    makeStars()
    state.starPosition.span = setup.height
    updateStars()

    pool = new CardPool(currentPuzzle);
    pool.loadPuzzle(currentPuzzle);

    // GOTO_TIMELINE Function Calls 
    buildGoToCaveTimeline()
    buildLeaveCaveTimeline()
    updateLayoutParams()



    LAYERS = {
      cave: [backGround, topLeftCaveBackground, collectable, ...blasts, gaugeRadial, radialProgressBar, iconCollectable, lava, bottomLeftCaveBackground, shipOpal, topRightCaveBackground, bottomRightCaveBackground, livesGauge, livesBar, iconLives],
      space: [backGround, ...stars, currentPlanet, ...blasts, livesGauge, livesBar, collectable, iconLives, shipOpal, startButton, gaugeRadial, radialProgressBar, iconCollectable],
      start: [backGround, ...stars, startButton, shipOpal],
      end: [backGround, ...stars,...planetCarousel, startButton, shipOpal, scoreText],
    }

    GROUPS = { caveElements: [lava, topLeftCaveBackground, bottomLeftCaveBackground, topRightCaveBackground, bottomRightCaveBackground], gauges: [boltGauge, livesGauge, boltBar, livesBar, iconLives, gaugeRadial, radialProgressBar, iconCollectable, ...progressCircles, progressCircleBackGround] }

    layer(applicationStates.start)

    generateRect(50, 100, 10, "rectangle_black_alpha")

    const levelDataArchetype = {
      planet: "foo",
      score: "bar",
      color: "blue",
      cores: 2.6,
      plants: 3,
      plasma: 3,
      seeds: 2,
    }

    let s = new PlanetSummary(levelDataArchetype)
    s.x = 100
    s.y = 100
    //app.stage.addChild(s)
  }

  function wait() {
    setTimeout(load, 2000)
  }

  PIXI.Loader.shared.onComplete.add(load)

};
