// Problem que setup
import { gsap, Timeline, Tween, Elastic , Linear} from "gsap/gsap-core";
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

    for(let i=0;i<5;i++){
      circles.push(createCircle())
    }

    const cords = [{x: 300,y: 250},{x: 400,y: 150},{x: 200,y: 150},{x: 200,y: 350},{x: 400,y: 350},]

    circles.forEach((c,i)=>{
      console.log("c")
      gsap.set(c,{x: cords[i].x-50,y:cords[i].y})
      e.appendChild(c)
    })

    const onComplete = ()=>{
      //alarm.play();
    }

    circles.forEach(c=>{
      timeline.to(c.animator,{strokeDashoffset: 157,ease: Linear.easeNone,duration: 60,onComplete: onComplete})
    })

    setTimeout(()=>{
     // alarm.play();
     timeline.play()
    },2000)


  }  



  load();
};
