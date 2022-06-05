import './App.css';
import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import LandingPage from './LandingPage';
import ActivityPage from './ActivityPage';
import Subitizer from './Interactives/Subitizer';
import Multiplication from './Interactives/Multiplication';
import MatchGame from "./Interactives/MatchGame"
import Crush from "./Interactives/Crush"
import FractionList from "./Interactives/FractionList"
import { useEffect } from "react";
import InteractiveSVG from "./Interactives/InteractiveSVG"
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
      path="interactives/fractionlist"
      element={<FractionList fullScreen = {true}/>}
    />
            <Route
      exact
      path="interactives/svgtest"
      element={<InteractiveSVG fullScreen = {true}/>}
    />
    <Route
      exact
      path="interactives/sami/:activityname"
      element={<Crush fullScreen = {true}/>}
    />
    <Route
      exact
      path="interactives/multiplication/:activityname"
      element={<Multiplication fullScreen = {true}/>}
    />
    <Route
      exact
      path="interactives/subitizer/:activityname"
      element={<Subitizer fullScreen = {true}/>}
    />
    <Route
      exact
      path="interactives/match_game/:activityname"
      element={<MatchGame fullScreen = {true}/>}
    />
    <Route path="/" element={<LandingPage/>} />
    <Route path="/activities/:activityname" element={<ActivityPage/>} />
  </Routes>
)

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Main />
    </BrowserRouter>
  );
}

export default App;
