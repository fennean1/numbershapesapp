import './App.css';
import ActivityCard from "./ActivityCard";
import Tabs from "./Tabs";
import ActivityPage from './ActivityPage';
import Interactive from "./Interactive"
import AllGrades from './AllGrades';
import Subitizer from './Interactives/Subitizer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage';

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


const Main = () => (
  <Routes>
    <Route
      exact
      path="interactives/:activityname"
      element={<Subitizer fullScreen = {true}/>}
    />
    <Route path="/" element={<LandingPage/>} />
    <Route path="/activities/:activityname" element={<ActivityPage/>} />
  </Routes>
)

const App = () => {
  return (
    <BrowserRouter>
       <Main />
    </BrowserRouter>
  );
}

export default App;
