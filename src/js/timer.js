// Problem que setup
import { gsap, Timeline, Tween, Elastic , Linear} from "gsap/gsap-core";
import * as NS from "./numbershapes.js"
export const init = (e, setup) => {


 const svgns = "http://www.w3.org/2000/svg";
  
function createCircle(){
  let g = document.createElementNS(svgns,"g")

  let b = document.createElementNS(svgns,"circle")
  b.setAttribute('r',50)
  b.setAttribute('fill',"tomato")
  b.setAttribute("fill-opacity",0.1)
  g.appendChild(b)

  let c = document.createElementNS(svgns,"circle")
  c.setAttribute("stroke","tomato")
  c.setAttribute("stroke-width",50)
  c.setAttribute("stroke-dashoffset",0)
  c.setAttribute("stroke-dasharray",157)
  c.setAttribute("fill-opacity",0)
  c.setAttribute('r', 25);
  g.appendChild(c)

  g.animator = c

  return g
}

  function load(){

    const timeline = new Timeline({paused: true})
    const circles = []

    for(let i=0;i<10;i++){
      circles.push(createCircle())
    }

    let minutes = 10



    const number = NS.NUMBERSHAPES[minutes](50)
    let initialDim = NS.getWidthAndHeightOfNumberShape(number,50)
    initialDim.width += 50
    initialDim.height += 50

    number.forEach((n,i)=>{
      let c = circles[i]
      gsap.set(c,{x: n.x+50-initialDim.width/2 + 250,y: n.y + 50-initialDim.height/2 + 250})
      e.appendChild(c)
    })


    function onComplete() {
      gsap.set(circles[minutes-1],{alpha: 0})
      minutes--
      let cords = NS.NUMBERSHAPES[minutes](50)
      let hw = NS.getWidthAndHeightOfNumberShape(cords,50)
      hw.width += 50
      hw.height+= 50
      cords.forEach((c,i)=>{
        Tween.to(circles[i],{x: c.x+50-hw.width/2 + 250,y: c.y+50-hw.height/2 + 250})
      })
    }


    number.forEach((n,i)=>{
      timeline.to(circles[minutes-1-i].animator,{strokeDashoffset: 157,ease: Linear.easeNone,onComplete: onComplete, duration: 60})
    })

    setTimeout(()=>{
     // alarm.play();
     timeline.play()
    },2000)


  }  



  load();
};
