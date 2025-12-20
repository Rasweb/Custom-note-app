import * as Types from "@/types/types"
import { ViewMarkdown } from "../markdown/Markdown"

export function NoteContent({note, onNoteUpdate}: {note: Types.NoteType, onNoteUpdate:(updateNote: Types.NoteType) => void}) { 
    
    return (
        <>
            <div className='prose prose-invert'>
            <ViewMarkdown note={note} onNoteUpdate={onNoteUpdate}></ViewMarkdown>
            </div>
        </>
    )
}