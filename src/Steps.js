import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function Steps(props) {

  const testData = props.data ? props.data : [1,2,3]

  const steps = testData.map((s,i)=>{

    return (<ListItem disablePadding key = {i}>
      <h2 style = {{paddingRight: "2%"}}>{i+1}</h2>
      <ListItemText primary="This is step one! "  />
    </ListItem>)
  })

  return (
    <List disablePadding>
      {steps}
    </List>
  );
}
