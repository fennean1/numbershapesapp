import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from './LandingPage';
import ActivityPage from './ActivityPage';
import Subitizer from './Interactives/Subitizer';
import Multiplication from './Interactives/Multiplication';
import MatchGame from "./Interactives/MatchGame"
import Crush from "./Interactives/Crush"
import Opal from "./Interactives/Opal"
import Sandbox from "./Interactives/Sandbox"
import FractionList from "./Interactives/FractionList"
import { useEffect } from "react";
import InteractiveSVG from "./InteractiveSVG"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Feedback  from "./Feedback";


const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Quicksand',
      fontWeight: "bold"
    },
  },
})

/*

TODOS: 

- Make icon links clickable (connect to url)
- Connect Slideshow to slides.
- verify flow of "type,setup" for interactive
- setup interactive routes
  If no slug, default (no notes)
  If slug, load setup with notes
- Make sample talk connected to slides
- add "notes section"
- add "more info" (tags,standards etc)
- site map
  K,1,2,3+

  - K
    Card Games
  - 1
    Eggs
    Subtraction
  - 2
    Multiplication Chart
  - 3+
    Powers (7x7x7-7)



*/

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


const Main = () => (
  <Routes>
    <Route
      exact
      path="interactives/sandbox"
      element={<Sandbox fullScreen={true} />}
    />
    <Route
      exact
      path="interactives/fractionlist"
      element={<FractionList fullScreen={true} />}
    />
    <Route
      exact
      path="interactives/timer"
      element={<InteractiveSVG fullScreen={true} />}
    />
    <Route
      exact
      path="interactives/saami/:activityname"
      element={<Crush fullScreen={true} />}
    />
    <Route
      exact
      path="interactives/opal/:activityname"
      element={<Opal fullScreen={true} />}
    />
    <Route
      exact
      path="interactives/multiplication/:activityname"
      element={<Multiplication fullScreen={true} />}
    />
    <Route
      exact
      path="interactives/subitizer/:activityname"
      element={<Subitizer fullScreen={true} />}
    />
    <Route
      exact
      path="interactives/match_game/:activityname"
      element={<MatchGame fullScreen={true} />}
    />
    <Route path="/" element={<LandingPage />} />
    <Route path="/activities/:activityname" element={<ActivityPage />} />
  </Routes>
)

const App = () => {
  const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };
  const [open, setOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Feedback location = {window.location} />
        <ScrollToTop />
        <Main />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
