import React, { useEffect } from "react";
import * as script from "./js/timer"


export default function Interactive(props) {
  let elementRef;

  useEffect(() => {

    script.init(elementRef)
    

    return () => {
      console.log("unmounting");
    };
  }, []);

  const fullScreenStyle = { height: "100vh", width: "100vw" };
  const defaultStyle = { width: "100%", backgroundColor: "blue" };

  return (
    <svg className = "clouds"
      ref={(me) => {
        elementRef = me;
      }}
      width="100%"
      viewBox="0 0 1280 720"
    >
    </svg>
  );
}
