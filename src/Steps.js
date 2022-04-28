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

export default function FolderList(props) {

  const testData = props.data ? props.data : [1,2,3]
  const icon = (<FiberManualRecordIcon/>)

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
