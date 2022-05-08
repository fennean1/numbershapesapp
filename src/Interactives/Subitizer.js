import React, { Fragment, useEffect } from "react";
import Interactive from "../Interactive";
import * as script from "../js/subitizerAPI.js"
console.log("subitizer")
export default function Subitizer(props) {

  return (
    <Interactive script = {script} {...props}/>
  );
}
