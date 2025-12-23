import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Button } from "../ui/button"

export default function EditNoteProps({note, folder, onNoteUpdated}: {note: Types.NoteType, folder?: Types.FolderType, onNoteUpdated: (note: Types.NoteType) => void}){
    const [formVals, setFormVals] = useState({
        title: "",
        folder: ""
    });
    const [folders, setFolders] = useState([]);

    const onSubmit = async (formVals: Types.EditNotePropsType) => {
        const updatedNote = {
            ...note,
            title: formVals.title,
            folder_id: formVals.folder ? parseInt(formVals.folder) : 0
        };

        await dataHooks.editNote(updatedNote, note.id, (savedNote) => {
            onNoteUpdated(savedNote);  // Handle different custom update action
        });
    }
    
    const fetchFolders = async() => {
        try {
            const response = await dataHooks.getFolders();
            setFolders(response);
            setFormVals(prev => ({
                ...prev,
                title: note.title,
                folder: folder ? String(folder.id) : ""
            }));
        } catch (error) {
            console.error("Failed to fetch folders: ", error);           
        }
    }; 
    
    useEffect(() => {
        fetchFolders();
    }, [note, folder]);

    return (
        <Dialog>
            <DialogTrigger className="px-2 cursor-pointer">Edit note props</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editing note props</DialogTitle>
                    <DialogDescription>
                        Edit title and/or folder
                    </DialogDescription>
                </DialogHeader>
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
                                        </> 
                                    :
                                        <div>No folders</div>
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" size={"default"}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button title="" variant="outline" size={"default"} onClick={async() => {
                        await onSubmit(formVals)}}
                    >Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}