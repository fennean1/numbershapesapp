import * as PIXI from "pixi.js";
import { DraggableContainer, Draggable } from "./api.js";
import {Timeline, Tween, Linear, Circ, Sine, Expo, Elastic } from "gsap/gsap-core";

const LOADER = PIXI.Loader.shared
const TEXTURES = {}

let g = new PIXI.Graphics();

export const init = (app, setup) => {

  const optionsExtraLargeAsset = { metadata: { resourceOptions: { width: setup.width * 2 } } }
  const optionsLargeAsset = { metadata: { resourceOptions: { width: setup.width } } }

  const LOADER = PIXI.Loader.shared

  LOADER
    .add('ship_opal', "https://res.cloudinary.com/numbershapes/image/upload/v1714524232/Opal/ship_opal_kkmpji.png", optionsExtraLargeAsset)
    .add('tube',"https://res.cloudinary.com/numbershapes/image/upload/v1724067668/PlasmaCore/Tube_ps89rv.svg", optionsLargeAsset)
    .add('red_plasma', "https://res.cloudinary.com/numbershapes/image/upload/v1724066915/PlasmaCore/RedPlasma_bc4b8p.svg", optionsLargeAsset)
    .add('counter_test', "https://res.cloudinary.com/numbershapes/image/upload/v1718200733/Opal/swooper3_dbjzzm.png", optionsLargeAsset)
    .add('background', "https://res.cloudinary.com/numbershapes/image/upload/v1718302797/Opal/background_opal_vbwf4o_vvggfz.svg", optionsLargeAsset)

  LOADER.load((loader, resource) => {
    TEXTURES['ship_opal'] = resource.ship_opal.texture
    TEXTURES['counter_test'] = resource.counter_test.texture
    TEXTURES['red_plasma'] = resource.red_plasma.texture
    TEXTURES['tube'] = resource.tube.texture
  })

 function maskUpdate(w,h) {
  console.log("mask update")
  g.clear()
  g.drawRect(0, 0, g.animatedWidth,g.animatedHeight)
  g.y = 500-g.animatedHeight
 }

 
  
 function createApplication() {

  g.drawRect(0, 0, 75, 100);
  g.animatedWidth = 75
  g.animatedHeight = 0

  let tube = new PIXI.Sprite.from(TEXTURES.tube)
  tube.width = 75
  tube.height = 100
  tube.x = 0
  tube.y = 0
  app.stage.addChild(tube)
  

  let draggable = new Draggable(TEXTURES.red_plasma)
  draggable.width = 75
  draggable.height = 500
  draggable.mask = g
 // app.stage.addChild(draggable)



  Tween.to(g, 3, {animatedHeight: 500, ease: Linear.easeNone, onUpdate: maskUpdate })
 }

 LOADER.onComplete.add(createApplication)
}