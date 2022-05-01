import * as PIXI from "pixi.js";
import blueGradient from "../assets/Clouds.png";
import spaceGround from "../assets/SpaceGround.png";
import spaceShipWindow from "../assets/SpaceShipWindow.png";
import nightBackground from "../assets/NightBackground.png";
import pinkPin from "../assets/PinkPin.png";
import pinkIcon from "../assets/PinkSquareIcon.png";
import blueIcon from "../assets/BlueDiamondIcon.png";
import greenIcon from "../assets/GreenCircleIcon.png";
import orangeIcon from "../assets/OrangeTriangleIcon.png";

import {
  BLUE,
  RED,
  GREEN,
  ORANGE,
  PURPLE,
  PINK,
  NUMERAL,
  BALLS,
  BUTTONS,
} from "../AssetManager.js";
import * as CONST from "./config.js";
import {
  Fraction,
  Draggable,
  distance,
  FractionFrame,
  UltimateNumberLine,
  Selector
} from "./api.js";
import {
  TweenMax,
  TimelineLite,
  Power2,
  Elastic,
  CSSPlugin,
  TweenLite,
  TimelineMax,
  Power4,
} from "gsap";

export const init = (app, setup) => {
  let features;
  let viewPort = new PIXI.Container();
  let backGround;
  let homeButton;
  let ground;
  let ultimateNumberLine;
  let pins = [];
  let pinIndex = 0
  let selector;

  const NL_COLOR = 0x000000;
  const MOVER_DOT = new PIXI.Texture.from(CONST.ASSETS.MOVER_DOT);
  const SPACE_SHIP_WINDOW = new PIXI.Texture.from(spaceShipWindow);
  const PIN_TEXTURE_2 = new PIXI.Texture.from(CONST.ASSETS.BLUE_SPACE_SHIP);
  const PIN_TEXTURE = new PIXI.Texture.from(pinkPin);
  const BLUE_CIRCLE = new PIXI.Texture.from(CONST.ASSETS.STAR);
  const SHARP_PIN_TEXTURE = new PIXI.Texture.from(CONST.ASSETS.SHARP_PIN);
  const PINK_PIN_TEXTURE = new PIXI.Texture.from(CONST.ASSETS.PINK_SQUARE_PIN);
  const GREEN_PIN_TEXTURE = new PIXI.Texture.from(CONST.ASSETS.GREEN_CIRCLE_PIN);
  const ORANGE_PIN_TEXTURE = new PIXI.Texture.from(CONST.ASSETS.ORANGE_TRIANGLE_PIN);
  const BLUE_PIN_TEXTURE = new PIXI.Texture.from(CONST.ASSETS.BLUE_DIAMOND_PIN);
  const PIN_TEXTURES = [PINK_PIN_TEXTURE,BLUE_PIN_TEXTURE,GREEN_PIN_TEXTURE,ORANGE_PIN_TEXTURE]

  // Layout Parameters
  let WINDOW_WIDTH = setup.width;
  let WINDOW_HEIGHT = setup.height;
  let HOME_BUTTON_WIDTH = WINDOW_WIDTH / 15;
  let H_W_RATIO = setup.height / setup.width;
  let NUMBER_LINE_WIDTH = WINDOW_WIDTH;
  let NUMBER_LINE_Y = (5 / 8) * WINDOW_HEIGHT;
  let DRAGGER_Y = NUMBER_LINE_Y;

  backGround = new makeBackground();
  ground = new makeGround();

  let numberline;

  // Called on resize
  function resize(newFrame, flex) {
    // Make sure all layout parameters are up to date.
    updateLayoutParams(newFrame);
    app.renderer.resize(WINDOW_WIDTH, WINDOW_HEIGHT);
  }

  let sliderLine = new PIXI.Graphics();
  sliderLine.lineStyle(NUMBER_LINE_WIDTH / 300, 0xdbdbdb);
  sliderLine.lineTo(1.1 * NUMBER_LINE_WIDTH, 0);
  sliderLine.x = WINDOW_WIDTH / 2 - (1.1 * NUMBER_LINE_WIDTH) / 2;
  sliderLine.y = DRAGGER_Y;
  //app.stage.addChild(sliderLine);

  let dragger = new Draggable(PIN_TEXTURE);
  dragger.lockY = true;
  dragger.anchor.x = 0.5;
  dragger.interactive = true;
  dragger.val = 0;
  dragger.anchorPoint = dragger.x;
  dragger.y = WINDOW_HEIGHT - dragger.height;
  dragger.x = WINDOW_WIDTH / 2;

  let panRegionDown = new Draggable(SHARP_PIN_TEXTURE);
  panRegionDown.interactive = true;
  panRegionDown.lockY = true;
  panRegionDown.anchor.set(0.5, 0);
  panRegionDown.height = ground.sprite.height / 2;
  panRegionDown.width = ground.sprite.height / 2;
  panRegionDown.x = WINDOW_WIDTH / 2;
  panRegionDown.anchorPoint = panRegionDown.x;
  panRegionDown.y = 1.1 * NUMBER_LINE_Y;
  //app.stage.addChild(draggerMin);



  dragger.on("pointermove", draggerPointerMove);
  dragger.on("pointerdown", draggerPointerDown);
  dragger.on("pointerup", draggerPointerUp);
  dragger.on("pointerupoutside", draggerPointerUp);

  backGround.sprite.on("pointermove", panRegionDownPointerMove);
  backGround.sprite.on("pointerdown", panRegionDownPointerDown);
  backGround.sprite.on("pointerup", panRegionDownPointerUp);
  backGround.sprite.on("pointerupoutside", panRegionDownPointerUp);

  function dropPin(x) {
    let pinTexture = PIN_TEXTURES[pinIndex]
    let newPin = new Draggable(pinTexture)
    newPin.on("pointerup", pinPointerUp);
    newPin.on("pointerupoutside", pinPointerUp);
    newPin.anchor.x = 0.5;
    newPin.width = WINDOW_WIDTH / 20;
    newPin.height = newPin.width * 3.2;
    newPin.x = x
    newPin.value = ultimateNumberLine.getNumberLineFloatValueFromPosition(x)
    /*p.value
    let roundedX = ultimateNumberLine.roundPositionToNearestTick(x);
        newPin.x = roundedX;
    newPin.value = ultimateNumberLine.getNumberLineFloatValueFromPosition(
      roundedX

          */

    let targetY = ultimateNumberLine.y - newPin.height;
    newPin.originalY = targetY;
    pins.push(newPin);

    TweenLite.to(newPin, { duration: 1, y: targetY, ease: "bounce" });
    app.stage.addChild(newPin);
  }

  function pinPointerUp() {
    if (this.y <= 0.2 * ultimateNumberLine.y) {
      const onComplete = () => {
        app.stage.removeChild(this);
      };
      TweenLite.to(this, { y: -this.height, onComplete: onComplete });
    } else {
      let _x = ultimateNumberLine.roundPositionToNearestTick(this.x);
      this.value = ultimateNumberLine.getNumberLineFloatValueFromPosition(_x);
      TweenLite.to(this, {
        duration: 1,
        x: _x,
        y: this.originalY,
        ease: "bounce",
      });
    }
  }

  function panRegionDownPointerDown(e) {
    this.touching = true;
    this.anchorPoint = e.data.global.x;
    this.initialNumberlineMin = ultimateNumberLine.minFloat;
    this.initialNumberlineMax = ultimateNumberLine.maxFloat;
  }

  function panRegionDownPointerMove(e) {
    if (this.touching) {
      let x = e.data.global.x;
      let x1 = ultimateNumberLine.getNumberLineFloatValueFromPosition(x);
      let x2 = ultimateNumberLine.getNumberLineFloatValueFromPosition(
        this.anchorPoint
      );
      let delta = x2 - x1;
      let _min = this.initialNumberlineMin + delta;
      let _max = this.initialNumberlineMax + delta;
      ultimateNumberLine.draw(_min, _max);

      pins.forEach((p) => {
        p.x = ultimateNumberLine.getNumberLinePositionFromFloatValue(p.value);
      });

      dragger.x = ultimateNumberLine.getNumberLinePositionFromFloatValue(dragger.val)

      if (dragger.x < 0) {
        dragger.x = 0
        dragger.val = ultimateNumberLine.getNumberLineFloatValueFromPosition(0)
      } else if (dragger.x > WINDOW_WIDTH) {
        dragger.x = WINDOW_WIDTH
        dragger.val = ultimateNumberLine.getNumberLineFloatValueFromPosition(WINDOW_WIDTH)
      }
    }
  }

  function panRegionDownPointerUp(e) {
    this.touching = false;

    if (dragger.x <= 0) {
      dragger.x = ultimateNumberLine.roundPositionUpToNearestTick(0)
      dragger.val = ultimateNumberLine.getNumberLineFloatValueFromPosition(dragger.x)
    } else if (dragger.x >= WINDOW_WIDTH) {
      dragger.x = ultimateNumberLine.roundPositionDownToNearestTick(WINDOW_WIDTH)
      dragger.val = ultimateNumberLine.getNumberLineFloatValueFromPosition(dragger.x)
    } else {
      dragger.x = ultimateNumberLine.getNumberLinePositionFromFloatValue(dragger.val)
    }
  
    ultimateNumberLine.flexPoint = dragger.val
  }

  // D_POINTER_MOVE
  function draggerPointerMove() {}

  function draggerPointerDown() {}

  function draggerPointerUp(e) {
    let roundedX = ultimateNumberLine.roundPositionToNearestTick(this.x);
    ultimateNumberLine.flexPoint = ultimateNumberLine.getNumberLineFloatValueFromPosition(
      roundedX
    );
    this.val = ultimateNumberLine.getNumberLineFloatValueFromPosition(roundedX);
    this.x = roundedX;
  }

  // Constructors
  function makeBackground() {
    // Setup Background
    let backGroundGraphics = new PIXI.Graphics();
    backGroundGraphics.beginFill(0xffffff);
    backGroundGraphics.drawRoundedRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    this.sprite = new PIXI.Sprite.from(blueGradient)
    this.sprite.width = WINDOW_WIDTH;
    this.sprite.height = WINDOW_HEIGHT;
    this.sprite.x = 0;
    this.sprite.y = 0;
    this.sprite.interactive = true;

    app.stage.addChild(this.sprite);

    this.draw = () => {
      this.sprite.width = WINDOW_WIDTH;
      this.sprite.height = WINDOW_HEIGHT;
    };
  }

  // Constructors
  function makeGround() {
    // Setup Background
    this.sprite = new PIXI.Sprite.from(spaceGround);
    this.sprite.width = WINDOW_WIDTH;
    this.sprite.height = WINDOW_HEIGHT / 4;
    this.sprite.x = 0;
    this.sprite.y = WINDOW_HEIGHT - this.sprite.height;
    this.sprite.interactive = true;

    //app.stage.addChild(this.sprite);

    this.draw = () => {
      this.sprite.width = WINDOW_WIDTH;
      this.sprite.height = WINDOW_HEIGHT;
    };
  }

  function updateLayoutParams(newFrame) {
    let frame;
    if (newFrame) {
      frame = newFrame;
    } else {
      frame = { width: WINDOW_WIDTH, height: WINDOW_HEIGHT };
    }
  }
  
  // Numberline A
  function numberlinePointerDown(e) {
    this.moved = false;
    this.touching = true;
  }

  function numberlinePointerMove(e) {
    if (this.touching) {
      this.moved = true;
    
      pins.forEach((p) => {
        p.x = ultimateNumberLine.getNumberLinePositionFromFloatValue(p.value);
      });

    }
  }

  function numberlinePointerUp(e) {
    let x = e.data.getLocalPosition(this).x;
    if (!this.moved) {
      dropPin(x);
    }
  }


  // Loading Script
  function load() {
    /*
    if (setup.props.features) {
      //features = setup.props.features;
    }
    */

    app.stage.interactive = true;

    ultimateNumberLine = new UltimateNumberLine(
      -22,
      22,
      NUMBER_LINE_WIDTH,
      app
    );
    ultimateNumberLine.setBoundaries(-100000, 100000, 0.005);
    ultimateNumberLine.x = 0;
    ultimateNumberLine.y = NUMBER_LINE_Y;
    app.stage.addChild(ultimateNumberLine);
    ultimateNumberLine.hitArea = new PIXI.Rectangle(
      0,
      0,
      WINDOW_WIDTH,
      ultimateNumberLine.height*1.5
    );
    ultimateNumberLine.on("pointerdown", numberlinePointerDown);
    ultimateNumberLine.on("pointermove", numberlinePointerMove);
    ultimateNumberLine.on("pointerup", numberlinePointerUp);

    homeButton = new PIXI.Sprite.from(BUTTONS.HOME);
    homeButton.width = HOME_BUTTON_WIDTH;
    homeButton.height = HOME_BUTTON_WIDTH;
    homeButton.x = HOME_BUTTON_WIDTH / 4;
    homeButton.y = HOME_BUTTON_WIDTH / 4;
    homeButton.interactive = true;
    homeButton.on("pointerdown", () => app.goHome());
    app.stage.addChild(homeButton);

    app.stage.addChild(ultimateNumberLine);

    // FEATURES
    /*
    if (features.spaceShips) {
      app.stage.addChild(dragger);
      //app.stage.addChild(draggerMin)
      //app.stage.addChild(windowButton)
    }
    

    // FEATURES
    if (features.spaceBubbles) {
      numberline.nestMe = true;
      // Not multicolored
      numberline.setColorState(false);
    }
    */

    //app.stage.addChild(panRegionDown)

    dragger.height = WINDOW_HEIGHT - NUMBER_LINE_Y - ultimateNumberLine.height;
    dragger.width = dragger.height * 0.31;
    dragger.y = NUMBER_LINE_Y + ultimateNumberLine.height;
    dragger.x = WINDOW_WIDTH / 2;


    selector = new Selector(WINDOW_HEIGHT/15)
    selector.init([pinkIcon,blueIcon,greenIcon,orangeIcon])
    selector.x = WINDOW_WIDTH/2 - selector.width/2
    selector.y = selector.height
    selector.onSwitch = i => {
      pinIndex = i
    }

    app.stage.addChild(selector)

  }

  // Call load script
  load();
  // Not sure where else to put this.
  app.resize = (frame) => resize(frame);
  // app.resizable = true
};
