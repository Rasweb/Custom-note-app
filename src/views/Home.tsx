import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction, CardFooter } from "@/components/ui/card";
import {Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type NoteType = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

export default function Home(){
    const navigate = useNavigate();
    const [noteCount, setNoteCount] = useState(0);
    const [notes, setNotes] = useState([]);
    async function getNotes(){
        const notesURL = "/database/notes";
        try{
            const response = await fetch(notesURL, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            const data = await response.json();
            setNoteCount(data.length);
            setNotes(data);
            return data;
          } catch(error){
                console.error("Failed to fetch notes:", error);
          }
        };

    useEffect(() => {
        getNotes();
    }, []); // [] ensures it only runs once on mount.

    return(
    <div className="container w-full mx-auto p-8 text-center">
            <Card className="mx-auto ">
                <CardHeader  className="flex flex-col items-center gap-2">
                  {noteCount ? <CardTitle>Welcome there are {noteCount} notes found</CardTitle> : <CardTitle>No notes found</CardTitle>}
                    <CardAction className="self-center">
                        <Button title="/create" variant="link" size="default" onClick={() => navigate("/create")}>Create a new note</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                  <Button title="/about" variant="link" size="default" onClick={() => navigate("/about")}>About page</Button>
                  <Button title="/markdown" variant="link" size="default" onClick={() => navigate("/markdown")}> Markdown page</Button>
                </CardContent>
            </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
        {noteCount ? 
          <>
            {notes.map((note: NoteType) => (
              <Card key={note.id} className="w-full cursor-pointer hover:shadow-md transition"
              onClick={() => navigate(`/note/${note.id}`)}>
                  <CardHeader>
                    <CardTitle>
                      <div>{note.title}</div>
                      <div>{note.created_at}</div>
                    </CardTitle>
                  </CardHeader>
              </Card>
          ))}
        </>
        : 
        <Card>
          <CardHeader>
            <CardTitle>
              No notes to display
            </CardTitle>
          </CardHeader>
        </Card>
        }
        </div>
    </div>
    )
}

