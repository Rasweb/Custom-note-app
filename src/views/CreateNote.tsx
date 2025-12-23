import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";;
import {Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as dataHooks from "@/hooks/dataHooks"
import * as Types from "@/types/types"
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

export default function CreateNote() {
    const navigate = useNavigate();
    const [formVals, setFormVals] = useState({
        title: "",
        folder: ""
    })
    const [folders, setFolders] = useState([]);
    const [errorHandle, setErrorHandle] = useState<Types.errorHandleProps>({
        bool: false,
        msg: ""
    });

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        try {
            const response = await dataHooks.createNoteFunc(formVals, navigate)            
        } catch (error) {
            console.error("Failed to create note: ", error);
        }
    };

    const fetchFolders = async () => {
        try {
            const response = await dataHooks.getFolders();
            setFolders(response);
        } catch (error) {
            console.error("Failed to fetch folders: ", error);
        }
    }

    useEffect(() => {
        fetchFolders();
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
            <form  className="space-y-6" onSubmit={handleSubmit}>
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
                                        {folders.map((folder: Types.FolderType) => (
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

