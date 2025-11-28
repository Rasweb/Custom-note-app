import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";;
import {Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

export default function CreateFolder() {
    const navigate = useNavigate();
    const [name, setTitle] = useState("");

    // CREATE TABLE IF NOT EXISTS folders (
    //   id INTEGER PRIMARY KEY, 
    //   name TEXT UNIQUE NOT NULL,
    //   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    // );
    async function createFolderFunc(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        console.log("Create folder func pressed");
        try {
            const response = await fetch("/database/folders", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: name,
                })
            });
            if(response.ok){
                navigate("/", {state: {message: "Create folder: success"}});
            }
            return await response.json();
        } catch (error) {
            if(error instanceof Error){
                console.error("Failed to create folder:", error.message);
                // error handling
            } else {
                console.error("Unknown error:", error);
                // error handling
            }
        }
    };
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
        <Card className="mx-auto ">
            <CardHeader  className="flex flex-col items-center gap-2">
                <CardTitle>Welcome to folder creation screen</CardTitle>
                <CardAction className="self-center">
                    <Button title="/" variant="link" size="default" onClick={() => navigate("/")}>Go Home</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form  className="space-y-6" onSubmit={createFolderFunc}>
                    <div className="space-y-2">
                        <Label htmlFor="title">Name</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Note title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={name}
                        />
                    </div>
                    <Button type="submit" variant="outline" size={"default"}>
                        Create Folder
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}

