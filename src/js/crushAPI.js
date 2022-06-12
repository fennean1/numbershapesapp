// Problem que setup
import * as PIXI from "pixi.js";
import Clouds from "../assets/Clouds.png";
import BlueBall from "../assets/BlueBall.png"
import RedBall from "../assets/RedBall.png"
import GreenBall from "../assets/GreenBall.png"
import OrangeBall from "../assets/OrangeBall.png"
import PinkBall from "../assets/PinkBall.png"
import PurpleBall from "../assets/PurpleBall.png"

import NewBlueBall from "../assets/NewBlueBall.png"
import NewRedBall from "../assets/NewRedBall.png"
import NewGreenBall from "../assets/NewGreenBall.png"
import NewOrangeBall from "../assets/NewOrangeBall.png"
import NewYellowBall from "../assets/NewYellowBall.png"
import NewPurpleBall from "../assets/NewPurpleBall.png"
import NewDarkPurpleBall from "../assets/NewDarkPurpleBall.png"
import NewLightBlueBall from "../assets/NewLightBlueBall.png"
import NewPinkBall from "../assets/NewPinkBall.png"


import HalfBall from "../assets/HalfBall.png"
import RedSquare from "../assets/Square.png"
import Diamond from "../assets/Diamond.png"
import StartButton from "../assets/GoButton.png"
import Heart from "../assets/Heart.png"
import CrushHelp from "../assets/CrushHelp.png"

