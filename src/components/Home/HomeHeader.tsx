import { CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import {Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

export function HomeHeader({noteCount}: {noteCount: number}) {
    const navigate = useNavigate();
    // Handle dark/light mode toggle using tailwind
    function toggleMode(){
        document.documentElement.classList.toggle("dark");
        localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    }

    return (
        <CardHeader  className="flex flex-col items-center gap-2">
            {/* Nr of notes and grammar check */}
            <CardTitle>
                {noteCount > 0
                    ? `Welcome, there ${noteCount > 1 ? "are" : "is"} ${noteCount} ${noteCount > 1 ? "notes": "note"} found `
                    : "No notes found"}
            </CardTitle>
            <CardAction className="self-center">
                <Button title="dark/light mode" variant={"outline"} onClick={() => toggleMode()}>Toggle Mode</Button>
                <Button title="/create/note" variant="link" size="default" onClick={() => navigate("/create/note")}>Create a new note</Button>
                <Button title="/create/folder" variant={"link"} size={"default"} onClick={() => navigate("/create/folder")}>Create a new folder</Button>
            </CardAction>
        </CardHeader>
    )
}