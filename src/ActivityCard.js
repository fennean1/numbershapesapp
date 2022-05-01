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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import * as Activities from "./db.js";
import VideocamRoundedIcon from "@mui/icons-material/Videocam";
//import FullScreenDialog from "./FullScreenDialog";
import { List, ListItem } from "@mui/material";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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

  function handleOpenDialog() {
    console.log("handleOpenDialog");
    if (open) {
      console.log("navigating")
      navigateTo("/SchemaTest/PROTOTYPE_2")
      setDialogOpen(false);
    } else {
      setDialogOpen(true)
    }
  };

  // DATA

  const data = props.data

  // Deconstructing Data
  const time = data.TIME && data.TIME.from
  const _subHeader = time + " minutes"
  const _title = data.TITLE && data.TITLE;
  const _description = data.DESCRIPTION && data.DESCRIPTION;

  // UI

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "blue",
  };


  function renderLinks() {
    return data.LINKS.map((l,i) => {
      return (
        <ListItem key = {i}>
          <Link style={linkStyle} to={"/preview" + l.address}>
            {l.title}
          </Link>
        </ListItem>
      );
    });
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <AccessTimeIcon />
          </IconButton>
        }
        title={_title}
        subheader={_subHeader}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://res.cloudinary.com/duim8wwno/image/upload/v1630352928/Spotlight%20Game/Untitled_presentation_gkxy3u.svg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography component={'div'} style = {{paddingBottom: "5%"}}variant="body2" color="text.secondary">
          {_description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Link style={linkStyle} to={"preview/something/else"}>
          <IconButton onClick={handleOpenDialog} aria-label="share">
            <VideocamRoundedIcon />
          </IconButton>
        </Link>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List>{renderLinks()}</List>
        </CardContent>
      </Collapse>
    </Card>
  );
}
