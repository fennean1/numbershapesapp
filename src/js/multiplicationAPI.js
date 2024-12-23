// Problem que setup
import * as PIXI from "pixi.js";
import { getWidthAndHeightOfNumberShape,getWidthAndHeightOfCompositeNumberShape } from "./numbershapes.js";
import Clouds from "../assets/Clouds.png";
import BlueBall from "../assets/BlueBall.png";
import MoreAppsButton from "../assets/MoreAppsButton.png";
import Coin from "../assets/Coin.png";
import whiteCircle from "../assets/WhiteCircle.png";
import whiteTriangle from "../assets/WhiteTriangle.png";
import whitePentagon from "../assets/WhitePentagon.png";
import {Tween,Power4} from "gsap/gsap-core";

import { Selector } from "./api.js";

import Plus from "../assets/Plus.png";
import Minus from "../assets/Minus.png";

import SquarePlus from "../assets/SquarePlus.png";
import SquareMinus from "../assets/SquareMinus.png";

import { NUMBERSHAPES } from "./numbershapes.js";


const COMPOSITE_SHAPE_PADDING_FACTOR = { val: 2.5 };
const A_PF = COMPOSITE_SHAPE_PADDING_FACTOR;

export const init = (app, setup) => {
  let compositeShape;
  let selector;
  let CounterImage;

  // Const
  let CENTER_STAGE_X = setup.width / 2;
  let CENTER_STAGE_Y = setup.height / 2;
  const COIN = new PIXI.Texture.from(Coin);

  // Vars
  let dx =
    setup.width > setup.height
      ? Math.min(setup.height, setup.width) / 15
      : setup.width / 20;
  let balls = [];
  let equation = null;
  let showEquation = false;
  let potOfGoldIndex = 0;
  const ballSize = 0.8 * dx;

  app.stage.backGround = 0xffffff;

  const PINK_BALL_TEXTURE = new PIXI.Texture.from(BlueBall);
  const WHITE_CIRCLE_TEXTURE = new PIXI.Texture.from(whiteCircle);
  const WHITE_TRIANGLE_TEXTURE = new PIXI.Texture.from(whiteTriangle);
  const WHITE_PENTAGON_TEXTURE = new PIXI.Texture.from(whitePentagon);

  const circleBackGroundGraphics = new PIXI.Graphics();
  circleBackGroundGraphics.beginFill(0xf74a87);
  circleBackGroundGraphics.drawCircle(0, 0, ballSize * 20);
  const CIRCLE_BACKGROUND_TEXTURE = app.renderer.generateTexture(
    circleBackGroundGraphics
  );

  const SHAPE_TEXTURES = [
    WHITE_CIRCLE_TEXTURE,
    WHITE_PENTAGON_TEXTURE,
    WHITE_TRIANGLE_TEXTURE,
  ];

  let currentShapeTexture = PINK_BALL_TEXTURE;

  // Setup
  let backGround = new PIXI.Sprite.from(Clouds);
  backGround.x = 0;
  backGround.y = 0;
  backGround.width = setup.width;
  backGround.height = setup.height;
  app.stage.addChild(backGround);

  let questionButton = new PIXI.Sprite.from(Plus);
  questionButton.x = setup.width - 1.5 * dx;
  questionButton.y = dx / 3 + (2 * dx) / 2;
  questionButton.width = dx;
  questionButton.height = dx;
  questionButton.interactive = true;
  questionButton.on("pointerdown", () => {
    app.help();
  });
  //app.stage.addChild(questionButton)

  let moreAppsButton = new PIXI.Sprite.from(MoreAppsButton);
  moreAppsButton.x = setup.width - 1.5 * dx;
  moreAppsButton.y = dx / 4;
  moreAppsButton.width = dx;
  moreAppsButton.height = dx;
  moreAppsButton.interactive = true;
  moreAppsButton.on("pointerdown", () => {
    app.goToApps();
  });
  //app.stage.addChild(moreAppsButton)

  const BTN_MULTIPLIER = 2;

  let addShapeButton = new PIXI.Sprite.from(SquarePlus);
  addShapeButton.x = setup.width - dx * (BTN_MULTIPLIER + 1);
  addShapeButton.y = dx;
  addShapeButton.width = dx * BTN_MULTIPLIER;
  addShapeButton.height = dx * BTN_MULTIPLIER;
  addShapeButton.interactive = true;
  addShapeButton.on("pointerdown", () => {
    disableButtons();
    compositeShape.addShape(enableButtons);
  });
  app.stage.addChild(addShapeButton);

  let removeShapeButton = new PIXI.Sprite.from(SquareMinus);
  removeShapeButton.x =setup.width - dx * (BTN_MULTIPLIER + 1);
  removeShapeButton.y = dx + dx * (BTN_MULTIPLIER + 1);
  removeShapeButton.width = dx * BTN_MULTIPLIER;
  removeShapeButton.height = dx * BTN_MULTIPLIER;
  removeShapeButton.interactive = true;
  removeShapeButton.on("pointerdown", () => {
    disableButtons();
    console.log("pointerdown");
    compositeShape.removeShape(enableButtons);
  });
  app.stage.addChild(removeShapeButton);

  let addToEachButton = new PIXI.Sprite.from(Plus);
  addToEachButton.x = dx;
  addToEachButton.y = dx;
  addToEachButton.width = dx * BTN_MULTIPLIER;
  addToEachButton.height = dx * BTN_MULTIPLIER;
  addToEachButton.interactive = true;
  addToEachButton.on("pointerdown", () => {
    disableButtons();
    console.log("pointerdown");
    compositeShape.addOneToEach(enableButtons);
  });
  app.stage.addChild(addToEachButton);

  let removeFromEachButton = new PIXI.Sprite.from(Minus);
  removeFromEachButton.x = dx;
  removeFromEachButton.y = dx + dx * (BTN_MULTIPLIER + 1);
  removeFromEachButton.width = dx * BTN_MULTIPLIER;
  removeFromEachButton.height = dx * BTN_MULTIPLIER;
  removeFromEachButton.interactive = true;
  removeFromEachButton.on("pointerdown", () => {
    console.log("pointerdown");
    disableButtons();
    compositeShape.removeOneFromEach(enableButtons);
  });
  app.stage.addChild(removeFromEachButton);

  const enableButtons = () => {
    removeShapeButton.interactive = true;
    removeFromEachButton.interactive = true;
    addToEachButton.interactive = true;
    addShapeButton.interactive = true;
    console.log(
      "compositeShape.width,compositeshape.height",
      compositeShape.width,
      compositeShape.height
    );
  };

  const disableButtons = () => {
    removeShapeButton.interactive = false;
    removeFromEachButton.interactive = false;
    addToEachButton.interactive = false;
    addShapeButton.interactive = false;
  };



  function makeDraggable(dragMe) {
    dragMe.interactive = true;
    dragMe
      .on("pointerdown", onDragStart)
      .on("pointermove", onDragMove)
      .on("pointerup", onDragEnd)
      .on("pointerupoutside", onDragEnd);
  }

  class CompositeNumberShape extends PIXI.Container {
    constructor(values, texture) {
      super();
      this.shapes = [];
      this.values = values;
      this.numberOfShapes = values.length;

      this.interactive = true;

      values.forEach((v) => {
        let numbershape = new NumberShape(v, ballSize, currentShapeTexture);
        makeDraggable(numbershape);
        this.addChild(numbershape);
        this.shapes.push(numbershape);
      });

      this.organize(() => {});

    }

    addShape(callback) {
      if (this.values.length < 10) {
        let val = this.shapes[0].counters.length;

        this.values.push(val);
        this.numberOfShapes = this.values.length;
        let newShape = new NumberShape(val, ballSize, currentShapeTexture);
        makeDraggable(newShape);
        this.addChild(newShape);
        this.shapes.push(newShape);
      }
      this.organize(callback);
    }

    removeShape(callback) {
      if (this.shapes.length > 1) {
        let last = this.shapes.pop();
        this.values.pop();
        last.destroy();
        this.numberOfShapes = this.values.length;
      }
      this.organize(callback);
    }

    addOneToEach(callback) {
      this.values = this.values.map((v) => v + 1);
      this.shapes.forEach((s) => {
        s.addCounter();
      });
      this.organize(callback);
    }

    removeOneFromEach(callback) {
      if (this.shapes[0].value > 1) {
        this.values = this.values.map((v) => v - 1);
        this.shapes.forEach((s) => {
          s.removeCounter();
        });
      }
      this.organize(callback);
    }

    organize(callback) {
      let diagonals = this.shapes.map((s) => s.diagonal);
      // Max diagonal because the shapes could be made up of different shapes.
      let maxDiagonal = Math.max(...diagonals);
      
      let cords = NUMBERSHAPES[this.numberOfShapes](maxDiagonal / A_PF.val);
      let dims = getWidthAndHeightOfCompositeNumberShape(cords, maxDiagonal,maxDiagonal);

      this.shapes.forEach((ctr, i) => {
        Tween.to(ctr,{x: cords[i].x, y: cords[i].y,duration: 1,ease: Power4.easeInOut,onComplete: callback})
      });

      Tween.to(this,{x: setup.width / 2 - dims.width / 2,y: setup.height / 2 - dims.height / 2,duration: 1,ease: Power4.easeInOut})
    }
  }

  class NumberShape extends PIXI.Container {
    constructor(value, size, sprite) {
      super();
      const maxCords = NUMBERSHAPES[10](size / 2);
      this.maxDims = getWidthAndHeightOfNumberShape(maxCords, size);
      const w = this.maxDims.width;
      const h = this.maxDims.height;
      this.maxDiagonal = Math.sqrt(w * w + h * h);

      this.backGround = new PIXI.Sprite.from(CIRCLE_BACKGROUND_TEXTURE);

      this.counterSize = size;
      this.value = value;
      this.counters = [];
      this.cords = NUMBERSHAPES[value](size / 2);
      const offset = this.getOffset();

      this.cords.forEach((c) => {
        let counter = new PIXI.Sprite.from(sprite);
        counter.width = size;
        counter.height = size;
        counter.x = c.x + offset.x;
        counter.y = c.y + offset.y;
        this.counters.push(counter);
        this.addChild(counter);
      });
      this.diagonal = this.maxDiagonal;

      this.backGround.width = this.maxDiagonal;
      this.backGround.height = this.maxDiagonal;
      //this.addChild(this.backGround)
      this.counters.forEach((c) => {
        this.addChild(c);
      });
    }

    setXY(x, y) {
      this.x = x - this.width / 2;
      this.y = y - this.height / 2;
    }

    addCounter() {
      if (this.value < 10) {
        let newCounter = new PIXI.Sprite();
        newCounter.texture = currentShapeTexture;
        newCounter.width = this.counterSize;
        newCounter.height = this.counterSize;
        newCounter.x = 0;
        newCounter.y = 0;
        this.addChild(newCounter);
        this.value = this.value + 1;
        this.counters.push(newCounter);
        this.organize();
      }
    }
    removeCounter() {
      if (this.value > 1) {
        let last = this.counters.pop();
        last.destroy();
        this.value = this.value - 1;
        this.organize();
      }
    }

    getOffset() {
      const cords = NUMBERSHAPES[this.value](this.counterSize / 2);
      const dims = getWidthAndHeightOfNumberShape(cords, this.counterSize);
      const center = { x: dims.width / 2, y: dims.height / 2 };
      const centerMax = { x: this.maxDiagonal / 2, y: this.maxDiagonal / 2 };
      const offset = { x: centerMax.x - center.x, y: centerMax.y - center.y };
      return offset;
    }

    organize() {
      let cords = NUMBERSHAPES[this.value](this.counterSize / 2);
      const offset = this.getOffset();
      this.counters.forEach((ctr, i) => {
        Tween.to(ctr,{x: cords[i].x + offset.x, y: cords[i].y + offset.y,duration: 1,ease: Power4.easeInOut})
      });
    }
  }

  // Dragging functions
  function onDragStart(event) {
    let touchedAtX = event.data.getLocalPosition(this.parent).x;
    let touchedAtY = event.data.getLocalPosition(this.parent).y;
    this.deltaTouch = [this.x - touchedAtX, this.y - touchedAtY];
    // app.stage.addChild(this);
    this.data = event.data;
    this.dragging = true;

    if (this.isSplat) {
      let newAlpha = this.alpha == 1 ? 0.35 : 1;
      this.alpha = newAlpha;
    }
  }

  function onDragEnd() {
    this.data = null;
    this.dragging = false;
  }

  function onDragMove() {
    if (this.dragging) {
      let pointerPosition = this.data.getLocalPosition(this.parent);
      this.y = pointerPosition.y + this.deltaTouch[1];
      this.x = pointerPosition.x + this.deltaTouch[0];
    }
  }

  function init() {
    app.resizable = false;
    compositeShape = new CompositeNumberShape([5, 5, 5, 5, 5, 5, 5, 5]);
    app.stage.addChild(compositeShape);
    compositeShape.x = window.innerWidth / 2 - compositeShape.width / 2;
    compositeShape.y = window.innerHeight / 2 - compositeShape.height / 2;

    selector = new Selector(dx);
    selector.init([
      WHITE_CIRCLE_TEXTURE,
      WHITE_PENTAGON_TEXTURE,
      WHITE_TRIANGLE_TEXTURE,
    ]);
    selector.x = window.innerWidth / 2 - selector.width / 2;
    selector.y = dx;
    selector.onSwitch = () => {
      currentShapeTexture = SHAPE_TEXTURES[selector.index];
    };
    //app.stage.addChild(selector)
  }

  init();
};
