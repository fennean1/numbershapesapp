import React from "react";
import { INTERACTIVE_TYPES } from "./const.js";
import MatchGame from "./Interactives/MatchGame.js";
import Subitizer from "./Interactives/Subitizer";
import Multiplication from "./Interactives/Multiplication";
import Crush from "./Interactives/Crush";


export default function InteractiveSelect(props) {
  return (
    <div style = {{width: "100%",height: "100%"}}>
        {props.type == INTERACTIVE_TYPES.SUBITIZER && (
          <Subitizer {...props} />
        )}
        {props.type == INTERACTIVE_TYPES.MATCH_GAME && (
          <MatchGame {...props} />
        )}
        {props.type == INTERACTIVE_TYPES.MULTIPLICATION && (
          <Multiplication {...props} />
        )}
                {props.type == INTERACTIVE_TYPES.SAAMI && (
          <Crush {...props} />
        )}
    </div>
  );
}
