import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from "./views/Home";
import About from "./views/About"
import Note from "./views/Note";
import CreateNote from "./views/CreateNote";
import EditNote from "./views/EditNote";
import CreateFolder from "./views/CreateFolder";
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
        <Route path="/note/:id" element={<Note/>} /> 
        <Route path="/create/note" element={<CreateNote/>} />
        <Route path="/edit/note/:id" element={<EditNote/>} />
        <Route path="/create/folder" element={<CreateFolder/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
