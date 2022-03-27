import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Interactive from "./Interactive"
import { Routes, Route} from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleOpenDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Some Prop
            </Typography>
            <Button autoFocus color="inherit">
              Open
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
      <Route
       path= "preview/:interactive/:id"
        element ={<Interactive />}
      />
    </Routes>
      </Dialog>
    </div>
  );
}
