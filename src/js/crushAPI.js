// Problem que setup
import * as PIXI from "pixi.js";
import Clouds from "../assets/Clouds.png";
import BlueBall from "../assets/BlueBall.png"
import StartButton from "../assets/GoButton.png"
import Heart from "../assets/Heart.png"
import CrushHelp from "../assets/CrushHelp.png"

import {getRandomArray,getRandomInt} from "./api.js"
import { Timeline, Tween } from "gsap/gsap-core";
import * as l from "./crushlevels.js"


const levels = l.crushlevels


const mod = levels.length


let NUMBER_OF_LIVES = 9
let levelCounter = 0
let lifeCounter = NUMBER_OF_LIVES

const initLevel = {
  grid: [2,2],
  value: 3,
  delta: 2,
  mesh: [2,2]
}


export const init = (app, setup) => {


  let helping = false

  let pool;

  let startButton;
  let levelText;
  let helpButton;
  let endOfGameModal;
  let endOfGameText;
  let helpModal;
  let livesHeart;
  let livesText;

  const TEXT_COLOR = 0x1191fa
  const BORDER_COLOR = 0x1191fa

  let tlHeartBeat = new Timeline({paused: true})

  let isMobileDevice = setup.width/setup.height < 0.75 ? true : false

  let VIEW_WIDTH = setup.width
  let VIEW_HEIGHT = setup.height
  let MIN_DIM = Math.min(VIEW_WIDTH,VIEW_HEIGHT)

  let MARGIN_TOP = MIN_DIM*0.02

  let TOP_PADDING = isMobileDevice ? 0.10*setup.height : 0.05*setup.height

  let maxMeshDimension = Math.max(initLevel.mesh[0],initLevel.mesh[1])

  let gridUnitsWide = (maxMeshDimension+2)*initLevel.grid[0]
  let gridUnitsHigh = (maxMeshDimension+2)*initLevel.grid[1]
  let gridUnitsMax = Math.max(gridUnitsHigh,gridUnitsWide)

  let FONT_SIZE = isMobileDevice ? TOP_PADDING/3 : TOP_PADDING

  let UNIT = MIN_DIM/gridUnitsMax
  let SPACE_BETWEEN_CARDS = UNIT/4
  let CARD_WIDTH = (maxMeshDimension+1)*UNIT
  let GRID_WIDTH = (CARD_WIDTH)*initLevel.grid[0] + SPACE_BETWEEN_CARDS*(initLevel.grid[0]-1)
  let GRID_HEIGHT = (CARD_WIDTH)*initLevel.grid[1] + SPACE_BETWEEN_CARDS*(initLevel.grid[1]-1)
  let delta = CARD_WIDTH+SPACE_BETWEEN_CARDS

  let originX = VIEW_WIDTH/2 - GRID_WIDTH/2
  let originY = VIEW_HEIGHT/2 - GRID_HEIGHT/2

  function newLevel(e){
      if (e.target.isOffCard == true){
          levelCounter++
          updateLevelDescriptor()
          const newLevel = levels[levelCounter%mod]
          updateLayoutParams(setup.width,setup.height,newLevel)
          pool.loadLevel(newLevel)
          setTimeout(t=>{
            dealCards(pool)
          },500) 
      } else {
        const onComplete = ()=>{
          if (lifeCounter == 0){
            endGame()
          }
        }
        Tween.to(e.target,{onComplete: onComplete,rotation: 1,y: setup.height*2})
        lifeCounter--
        updateLives()
      }

  }

  function endGame(){

    Tween.to(endOfGameModal,{y: 0,duration: 2,ease: "elastic"})
    Tween.to(endOfGameText,{y: setup.height/2,duration: 2,ease: "elastic"})
    endOfGameText.text = "Level " + levelCounter
    app.stage.addChild(endOfGameModal)
    app.stage.addChild(endOfGameText)
  }

  function restartGame(){

    const onComplete = ()=>{
      app.stage.removeChild(endOfGameModal)
      dealCards(pool)
    }
    Tween.to(endOfGameModal,{duration: 1,y: 1.1*setup.height,onComplete: onComplete,ease: "elastic"})
    Tween.to(endOfGameText,{duration: 1,y: 1.1*setup.height,ease: "elastic"})
    levelCounter = 0
    lifeCounter = NUMBER_OF_LIVES
    
    livesText.text = lifeCounter
    updateLevelDescriptor()
    const newLevel = levels[levelCounter%mod]
    updateLayoutParams(setup.width,setup.height,newLevel)
    pool.loadLevel(newLevel)
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
      this.lineStyle(CARD_WIDTH/50,BORDER_COLOR)
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
        c.interactive = false
        c.inPlay = false
        c.rotation = 0
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
          c.draw(CARD_WIDTH,level.mesh,potentialValue)
          c.y = -1.1*CARD_WIDTH
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

    MARGIN_TOP = MIN_DIM*0.02

    TOP_PADDING = isMobileDevice ? 0.10*setup.height : 0.02*setup.height
  
    gridUnitsWide = (newLevel.mesh[0]+2)*newLevel.grid[0]
    gridUnitsHigh = (newLevel.mesh[1]+2)*newLevel.grid[1]
    gridUnitsMax = Math.max(gridUnitsHigh,gridUnitsWide)

    UNIT = isMobileDevice ? MIN_DIM/gridUnitsMax : (MIN_DIM-FONT_SIZE-MARGIN_TOP)/gridUnitsMax
    SPACE_BETWEEN_CARDS = MIN_DIM/50
    CARD_WIDTH = (maxMeshDimension+1)*UNIT
    GRID_WIDTH = (CARD_WIDTH)*newLevel.grid[0] + SPACE_BETWEEN_CARDS*(newLevel.grid[0]-1)
    GRID_HEIGHT = (CARD_WIDTH)*newLevel.grid[1] + SPACE_BETWEEN_CARDS*(newLevel.grid[1]-1)
    delta = CARD_WIDTH+SPACE_BETWEEN_CARDS
  
    originX = VIEW_WIDTH/2 - GRID_WIDTH/2
    originY = VIEW_HEIGHT/2 - GRID_HEIGHT/2
  }

  function startGame(){

    const startLevel = levels[levelCounter%mod]
    updateLayoutParams(setup.width,setup.height,startLevel)

    pool = new CardPool(levels[levelCounter%mod])


    const onComplete = ()=>{
      dealCards(pool)
    }

    Tween.to(livesText,{duration: 2,alpha: 1,ease: "elastic"})
    Tween.to(livesHeart,{duration: 2,alpha: 1,ease: "elastic"})
    Tween.to(levelText,{duration: 2,alpha: 1,ease: "elastic"})
    Tween.to(helpButton,{duration: 2,alpha: 1,ease: "elastic"})

    livesText.text = NUMBER_OF_LIVES
    helpButton.text = "?"

    Tween.to(this,{y:-this.height,onComplete: onComplete})
  }

  function dealCards(pool){
    pool.cards.forEach(c=>{
      c.interactive = true
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

  function updateLevelDescriptor(){
    const actualLevel = levelCounter+1
    levelText.text = "Level: " + actualLevel
  }

  function updateLives(){
    livesText.text = lifeCounter
    tlHeartBeat.restart() 
    tlHeartBeat.pause()
    tlHeartBeat.play()
  }

  function help(){
    app.stage.addChild(helpModal)

    const onHelp = ()=>{
      helping = true
    }

    const onHelpLeave = ()=>{
      helping = false
    }

    if (!helping){
      Tween.to(helpModal,{x: setup.width/2,y: setup.height/2,onComplete: onHelp})
    } else {
      Tween.to(helpModal,{x: 2*setup.width,onComplete: onHelpLeave})
    }


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


    livesText = new PIXI.Text("b",{fontWeight: "bold",fontFamily: "Quicksand",fontSize: FONT_SIZE})
    livesText.style.fill = TEXT_COLOR
    livesText.x =  MARGIN_TOP
    livesText.y = MARGIN_TOP
    app.stage.addChild(livesText)

    livesHeart = new PIXI.Sprite.from(Heart)
    livesHeart.width = FONT_SIZE
    livesHeart.height = FONT_SIZE
    livesHeart.anchor.set(0.5,0.45)
    app.stage.addChild(livesHeart)
    livesHeart.y = MARGIN_TOP+livesHeart.height/2
    livesHeart.x = livesText.x + livesText.width*2.2

    levelText = new PIXI.Text("Level: 1",{fontWeight: "bold",fontFamily: "Quicksand",fontSize: FONT_SIZE})
    levelText.anchor.x = 0.5
    levelText.style.fill = TEXT_COLOR
    levelText.x = setup.width/2
    levelText.y = MARGIN_TOP
    app.stage.addChild(levelText)

    let heartWidth = livesHeart.width


    tlHeartBeat.to(livesHeart,{width: heartWidth*0.5,height: heartWidth*1.1,duration: 0.25})
    tlHeartBeat.to(livesHeart,{width: heartWidth*1.1,height: heartWidth*0.5,duration: 0.25})
    tlHeartBeat.to(livesHeart,{width: heartWidth,height: heartWidth,duration: 0.5,ease: "elastic"})

    endOfGameModal = new PIXI.Graphics()
    endOfGameModal.beginFill(0xffffff)
    endOfGameModal.drawRoundedRect(0,0,setup.width,setup.height)
    endOfGameModal.y = setup.height*1.1
    endOfGameModal.interactive = true
    endOfGameModal.on('pointerdown',()=>restartGame())

    endOfGameText = new PIXI.Text("blank",{fontWeight: "bold",fontFamily: "Quicksand",fontSize: setup.height/10})
    endOfGameText.style.fill = TEXT_COLOR
    endOfGameText.y = setup.height
    endOfGameText.x = setup.width/2
    endOfGameText.anchor.set(0.5)

    helpModal = new PIXI.Sprite.from(CrushHelp)
    helpModal.width = MIN_DIM
    helpModal.height = MIN_DIM
    helpModal.anchor.set(0.5)
    helpModal.x = 2*setup.width
    helpModal.interactive = true
    helpModal.y = setup.height/2 
    helpModal.on('pointerdown',help)
    app.stage.addChild(helpModal)

    helpButton = new PIXI.Text("b",{fontWeight: "bold",fontFamily: "Quicksand",fontSize: FONT_SIZE})
    helpButton.style.fill = TEXT_COLOR
    helpButton.anchor.set(0)
    helpButton.interactive = true
    helpButton.x =  setup.width - 2*helpButton.width
    helpButton.y = MARGIN_TOP
    helpButton.on("pointerdown",help)
    app.stage.addChild(helpButton)
    
    levelText.alpha = 0
    livesHeart.alpha = 0
    livesText.alpha = 0
    helpButton.alpha = 0
 
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
