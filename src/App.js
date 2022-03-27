import './App.css';
import ActivityCard from "./ActivityCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Main = () => (
  <Routes>
    <Route path="/schematest/:item/*" element={<ActivityCard/>} />
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
