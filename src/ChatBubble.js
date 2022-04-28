import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { IconButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FaceIcon from "@mui/icons-material/Face";
import PersonIcon from "@mui/icons-material/Person";
import Box from '@mui/material/Box';

export default function Bubble(props) {


  

  const studentIcon = <FaceIcon />;
  const teacherIcon = <PersonIcon />;
  console.log("props", props);

  const x = props.role == "student" ? (
    <ListItem style={{display:'flex', justifyContent:'flex-end'}} disablePadding ={true}>
    <Box
        component="div"
        sx={{
          whiteSpace: 'normal',
          my: 0.5,
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : '#bff4ff',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          borderRadius: 3,
          fontSize: '1rem',
          fontWeight: '700',
        }}
      >
        {props.text}
      </Box>
      <IconButton edge="end" aria-label="delete">
                      {studentIcon}
                    </IconButton>
    </ListItem>
  ) : (
    <ListItem disablePadding = {true}>
            <IconButton edge="start" aria-label="delete">
                      {teacherIcon}
                    </IconButton>
                    <Box
        component="div"
        sx={{
          whiteSpace: 'normal',
          my: 0.5,
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : '#007FFE',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : '#ffffff',
          border: '1px solid',
          borderRadius: 3,
          fontSize: '1rem',
          fontWeight: '700',
        }}
      >
        {props.text}
      </Box>
    </ListItem>
  );

  return x;
}
