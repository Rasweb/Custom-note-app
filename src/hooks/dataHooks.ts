import * as Types from "@/types/types"
import type { Dispatch, SetStateAction } from "react";
import type { NavigateFunction } from "react-router-dom";

export const getFolders = async ({setFolders}: Types.FolderProps) => {
    const foldersURL = "/database/folders";
    try {
      const response = await fetch(foldersURL, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      setFolders(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch folders", error);
    }
};

export const getNotes = async ({setNotes}:Types.NoteProps) => {
    const notesURL = "/database/notes";
    try{
      const response = await fetch(notesURL, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      setNotes(data);
      return data;
    } catch(error){
      console.error("Failed to fetch notes:", error);
    }
};

export const deleteNoteById = async (id: number, navigate: NavigateFunction) => {
  // const navigate = useNavigate();
  const usrin = prompt("Are you sure you wish to remove this note?[y/n]:");
    if(usrin == "y"){
      try{
        const response = await fetch(`/database/note/:${id}` ,{
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
        });
        if(response.ok){
          navigate("/");
        }
        return await response.json();
      }
      catch(error){
        console.error("Failed to fetch notes:", error);
      }
    } else {
      return;
    }
  };

export const getNoteById = async (id: number, setNote: Dispatch<SetStateAction<Types.NoteType | undefined>>) => {
  try{
    const response = await fetch(`/database/note/${id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    const data = await response.json();
    setNote(data[0]);
    }
    catch(error){
      console.error("Failed to fetch notes:", error);
    }
}; 

