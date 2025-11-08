import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import {Button } from "../components/ui/button"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type NoteType = {
    id: number;
    title: string;
    image_link: string;
    content: string,
    created_at: string;
    updated_at: string;
};

export default function Note() {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const [note, setNote] = useState<NoteType>();
    async function getNoteById(id: number){
        try{
            const response = await fetch(`/database/note/:${id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setNote(data[0]);
        console.log(data);
        }
        catch(error){
            console.error("Failed to fetch notes:", error);
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
            <CardAction className="self-center">
              {/* <Button title="dark/light mode" variant={"outline"} onClick={() => toggleMode()}>Toggle Mode</Button> */}
              <Button title="/create" variant="link" size="default" onClick={() => navigate("/create")}>Create a new note</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {note?.content}
          </CardContent>
        </Card>
    </div>
  );
}

