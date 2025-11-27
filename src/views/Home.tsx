import { Card, CardContent } from "@/components/ui/card";
import {Button } from "../components/ui/button"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFolders } from "@/hooks/dataHooks";
import { HomeHeader } from "@/components/Home/HomeHeader";
import { HomeContent } from "@/components/Home/HomeContent";
import { getNotes } from "@/hooks/dataHooks";

export default function Home(){
    const navigate = useNavigate();
    const [noteCount, setNoteCount] = useState(0);
    const [notes, setNotes] = useState([]);
    const location = useLocation();
    const [folders, setFolders] = useState([]);
    const message = location.state?.message;

    useEffect(() => {
        getNotes({setNotes});
        getFolders({setFolders});
    }, []); // [] ensures it only runs once on mount.

    return(
      <div className="container w-full mx-auto p-8 text-center  dark:text-white">
        {/* TODO - Temp status msg */}
        {message && <div className="text-green-500">{message}</div>}
        <Card className="mx-auto ">
          <HomeHeader noteCount={noteCount}></HomeHeader>
          <CardContent>
            <Button title="/about" variant="link" size="default" onClick={() => navigate("/about")}>About page</Button>
          </CardContent>
        </Card>
          <HomeContent noteCount={noteCount} notes={notes}></HomeContent>
      </div>
    )
}

