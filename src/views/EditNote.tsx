import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card";;
import {Button } from "../components/ui/button"
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, type ChangeEvent } from "react";

export default function EditNote() {
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const [updateNote, setUpdateNote] = useState({
        id: 0,
        title: "",
        content: "",
        updated_at: ""
    });
    
    async function getNoteById(id: number){
        try{
            const response = await fetch(`/database/note/${id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            const data = await response.json();
            setUpdateNote({
                id: data[0].id,
                title: data[0].title,
                content: data[0].content,
                updated_at: data[0].updated_at
            });
        }
        catch(error){
            console.error("Failed to fetch notes:", error);
        }
    };

    async function updateNoteById(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            const response = await fetch(`/database/note/${updateNote.id}` ,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: updateNote.id,
                    title: updateNote.title,
                    content: updateNote.content
            }),
        });
        
        if(response.ok){
            navigate(`/note/${updateNote.id}`, {state: {message: "Edit note: success"}});
        }
        return await response.json();
        } catch(error){
            console.error("Failed to fetch notes:", error);
        }
    };

    useEffect(() => {
        getNoteById(Number(id));
    }, []);

  return (
    <div className="container mx-auto p-8 text-center relative z-10">
        <Card className="mx-auto ">
          <CardHeader  className="flex flex-col items-center gap-2">
            <CardTitle>Welcome to note creation screen</CardTitle>
            <CardAction className="self-center">
              <Button title="/" variant="link" size="default" onClick={() => navigate("/")}>Go Home</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form  className="space-y-6" onSubmit={updateNoteById}>
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    {/* - Functional update to access previous state.
                        - Creating new object, copuing the old, updating only title with new value
                    */}
                    <Input
                        id="title"
                        type="text"
                        placeholder="Note title"
                        onChange={(e) => setUpdateNote(prev => ({...prev, title:e.target.value}))}
                        value={updateNote.title}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        className="w-full h-64"
                        id="content"
                        placeholder="Write your note here..."
                        onChange={(e) => setUpdateNote(prev => ({...prev, content:e.target.value}))}
                        value={updateNote.content}
                        />
                </div>
                <Button type="submit" variant="outline" size={"default"}>
                    Update Note
                </Button>
            </form>
          </CardContent>
        </Card>
    </div>
  );
}