import {getRandomArray,getRandomInt, Draggable} from "./api.js"
import { Timeline, Tween,Elastic } from "gsap/gsap-core";
import * as l from "./crushlevels.js"
import {counters} from "./crushlevels.js"

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

  const potentialLevel = setup.level.substring(5)
  const prefix = setup.level.substring(0,5)
  let levelStartedAt = null
  
  if (prefix === "level"){
    let notNumber = isNaN(potentialLevel)
    if (!notNumber && potentialLevel > 0 && potentialLevel <= mod){
      levelCounter = potentialLevel-1
      levelStartedAt = levelCounter
    }
  } 

  // Flags
  let helping = false
  let learning = false

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

  const TEXT_COLOR = 0x1191fa

  let cardGraphics = new PIXI.Graphics()

  let tlHeartBeat = new Timeline({paused: true})

  let isMobileDevice = setup.width/setup.height < 0.75 ? true : false

  let NEW_CARD_WIDTH  = 40

  let VIEW_WIDTH = setup.width
  let VIEW_HEIGHT = setup.height
  let MIN_DIM = Math.min(VIEW_WIDTH,VIEW_HEIGHT)

  let MARGIN_TOP = MIN_DIM*0.02

  let TOP_PADDING = isMobileDevice ? 0.10*setup.height : 0.05*setup.height

  let CARD_TEXTURE;

  let maxMeshDimension = Math.max(initLevel.mesh[0],initLevel.mesh[1])

  let gridUnitsWide = (maxMeshDimension+2)*initLevel.grid[0]
  let gridUnitsHigh = (maxMeshDimension+2)*initLevel.grid[1]
  let gridUnitsMax = Math.max(gridUnitsHigh,gridUnitsWide)

  let FONT_SIZE = isMobileDevice ? TOP_PADDING/2 : TOP_PADDING

  let DEFAULT_COUNTER = "blue"  

  let UNIT = MIN_DIM/gridUnitsMax
  let SPACE_BETWEEN_CARDS = UNIT/4
  let CARD_WIDTH = (maxMeshDimension+1)*UNIT
  let GRID_WIDTH = (CARD_WIDTH)*initLevel.grid[0] + SPACE_BETWEEN_CARDS*(initLevel.grid[0]-1)
  let GRID_HEIGHT = (CARD_WIDTH)*initLevel.grid[1] + SPACE_BETWEEN_CARDS*(initLevel.grid[1]-1)
  let delta = CARD_WIDTH+SPACE_BETWEEN_CARDS


  let BLUE_COUNTER = new PIXI.Texture.from(BlueBall)
  let RED_COUNTER = new PIXI.Texture.from(RedBall)
  let GREEN_COUNTER = new PIXI.Texture.from(GreenBall)
  let PINK_COUNTER = new PIXI.Texture.from(PinkBall)
  let PURPLE_COUNTER = new PIXI.Texture.from(PurpleBall)
  let ORANGE_COUNTER = new PIXI.Texture.from(OrangeBall)
  let RED_SQUARE_COUNTER = new PIXI.Texture.from(RedSquare)
  let HALF_COUNTER = new PIXI.Texture.from(HalfBall)
  let DIAMOND_COUNTER = new PIXI.Texture.from(Diamond)


  let NEW_RED_COUNTER = new PIXI.Texture.from(NewRedBall)
  let NEW_PURPLE_COUNTER = new PIXI.Texture.from(NewPurpleBall)
  let NEW_ORANGE_COUNTER = new PIXI.Texture.from(NewOrangeBall)
  let NEW_LIGHT_BLUE_COUNTER = new PIXI.Texture.from(NewLightBlueBall)
  let NEW_YELLOW_COUNTER = new PIXI.Texture.from(NewYellowBall)
  let NEW_DARK_PURPLE_COUNTER = new PIXI.Texture.from(NewDarkPurpleBall)
  let NEW_GREEN_COUNTER = new PIXI.Texture.from(NewGreenBall)
  let NEW_BLUE_COUNTER = new PIXI.Texture.from(NewBlueBall)
  let NEW_PINK_COUNTER = new PIXI.Texture.from(NewPinkBall)  


  let RAINBOW = [NEW_YELLOW_COUNTER,NEW_LIGHT_BLUE_COUNTER,NEW_ORANGE_COUNTER,NEW_GREEN_COUNTER,NEW_BLUE_COUNTER,NEW_PINK_COUNTER,NEW_PURPLE_COUNTER,NEW_RED_COUNTER,NEW_DARK_PURPLE_COUNTER]

  let COUNTER_TEXTURE = BLUE_COUNTER
  let LINE_COLOR = 0x1191fa

  let LINE_COLORS = {darkpurple: 0x5940ff, lightblue:  0x70e0ff, pink: 0xff0593,yellow: 0xfced0f,blue: 0x1191fa,red:0xff4545,purple: 0xb407f2, orange: 0xff860d, green: 0x00c91e,rainbow: 0xff2465,square: 0x00b30f,diamond: 0xff2465}

  const C = {
    default: {
      texture: NEW_BLUE_COUNTER,
      stroke: LINE_COLORS.blue,
      value: 1,
    },
    square: {
      texture: RED_SQUARE_COUNTER,
      stroke: 0xfc2003,
      value: 1,
    },
    diamond: {
      texture: DIAMOND_COUNTER,
      stroke: 0x424242,
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
    }
  }


  let originX = VIEW_WIDTH/2 - GRID_WIDTH/2
  let originY = VIEW_HEIGHT/2 - GRID_HEIGHT/2

  function newLevel(e){



    if (!learning){

      if (e.target.isOffCard == true){

          levelCounter++
          updateLevelDescriptor()

          const newLevel = levels[levelCounter%mod]


          if (!newLevel.counter){
            newLevel.counter = DEFAULT_COUNTER
          } 

          console.log("potential points",updateScore(newLevel))

          backGround.interactive = false
  
          updateLayoutParams(setup.width,setup.height,newLevel)
          

          const onComplete = ()=>{
            pool.loadLevel(newLevel)
            dealCards(pool)
          }

          Tween.to(pool.activeCards,{alpha: 0,duration: 0.01,ease: "power4.in",onComplete: onComplete})

      } else {
        pool.activeCards.forEach(c=>c.interactive = false)
        backGround.interactive = false
        const onComplete = ()=>{
          pool.activeCards.forEach(c=>c.interactive = true)
          backGround.interactive = true
          if (lifeCounter == 0){
            endGame()
          }
        }
        Tween.to(e.target,{onComplete: onComplete,rotation: 1,y: setup.height*2})
        lifeCounter--
        updateLives()
      }
    } 
  }

  function endGame(){

    const onComplete = ()=>{
      endOfGameModal.interactive = true
    }


    // Interactivity
    endOfGameModal.interactive = false
    backGround.interactive = false
    pool.cards.forEach(c=>{c.interactive = false})

    Tween.to(endOfGameModal,{y: 0,duration: 2,ease: "elastic",onComplete: onComplete})
    Tween.to(endOfGameText,{y: setup.height/2,duration: 2,ease: "elastic"})

    if (levelStartedAt != null){
      let levels = levelCounter - levelStartedAt
      endOfGameText.text = levels + " Levels!" + "\n Complete"
    } else {
      let levels = levelCounter+1
      endOfGameText.text = "Level " + levels + "!"
    }
    
    
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


  class Card extends PIXI.Container {
    constructor(level){
      super()
      this.level = level
      this.value = level.value
      this.balls = []
      this.dim = CARD_WIDTH
      this.mesh = level.mesh
      this.maxMeshDim = Math.max(this.mesh[0],this.mesh[1])
      this.unit = CARD_WIDTH/(this.maxMeshDim+1)
      this.init()
    }
  
    draw(level,mesh,value){
      this.dim = CARD_WIDTH
      this.level = level
      this.mesh = mesh
      this.value = value
      this.maxMeshDim = Math.max(mesh[0],mesh[1])
      this.unit = UNIT

      if (!this.level.counter){
        this.level.counter = counters.default
      } 

      const c = C[this.level.counter]
      LINE_COLOR = c.stroke
      COUNTER_TEXTURE = c.texture
  
      this.apparentWidth = CARD_WIDTH
      this.apparentHeight = CARD_WIDTH
      
      this.bg.width = CARD_WIDTH
      this.bg.height = CARD_WIDTH

      this.bg.texture = CARD_TEXTURE

      let shapeHeight = this.mesh[0]*this.unit
      let shapeWidth = this.mesh[1]*this.unit
  
      let offsetY = CARD_WIDTH/2-shapeWidth/2
      let offsetX = CARD_WIDTH/2-shapeHeight/2

  
      this.balls.forEach(b=>{
        this.removeChild(b)
        b.texture = COUNTER_TEXTURE
        b.width = this.unit
        b.height = this.unit
      })
  
      const array =  getRandomArray(this.mesh[0],this.mesh[1],value)
    
      array.forEach((c,i)=>{
        let sprite = this.balls[i]

        if(this.level.counter == "rainbow"){
          sprite.texture = RAINBOW[i%9]  
        } else {
          sprite.texture = COUNTER_TEXTURE
        }
        
        sprite.width = this.unit
        sprite.height = this.unit
        sprite.x = c[0]*this.unit + offsetX
        sprite.y = c[1]*this.unit + offsetY
        this.addChild(sprite)
      })
    }
  
  
    init(){
  
        this.bg = new PIXI.Sprite.from(BlueBall)
        this.addChild(this.bg)

        for (let i=0;i<5;i++){
          for (let j=0;j<5;j++){
            let s = new Draggable()
            s.interactive = false
            this.balls.push(s)
            this.addChild(s)
          }
        }
  
        this.draw(this.level,this.mesh,this.value)
    
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
        c.alpha = 1
      })
  
      let acc = 0 

      let r = getRandomInt(level.grid[0]*level.grid[1])
  
      for (let i=0;i<level.grid[0];i++){
        for (let j=0;j<level.grid[1];j++){
          let c = this.cards[acc]

    
          let potentialValue = level.value 
          if (acc == r){
            const randMod = getRandomInt(20)

            if (!level.random){
              potentialValue = potentialValue + level.delta
            } else if (randMod%2==0){
              potentialValue = potentialValue - level.delta
            } else {
              potentialValue = potentialValue + level.delta
            }
            c.isOffCard = true
          }
          c.draw(level,level.mesh,potentialValue)

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
    }
  }


  function backgroundPointerDown(){
    console.log("backgrond pointer down")
    learning = !learning
    if (learning){
      this.alpha = 0.6
      app.renderer.backgroundColor = 0x000000
      pool.activeCards.forEach(c=>{c.balls.forEach(b=>{ 
        b.interactive = true
        b.wiggle()
      })})
    } else {
      this.alpha = 1
      pool.activeCards.forEach(c=>{c.balls.forEach(b=>b.interactive = false)})
    }
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

    // New Algo



    // Logic for laying out cards in different dimensions
    if (isMobileDevice){
      let tempM0 = newLevel.grid[0]
      let tempM1 = newLevel.grid[1]
      newLevel.grid = [tempM1,tempM0]
      NEW_CARD_WIDTH = 0.9*VIEW_WIDTH/newLevel.grid[0]
    } else {
      if (VIEW_HEIGHT<VIEW_WIDTH){
        NEW_CARD_WIDTH = 0.7*VIEW_HEIGHT/newLevel.grid[1]
      } else {
        NEW_CARD_WIDTH = 0.85*VIEW_WIDTH/newLevel.grid[0]
      }
    } 


    MIN_DIM = Math.min(VIEW_WIDTH,VIEW_HEIGHT)
  
    maxMeshDimension = Math.max(newLevel.mesh[0],newLevel.mesh[1])

    MARGIN_TOP = MIN_DIM*0.02

    TOP_PADDING = isMobileDevice ? 0.10*setup.height : 0.02*setup.height
  
    gridUnitsWide = (newLevel.mesh[0]+2)*newLevel.grid[0]
    gridUnitsHigh = (newLevel.mesh[1]+2)*newLevel.grid[1]
    gridUnitsMax = Math.max(gridUnitsHigh,gridUnitsWide)

    SPACE_BETWEEN_CARDS = MIN_DIM/50
    CARD_WIDTH = NEW_CARD_WIDTH
    UNIT = (CARD_WIDTH)/maxMeshDimension
    UNIT = (CARD_WIDTH-UNIT)/maxMeshDimension
    GRID_WIDTH = (CARD_WIDTH)*newLevel.grid[0] + SPACE_BETWEEN_CARDS*(newLevel.grid[0]-1)
    GRID_HEIGHT = (CARD_WIDTH)*newLevel.grid[1] + SPACE_BETWEEN_CARDS*(newLevel.grid[1]-1)
    delta = CARD_WIDTH+SPACE_BETWEEN_CARDS
  
    originX = VIEW_WIDTH/2 - GRID_WIDTH/2
    originY = VIEW_HEIGHT/2 - GRID_HEIGHT/2

    LINE_COLOR = C[newLevel.counter].stroke
       
    cardGraphics.clear()
    cardGraphics.beginFill(0xffffff);
    cardGraphics.lineStyle(CARD_WIDTH/50,LINE_COLOR)
    cardGraphics.drawRoundedRect(0,0,CARD_WIDTH,CARD_WIDTH,CARD_WIDTH/10)
    CARD_TEXTURE = app.renderer.generateTexture(cardGraphics)

  }

  function startGame(){


    const startLevel = levels[levelCounter%mod]

    updateLayoutParams(setup.width,setup.height,startLevel)

    pool.loadLevel(startLevel)

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
  
    updateLevelDescriptor()
  }

  function updateScore(lvl){
    const totalMesh = lvl.mesh[0]*lvl.mesh[1]
    const value = lvl.value
    const whiteSpaceDifficultyFactor = (totalMesh-value)/totalMesh

    const totalBalls = lvl.grid[0]*lvl.grid[1]*lvl.value 

    const ballCredit = totalBalls*whiteSpaceDifficultyFactor

    return Math.abs(ballCredit/lvl.delta)

  }

  function makeInteractive(){
    this._targets[0].interactive = true
  }

  function dealCards(pool){
    setTimeout(t=>{
      backGround.interactive = true
   },1000)
    pool.cards.forEach(c=>{
      if (c.inPlay == true){
        let _x = originX + delta*c.i 
        let _y = originY + delta*c.j
        app.stage.addChild(c)
        Tween.to(c,{duration: 1,x: _x, y: _y,ease: Elastic.easeOut.config(0.8, 0.3),callBackScope: this,onComplete: makeInteractive})
      
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

    pool = new CardPool(initLevel)

    backGround = new PIXI.Sprite.from(Clouds)
    backGround.on('pointerdown',backgroundPointerDown)
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
