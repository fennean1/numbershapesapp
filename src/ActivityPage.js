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
      <Divider textAlign="center">
        <h2>Intro</h2>{" "}
      </Divider>
      <Typography>
        {data.INTRO.TEXT}
      </Typography>
      <Divider textAlign="center">
        <h2>Slides</h2>{" "}
      </Divider>
      <div>
        <Slides data = {data.SLIDES} className="carousel" />
      </div>
      <Divider textAlign="center">
        <h2>Quick Launch</h2>{" "}
      </Divider>
      <Steps />
      <Divider textAlign="center">
        <h2>Links</h2>{" "}
      </Divider>
      <IconLinkList data = {data.LINKS}/>
      <Divider textAlign="center">
        <h2>Interactive</h2>{" "}
      </Divider>
      <InteractiveSelect type = {data.INTERACTIVE.TYPE} setup = {data.INTERACTIVE.SETUP}/>


    </Container>
  );
}
