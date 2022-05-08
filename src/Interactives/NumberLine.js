import React, { Fragment, useEffect } from "react";
import Interactive from "../Interactive";
import * as script from "../js/numberlineAPI.js"

export default function NumberLine(props) {
  return (
    <Interactive script = {script} setup = {props}/>
  );
}
