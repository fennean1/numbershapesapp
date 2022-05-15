import { Container, Typography } from "@mui/material";
import * as React from "react";
import AllGrades from "./AllGrades";

export default function LandingPage() {
  return (
    <Container>
      <img style = {{padding: "3%",display: "flex",width: "60%",height: "auto",margin: "auto"}}src= {require("./assets/NumberShapesBannerLogo.png")} />
      <AllGrades />
    </Container>
  );
}
