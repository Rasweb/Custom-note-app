import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card";;
import {Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, type ChangeEvent } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getFolders } from "@/hooks/dataHooks";
import type { FolderType } from "@/types/types";
import { SelectGroup, SelectLabel, SelectSeparator } from "@radix-ui/react-select";

export default function CreateNote() {
    const navigate = useNavigate();
    const [formVals, setFormVals] = useState({
        title: "",
        content: "",
        folder: ""
    })
    const [folders, setFolders] = useState([]);
    const [errorHandle, setErrorHandle] = useState({
        bool: false,
        msg: ""
    });

    async function createNoteFunc(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        let val;
        try{
            if(formVals.folder == "none" || formVals.folder == "") {
                val = null    
            } else {
                val = formVals.folder;
            }
            const response = await fetch("/database/notes",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: formVals.title,
                    content: formVals.content,
                    folder_id: val,
                })
            });
            if(response.ok){
                navigate("/", {state: {message: "Create note: success"}});
            }
            return await response.json();
        }
        catch(error){
            if(error  instanceof Error){
                console.error("Failed to create note:", error.message);
                setErrorHandle({bool: true, msg: error.message});
            } else {
                console.error("Unknown error:", error);
                setErrorHandle({bool: true, msg: String(error)});
            }
        }
    };
    useEffect(() => {
        getFolders({setFolders});
    }, []);
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
                        onChange={(e) => setFormVals(prev => ({...prev, title:e.target.value}))}
                        value={formVals.title}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        className="w-full h-64"
                        id="content"
                        placeholder="Write your note here..."
                        onChange={(e) => setFormVals(prev => ({...prev, content:e.target.value}))}
                        value={formVals.content}
                    />
                </div>
                <div>
                    <Select name="method" defaultValue="" value={formVals.folder} onValueChange={(value) => setFormVals(prev => ({ ...prev, folder: value }))}>
                        <SelectTrigger className="w-[120px]" id="method">
                            <SelectValue placeholder="Select a folder" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Folders</SelectLabel>
                                {folders.length ? 
                                    <>
                                        {folders.map((folder: FolderType) => (
                                            <div key={folder.id}>
                                                <SelectItem key={folder.id} value={String(folder.id)}>{folder.name}</SelectItem>
                                            </div>
                                        ))}
                                        <SelectItem value="none">No folder</SelectItem>
                                    </> 
                                :
                                    <div>No folders</div>
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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

