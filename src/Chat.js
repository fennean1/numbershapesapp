import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ChatBubble from "./ChatBubble";


export default function Chat(props) {
 
  const conversation = props.talk.map((d,i) => (
    <ChatBubble key = {i} role={d.actor} text={d.text} />
  ));

  return (<List>{conversation}</List>)
}
