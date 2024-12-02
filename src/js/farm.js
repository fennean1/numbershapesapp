import * as PIXI from "pixi.js";
// APIS
// Problem que setup
import { Timeline, Tween, Linear, Sine, Expo, Elastic } from "gsap/gsap-core";
import Viewport from "pixi-viewport/src/viewport.js";
import {
  counters,
  getStagesFromType,
  assessmentCardCustomCoordinates,
} from "./opallevels.js";
import { getWidthAndHeightOfNumberShape, NUMBER_SHAPES } from "./numbershapes.js";
import {
  getRandomArray,
  getRandomInt,
  Draggable,
  shuffleArray,
  getNRandomElementsFromArray,
  SimpleDraggable
} from "./api.js";
import { Power } from "@mui/icons-material";




export const init = (app, setup) => {



  // UI Elements 
  let acre = new PIXI.Container();
  let berries = [];
  let combine;
  let viewport;

  // TImelines 

  let tl = new Timeline({paused: true})

  const optionsExtraLargeAsset = { metadata: { resourceOptions: { width: setup.width * 2 } } }
  const optionsLargeAsset = { metadata: { resourceOptions: { width: setup.width } } }
  const optionsMediumAsset = { metadata: { resourceOptions: { width: setup.width / 2 } } }
  const optionsSmallAsset = { metadata: { resourceOptions: { width: setup.width / 8 } } }
  const optionsExtraSmallAsset = { metadata: { resourceOptions: { width: setup.width / 100 } } }

  const LOADER = PIXI.Loader.shared
  const TEXTURES = {}

  LOADER.onError.add((e => {
    console.log("error", e)
    window.alert("Oops! Something went wrong. Please Reload the page.")
  }))


  LOADER.add('ten_berries', "https://res.cloudinary.com/numbershapes/image/upload/v1731012087/CompressedBush_dtftiw.svg", optionsMediumAsset)
  LOADER.add('combine_forward', "https://res.cloudinary.com/numbershapes/image/upload/v1731260903/Combine_ppy5kd.svg", optionsExtraLargeAsset)
   

    LOADER.load((loader, resource) => {

      TEXTURES['ten_berries'] = resource.ten_berries.texture
      TEXTURES['combine_forward'] = resource.combine_forward.texture

    })


  function threeToTwoDimensions(x,y,z,theta) {
     let angle = theta ? theta : Math.PI/6*0.95;
     let _x = - y*Math.cos(angle) + x*Math.cos(angle) - z;
     let _y = + y*Math.sin(angle) + x*Math.sin(angle);
     return {x: _x,y: y}
  }

  function pointerDown(e){
     console.log("pointerdown")

     let _x = e.data.global.x
     let _y = e.data.global.y

     acre.pivot.x = e.data.global.x
     acre.pivot.y = e.data.global.y

     //Tween.to(acre.scale,{x: 50,y: 50,duration: 6,ease: Linear.easeNone})
     Tween.to(acre.pivot,{x: _x,y: _y,duration: 6,ease: Linear.easeNone})
 }
  
  function setupPointerEvents(){
    app.stage.interactive = true
    acre.interactive = true
   app.stage.on('pointerdown',(e)=>{
    let _x =  e.data.global.x
    let _y =  e.data.global.y

    let zoom = 40;
    let scaleX = app.stage.scale.x
    let scaleY = app.stage.scale.y
    console.log(app.stage.pivot,"app.stage.pivot")
    tl.to(app.stage,{x: setup.width/2,y: setup.height/2,duration: 1.5,ease:  Linear.easeNone})
    tl.to(app.stage.pivot,{x: _x,y: _y,duration: 1.5,ease: Linear.easeNone},"<")
    tl.to(app.stage.scale,{x: zoom*scaleX,y: zoom*scaleY,duration: 4,ease: Expo.easeInOut},"<")
    tl.play()
   }) 




  }

  function load() {


    let ox = 0;
    let oy = 0;
    let w = 6;
    let angle = Math.PI/6;





    let combineAspectRatio = TEXTURES.combine_forward.width/TEXTURES.combine_forward.height
    let berryAspectRatio = TEXTURES.ten_berries.width/TEXTURES.ten_berries.height

    let count = 0


    for (let i = 0;i<100;i++){
      for (let j = 0;j<100;j++){

      let nudgeX = w/5 + 2*w/5*Math.floor(j/5) + w/5*Math.floor(j/10)
      let nudgeY = w/5 + w/2.5*Math.floor(i/2) + w/2*Math.floor(i/10)


      let y = i*w + nudgeY;
      let x = j*w*1.15 + nudgeX;

      count++

      let newBerry = new PIXI.Sprite(TEXTURES.ten_berries)  
      newBerry.x = ox - y*Math.cos(angle) + x*Math.cos(angle);
      newBerry.y = oy + y*Math.sin(angle) + x*Math.sin(angle);
      newBerry.anchor.set(1,0)
      newBerry.height = w
      newBerry.width = w*berryAspectRatio;
      acre.addChild(newBerry)
    }


    } 



   acre.pivot.y = acre.height/2

      

    acre.x = setup.width/2
    acre.y = setup.height/2
 
    //app.stage.pivot.x = setup.width/2
    //app.stage.pivot.y = setup.height/2

  
    

    app.stage.addChild(acre)
    
    

    setupPointerEvents()


  }

  PIXI.Loader.shared.onComplete.add(load)
}