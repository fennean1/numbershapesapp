import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import Steps from "./Steps";
import Chat from "./Chat";
import { Divider } from "@mui/material";
import Container from "@mui/material/Container";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Slides from "./Slides";
import IconLink from "./IconLink";
import IconLinkList from "./IconLinkList";
import Subitizer from "./Interactives/Subitizer";
import { Routes, Route, useParams, useNavigate} from "react-router-dom";
import InteractiveSelect from "./InteractiveSelect";
import { INTERACTIVE_TYPES } from "./const";
import * as DB from "./db.js"

import BeachAccessIcon from "@mui/icons-material/BeachAccess";

/* Sections 

- Intro
- Steps
- Materials 
- Interactive
- Notes
- More Info

TODOS

- Remove createjs dependency
- "Switch" component for interactives (Interactive.TYPE)
-  

*/

export default function ActivityPage(props) {

  const {name} = useParams()
  console.log("item",name)

  const data = DB.prototype
  
  console.log("data",data)

  const iconlinks = data.LINKS.map(l=>{
    return (<IconLink {...l}/>)
  })

  return (
    <Container maxWidth="md" fixed>
      <Divider textAlign="center">
        <h2>Intro</h2>{" "}
      </Divider>
      <Divider textAlign="center">
        <h2>Slides</h2>{" "}
      </Divider>
      <div>
        <Slides className="carousel" />
      </div>
      <Divider textAlign="center">
        <h2>Quick Launch</h2>{" "}
      </Divider>
      <Steps />
      <Divider textAlign="center">
        <h2>Sample Talk</h2>{" "}
      </Divider>
      <Chat />
      <Divider textAlign="center">
        <h2>Links</h2>{" "}
      </Divider>
      <IconLinkList data = {data.LINKS}/>
      <InteractiveSelect type = {INTERACTIVE_TYPES.NUMBER_LINE} setup = {"interactivesetup"}/>


    </Container>
  );
}
