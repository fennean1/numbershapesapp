import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemIcon } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconButton } from '@mui/material';
import FaceIcon from "@mui/icons-material/Face";
import { Face } from '@mui/icons-material';
import IconSelect from "./IconSelect"

export default function IconLink(props) {
  // props: type, url, text, 
  
  console.log("icon link props",props)

  return (
    (<ListItem disablePadding>
        <IconButton edge="start" aria-label="delete">
            <IconSelect type = {props.type}/>
        </IconButton>
        <ListItemText primary={props.text}  />
      </ListItem>)
  );
}
