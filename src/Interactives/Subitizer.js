import React, { Fragment, useEffect } from "react";
import Interactive from "../Interactive";
import * as script from "../js/subitizerAPI.js"

export default function Subitizer(props) {
    console.log("script",script)

  return (
    <Interactive type = {6} script = {script} setup = {props}/>
  );
}
