import React from "react";
import {useParams} from "react-router-dom"
import Interactive from "../Interactive";
import * as script from "../js/opal.js"
import * as CONST from "../const.js"

export default function Opal(props) {
  const {activityname} = useParams()
  const data = CONST.SETUPS[activityname]

  return (
    <Interactive script = {script} level = {activityname} {...props} setup = {data}/>
  );
}
