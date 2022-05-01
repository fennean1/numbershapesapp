import React, { Fragment, useEffect } from "react";
import Interactive from "./Interactive";
import { INTERACTIVE_TYPES } from "./const.js";
import NumberLine from "./Interactives/NumberLine";
import Subitizer from "./Interactives/Subitizer";

export default function InteractiveSelect(props) {
  console.log("interactive select", props);

  return (
    <div>
      <div>
        {props.type == INTERACTIVE_TYPES.SUBITIZER && (
          <Subitizer type={6} setup={props} />
        )}
      </div>
      <div>
        {props.type == INTERACTIVE_TYPES.NUMBER_LINE && (
          <NumberLine type={6} setup={props} />
        )}
      </div>
    </div>
  );
}
