import React from "react";
import { INTERACTIVE_TYPES } from "./const.js";
import MatchGame from "./Interactives/MatchGame.js";
import Subitizer from "./Interactives/Subitizer";

export default function InteractiveSelect(props) {
  return (
    <div style = {{width: "100%",height: "100%"}}>
        {props.type == INTERACTIVE_TYPES.SUBITIZER && (
          <Subitizer {...props} />
        )}
        {props.type == INTERACTIVE_TYPES.MATCH_GAME && (
          <MatchGame {...props} />
        )}
    </div>
  );
}
