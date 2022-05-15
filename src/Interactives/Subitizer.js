import React from "react";
import {useParams} from "react-router-dom"
import Interactive from "../Interactive";
import * as script from "../js/subitizerAPI.js"
import * as DB from "../db.js"

export default function Subitizer(props) {
  const {activityname} = useParams()
  const data = DB[activityname]

  return (
    <Interactive script = {script} {...props} setup = {data.INTERACTIVE.SETUP}/>
  );
}
