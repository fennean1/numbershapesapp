// Problem que setup
import * as PIXI from "pixi.js";

const config = {
  NO_DRAGGING: {
    dragging: false
  },
  DRAGGING: {
    dragging: true
  }
}


function game(app,setup) {


  console.log("new Game")

  // BEGIN HEADER

  // Constants
  const C = {shapes: {diamond: 0,circle: 1, rectangle: 2},colors: {purple: 0x7a00de,pink: 0xff36c9,green: 0x28db00,blue: 0x195eff,yellow: 0xfff700,red:  0xff0044,orange: 0xffa200} }
 
  // Local Variables (specific to this session)
  const L = {colors: [0x7a00de,0xff36c9,0x28db00,0x195eff,0xfff700,0xff0044,0xffa200],cIndex: 0,frame: {width: setup.width,height: setup.height}}
  
  // State
  const S = {}
  
  // View
  const V = {}
  V.pen = new PIXI.Graphics()

  S.rectangles = []

  L.width = setup.width 
  L.height = setup.height 
  L.squareDim = Math.min(setup.width,setup.height)/15

  // END HEADER


  // BEGIN METHODS

  this.resize = (frame = L.frame)=>{
    // Update frame
    L.frame = frame

  }

  function loadTextures(){
  
  }

  // 

  function updateCurrentTexture(color,shape){

    if (shape == C.shapes.circle){
      V.previousTexture = V.currentTexture
      V.pen.clear()
      V.pen.beginFill(color)
      V.pen.drawCircle(0,0,300)
      V.currentTexture = app.renderer.generateTexture(V.pen)
    }

    V.pen.clear()
    V.pen.beginFill(0xffffff)
    V.pen.drawCircle(0,0,300)
    V.whiteTexture = app.renderer.generateTexture(V.pen)

  }

  function stagePointerDown(e){

    console.log("foop")

    this.touching = true
     let x = e.data.global.x
     let y = e.data.global.y
     this.startPoint = {x: x,y: y}
     this.endPoint = {}

     let J = Math.floor(x/L.squareDim)
     let I = Math.floor(y/L.squareDim)

     let r = S.rectangles[I][J]
  }

  function stagePointerMove(e){



    if (this.touching) {


    let x = e.data.global.x
    let y = e.data.global.y
    this.endPoint = {x: x,y: y}

    const d = L.squareDim

    let SJ = Math.floor(this.startPoint.x/d)
    let SI = Math.floor(this.startPoint.y/d)

    let EJ = Math.floor(this.endPoint.x/d)
    let EI = Math.floor(this.endPoint.y/d)

    let A = Math.min(SI,EI)
    let B = Math.max(SI,EI)
    let C = Math.min(SJ,EJ)
    let D = Math.max(SJ,EJ)
    
    for (let i = 0;i<30;i++) {
      for (let j = 0;j<30;j++) {
        let r = S.rectangles[i][j]
        if (i>A && i <B && j>C && j< D){
            r.texture = V.currentTexture
            r.active = true
        }  else {
          r.texture = V.whiteTexture
        }

        }
    }

  }

  }

  function stagePointerUp(e){
    if (this.touching) {
      L.cIndex = (L.cIndex+1)%L.colors.length
      updateCurrentTexture(L.colors[L.cIndex],C.shapes.circle)
    } 
    this.touching = false

  }

  // END METHODS

  this.destroy = ()=>{
    const k = Object.keys(V)
    k.forEach(k=>{k.destroy(true)})
  }

  this.init = ()=>{

    updateCurrentTexture(L.colors[L.cIndex],C.shapes.circle)

    let d = L.squareDim

    app.stage.on("pointerdown",stagePointerDown)
    app.stage.on("pointermove",stagePointerMove)
    app.stage.on("pointerup",stagePointerUp)
    app.stage.on("pointerupoutside",stagePointerUp)
    app.stage.interactive = true

    let row = []
    for (let i =0;i<30;i++){
      row = []
      for (let j = 0;j<30;j++){
        let g = new PIXI.Sprite()
        g.width = d
        g.height = d
        g.x = j*d
        g.y = i*d
        g.texture = null
        g.oldTexture = null
        g.active = false
        app.stage.addChild(g)
        row.push(g)
      }
      S.rectangles.push(row)

    }
    
  }

}

export const init = (app, setup) => {

  const G = new game(app,setup)

  G.init()
};
