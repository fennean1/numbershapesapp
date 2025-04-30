import './App.css';
import * as React from "react";
import { Typography, Box } from "@mui/material";
import Steps from "./Steps";
import { Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Slides from "./Slides";
import IconLinkList from "./IconLinkList";
import { Link, useParams, useNavigate } from "react-router-dom";
import InteractiveSelect from "./InteractiveSelect";
import * as DB from "./db.js"
import { Button } from "@mui/material";
import Carousel from 'react-material-ui-carousel';

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

  const { activityname } = useParams()
  const data = DB[activityname]
  const slides = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    <Box sx={{ bgcolor: 'primary.main', width: '100%', height: '100%' }}>
      <Typography variant="h3">Custom Slide Content</Typography>
    </Box>,
  ];

  const interactivelink = "/interactives/" + data.INTERACTIVE.TYPE + "/" + data.ID

  return (
    <Container style={{ marginBottom: "10vh" }} maxWidth="md" fixed>
      <Typography style={{ margin: "auto", padding: "5%" }} component="div" color="primary" variant="h4">
        {data.HEADER.TITLE}
      </Typography>
      <Typography variant="body1" style={{ paddingLeft: "5%", paddingRight: "5%" }} >
        {data.INTRO.TEXT}
      </Typography>
      <Divider style={{ padding: 20 }} textAlign="center">
        QUICK LAUNCH
      </Divider>
      <Steps list={data.QUICK_START.STEPS} />
      <Divider style={{ padding: 20 }} textAlign="center">
        SLIDES
      </Divider>
      <Carousel
        slides={slides}
        autoPlay={true}
        interval={5000}
        showArrows={true}
        showIndicators={true}
        style={{ backgroundColor: "black", width: 500, height: 500 }}
      />
      {data.INTERACTIVE && (<div><Divider style={{ padding: 20 }} textAlign="center">
        INTERACTIVE
      </Divider>
        <div style={{ width: "100%", height: "55vw" }}>
          <InteractiveSelect type={data.INTERACTIVE.TYPE} />
        </div></div>)}
      <div className="center" >
        <Link target="_blank" style={{ color: 'inherit', textDecoration: 'inherit' }} to={interactivelink}>
          <Button style={{ width: "100px", display: 'flex' }} variant="contained">
            Open
          </Button>
        </Link>
      </div>

      <Divider style={{ padding: 20 }} textAlign="center">
        LINKS
      </Divider>
      <IconLinkList data={data.LINKS} />


    </Container>
  );
}
