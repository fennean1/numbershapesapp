import * as React from "react";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from '@mui/icons-material/AccessTime';


import { List, ListItem } from "@mui/material";
import Button from '@mui/material/Button';
import Chat from "./Chat.js";

import { Routes, Route, useParams, useNavigate} from "react-router-dom";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ActivityCard(props) {
  // CONTROLLER / HOOKS

  const [open, setDialogOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const navigateTo = useNavigate()

  const handleExpandClick = () => {
    console.log("handleExpandClick");
    setExpanded(!expanded);
  };

  // DATA

  const data = props.data

  // Deconstructing Data
  const time = data.TIME && data.TIME.from
  const _title = data.HEADER.TITLE && data.HEADER.TITLE;
  const _description = data.HEADER.SHORT_TEXT && data.HEADER.SHORT_TEXT;
  const _thumbnail = data.CARD_IMAGE
  const _talk = data.EXEMPLAR_TALK
  //const _subHeader = time + " minutes"
  const _subHeader = _description

  // UI

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "blue",
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={_title}
        subheader={_subHeader}
      />
      <CardMedia
        component="img"
        height="250"
        image= {_thumbnail}
        style = {{borderRadius: 5}}
      />
      <CardContent>


      </CardContent>
      <CardActions disableSpacing>
        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to = {"/activities/"+data.ID}>
        <Button variant="text">
        Open
      </Button>
      </Link>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <MoreVertIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className = "scroll">
          <Chat talk = {_talk}/>
        </CardContent>
      </Collapse>
    </Card>
  );
}
