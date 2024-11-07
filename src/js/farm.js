import * as PIXI from "pixi.js";
// APIS
// Problem que setup
import {
  getRandomArray,
  getRandomInt,
  shuffleArray,
  getNRandomElementsFromArray,
  DraggableContainer,
} from "./api.js";
import { Timeline, Tween, Linear, Sine, Expo, Elastic } from "gsap/gsap-core";
import {
  counters,
  getStagesFromType,
  assessmentCardCustomCoordinates,
} from "./opallevels.js";
import { getWidthAndHeightOfNumberShape, NUMBER_SHAPES } from "./numbershapes.js";




export const init = (app, setup) => {


  const optionsExtraLargeAsset = { metadata: { resourceOptions: { width: setup.width * 2 } } }
  const optionsLargeAsset = { metadata: { resourceOptions: { width: setup.width } } }
  const optionsMediumAsset = { metadata: { resourceOptions: { width: setup.width / 2 } } }
  const optionsSmallAsset = { metadata: { resourceOptions: { width: setup.width / 8 } } }
  const optionsExtraSmallAsset = { metadata: { resourceOptions: { width: setup.width / 16 } } }

  const LOADER = PIXI.Loader.shared
  const TEXTURES = {}

  LOADER.onError.add((e => {
    console.log("error", e)
    window.alert("Oops! Something went wrong. Please Reload the page.")
  }))


  LOADER.add('ten_berries', "https://res.cloudinary.com/numbershapes/image/upload/v1731012087/CompressedBush_dtftiw.svg", optionsMediumAsset)
   

    LOADER.load((loader, resource) => {

      TEXTURES['ten_berries'] = resource.ten_berries.texture

    })


  function load() {

    console.log("app,setup",app,setup)
    let origin = {x: 100,y: 100}

    for (let i = 0;i<10;i++){
      let j = i%5
      let k = Math.floor(i/5)

      let newBerry = new PIXI.Sprite(TEXTURES.ten_berries)
      newBerry.x = origin.x +  j*25*Math.cos(Math.PI/5) - k*50
      newBerry.y = origin.y + k*50 + j*25*Math.sin(Math.PI/5)
      newBerry.width = 500
      newBerry.height = 500
      app.stage.addChild(newBerry)
    }

  }


  PIXI.Loader.shared.onComplete.add(load)
};
