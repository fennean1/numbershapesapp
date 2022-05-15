import React, { Fragment, useEffect } from "react";
import { INTERACTIVE_TYPES } from "./const.js";
import { LINK_TYPES } from "./const.js";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";

export default function IconSelect(props) {
  
  return (
    <div>
      <div>{props.type == LINK_TYPES.FILE && <InsertDriveFileIcon />}</div>
      <div>{props.type == LINK_TYPES.IMAGE && <ImageIcon />}</div>
    </div>
  );
}
