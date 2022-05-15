import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from "@mui/material";

export default function Steps(props) {

  const testData = props.list ? props.list : [1,2,3]

  const steps = testData.map((s,i)=>{

    return (<ListItem key = {i}>
      <Typography style = {{marginRight: "5%"}} variant = "h5">
        {i+1}
      </Typography>
      <ListItemText primary={s.description}  />
    </ListItem>)
  })

  return (
    <List disablePadding>
      {steps}
    </List>
  );
}
