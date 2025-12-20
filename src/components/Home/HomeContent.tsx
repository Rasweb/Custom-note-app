import * as Types from "@/types/types"
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import * as dataHooks from "@/hooks/dataHooks"

// Using callback
export function HomeContent({noteCount, notes, onPinChange, onNoteRemoved}: {noteCount: number, notes: Types.NoteType[], onPinChange: (id: number, newPin: number) => void, onNoteRemoved: (noteId: number) => void}){
    const navigate = useNavigate();   
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 pt-4">
            {noteCount ? 
                <>
                    {notes.map((note: Types.NoteType) => {
                        const path = `/note/${note.id}`;
                        const fullPath = `${window.location.origin}${path}`;
                        return (
                        <ContextMenu key={note.id}>
                            <ContextMenuTrigger>
                                <Card className="w-full cursor-pointer hover:shadow-md transition"
                                onClick={() => navigate(`/note/${note.id}`)}>
                                    <CardHeader>
                                       <CardTitle>
                                            <div>{note.title}</div>
                                            <div>{note.created_at}</div>
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                <ContextMenuItem onClick={() => navigate(`${path}`)}>Open</ContextMenuItem>
                                <ContextMenuItem>Edit note props</ContextMenuItem>
                                <ContextMenuItem onClick={() => navigator.clipboard.writeText(fullPath)}>Copy path</ContextMenuItem>
                                <ContextMenuItem onClick={() => navigator.clipboard.writeText(path)}>Copy relative path</ContextMenuItem>
                                <ContextMenuItem onClick={() => dataHooks.changePinMode(note.id, note.pin, onPinChange)}>{note.pin == 1 ? "UnPin" : "Pin"}</ContextMenuItem>
                                <ContextMenuItem onClick={() => {dataHooks.deleteNoteById(Number(note.id), navigate); onNoteRemoved(note.id)}}>Delete</ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                        )
                    })}
                </>
            : 
                <Card>
                    <CardHeader>
                        <CardTitle>
                            No notes to display
                        </CardTitle>
                    </CardHeader>
                </Card>
            }
        </div>
    )
}