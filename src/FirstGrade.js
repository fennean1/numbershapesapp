import * as React from 'react';
import ActivityGrid from "./ActivityGrid"
import * as Activities from "./db.js";

export default function FirstGrade(props) {

  return (
    <div>
        <ActivityGrid data = {Activities.FIRST_GRADE}/>
   </div>
   
  );
}
