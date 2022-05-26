import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import IconSelect from "./IconSelect"

export default function IconLink(props) {

  return (
    (<ListItem disablePadding>
        <IconButton edge="start" aria-label="delete">
            <IconSelect type = {props.type}/>
        </IconButton>
        <ListItemText primary={props.text}  />
      </ListItem>)
  );
}
