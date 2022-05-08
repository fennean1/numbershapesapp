import './App.css';
import ActivityCard from "./ActivityCard";
import Tabs from "./Tabs";
import ActivityPage from './ActivityPage';
import Interactive from "./Interactive"

import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <Route path="/interactive" element={<Interactive/>} />
    <Route path="/" element={<Tabs/>} />
    <Route path="/activity/:activityname" element={<ActivityPage/>} />
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
