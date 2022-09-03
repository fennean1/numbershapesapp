import React from "react";
import {useParams} from "react-router-dom"
import Interactive from "../Interactive";
import * as script from "../js/crushAPI"
import * as CONST from "../const.js"

export default function Crush(props) {
  const {activityname} = useParams()
  const data = CONST.SETUPS[activityname]

  console.log("activity data",data)

  return (
    <Interactive script = {script} level = {activityname} {...props} setup = {data}/>
  );
}
