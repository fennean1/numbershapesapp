import React, { Fragment, useEffect } from "react";
import { LINK_TYPES } from "./const.js";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import AppleIcon from "@mui/icons-material/Apple";
import { SportsEsports } from "@mui/icons-material";

export default function IconSelect(props) {
  
  return (
    <div>
      <div>{props.type == LINK_TYPES.FILE && <AttachFileIcon />}</div>
      <div>{props.type == LINK_TYPES.IMAGE && <ImageIcon />}</div>
      <div>{props.type == LINK_TYPES.IOS_APP && <AppleIcon />}</div>
      <div>{props.type == LINK_TYPES.GAME && <SportsEsports />}</div>
    </div>
  );
}
