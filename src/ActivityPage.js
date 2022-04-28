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

import BeachAccessIcon from "@mui/icons-material/BeachAccess";

/* Sections 

- Intro
- Steps
- Materials 
- Interactive
- Notes
- More Info

*/

export default function ActivityPage() {
  return (
    <Container maxWidth = "md" fixed>
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
    </Container>
  );
}
