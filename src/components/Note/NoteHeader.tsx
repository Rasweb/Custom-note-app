import { CardHeader, CardTitle, CardAction, CardDescription } from "../ui/card";
import {Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useNavigate } from "react-router-dom";
import type { NoteType } from "@/types/types";
import { deleteNoteById } from "@/hooks/dataHooks";

export function NoteHeader({note}: {note: NoteType}) {
    const navigate = useNavigate();
    return(
        <CardHeader className="flex flex-col items-center gap-2">
            <CardTitle>{note?.title}</CardTitle>
            <CardDescription>
                Created on: {note?.created_at} | Last Modified {note?.updated_at}
            </CardDescription>
            <CardAction className="self-center">
                <Button title="/" variant="link" size="default" onClick={() => navigate("/")}>Back to Notes</Button>
                <Button title="/edit/note" variant="link" size="default" onClick={() => navigate(`/edit/note/${note?.id}`)}>Edit note</Button>
                <Button title="/delete/note" variant="outline" size="default" onClick={() => deleteNoteById(Number(note?.id), navigate)}>Delete note</Button>
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