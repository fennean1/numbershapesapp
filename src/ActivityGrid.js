import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ActivityCard from "./ActivityCard"


export default function ActivityGrid(props) {
  console.log("props.data",props.data)
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
