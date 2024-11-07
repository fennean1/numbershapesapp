import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dialog } from "@mui/material";
import * as PIXI from "pixi.js"
import TextField from '@mui/material/TextField';



PIXI.settings.RESOLUTION = window.devicePixelRatio;
const app = new PIXI.Application(0, 0, {
  backgroundColor: 0xffffff,
  antialias: true,
});
app.renderer.backgroundColor = 0xffffff;
app.renderer.resolution = window.devicePixelRatio;
app.renderer.autoDensity = true;
PIXI.settings.scaleMode = PIXI.SCALE_MODES.NEAREST

export default function Interactive(props) {
  let elementRef;
  const { activityname } = useParams()
  const [open, setOpen] = React.useState(false);

  const openHighScoreModal = () => {
    console.log("open high score modal")
    setOpen(true)
  }

  useEffect(() => {


    const setup = {
      height: elementRef.clientHeight,
      width: elementRef.clientWidth,
      level: props.level,
      activityname: activityname,
      ...props.setup,
      openHighScoreModal: openHighScoreModal,
    };

    app.renderer.resize(
      elementRef.clientWidth,
      elementRef.clientHeight
    );

    elementRef.appendChild(app.view)
    props.script.init(app, setup)

    return () => { console.log("unmounting") }
  }, []);

  const fullScreenStyle = { height: window.innerHeight, width: "100vw" }
  const defaultStyle = { height: "100%", width: "100%" }
  const screenStyle = props.fullScreen ? fullScreenStyle : defaultStyle

  return (
    <div><Dialog open={open} onClose={() => setOpen(!open)}>  
    <p>new high score</p>      
    <TextField 
      id="standard-multiline-flexible"
      label=""
      placeholder="Are you enjoying numbershapes? Please let us know!"
      multiline
    
    /></Dialog>
      <div style={screenStyle}
        ref={(me) => {
          elementRef = me;
        }}
      />
    </div>
  );
}
