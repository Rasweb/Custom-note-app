import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import * as Types from "@/types/types"
import { useEffect, useState } from "react"
import * as dataHooks from "@/hooks/dataHooks"

export default function EditNoteProps({note, folder}: {note: Types.NoteType, folder?: Types.FolderType}){
    const [formVals, setFormVals] = useState({
        title: "",
        folder: ""
    });
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        dataHooks.getFolders({setFolders});
        // setFormVals(note.title, String(folder.id));
    }, []);

    return (
        <Dialog>
            <DialogTrigger>Edit note</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editing note props</DialogTitle>
                    <DialogDescription>
                        Edit title and folder
                    </DialogDescription>
                        <form>
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="titel"
                                    type="text"
                                    placeholder="Note title"
                                    onChange={(e) => setFormVals(prev => ({...prev, title:e.target.value}))}
                                    value={formVals.title}
                                ></Input>
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
                                                    {folders.map((fold: Types.FolderType) => (
                                                            <SelectItem key={fold.id} value={String(fold.id)}>{fold.name}</SelectItem>
                                                    ))}
                                                    <SelectItem value="">No folder</SelectItem>
                                                </> 
                                            :
                                                <div>No folders</div>
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}