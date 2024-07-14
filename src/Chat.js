import * as React from "react";
import List from "@mui/material/List";
import ChatBubble from "./ChatBubble";


export default function Chat(props) {
 
  const conversation = props.talk.map((d,i) => (
    <ChatBubble  key = {i} role={d.actor} text={d.text} />
  ));

  return (<List>{conversation}</List>)
}
