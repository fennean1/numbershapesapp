import React from "react";
import {useParams} from "react-router-dom"
import Interactive from "../Interactive.js";
import * as script from "../js/farm.js";
import * as CONST from "../const.js";



export default function Crush(props) {
  const {activityname} = useParams()
  const data = CONST.SETUPS[activityname]


  return (
    <Interactive script = {script} level = {activityname} {...props} setup = {data}/>
  );
}
