import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from "./views/Home";
import About from "./views/About"
import Note from "./views/Note";
import CreateNote from "./views/CreateNote";
import EditNote from "./views/EditNote";
import CreateFolder from "./views/CreateFolder";
import Layout from "./components/sidebar/layout";
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
        {/* Nested rout to handle layout easier */}
          <Route path="/" element={
            <Layout >
              <Home />
            </Layout >
          } />
          <Route path="/about" element={
            <Layout >
              <About />
            </Layout>
            } />
          <Route path="/note/:id" element={
            <Layout >
              <Note/>
            </Layout>
            } /> 
          <Route path="/create/note" element={
            
            <Layout >
              <CreateNote/>
            </Layout>
            } />
          <Route path="/create/folder" element={
            <Layout >
              <CreateFolder/>
            </Layout>
            }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
