import * as React from "react";
import { Typography } from "@mui/material";
import Steps from "./Steps";
import Chat from "./Chat";
import { Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Slides from "./Slides";
import IconLink from "./IconLink";
import IconLinkList from "./IconLinkList";
import { Routes, Route, useParams, useNavigate} from "react-router-dom";
import InteractiveSelect from "./InteractiveSelect";
import { INTERACTIVE_TYPES } from "./const";
import * as DB from "./db.js"

/* Sections 

- Intro
- Steps
- Materials 
- Interactive
- Notes
- More Info

TODOS

- Remove createjs dependency

*/

export default function ActivityPage(props) {

  const {activityname} = useParams()
  const data = DB[activityname]

  return (
    <Container maxWidth="md" fixed>
       <Typography style = {{margin: "auto",padding: "5%"}} component="div" variant = "h4">
        {data.HEADER.TITLE}
      </Typography>
      <Typography style = {{paddingLeft: "5%", paddingRight: "5%"}} >
        {data.INTRO.TEXT}
      </Typography>
      <Divider style = {{padding: 20}} textAlign="center">
       SLIDES 
      </Divider>
        <Slides data = {data.SLIDES} className="carousel" />
      <Divider style = {{padding: 20}} textAlign="center">
        QUICK LAUNCH
      </Divider>
      <Steps list = {data.QUICK_START.STEPS}/>
      {data.INTERACTIVE && (<div><Divider style = {{padding: 20}} textAlign="center">
        INTERACTIVE
      </Divider>
      <div style = {{width: "100%", height: "55vw"}}>
        <InteractiveSelect type = {data.INTERACTIVE.TYPE}/>
      </div></div>)}
      <Divider style = {{padding: 20}} textAlign="center">
        LINKS
      </Divider>
      <IconLinkList data = {data.LINKS}/>
     

    </Container>
  );
}
