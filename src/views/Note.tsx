import { Card, CardContent} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { NoteType } from "@/types/types";
import { NoteHeader } from "@/components/Note/NoteHeader";
import { NoteContent } from "@/components/Note/NoteContent";
import { getNoteById } from "@/hooks/dataHooks";

export default function Note() {
    const {id} = useParams<{id: string}>();
    const [note, setNote] = useState<NoteType>();

    useEffect(() => {
        getNoteById(Number(id), setNote);
    }, []);

  return (
    <div className="container w-full mx-auto p-8 text-center  dark:text-white">
        <Card className="mx-auto ">
          {/* Only render noteheader if note is defined */}
          {note && <NoteHeader note={note}></NoteHeader>}

        <CardContent className="whitespace-pre-wrap text-left">
          {note?.content ? (
            <NoteContent note={note}></NoteContent>
          ): (
            <p>No content available.</p>
          )}
        </CardContent>
        </Card>
    </div>
  );
}

