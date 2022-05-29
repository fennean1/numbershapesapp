import React from "react";
import {useParams} from "react-router-dom"
import Interactive from "../Interactive";
import * as script from "../js/multiplicationAPI.js"
import * as CONST from "../const.js"

export default function Multiplication(props) {
  const {activityname} = useParams()
  const data = CONST.SETUPS[activityname]

  return (
    <Interactive script = {script} {...props} setup = {data}/>
  );
}
