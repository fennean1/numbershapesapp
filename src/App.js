import './App.css';
import ActivityCard from "./ActivityCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => (
  <div><p>Helloo!</p></div>
)

const Main = () => (
  <Routes>
    <Route path="/schematest/:item/*" element={<ActivityCard/>} />
    <Route path="/" element={<Home/>} />
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
