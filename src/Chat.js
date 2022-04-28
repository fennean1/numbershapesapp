import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ChatBubble from "./ChatBubble";

export default function Chat() {
  const icon = <FiberManualRecordIcon />;
  const data = [
    { role: "teacher", text: "How many were there all together?" },
    { role: "student", text: "I saw a total of 5 altogether" },
    { role: "teacher", text: "How many were missing?" },
    { role: "student", text: "I see 3 missing where the empty rings are." },
    { role: "teacher", text: "How many are left?" },
    { role: "student", text: "There are two left so five take away three is two." },
  ];

  const conversation = data.map((d) => (
    <ChatBubble role={d.role} text={d.text} />
  ));

  return <List>{conversation}</List>;
}
