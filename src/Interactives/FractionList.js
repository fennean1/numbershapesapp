import React, { Component } from "react";
import { TextField } from "@mui/material";
import "../App.css";


const CORAL = "#FF4848";
const BLUE = "#51D0FF";
const GREEN = "#7ADA64";
const PURPLE = "#B478FF";
const YELLOW = "#FFFD82";
const ORANGE = "#ffb84d";
const PINK = "#ff66ff";
const RED = "#ff3333";
const BROWN = "#bf8040";
const SEXY_GREEN = "#669999";
const STRONG_GREEN = "#00b359";
const STRONG_YELLOW = "#ffff00";
const BLUE_GREY = "#8585ad";

class FractionList extends Component {
  constructor(props) {
    super(props);

    this.colors = ["#4079ff", "#ff4063", "#787878"];

    this.colorIndex = 0;

    this.liStyle = {
      background: "#4079ff",
      margin: "0.10vw",
      color: "#ffffff",
      borderRadius: "0.5vw"
    };

    this.state = {
      whole: 24,
    };
  }

  returnNBlocks(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(i);
    }

    return arr.map((e,i) => {

    
    
    return (
      <div className="grow" style={this.liStyle}>
        <p style = {{fontSize: "20pt", fontFamily: "Chalkboard SE"}}>{this.state.whole / n}</p>
      </div>
    )
  });

  }

  handleChange(event) {
    this.setState({ whole: event.target.value });
  }

  renderRows(n) {
    if (isNaN(n)) {
      return null;
    } else {
      let arr = [];
      for (let i = 2; i <= n; i++) {
        arr.push(i);
      }
      return arr.map(e => {
        this.colorIndex++
        let valid = this.state.whole / e % 1 == 0 &&  e < 51 
        return <div className="flexMe">
          {valid && this.returnNBlocks(e)}
        </div>
        }
      );
    }
  }
  render() {
    return (
      <div className="clouds">
        <div className="container" style = {{padding: 20,flexDirection: 'column',display: 'flex',alignContent: 'center'}}>
            <div className = "flexMe" style = {this.liStyle}>
                <TextField
                  style = {{fontFamily: "Chalkboard SE",fontSize: "20pt", textAlign: 'center',flex: 1,display: "flex",margin: 20}}
                  value={this.state.whole}
                  onChange={this.handleChange.bind(this)}
              />
            </div>
          <div className="scroller" >{this.renderRows(this.state.whole)}</div>
        </div>
      </div>
    );
  }
}

export default FractionList;
