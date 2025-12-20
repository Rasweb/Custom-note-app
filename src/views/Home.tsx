import { Card, CardContent } from "@/components/ui/card";
import {Button } from "../components/ui/button"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HomeHeader } from "@/components/Home/HomeHeader";
import { HomeContent } from "@/components/Home/HomeContent";
import * as dataHooks from "@/hooks/dataHooks"
import * as Types from "@/types/types"

export default function Home(){
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Types.NoteType[]>([]);
    const location = useLocation();
    const [folders, setFolders] = useState([]);
    const message = location.state?.message;

    const updatePin = (noteId: number, newPin: number) => {
      setNotes(prev => 
          prev.map(note => 
            note.id == noteId
              ? {...note, pin:newPin}
              :note
          )
      );
    };

    const removeNote = (noteId: number) => {
      setNotes(prev => prev.filter(note => note.id !== noteId));
    };

    useEffect(() => {
        dataHooks.getNotes({setNotes});
        dataHooks.getFolders({setFolders});
    }, []); // [] ensures it only runs once on mount.

    return(
      <div className="container w-full mx-auto p-8 text-center  dark:text-white">
        {/* TODO - Temp status msg */}
        {message && <div className="text-green-500">{message}</div>}
        <Card className="mx-auto ">
          <HomeHeader noteCount={notes.length}></HomeHeader>
          <CardContent>
            <Button title="/about" variant="link" size="default" onClick={() => navigate("/about")}>About page</Button>
          </CardContent>
        </Card>
        {/* Using a callback */}
        <HomeContent noteCount={notes.length} notes={notes} onPinChange={updatePin} onNoteRemoved={removeNote}></HomeContent>
      </div>
    )
}

