import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { IconButton } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { Face } from "@mui/icons-material";
import IconLink from "./IconLink";

export default function IconLinkList(props) {
  // Data: type,

  const iconlinks = props.data.map(l => {
    return (<IconLink {...l} />);
  })

  return(<List>{iconlinks}</List>);
}
