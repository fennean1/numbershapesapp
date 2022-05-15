import * as React from 'react';
import ActivityGrid from "./ActivityGrid"
import * as DB from "./db.js";

export default function AllGrades() {
  const activities = Object.keys(DB).map(k=>{
    return DB[k]
  })

  return (
    <div>
        <ActivityGrid data = {activities}/>
   </div>
   
  );
}
