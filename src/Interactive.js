import React, {useEffect } from "react";
import * as PIXI from "pixi.js"


PIXI.settings.RESOLUTION = window.devicePixelRatio;
const app = new PIXI.Application(0, 0, {
  backgroundColor: 0xffffff,
  antialias: true,
});
app.renderer.backgroundColor = 0xffffff;
app.renderer.resolution = window.devicePixelRatio;
app.renderer.autoDensity = true;

export default function Interactive(props) {
  let elementRef;

  useEffect(() => {

    const setup = {
      height: elementRef.clientHeight,
      width: elementRef.clientWidth,
      ...props.setup
    };

    app.renderer.resize(
      elementRef.clientWidth,
      elementRef.clientHeight
    );

    props.script.init(app,setup)

    elementRef.appendChild(app.view)
    
  return ()=>{console.log("unmounting")}},[]);

  return (
    <div style = {{height: "100vh"}}
      ref={(me) => {
        elementRef = me;
      }}
    />
  );
}
