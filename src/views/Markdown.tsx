import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";;
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactMarkdown  from 'react-markdown'

export default function Markdown() {
        const [markdown, setMarkdown] = useState(`# Hello, Markdown!\n\nStart writing your notes here...`);
    

        // For create and update
        // body: JSON.stringify({ title, content }),
        const notesURL = "/database/notes";
        async function getNotes(){
          try{

            const response = await fetch(notesURL, {
              method: "GET",
              headers: {"Content-Type": "application/json"},
            });
            return await response.json();
          } catch(error){
             console.error("Failed to fetch notes:", error);
          }
        };

        async function createNotes(title: string, content: string, imageLink:string){
          try{
            const response = await fetch(notesURL,{
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                title: title,
                content: content,
                imageLink: imageLink
              })
            });
            return await response.json();
          }
          catch(error){
             console.error("Failed to fetch notes:", error);
          }
        };

        async function getNoteById(id: number){
          try{

            const response = await fetch(`/database/note/:${id}`, {
              method: "GET",
              headers: {"Content-Type": "application/json"},
            });
            return await response.json();
          }
          catch(error){
             console.error("Failed to fetch notes:", error);
          }
        };

        async function updateNoteById(id: number){
          try{
            const response = await fetch(`/database/note/:${id}` ,{
              method: "PUT",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                id,
                title: "Updated title",
                content: "Updated content",
                imageLink: ""
              }),
            });
            return await response.json();
          } catch(error){
             console.error("Failed to fetch notes:", error);
          }
        };

        async function deleteNoteById(id: number){
          try{

            const response = await fetch(`/database/note/:${id}` ,{
              method: "DELETE",
              headers: {"Content-Type": "application/json"},
            });
            return await response.json();
          }
          catch(error){
             console.error("Failed to fetch notes:", error);
          }
        };

        // TODO - implement in backend
        async function loadNoteFromDatabase(id: number){
            // const res = await fetch(`/api/note/${id}`);
            // const data = await res.json();
            // setMarkdown(data.content);
        }
    
    
        // TODO - Implement that in the backend save new or existing file
        async function saveToDatabase(content: string, title = "Untitled"){
            // await fetch("/api/save-note", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ title, content }),
            // });
        }
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button className="cursor-pointer" onClick={() => navigate("/")}> Go home</button>
      </div>
      <div>
        <button className="cursor-pointer" onClick={() => getNotes()}>Get notes</button>
        <br />
        <button className="cursor-pointer" onClick={() => createNotes("test title", "Some content", "")}>Create notes</button>
        
        <br />
        <button className="cursor-pointer" onClick={() => getNoteById(1)}>Get note</button>
        <br />
        <button className="cursor-pointer" onClick={() => updateNoteById(1)}>Update note</button>
        <br />
        <button className="cursor-pointer" onClick={() => deleteNoteById(1)}>Delete note</button>




        
      </div>
      <div>
        <div>
            <textarea  name="" id="" value={markdown} onChange={(e) => setMarkdown(e.target.value)} placeholder="Write markdown" className="w-full h-[30vh] cursor-pointer"/>
        </div>
        <div>
            <p>MArkdown preview</p>

            {/* More info: https://deepwiki.com/remarkjs/react-markdown/4.1-customizing-components */}
            <ReactMarkdown 
            components={{
                h1: ({node, ...props}) => <h1 className="text-4xl font-bold mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-3xl font-semibold mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-medium mb-2" {...props} />,
                p: ({node, ...props}) => <p className="text-base mb-2" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-500 underline" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                ul: ({node, ...props}) => (
                    <ul className="list-disc list-inside my-4" {...props} />
                ),
                ol: ({node, ...props}) => (
                    <ol className="list-decimal list-inside my-4" {...props} />
                ),
                li: ({node, ...props}) => (
                    <li className="mb-1" {...props} />
                )
            }}
            >{markdown}</ReactMarkdown >
        </div>
      </div>
    </div>
  );
}

