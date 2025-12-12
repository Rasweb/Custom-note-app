import * as Types from "@/types/types"
import { ViewMarkdown } from "../markdown/Markdown"

export function NoteContent({note}: {note: Types.NoteType}) { 
    
    return (
        <>
            <div className='prose prose-invert'>
            <ViewMarkdown note={note}></ViewMarkdown>
            </div>
        </>
    )
}