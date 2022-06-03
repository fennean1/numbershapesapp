import React, { useEffect } from "react";
import * as PIXI from "pixi.js";

export default function Interactive(props) {
  let elementRef;

  useEffect(() => {

    return () => {
      console.log("unmounting");
    };
  }, []);

  const fullScreenStyle = { height: "100vh", width: "100vw" };
  const defaultStyle = {width: "100%",backgroundColor: 'blue'};
  const screenStyle = props.fullScreen ? fullScreenStyle : defaultStyle;

  return (
    <svg
      viewBox = "0 0 512 512"
      style = {defaultStyle}
      ref={(me) => {
        elementRef = me;
      }}
    >
 <path d="M200,200 L200,0 a200,200 0 0,1 0,400 z"
/>
    </svg>
  );
}
