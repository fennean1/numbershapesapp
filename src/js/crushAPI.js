// Problem que setup
import * as PIXI from "pixi.js";
import Clouds from "../assets/Clouds.png";
import BlueBall from "../assets/PinkBall.png"
import StartButton from "../assets/GoButton.png"
import Heart from "../assets/Heart.png"

import {getRandomArray,getRandomInt} from "./api.js"
import { Timeline, Tween } from "gsap/gsap-core";
import * as l from "./crushlevels.js"

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



const levels = l.crushlevels

const mod = levels.length

let levelCounter = 1
let lifeCounter = 9

export const init = (app, setup) => {

  let pool;

  let startButton;
  let levelText;
  let endOfGameModal;
  let helpModal;
  let livesHeart;
  let livesText;

  let tlHeartBeat = new Timeline({paused: true})

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
  
  let heartScale;

  let originX = VIEW_WIDTH/2 - GRID_WIDTH/2
  let originY = VIEW_HEIGHT/2 - GRID_HEIGHT/2

  function newLevel(e){
      if (e.target.isOffCard == true){
        levelCounter++
          updateLevel()
          const newLevel = levels[levelCounter%mod]
          updateLayoutParams(setup.width,setup.height,newLevel)
          pool.loadLevel(newLevel)
          setTimeout(t=>{
            dealCards(pool)
          },500) 
      } else {
        lifeCounter--
        updateLives()
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
        c.isOffCard = false
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

    UNIT = MIN_DIM/gridUnitsMax
    SPACE_BETWEEN_CARDS = UNIT/4
    CARD_WIDTH = (maxMeshDimension+1)*UNIT
    GRID_WIDTH = (CARD_WIDTH)*newLevel.grid[0] + SPACE_BETWEEN_CARDS*(newLevel.grid[0]-1)
    GRID_HEIGHT = (CARD_WIDTH)*newLevel.grid[1] + SPACE_BETWEEN_CARDS*(newLevel.grid[1]-1)
    delta = CARD_WIDTH+SPACE_BETWEEN_CARDS
  
    originX = VIEW_WIDTH/2 - GRID_WIDTH/2
    originY = VIEW_HEIGHT/2 - GRID_HEIGHT/2
  }

  function startGame(){
    pool = new CardPool(level)

    const onComplete = ()=>{
      dealCards(pool)
    }

    Tween.to(livesText,{duration: 2,alpha: 1,ease: "elastic"})
    Tween.to(livesHeart,{duration: 2,alpha: 1,ease: "elastic"})
    Tween.to(levelText,{duration: 2,alpha: 1,ease: "elastic"})

    Tween.to(this,{y:-this.height,onComplete: onComplete})
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

  function updateLevel(){
    levelText.text = "Level: " + levelCounter
  }

  function updateLives(){
    livesText.text = lifeCounter
    tlHeartBeat.restart() 
    tlHeartBeat.pause()
    tlHeartBeat.play()
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

    startButton = new PIXI.Sprite.from(StartButton)
    startButton.anchor.set(0.5)
    startButton.interactive = true
    startButton.x = setup.width/2
    startButton.y = setup.height/2 
    startButton.width = CARD_WIDTH*1.5
    startButton.height = CARD_WIDTH*1.5
    startButton.on('pointerdown',startGame)
    app.stage.addChild(startButton)


    livesText = new PIXI.Text(lifeCounter,{fontSize: CARD_WIDTH/8})
    livesText.x =  0.02*setup.height
    livesText.y = 0.02*setup.height
    app.stage.addChild(livesText)

    livesHeart = new PIXI.Sprite.from(Heart)
    livesHeart.width = CARD_WIDTH/8
    livesHeart.height = CARD_WIDTH/8
    livesHeart.anchor.set(0.5,0.45)
    app.stage.addChild(livesHeart)
    livesHeart.y = 0.02*setup.height+livesHeart.height/2
    livesHeart.x = livesText.x + livesText.width*2.2

    levelText = new PIXI.Text("Level: 1",{fontSize: CARD_WIDTH/8})
    levelText.anchor.x = 0.5
    levelText.x = setup.width/2
    levelText.y = 0.02*setup.height
    app.stage.addChild(levelText)

    levelText.alpha = 0
    livesHeart.alpha = 0
    livesText.alpha = 0

    let heartWidth = livesHeart.width


    tlHeartBeat.to(livesHeart,{width: heartWidth*0.5,height: heartWidth*1.1,duration: 0.25})
    tlHeartBeat.to(livesHeart,{width: heartWidth*1.1,height: heartWidth*0.5,duration: 0.25})
    tlHeartBeat.to(livesHeart,{width: heartWidth,height: heartWidth,duration: 0.5,ease: "elastic"})
 
    for (let i=0;i<2;i++){
      for (let j=0;j<2;j++){
        let t = new PIXI.Text("5",{fontSize: CARD_WIDTH/2})
        t.x = originX + delta*i + CARD_WIDTH/2
        t.y = originY + delta*j + CARD_WIDTH/2
        t.anchor.set(0.5)
        //app.stage.addChild(t)
      }
    }
  }

  load();
};
