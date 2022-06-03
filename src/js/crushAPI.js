// Problem que setup
import * as PIXI from "pixi.js";
import Clouds from "../assets/Clouds.png";
import BlueBall from "../assets/PinkBall.png"

import {getRandomArray,getRandomInt} from "./api.js"
import { Tween } from "gsap/gsap-core";

const level = {
  grid: [2,2],
  value: 2,
  delta: 1,
  mesh: [2,2]
}

const level2 = {
  grid: [2,2],
  value: 3,
  delta: 2,
  mesh: [2,2]
}

const level3 = {
  grid: [2,2],
  value: 3,
  delta: 1,
  mesh: [3,3]
}

const level4 = {
  grid: [2,2],
  value: 3,
  delta: 2,
  mesh: [3,2]
}



const levels = [level,level2,level3,level4]

const mod = levels.length


let levelCounter = 0

export const init = (app, setup) => {

  let pool;

  let VIEW_WIDTH = setup.width
  let VIEW_HEIGHT = setup.height
  let MIN_DIM = Math.min(VIEW_WIDTH,VIEW_HEIGHT)

  let maxMeshDimension = Math.max(level.mesh[0],level.mesh[1])

  let gridUnitsWide = (maxMeshDimension+2)*level.grid[0]
  let gridUnitsHigh = (maxMeshDimension+2)*level.grid[1]
  let gridUnitsMax = Math.max(gridUnitsHigh,gridUnitsWide)


  let UNIT = MIN_DIM/gridUnitsMax
  let SPACE_BETWEEN_CARDS = UNIT/4
  let CARD_WIDTH = (maxMeshDimension+1)*UNIT
  let GRID_WIDTH = (CARD_WIDTH)*level.grid[0] + SPACE_BETWEEN_CARDS*(level.grid[0]-1)
  let GRID_HEIGHT = (CARD_WIDTH)*level.grid[1] + SPACE_BETWEEN_CARDS*(level.grid[1]-1)
  let delta = CARD_WIDTH+SPACE_BETWEEN_CARDS

  let originX = VIEW_WIDTH/2 - GRID_WIDTH/2
  let originY = VIEW_HEIGHT/2 - GRID_HEIGHT/2

  function newLevel(e){
    if (e.target.isOffCard == true){
    levelCounter++
    const newLevel = levels[levelCounter%mod]
    updateLayoutParams(setup.width,setup.height,newLevel)
    pool.loadLevel(newLevel)
    setTimeout(t=>{
      dealCards(pool)
    },500)
  }
  }

  class Card extends PIXI.Graphics {
    constructor(level){
      super()
      this.value = level.value
      this.balls = []
      this.dim = CARD_WIDTH
      this.mesh = level.mesh
      this.maxMeshDim = Math.max(this.mesh[0],this.mesh[1])
      this.unit = CARD_WIDTH/(this.maxMeshDim+1)
      this.init()
    }
  
    draw(width,mesh,value){
      this.dim = CARD_WIDTH
      this.mesh = mesh
      this.value = value
      this.maxMeshDim = Math.max(mesh[0],mesh[1])
      this.unit = CARD_WIDTH/(this.maxMeshDim+1)

      this.clear()
      this.beginFill(0xffffff);
      this.lineStyle(1,0xfc5195)
      this.drawRoundedRect(0,0,CARD_WIDTH,CARD_WIDTH,this.dim/10)
  

      let shapeHeight = this.mesh[0]*this.unit
      let shapeWidth = this.mesh[1]*this.unit
  
      let offsetY = CARD_WIDTH/2-shapeWidth/2
      let offsetX = CARD_WIDTH/2-shapeHeight/2
  
      this.balls.forEach(b=>{
        this.removeChild(b)
        b.width = this.unit
        b.height = this.unit
      })
  
      const array =  getRandomArray(this.mesh[0],this.mesh[1],value)
    
      array.forEach((c,i)=>{
        let sprite = this.balls[i]
        sprite.width = this.unit
        sprite.height = this.unit
        sprite.x = c[0]*this.unit + offsetX
        sprite.y = c[1]*this.unit + offsetY
        this.addChild(sprite)
      })
    }
  
  
    init(){
  
        for (let i=0;i<5;i++){
          for (let j=0;j<5;j++){
            let s = new PIXI.Sprite.from(BlueBall)
            this.balls.push(s)
            this.addChild(s)
          }
        }
  
        this.draw(this.dim,this.mesh,this.value)
    
    }
  }
  
  class CardPool {
    constructor(level){
      this.cards = []
      this.activeCards = []
      this.dim = CARD_WIDTH
      this.level = level
      this.init()
    }
  
    loadLevel(level){
  
      this.activeCards = []
  
      this.dim = CARD_WIDTH
      this.level = level
      this.cards.forEach(c=>{
        app.stage.removeChild(c)
        c.inPlay = false
      })
  
      let acc = 0 

      let r = getRandomInt(level.grid[0]*level.grid[1])
  
      for (let i=0;i<level.grid[0];i++){
        for (let j=0;j<level.grid[1];j++){
          let c = this.cards[acc]
          let potentialValue = level.value 
          if (acc == r){
            const randMod = getRandomInt(20)
            if (randMod%2==0){
              potentialValue = potentialValue - level.delta
            } else {
              potentialValue = potentialValue + level.delta
            }
            c.isOffCard = true
          }
          console.log("cardwidth",CARD_WIDTH)
          c.draw(CARD_WIDTH,level.mesh,potentialValue)
          c.y = -CARD_WIDTH
          c.x = originX + i%level.grid[0]*CARD_WIDTH
          c.inPlay = true
          c.i = i 
          c.j = j
          app.stage.addChild(c)
          this.activeCards.push(c)
          acc++
        }
      }
  
    }
  
  
    init(){
  
      for (let i = 0;i<5;i++){
        for (let j = 0;j<5;j++){
          let card = new Card(this.level)
          card.interactive = true
          card.on('pointerdown',(e)=>newLevel(e))
          this.cards.push(card)
        }
      }

      this.loadLevel(this.level)
    }
  }


  function backgroundPointerDown(){
    console.log("resettign texture")
  }

  /*

    - Navigate To Page
    - Page Loads
    - Landing Page for Game
    - Start Clicked
    - First Cards
    - Click - Incorrect: Reveal
    - Click - Correct: Success
    - Next Cards 


  */


  function updateLayoutParams(width,height,newLevel){
    VIEW_WIDTH = width
    VIEW_HEIGHT = height
    MIN_DIM = Math.min(VIEW_WIDTH,VIEW_HEIGHT)
  
    maxMeshDimension = Math.max(newLevel.mesh[0],newLevel.mesh[1])
  
    gridUnitsWide = (maxMeshDimension+2)*newLevel.grid[0]
    gridUnitsHigh = (maxMeshDimension+2)*newLevel.grid[1]
    gridUnitsMax = Math.max(gridUnitsHigh,gridUnitsWide)
  
    console.log("hello",newLevel.mesh[0],newLevel.mesh[1])
    console.log("cardwidth",CARD_WIDTH)

    UNIT = MIN_DIM/gridUnitsMax
    SPACE_BETWEEN_CARDS = UNIT/4
    CARD_WIDTH = (maxMeshDimension+1)*UNIT
    GRID_WIDTH = (CARD_WIDTH)*newLevel.grid[0] + SPACE_BETWEEN_CARDS*(newLevel.grid[0]-1)
    GRID_HEIGHT = (CARD_WIDTH)*newLevel.grid[1] + SPACE_BETWEEN_CARDS*(newLevel.grid[1]-1)
    delta = CARD_WIDTH+SPACE_BETWEEN_CARDS
  
    originX = VIEW_WIDTH/2 - GRID_WIDTH/2
    originY = VIEW_HEIGHT/2 - GRID_HEIGHT/2
  }

  function dealCards(pool){
    pool.cards.forEach(c=>{
      if (c.inPlay == true){
        let _x = originX + delta*c.i 
        let _y = originY + delta*c.j
        app.stage.addChild(c)
        Tween.to(c,{duration: 1,x: _x, y: _y,ease: "elastic"})
      } else {
        app.stage.removeChild(c)
      }
    })
  }

  function load(){

    let backGround = new PIXI.Sprite.from(Clouds)
    backGround.on('pointerdown',backgroundPointerDown)
    backGround.interactive = true
    backGround.x = 0;
    backGround.y = 0;
    backGround.width = setup.width;
    backGround.height = setup.height;
    app.stage.addChild(backGround);

 
    for (let i=0;i<2;i++){
      for (let j=0;j<2;j++){
        let t = new PIXI.Text("5",{fontSize: CARD_WIDTH/2})
        t.x = originX + delta*i + CARD_WIDTH/2
        t.y = originY + delta*j + CARD_WIDTH/2
        t.anchor.set(0.5)
        //app.stage.addChild(t)
      }
    }

    pool = new CardPool(level)

    setTimeout(t=>{
      dealCards(pool)
    },3000)

  }

  load();
};
