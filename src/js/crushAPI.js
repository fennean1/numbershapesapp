// Problem que setup
import * as PIXI from "pixi.js";
import { TweenMax } from "gsap";
import Clouds from "../assets/Clouds.png";
import BlueBall from "../assets/BlueBall.png";
import {getRandomArray,getRandomInt} from "./api.js"

export const init = (app, setup) => {

  const level = {
    grid: [4,4],
    value: 5,
    delta: 1,
    mesh: [3,3]
  }

  const MIN_DIM = Math.min(setup.width,setup.height)

  const maxMeshDimension = Math.max(level.mesh[0],level.mesh[1])

  const gridUnitsWide = (maxMeshDimension+2)*level.grid[0]
  const gridUnitsHigh = (maxMeshDimension+2)*level.grid[1]
  const gridUnitsMax = Math.max(gridUnitsHigh,gridUnitsWide)

  const UNIT = MIN_DIM/gridUnitsMax
  const CARD_WIDTH = (maxMeshDimension+1)*UNIT

  let DOT_TEXTURE;
  const CTX = new PIXI.Graphics()

  let off = getRandomInt(level.grid[0]*level.grid[1])
  let acc = 1

  function makeCardAt(x,y){

    let shapeHeight = level.mesh[0]*UNIT 
    let shapeWidth = level.mesh[1]*UNIT

    let offsetX = CARD_WIDTH/2-shapeWidth/2
    let offsetY = CARD_WIDTH/2-shapeHeight/2

    let card = new PIXI.Graphics();
    card.beginFill(0xFFFFFF);
    card.drawRoundedRect(0, 0,CARD_WIDTH,CARD_WIDTH,CARD_WIDTH/10);
    card.x = x 
    card.y = y
    app.stage.addChild(card)

    let array;

    if (off == acc) {

      let otherValue = level.value
      const boolInt = getRandomInt(10)

      if (boolInt%2== 0){
        otherValue = otherValue - level.delta
      } else {
        otherValue = otherValue + level.delta     
      }

      array =  getRandomArray(level.mesh[0],level.mesh[1],otherValue)
    } else {
      array =  getRandomArray(level.mesh[0],level.mesh[1],level.value)
    }

    array.forEach(c=>{
      let sprite = new PIXI.Sprite.from(BlueBall);
      sprite.width = UNIT
      sprite.height = UNIT
      sprite.x = c[0]*UNIT + x + offsetX
      sprite.y = c[1]*UNIT + y + offsetY
      app.stage.addChild(sprite)
    })
  }

  function backgroundPointerDown(){
    console.log("resettign texture")
  }

  function loadLevel(newLevel){

  }

  function load(){

    const delta = CARD_WIDTH+UNIT/4

    let backGround = new PIXI.Sprite.from(Clouds)
    backGround.on('pointerdown',backgroundPointerDown)
    backGround.interactive = true
    backGround.x = 0;
    backGround.y = 0;
    backGround.width = setup.width;
    backGround.height = setup.height;
    app.stage.addChild(backGround);

    for (let i = 0;i<level.grid[0];i++){
      for (let j = 0;j<level.grid[1];j++){
          makeCardAt(delta*i,delta*j)
          acc++
      }
    }
  }

  load();
};
