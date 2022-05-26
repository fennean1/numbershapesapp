import './App.css';
import * as React from "react";
import { Typography } from "@mui/material";
import Steps from "./Steps";
import { Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Slides from "./Slides";
import IconLinkList from "./IconLinkList";
import { Link, useParams, useNavigate} from "react-router-dom";
import InteractiveSelect from "./InteractiveSelect";
import * as DB from "./db.js"
import { Button } from "@mui/material";

/* Sections 

Activities: 

- Match Game
- Multiplication

TODO: 

- Image for Subtraction Game
- Move to Cloudinary Links
- 

*/

export default function ActivityPage(props) {

  const {activityname} = useParams()
  const data = DB[activityname]
  const interactivelink = "/interactives/"+ data.INTERACTIVE.TYPE + "/" + data.ID

  return (
    <Container style = {{marginBottom: "10vh"}} maxWidth="md" fixed>
       <Typography style = {{margin: "auto",padding: "5%"}} component="div" color = "primary" variant = "h4">
        {data.HEADER.TITLE}
      </Typography>
      <Typography variant = "body1" style = {{paddingLeft: "5%", paddingRight: "5%"}} >
        {data.INTRO.TEXT}
      </Typography>
      <Divider  style = {{padding: 20}} textAlign="center">
        QUICK LAUNCH
      </Divider>
      <Steps list = {data.QUICK_START.STEPS}/>
      <Divider style = {{padding: 20}} textAlign="center">
       SLIDES 
      </Divider>
        <Slides data = {data.SLIDES} className="carousel" />
      {data.INTERACTIVE && (<div><Divider style = {{padding: 20}} textAlign="center">
        INTERACTIVE
      </Divider>
      <div style = {{width: "100%", height: "55vw"}}>
        <InteractiveSelect type = {data.INTERACTIVE.TYPE}/>
      </div></div>)}
      <div className = "center" >
        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to = {interactivelink}>
        <Button style = {{width: "100px", display: 'flex'}} variant="contained">
          Open
        </Button>
        </Link>
      </div>

      <Divider style = {{padding: 20}} textAlign="center">
        LINKS
      </Divider>
      <IconLinkList data = {data.LINKS}/>
     

    </Container>
  );
}
