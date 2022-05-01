import React, { Fragment, useEffect } from "react";
import Interactive from "./Interactive";
import { INTERACTIVE_TYPES } from "./const.js";
import NumberLine from "./Interactives/NumberLine";
import Subitizer from "./Interactives/Subitizer";
import { LINK_TYPES } from "./const.js";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";

export default function IconSelect(props) {
  console.log("interactive select", props);
  console.log("Link types", LINK_TYPES.TILE);

  return (
    <div>
      <div>{props.type == LINK_TYPES.FILE && <InsertDriveFileIcon />}</div>
      <div>{props.type == LINK_TYPES.IMAGE && <ImageIcon />}</div>
    </div>
  );
}
