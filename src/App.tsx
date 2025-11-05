import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from "./views/Home";
import About from "./views/About"
import Markdown from "./views/Markdown";

export function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/markdown" element={<Markdown/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
