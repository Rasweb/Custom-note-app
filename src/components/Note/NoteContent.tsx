import * as Types from "@/types/types"
import { ViewMarkdown } from "../markdown/ViewMarkdown"

export function NoteContent({note}: {note: Types.NoteType}) { 
    return (
        <>
            <ViewMarkdown note={note}></ViewMarkdown>
        </>
    )
}