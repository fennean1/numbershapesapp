import React from "react";
import { INTERACTIVE_TYPES } from "./const.js";
import NumberLine from "./Interactives/NumberLine";
import Subitizer from "./Interactives/Subitizer";

export default function InteractiveSelect(props) {
  return (
    <div>
      <div>
        {props.type == INTERACTIVE_TYPES.SUBITIZER && (
          <Subitizer {...props} />
        )}
      </div>
      <div>
        {props.type == INTERACTIVE_TYPES.NUMBER_LINE && (
          <NumberLine {...props} />
        )}
      </div>
    </div>
  );
}
