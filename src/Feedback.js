import * as React from "react";
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  margin: 0,
  top: 'auto',
  right: 30,
  bottom: 30,
  left: 'auto',
  position: 'fixed',
};

const buttonStyle = {
  margin: 5,
  marginBottom: 15,
  flex: 1,
  width: "50%",
  display: "flex",
};

const textStyle = {
  margin: 15,
};

export default function Feedback(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const sendFeedback = () => {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
      }
    };

    const myJson = {
      page: props.location.pathname,
      feedback: value,
    }

    req.open("POST", "https://api.jsonbin.io/v3/b", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", process.env.REACT_APP_BIN_ID);
    req.setRequestHeader("X-Collection-Id", "66dade0ead19ca34f8a0ce73");
    req.send(JSON.stringify(myJson));
    setOpen(false)
  }

  return (
    <div>
      <Dialog style = {style} open={open} onClose={() => setOpen(!open)}>
        <TextField style = {textStyle}
          id="standard-multiline-flexible"
          label="How's it going?"
          rows={5}
          placeholder="Are you enjoying numbershapes? Please let us know!"
          multiline
          onChange={(e) => setValue(e.target.value)}
        />
        <div style = {{display: "flex", margin: "auto"}}>
          <Button style = {buttonStyle} onClick={() => setOpen(!open)} color="warning" variant="outlined">
            Cancel
          </Button>
          <Button style = {buttonStyle} onClick={()=>sendFeedback(value)}  color="primary" variant="contained">
            Send
          </Button>
        </div>
      </Dialog>
      <Fab onClick={() => setOpen(!open)} style={style} color="secondary" aria-label="add">
        <ModeCommentIcon />
      </Fab>
    </div>)}



