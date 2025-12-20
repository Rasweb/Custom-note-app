import { Card, CardContent} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Types from "@/types/types"
import { NoteHeader } from "@/components/Note/NoteHeader";
import { NoteContent } from "@/components/Note/NoteContent";
import * as dataHooks from "@/hooks/dataHooks"

export default function Note() {
    const {id} = useParams<{id: string}>();
    const [note, setNote] = useState<Types.NoteType>();
    const [folder, setFolder] = useState<Types.FolderType>();

    const handleNoteUpdate = (updateNote: Types.NoteType) => {
      setNote(updateNote);
    }

    useEffect(() => {
        dataHooks.getNoteById(Number(id), setNote);
    }, []);

    useEffect(() => {
      if(!note?.folder_id){
        setFolder(undefined);
        return;
      }
        dataHooks.getFolderById(Number(note?.folder_id), setFolder);
    }, [note?.folder_id]);

  return (
    <div className="container w-full mx-auto p-8 text-center  dark:text-white">
        <Card className="mx-auto ">
          {/* Only render noteheader if note is defined */}
          {note && <NoteHeader note={note} folder={folder} onNoteUpdated={handleNoteUpdate}></NoteHeader>}

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

