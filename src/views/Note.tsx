import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription } from "@/components/ui/card";
import {Button } from "../components/ui/button"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown  from 'react-markdown'
import type { NoteType } from "@/types/types";

export default function Note() {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const [note, setNote] = useState<NoteType>();
    async function getNoteById(id: number){
        try{
            const response = await fetch(`/database/note/${id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setNote(data[0]);
        }
        catch(error){
            console.error("Failed to fetch notes:", error);
        }
    }; 
    
  async function deleteNoteById(id: number){
    const usrin = prompt("Are you sure you wish to remove this note?[y/n]:");
    if(usrin == "y"){
      console.log("its a yes");
      try{
        const response = await fetch(`/database/note/:${id}` ,{
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
        });
      if(response.ok){
        navigate("/");
      }
      return await response.json();
      }
      catch(error){
        console.error("Failed to fetch notes:", error);
      }
    } else {
      return;
    }
  };
    useEffect(() => {
        getNoteById(Number(id));
    }, []);

  return (
    <div className="container w-full mx-auto p-8 text-center  dark:text-white">
        <Card className="mx-auto ">
          <CardHeader className="flex flex-col items-center gap-2">
            <CardTitle>{note?.title}</CardTitle>
            <CardDescription>
              Created on: {note?.created_at} | Last Modified {note?.updated_at}
            </CardDescription>
            <CardAction className="self-center">
              <Button title="/" variant="link" size="default" onClick={() => navigate("/")}>Back to Notes</Button>
              <Button title="/edit/note" variant="link" size="default" onClick={() => navigate(`/edit/note/${note?.id}`)}>Edit note</Button>
              <Button title="/delete/note" variant="outline" size="default" onClick={() => deleteNoteById(Number(note?.id))}>Delete note</Button>
            </CardAction>
          </CardHeader>
          <CardContent className="whitespace-pre-wrap text-left">
            {note?.content ? (
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
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                 img: ({src="", alt=""}) =>{
                  const [label, width] = alt.split("|");
                  const style = width ? { width:`${width}px` } : undefined;
                  return (
                    <img src={src} alt={label} className={`my-4`} style={style} />
                  )
                }    
            }}
              >
            {note.content}
              </ReactMarkdown>
            ) : (
              <p>No content available.</p> // Fallback message
            )}
          </CardContent>
        </Card>
    </div>
  );
}

