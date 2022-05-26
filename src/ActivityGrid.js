import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ActivityCard from "./ActivityCard"


export default function ActivityGrid(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {props.data.map((item, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
           <ActivityCard data = {item}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
