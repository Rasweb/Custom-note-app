import { CardHeader, CardTitle, CardAction, CardDescription } from "../ui/card";
import {Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useNavigate } from "react-router-dom";
import * as Types from "@/types/types"
import * as dataHooks from "@/hooks/dataHooks"

export function NoteHeader({note, folder}: {note: Types.NoteType, folder?: Types.FolderType}) {
    const navigate = useNavigate();
    return(
        <CardHeader className="flex flex-col items-center gap-2">
            <CardTitle>{note?.title}</CardTitle>
            <CardDescription>
                <p>
                    Created on: {note?.created_at} | Last Modified {note?.updated_at}
                </p>
                <p>
                   {folder?.name ? (
                        <span>Folder name: {folder.name} </span>
                    ): (
                        <span>No folder</span>
                    )}
                </p>
            </CardDescription>
            <CardAction className="self-center">
                <Button title="/" variant="link" size="default" onClick={() => navigate("/")}>Back to Notes</Button>
                <Button title="/edit/note" variant="link" size="default" onClick={() => navigate(`/edit/note/${note?.id}`)}>Edit note</Button>
                <Button title="/delete/note" variant="outline" size="default" onClick={() => dataHooks.deleteNoteById(Number(note?.id), navigate)}>Delete note</Button>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button title="" variant="outline" size="default">Change folder</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div>
                            Popover content
                        </div>
                    </PopoverContent>
                </Popover>
            </CardAction>
        </CardHeader>
    )
}