import type { NoteType } from "@/types/types";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";

export function HomeContent({noteCount, notes}: {noteCount: number, notes: NoteType[]}){
    const navigate = useNavigate();

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 pt-4">
            {noteCount ? 
                <>
                    {notes.map((note: NoteType) => (
                        <Card key={note.id} className="w-full cursor-pointer hover:shadow-md transition"
                            onClick={() => navigate(`/note/${note.id}`)}>
                            <CardHeader>
                                <CardTitle>
                                    <div>{note.title}</div>
                                    <div>{note.created_at}</div>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
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