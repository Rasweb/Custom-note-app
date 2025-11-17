
import type { FolderProps, NoteProps } from "@/types/types";

export async function getFolders({setFolderCount, setFolders}: FolderProps){
    const foldersURL = "/database/folders";
    try {
      const response = await fetch(foldersURL, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      setFolderCount(data.length);
      setFolders(data);
      console.log("Data", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch folders", error);
    }
};

export async function getNotes({setNoteCount, setNotes}:NoteProps){
    const notesURL = "/database/notes";
    try{
      const response = await fetch(notesURL, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      setNoteCount(data.length);
      setNotes(data);
      return data;
    } catch(error){
      console.error("Failed to fetch notes:", error);
    }
};
