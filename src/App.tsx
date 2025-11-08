import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from "./views/Home";
import About from "./views/About"
import Markdown from "./views/Markdown";
import Note from "./views/Note";
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (!theme || theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/markdown" element={<Markdown/>} />
        <Route path="/note/:id" element={<Note/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
