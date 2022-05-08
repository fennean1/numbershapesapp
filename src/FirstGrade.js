import * as React from 'react';
import ActivityGrid from "./ActivityGrid"
import * as DB from "./db.js";

export default function FirstGrade(props) {
  const activities = Object.keys(DB).map(k=>{
    const A = DB[k]
    if (A.INFO.GRADE == "FirstGrade"){
      return A
    }
  })

  return (
    <div>
        <ActivityGrid data = {activities}/>
   </div>
   
  );
}
