import './App.css';
import ActivityCard from "./ActivityCard";
import Tabs from "./Tabs";
import ActivityPage from './ActivityPage';

import { BrowserRouter, Routes, Route } from "react-router-dom";



const Main = () => (
  <Routes>
    <Route path="/schematest/:item/*" element={<ActivityCard/>} />
    <Route path="/" element={<Tabs/>} />
    <Route path="/activity/:name" element={<ActivityPage/>} />
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
