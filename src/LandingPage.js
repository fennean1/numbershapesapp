import { Container, Typography } from "@mui/material";
import * as React from "react";
import AllGrades from "./AllGrades";
import { Divider } from "@mui/material";


export default function LandingPage() {
  return (
    <div className = "main">
      <img style = {{padding: "3%",display: "flex",width: "60%",height: "auto",margin: "auto"}}src= {require("./assets/NumberShapesBannerLogo.png")} />
      <AllGrades />
      <Divider style = {{margin: "5%"}}>CONTACT</Divider>
      <Typography  variant = "h6" >
        NumberShapes LLC
      </Typography>
      <Typography variant = "h7">
        andrewfenner@numbershapes.com
      </Typography>
    </div>
  );
}
