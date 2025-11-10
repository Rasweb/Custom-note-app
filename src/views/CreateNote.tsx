import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card";;
import {Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, type ChangeEvent } from "react";

export default function CreateNote() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errorHandle, setErrorHandle] = useState({
        bool: false,
        msg: ""
    })

    async function createNoteFunc(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        console.log("Create note func pressed");
        try{
            const response = await fetch("/database/notes",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: title,
                    content: content,
                })
            });
            if(response.ok){
                navigate("/", {state: {message: "Create note: success"}});
            }
            return await response.json();
        }
        catch(error){
            if(error  instanceof Error){
                console.error("Failed to fetch notes:", error.message);
                setErrorHandle({bool: true, msg: error.message});
            } else {
                console.error("Unknown error:", error);
                setErrorHandle({bool: true, msg: String(error)});
            }
        }
    };


  return (
    <div className="container mx-auto p-8 text-center relative z-10">
        <Card className="mx-auto ">
          <CardHeader  className="flex flex-col items-center gap-2">
            {errorHandle.bool && <div className="text-red-500">Error: {errorHandle.msg} </div>}
            <CardTitle>Welcome to note creation screen</CardTitle>
            <CardAction className="self-center">
              <Button title="/" variant="link" size="default" onClick={() => navigate("/")}>Go Home</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form  className="space-y-6" onSubmit={createNoteFunc}>
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        type="text"
                        placeholder="Note title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        className="w-full h-64"
                        id="content"
                        placeholder="Write your note here..."
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                    />
                </div>
                <Button type="submit" variant="outline" size={"default"}>
                    Create Note
                </Button>
            </form>
          </CardContent>
        </Card>
    </div>
  );
}

